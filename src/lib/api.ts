import { hc } from "hono/client";
import { AppType } from "~/backend";

export const client = () => {
  return hc<AppType>(process.env.PUBLIC_API_BASE_URL || '' as string, {
    headers: { Cookie: typeof document !== 'undefined' ? document?.cookie : '' },
    init: { credentials: "same-origin" },
    fetch(input, requestInit, _, __) {
      return fetch(input instanceof URL ? input.toString() : input, requestInit);
    },
  })
}