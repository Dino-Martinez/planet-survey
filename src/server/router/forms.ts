import { createRouter } from "./context";
// import { z } from "zod";
import { prisma } from "../db/client";

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
  });