import { z } from 'zod';

export const textFieldAttributesSchema = z.object({
  placeholder: z.string().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  defaultValue: z.string().optional(),
});

export type ITextFieldAttributes = z.infer<typeof textFieldAttributesSchema>;
