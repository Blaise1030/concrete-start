import { hc } from "hono/client";
import { isServer } from "solid-js/web";
import { getWebRequest } from "vinxi/http";
import { AppType } from "~/backend";

// If on server forwards, server side cookie to the backend, simulates browser
const cookie = isServer ? getWebRequest()?.headers?.get('Cookie') ?? '' : document.cookie
export const client = hc<AppType>(process.env.PUBLIC_API_BASE_URL || '' as string, {
  headers: { Cookie: cookie }
})

