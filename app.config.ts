import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  middleware: "./src/middleware/index.ts",
  vite: { ssr: { external: ["drizzle-orm"] } },
});