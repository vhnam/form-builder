import { z } from 'zod';

export const dateFieldAttributesSchema = z.object({
  placeholder: z.string().optional(),
  defaultValue: z.number().optional(),
  dateFormat: z.string().optional(),
  beforeDate: z.number().optional(),
  afterDate: z.number().optional(),
  mode: z.enum(['single', 'multiple', 'range']).optional(),
});

export type IDateAttributes = z.infer<typeof dateFieldAttributesSchema>;
