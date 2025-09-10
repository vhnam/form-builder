import { z } from 'zod';

export const textareaFieldAttributesSchema = z.object({
  placeholder: z.string().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  defaultValue: z.string().optional(),
  rows: z.number().optional(),
});

export type ITextareaAttributes = z.infer<typeof textareaFieldAttributesSchema>;
