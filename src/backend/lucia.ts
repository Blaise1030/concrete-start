import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "~/drizzle/schema";
import { Lucia } from "lucia";
import { db } from "./db";
import { Google } from "arctic";

import { webcrypto } from "node:crypto";
globalThis.crypto = webcrypto as Crypto;

const databaseAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const google = new Google(process.env.GOOGLE_CLIENT_ID as string, process.env.GOOGLE_CLIENT_SECRET as string, `${process.env.PUBLIC_API_BASE_URL}/api/auth/google/callback`);
export const lucia = new Lucia(databaseAdapter, {
  getUserAttributes: (attributes) => ({ email: attributes.email }),
  sessionCookie: { attributes: { secure: process.env.NODE_ENV === "production" } }
});


declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}