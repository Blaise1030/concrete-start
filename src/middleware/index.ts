import { redirect } from "@solidjs/router";
import { createMiddleware } from "@solidjs/start/middleware";
import { lucia } from "~/backend/lucia";
import URLPattern from "url-pattern"

const protectedPath = [
  '/dashboard*',
]

export default createMiddleware({
  onRequest: [
    async (event) => {
      const pathname = new URL(event.request.url)?.pathname
      if (protectedPath?.some((pattern) => (new URLPattern(pattern).match(pathname)))) {
        const cookieHeader = event.request.headers.get('Cookie')
        const sessionId = lucia.readSessionCookie(cookieHeader ?? "");
        if (!sessionId) return redirect(`/login?path=${pathname ?? "/"}`)
        const { session } = await lucia.validateSession(sessionId);
        if (!session) return redirect(`/login?path=${pathname ?? "/"}`)
      }
    }
  ]
});

