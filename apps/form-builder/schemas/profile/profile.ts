import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  // password: z.string().min(1).max(255), // TODO: update later
  email: z.email().optional(),
  interfaceMode: z.enum(['dark', 'light', 'system']),
  interfaceLanguage: z.enum(['en-US', 'vi-VN']),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
