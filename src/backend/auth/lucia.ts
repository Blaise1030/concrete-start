import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "~/backend/database/schema";
import { webcrypto } from "node:crypto";
globalThis.crypto = webcrypto as Crypto;
import { db } from "~/backend/database";
import { Lucia } from "lucia";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "PRODUCTION" // set `Secure` flag in HTTPS
    }
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email
    };
  }
});


declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}