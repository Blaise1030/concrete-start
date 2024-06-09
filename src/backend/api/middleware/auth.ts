import { appendHeader, getCookie } from "@solidjs/start/server";
import { verifyRequestOrigin } from "lucia";
import { lucia } from "./lib/auth";
import { t } from "../utils";
import { TRPCError } from "@trpc/server";

export const authMiddleware = t.procedure.use(async (param) => {
    const request = param.ctx.opts.request
    if (request.method !== "GET") {
        const originHeader = request.headers.get('Origin') ?? null;
        const hostHeader = request.headers.get('Host') ?? null;
        if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader]))
            throw new TRPCError({ code: 'FORBIDDEN' });
    }

    const sessionId = getCookie(param.ctx.opts, lucia.sessionCookieName) ?? null;
    if (!sessionId) {
        param.ctx.session = null;
        param.ctx.user = null;
        return;
    }

    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh)
        appendHeader(param.ctx.opts, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
    if (!session)
        appendHeader(param.ctx.opts, "Set-Cookie", lucia.createBlankSessionCookie().serialize());

    param.ctx.session = session;
    param.ctx.user = user;

    return param.next()

});