import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const userRoleEnum = pgEnum('user_role', [
  'user',
  'admin',
  'superadmin',
]);

export const interfaceModeEnum = pgEnum('interface_mode', [
  'light',
  'dark',
  'system',
]);

export const interfaceLanguageEnum = pgEnum('interface_language', [
  'en-US',
  'vi-VN',
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').default('user').notNull(),
  interfaceMode: interfaceModeEnum('interface_mode')
    .default('system')
    .notNull(),
  interfaceLanguage: interfaceLanguageEnum('interface_language')
    .default('en-US')
    .notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserRole = (typeof userRoleEnum.enumValues)[number];
export type InterfaceMode = (typeof interfaceModeEnum.enumValues)[number];
export type InterfaceLanguage =
  (typeof interfaceLanguageEnum.enumValues)[number];
