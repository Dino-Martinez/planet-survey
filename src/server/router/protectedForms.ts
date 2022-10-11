import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";
import { nanoid } from "nanoid";

export const protectedFormRouter = createProtectedRouter()
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
  });
