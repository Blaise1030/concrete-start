import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(async (opts) => {
  const { ctx } = opts;
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return opts.next({ ctx: { ...opts.ctx, user: ctx.user } });
});

export function isValidEmail(email: string): boolean {
  return /.+@.+/.test(email);
}

