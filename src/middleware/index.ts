import { RequestMiddleware, createMiddleware } from "@solidjs/start/middleware";
import Auth from "./auth";

export default createMiddleware({
    onRequest: [Auth as RequestMiddleware],
});