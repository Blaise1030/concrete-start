import { verifyRequestOrigin } from "lucia";
import { db } from "../database";
import type { APIEvent } from "@solidjs/start/server";
import { lucia } from "../auth/lucia";
import { TRPCError } from "@trpc/server";


export async function createContext(opts: APIEvent) {
  const request = opts.request
  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");
  if (request.method !== 'GET' && (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])))
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'No allowed' })

  const cookieHeader = request.headers.get("Cookie");
  const sessionId = lucia.readSessionCookie(cookieHeader ?? "");

  if (sessionId) {
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      opts.response.headers.append("Set-Cookie", sessionCookie.serialize());
    }
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      opts.response.headers.append("Set-Cookie", sessionCookie.serialize());
    }
    return { db, opts, session, user }
  } else return { db, opts }
}

export type Context = Awaited<ReturnType<typeof createContext>>;