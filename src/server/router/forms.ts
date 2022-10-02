import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";
import { nanoid } from "nanoid";

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

      const responses = await prisma.response.findMany({
        where: {formId: form.id},
        orderBy: [
          {
            user: 'desc',
          },
          {
            name: 'asc'
          }
      ]
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
    async resolve({input}) {
      const slug = nanoid();
      const form = await prisma.form.create({
        data: {
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
    async resolve({input}) {
      const user = nanoid();
      input.responses.forEach(async response => {
        await prisma.response.create({
          data: {
            formId: input.formId,
            name: response.name,
            user,
            value: response.value
          }
        });
      });
      return;
    }
  });