import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";
import { InputResponse } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const formsRouter = createRouter()
  .query("getAll", {
    async resolve() {
        const forms = await prisma.form.findMany(
            {
                include: {inputs: true}
            }
        );
      return await forms;
    },
  })
  .query("getBySlug", {
    input: z.string().trim().length(21).or(z.string().array()).or(z.undefined()),
    async resolve({input}) {
      if (typeof input !== 'string')
      {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Incorrect input type. Expected type string, received type ${typeof input}`
        });
      }
      const form = await prisma.form.findUnique({
        where: {slug: input},
        include: {inputs: true}
      });

      if (!form)
      {
        throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No form was found with the given slug.`
      });
      }
      return form;
    }
  })
  .mutation("submitForm", {
    input: z.object({
      formId: z.string(),
      responses: z.object({
        name: z.string(),
        value: z.string()
      }).array(),
    }),
    async resolve({ctx, input}) {
      let userId: string;
      if (ctx.session && ctx.session.user)
        userId = ctx.session.user.id;
      else
       { 
        const anonymous = await prisma.user.findFirstOrThrow({
          where: {
            id: 'anonymous'
          }
        });
        userId = anonymous.id;
      }
      const formUserResponse = await prisma.formUserResponse.create({
        data: {
          formId: input.formId,
          userId: userId,
        },
        include: {
          responses: true
        }
      });
      
      const submittedResponses: InputResponse[] = await Promise.all(input.responses.map(async response => {
        const submittedResponse = await prisma.inputResponse.create({
          data: {
            name: response.name,
            value: response.value,
            formUserResponseId: formUserResponse.id
          }
        });
        return submittedResponse;
      }));  

      await prisma.formUserResponse.update({
        where: {
          id: formUserResponse.id
        },
        data: {
          responses: {
            createMany: {
              data: [...formUserResponse.responses, ...submittedResponses]
            }
          }
        }
      });
        
      return;
    }
  });