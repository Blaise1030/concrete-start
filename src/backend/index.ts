import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { User, Session } from "lucia";
import { auth } from "./modules/auth";
import { notes } from "./modules/notes";
import { authMiddleware } from "./middleware/auth";

export type THonoType = {
  Variables: { user: User | null; session: Session | null };
};

export const app = new Hono<THonoType>().basePath("/api")
  .use(csrf())
  .use('/notes/*', authMiddleware)
  .route("/auth", auth)
  .route('/notes', notes)

export type AppType = typeof app;