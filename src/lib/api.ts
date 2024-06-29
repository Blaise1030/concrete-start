import { hc } from "hono/client";
import { AppType } from "~/backend";

export const client = hc<AppType>(process.env.PUBLIC_API_BASE_URL || '' as string);
