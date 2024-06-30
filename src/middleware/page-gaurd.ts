import { lucia } from "~/backend/lucia";

export function pageGaurd(event) {

  console.log(event.request.headers.get('Cookie'))
  const sessionId = lucia.readSessionCookie(cookieHeader ?? "");


}