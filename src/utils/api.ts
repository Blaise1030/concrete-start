import { AppType } from "~/routes/api/[...route]";
import { hc } from "hono/client";

export const client = hc<AppType>(process.env.PUBLIC_API_BASE_URL || '' as string);
