import { Session, User } from "lucia";
import { db } from "../database";
import type { APIEvent } from "@solidjs/start/server";


export async function createContext(opts: APIEvent) {

  const session: Session | null = null
  const user: User | null = null

  return { db, opts, session, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
