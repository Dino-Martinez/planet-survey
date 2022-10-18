// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedFormRouter } from "./protectedForms";
import { formsRouter } from "./forms";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedFormRouter)
  .merge("forms.", formsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
