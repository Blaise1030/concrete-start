import { relations } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { Google } from "arctic";


export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  email: text('email').unique(),
  password_hash: text('password_hash')
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull()
});

export const oAuthTable = sqliteTable('oauth_table', {
  id: text('id').notNull().primaryKey(),
  providerId: text('provider_id'),
  providerUserId: text('provider_user_id'),
  userId: text('user_id').references(() => userTable.id)
})

export const sessionUserRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

export const oAuthTableUserRelations = relations(oAuthTable, ({ one }) => ({
  user: one(userTable, {
    fields: [oAuthTable.userId],
    references: [userTable.id],
  }),
}));
