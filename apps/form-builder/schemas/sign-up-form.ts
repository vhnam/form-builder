import { z } from 'zod';

export const signUpFormSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
