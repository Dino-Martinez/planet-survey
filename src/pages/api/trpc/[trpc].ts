// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/router/context";
import { prisma } from "../../../server/db/client";
import { TRPCError } from "@trpc/server";
import isEqual from 'lodash/isEqual';

let lastErr: TRPCError | undefined = undefined;
// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  async onError({error, type}) {
    // Ensure that this error is not identical to the most recent
    if (!isEqual(lastErr, error))
    {
      await prisma.errorLog.create({
        data: {
          code: error.code,
          type,
          message: error.message,
          stack: error.stack
        }
      });
      lastErr = error;
    }
  }
});
