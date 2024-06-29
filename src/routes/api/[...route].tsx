import type {APIEvent} from "@solidjs/start/server";
import {app} from "~/backend";

export async function GET(item: APIEvent) {
  return app.fetch(item.request);
}
export async function POST(item: APIEvent) {
  return app.fetch(item.request);
}
export async function PUT(item: APIEvent) {
  return app.fetch(item.request);
}
export async function PATCH(item: APIEvent) {
  return app.fetch(item.request);
}
export async function DELETE(item: APIEvent) {
  return app.fetch(item.request);
}
