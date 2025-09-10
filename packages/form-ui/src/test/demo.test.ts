import { describe, expect, it } from 'vitest';

import { textFieldAttributesSchema } from '../schemas/text';
import type { IField, IFieldAttributes } from '../types/form';
import { getFieldAttributes } from '../utils/field';

describe('Form UI Testing Demo', () => {
  it('should demonstrate validation working correctly', () => {
    // Valid field data
    const validField: IField<IFieldAttributes> = {
      id: 'demo-field',
      sectionId: 'demo-section',
      type: 'text',
      label: 'Demo Field',
      required: true,
      order: 1,
      attributes: {
        placeholder: 'Enter your name',
        minLength: 2,
        maxLength: 50,
        defaultValue: 'John Doe',
      },
    };

    const result = getFieldAttributes(textFieldAttributesSchema, validField);

    expect(result).toBeTruthy();
    expect(result?.success).toBe(true);
    if (result?.success) {
      expect(result.data.placeholder).toBe('Enter your name');
      expect(result.data.minLength).toBe(2);
      expect(result.data.maxLength).toBe(50);
      expect(result.data.defaultValue).toBe('John Doe');
    }
  });

  it('should demonstrate validation failing gracefully', () => {
    // Invalid field data
    const invalidField: IField<IFieldAttributes> = {
      id: 'demo-field',
      sectionId: 'demo-section',
      type: 'text',
      label: 'Demo Field',
      required: true,
      order: 1,
      attributes: {
        placeholder: 'Enter your name',
        minLength: 'invalid', // Wrong type
        maxLength: 50,
        defaultValue: 'John Doe',
      } as any,
    };

    const result = getFieldAttributes(textFieldAttributesSchema, invalidField);

    expect(result).toBeNull();
  });

  it('should demonstrate schema validation', () => {
    // Test valid schema
    const validAttributes = {
      placeholder: 'Enter text',
      minLength: 5,
      maxLength: 100,
    };

    const result = textFieldAttributesSchema.safeParse(validAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validAttributes);
    }
  });

  it('should demonstrate schema validation failure', () => {
    // Test invalid schema
    const invalidAttributes = {
      placeholder: 'Enter text',
      minLength: 'invalid', // Wrong type
      maxLength: 100,
    };

    const result = textFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['minLength']);
    }
  });
});
