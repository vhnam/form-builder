import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.email(),
  mode: z.enum(['dark', 'light', 'system']),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
