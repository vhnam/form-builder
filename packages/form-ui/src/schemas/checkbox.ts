import { z } from 'zod';

export const checkboxFieldAttributesSchema = z.object({
  options: z.string(),
  minSelected: z.number().optional(),
  maxSelected: z.number().optional(),
});

export type ICheckboxAttributes = z.infer<typeof checkboxFieldAttributesSchema>;
