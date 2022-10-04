import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";
import { nanoid } from "nanoid";
import { InputResponse } from "@prisma/client";

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
        return;

      const form = await prisma.form.findUnique({
        where: {slug: input},
        include: {inputs: true}
      });
      return form;
    }
  })
  .query("getResponsesBySlug", {
    input: z.string().trim().length(21).or(z.string().array()).or(z.undefined()),
    async resolve({input}) {
      if (typeof input !== 'string')
              return;
      
      const form = await prisma.form.findUnique({
        where: {slug: input},
      });

      if (!form)
        return;

      const responses = await prisma.formUserResponse.findMany({
        where: {formId: form.id},
        orderBy: [
          {
            form: {
              name: 'desc'
            }
          },
          {
            author: {
              name: 'desc'
            }
          }
        ],
        select: {
          responses: true,
          author: {
            select: {
              name: true,
              image: true
            }
          }
        }
      });

      console.log(responses);

      return responses;
    }
  })
  .mutation("createForm", {
    input: z
    .object({
      name: z.string(),
      inputs: z.object({
          name: z.string().trim(),
          type: z.string().trim()
        }).array()
    }),
    async resolve({ctx, input}) {
      if (!ctx.session || !ctx.session.user)
      {
        //TODO: change this to a protected router
        return;
      }

      const slug = nanoid();
      const form = await prisma.form.create({
        data: {
          userId: ctx.session.user.id,
          name: input.name,
          slug: slug,
          inputs: {
            createMany: {
              data: [...input.inputs]
            }
          }
        }
      });
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