import { z } from 'zod';

export const selectFieldAttributesSchema = z.object({
  options: z.array(z.string()),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  minSelected: z.number().optional(),
  maxSelected: z.number().optional(),
});

export type ISelectAttributes = z.infer<typeof selectFieldAttributesSchema>;
