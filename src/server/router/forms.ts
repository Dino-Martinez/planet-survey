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
        console.log(forms);
      return await forms;
    },
  })
  .query("getBySlug", {
    input: z.string().trim().length(21),
    async resolve({input}) {
      const form = await prisma.form.findUnique({
        where: {slug: input},
        include: {inputs: true}
      });
      return form;
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
        id: z.string(),
        value: z.string()
      }).array(),
    async resolve({input}) {
       input.forEach(async response => {
        await prisma.input.update({
          where: {id: response.id},
          data: {value: response.value}
        });
      });
      return;
    }
  });