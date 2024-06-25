import { generateState, generateCodeVerifier } from "arctic";
import { getCookie, setCookie } from "hono/cookie";
import { google, lucia } from "~/backend/lucia";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "~/backend/db";
import { oAuthTable, userTable } from "~/drizzle/schema";
import { generateIdFromEntropySize } from "lucia";

type TGoogleType = {
  sub: string,
  name: string,
  given_name: string,
  family_name: string,
  picture: string,
  email: string,
  email_verified: boolean
}

export const googleOAuth = new Hono()
  .get('/oauth', async (c) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"]
    });
    setCookie(c, 'state', state)
    setCookie(c, 'code_verifier', codeVerifier)
    return c.redirect(url.toString())
  })
  .get('/callback', zValidator('query', z.object({
    code: z.string(),
    state: z.string(),
  })), async (c) => {
    const { code, state } = c.req.valid('query')

    const storedState = getCookie(c, 'state')
    const storedCodeVerifier = getCookie(c, 'code_verifier')

    if (!code || !storedState || !storedCodeVerifier || state !== storedState)
      throw new HTTPException(400, { message: 'Invalid request' })

    try {
      const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier,);
      const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: { Authorization: `Bearer ${tokens.accessToken}` }
      });
      const user = await response.json() as TGoogleType;
      const res = await db.select().from(oAuthTable).where(and(eq(oAuthTable.providerUserId, user?.sub), eq(oAuthTable.providerId, 'google')))
      if (res.length > 0) {
        const session = await lucia.createSession(res[0]?.userId as string, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        setCookie(c, sessionCookie.name, sessionCookie.value)
        return c.json({ message: 'Success' })
      } else {
        const oAuthId = generateIdFromEntropySize(10); // 16 characters long
        const userId = generateIdFromEntropySize(10); // 16 characters long
        await db.transaction(async (tx) => {
          await tx.insert(userTable).values({ email: user?.email, id: userId })
          await tx.insert(oAuthTable).values({ providerId: 'google', userId, providerUserId: user?.sub, id: oAuthId })
        });
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        setCookie(c, sessionCookie.name, sessionCookie.value)
        return c.json({ message: 'Success' })
      }
    } catch (e) {
      console.log(e)
    }
  })