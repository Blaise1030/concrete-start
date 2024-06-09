import { createTRPCRouter, publicProcedure } from "../utils";
import { generateIdFromEntropySize } from "lucia";
import { db } from "~/backend/database";
import { hash } from "@node-rs/argon2";
import { z } from "zod";
import { userTable } from "~/backend/database/schema";
import { lucia } from "~/backend/auth/lucia";
import { TRPCError } from "@trpc/server";


const hashSettings = { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 }

export const authRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    return "This is the user"
  }),
  signup: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6, 'Password has to be minimum 6 character long.')
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input

      const passwordHash = await hash(password, hashSettings);
      const userId = generateIdFromEntropySize(10);
      try {
        await db.insert(userTable).values({ id: userId, password_hash: passwordHash, email })
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);




        return `Hello ${input}!`;
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
        });
      }
    })
});