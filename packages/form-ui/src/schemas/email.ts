import { z } from 'zod';

export const emailFieldAttributesSchema = z.object({
  placeholder: z.string().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  defaultValue: z.string().optional(),
});

export type IEmailAttributes = z.infer<typeof emailFieldAttributesSchema>;
