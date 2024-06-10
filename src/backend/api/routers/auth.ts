import { authedProcedure, createTRPCRouter, publicProcedure } from "../utils";
import { userTable } from "~/backend/database/schema";
import { generateIdFromEntropySize } from "lucia";
import { hash, verify } from "@node-rs/argon2";
import { lucia } from "~/backend/auth/lucia";
import { TRPCError } from "@trpc/server";
import { db } from "~/backend/database";
import { eq } from "drizzle-orm";
import { z } from "zod";

const hashSettings = { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 }

export const authRouter = createTRPCRouter({
  signout: authedProcedure.mutation(async ({ ctx }) => {
    await lucia.invalidateSession(ctx.session?.id as string);
    return { message: 'Signed out' }
  }),
  getUser: authedProcedure.query(async ({ ctx }) => {
    return ctx?.user
  }),
  signin: publicProcedure.input(z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password has to be minimum 6 character long.')
  })).mutation(async ({ input, ctx }) => {
    const { email, password } = input
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, email)
    })
    if (!user) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid email or password' })
    const validPassword = await verify(user.password_hash as string, password, hashSettings);
    if (!validPassword) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid email or password' })
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    ctx.opts.response.headers.set('Location', '/')
    ctx.opts.response.headers.set('Set-Cookie', sessionCookie.serialize())
  }),
  signup: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6, 'Password has to be minimum 6 character long.')
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input

      const passwordHash = await hash(password, hashSettings);
      const userId = generateIdFromEntropySize(15);
      try {
        await db.insert(userTable).values({ id: userId, password_hash: passwordHash, email })
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        ctx.opts.response.headers.set('Location', '/')
        ctx.opts.response.headers.set('Set-Cookie', sessionCookie.serialize())
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
        });
      }
    })
});