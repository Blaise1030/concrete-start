import {Hono} from "hono";
import type {APIEvent} from "@solidjs/start/server";

const app = new Hono().basePath("/api");

const route = app.get("/hello", (c) => {
  return c.json({message: `Hi Blaise`});
});
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
