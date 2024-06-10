import { redirect } from "@solidjs/router";
import { RequestMiddleware } from "@solidjs/start/middleware";
import { FetchEvent } from "@solidjs/start/server";
import { lucia } from "~/backend/auth/lucia";

function patternToRegex(pattern: string): RegExp {
    let escapedPattern = pattern.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
    escapedPattern = escapedPattern.replace(/\*/g, '.*');
    const regexString = `^${escapedPattern}$`;
    return new RegExp(regexString);
}


const Auth = async (event: FetchEvent) => {
    if (patternToRegex('/dashboard*').test(event.nativeEvent.path)) {
        const request = event.request
        const cookieHeader = request.headers.get("Cookie");
        const sessionId = lucia.readSessionCookie(cookieHeader ?? "");

        if (!sessionId) return redirect(`/auth/login?callback=${event?.request?.url}`)
        else {
            const { session } = await lucia.validateSession(sessionId);
            if (!session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                return new Response(null, { status: 302, headers: { Location: "/", "Set-Cookie": sessionCookie.serialize() } })
            }
            if (session && session.fresh) {
                const sessionCookie = lucia.createSessionCookie(session.id);
                return new Response(null, { status: 302, headers: { Location: "/", "Set-Cookie": sessionCookie.serialize() } })
            }
        }
    }
}

export default Auth;