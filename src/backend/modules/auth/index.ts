import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'
import { hash, verify } from "@node-rs/argon2";
import { Hono } from "hono";
import { generateIdFromEntropySize } from 'lucia';
import { userTable } from '~/drizzle/schema';
import { setCookie } from 'hono/cookie'
import { eq } from 'drizzle-orm';
import { googleOAuth } from '~/backend/modules/auth/oauth/google';
import { authMiddleware } from '~/backend/middleware/auth';
import { LoginSchema } from '~/schema/LoginSchema';
import { THonoType } from '~/backend';
import { lucia } from '~/backend/lucia';
import { db } from '~/backend/db';


const hash_params = { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 }

export const auth = new Hono<THonoType>()
  .use('/me', authMiddleware)
  .get('/me', (c) => {
    return c.json(c?.var?.user)
  })
  .use('/logout', authMiddleware)
  .get('/logout', async (c) => {
    const sessionId = c?.var?.session?.id
    if (sessionId) {
      await lucia.invalidateSession(sessionId);
      return c.redirect('/login')
    }
  })
  .post('/signup', zValidator('json', LoginSchema),
    async (c) => {
      const { email, password } = c.req.valid('json')
      const passwordHash = await hash(password, hash_params);
      const userId = generateIdFromEntropySize(10);
      try {
        await db.insert(userTable).values({ password_hash: passwordHash, id: userId, email })
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        setCookie(c, sessionCookie.name, sessionCookie.value)
        return c.json({ message: 'success' })
      } catch (e) {
        throw new HTTPException(400, { message: 'Something went wrong.' })
      }
    }
  ).post('/login',
    zValidator('json', LoginSchema),
    async (c) => {
      const { email, password } = c.req.valid('json')
      const user = await db.select().from(userTable).where(eq(userTable.email, email))
      if (user.length === 0) throw new HTTPException(400, { message: 'Invalid email or password' })
      else {
        const validPassword = await verify(user[0].password_hash as string, password, hash_params);
        if (!validPassword) throw new HTTPException(400, { message: 'Invalid email or password' })
        else {
          const session = await lucia.createSession(user[0].id, {});
          const sessionCookie = lucia.createSessionCookie(session.id);
          setCookie(c, sessionCookie.name, sessionCookie.value)
          return c.json({ message: 'success' })
        }
      }
    }
  )
  .route('/google', googleOAuth)