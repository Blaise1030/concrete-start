import {Hono} from "hono";
import type {APIEvent} from "@solidjs/start/server";
import {auth} from "~/backend/modules/auth";
import {csrf} from "hono/csrf";
import type {User, Session} from "lucia";

// see https://hono.dev/middleware/builtin/csrf for more options

export type THonoType = {
  Variables: {user: User | null; session: Session | null};
};

const app = new Hono<THonoType>().basePath("/api");
app.use(csrf());
const route = app.route("/auth", auth);

export async function GET(item: APIEvent) {
  return route.fetch(item.request);
}
export async function POST(item: APIEvent) {
  return route.fetch(item.request);
}
export async function PUT(item: APIEvent) {
  return route.fetch(item.request);
}
export async function PATCH(item: APIEvent) {
  return route.fetch(item.request);
}
export async function DELETE(item: APIEvent) {
  return route.fetch(item.request);
}

export type AppType = typeof route;
