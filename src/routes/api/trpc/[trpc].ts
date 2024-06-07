import type { APIEvent } from "@solidjs/start/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "~/backend/api/context";
import { appRouter } from "~/backend/api/root";

const handler = (event: APIEvent) => {
  return fetchRequestHandler({
    createContext: () => createContext(event),
    endpoint: "/api/trpc",
    req: event.request,
    router: appRouter,
  });
}


export const GET = handler;
export const POST = handler;