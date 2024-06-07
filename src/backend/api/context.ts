import { db } from "../database";
import type { APIEvent } from "@solidjs/start/server";


export async function createContext(opts: APIEvent) {

  return { db, opts };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
