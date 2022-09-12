import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";

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
  .mutation("createForm", {
    input: z
    .object({
      name: z.string(),
      type: z.string()
    }),
    async resolve({input}) {
      return input;
    }
  });