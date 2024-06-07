import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: 'sqlite',
  schema: "./src/backend/database/schema.ts",
  out: "./src/backend/database/migrations",
  dbCredentials: {
    url: './db.sqlite'
  },
});
