import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { User, Session } from "lucia";
import { auth } from "./modules/auth";

export type THonoType = {
  Variables: { user: User | null; session: Session | null };
};

export const app = new Hono<THonoType>().basePath("/api")
  .use(csrf())
  .route("/auth", auth);

export type AppType = typeof app;