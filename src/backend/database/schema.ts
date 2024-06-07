import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  email: text('email').unique(),
  password_hash: text('password_hash'),
});

const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull()
});

export { userTable, sessionTable }
