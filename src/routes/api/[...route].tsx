import {Hono} from "hono";
import type {APIEvent} from "@solidjs/start/server";
import {auth} from "~/backend/modules/auth";

const app = new Hono().basePath("/api");
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
