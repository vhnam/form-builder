import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './users';

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  token: varchar('token', { length: 64 }).notNull().unique(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  isUsed: boolean('is_used').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertPasswordResetTokenSchema =
  createInsertSchema(passwordResetTokens);
export const selectPasswordResetTokenSchema =
  createSelectSchema(passwordResetTokens);

// Type exports
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
