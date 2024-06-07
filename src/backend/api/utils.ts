import { initTRPC } from "@trpc/server";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;


export function isValidEmail(email: string): boolean {
  return /.+@.+/.test(email);
}