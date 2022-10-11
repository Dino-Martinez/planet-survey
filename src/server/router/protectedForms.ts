import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";

export const protectedFormRouter = createProtectedRouter()
    .query("getResponsesBySlug", {
    input: z.string().trim().length(21).or(z.string().array()).or(z.undefined()),
    async resolve({input, ctx}) {
      if (typeof input !== 'string')
      {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Incorrect input type. Expected type string, received type ${typeof input}`
        });
      }

      const form = await prisma.form.findUnique({
        where: {slug: input},
        include: {
          author: true
        }
      });

      if (!form)
      {
        throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No form was found with the given slug.`
      });
      }

      if (form.author.id !== ctx.session.user.id)
      {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `The current user is not permitted to view this form. Only the form's author may view its results.`
        });
      }

      console.log('FORM', form);

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
