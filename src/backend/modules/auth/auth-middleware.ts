import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception';
import { lucia } from '~/backend/lucia';

export const authMiddleware = createMiddleware(async (c, next) => {
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    throw new HTTPException(401, { message: 'Unauthenticated' })
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    // use `header()` instead of `setCookie()` to avoid TS errors
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), { append: true });
  }
  if (!session) {
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), { append: true });
    throw new HTTPException(401, { message: 'Unauthenticated' })
  }
  c.set("user", user);
  c.set("session", session);
  return next();
})