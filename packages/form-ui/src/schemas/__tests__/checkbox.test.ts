import { describe, expect, it } from 'vitest';

import {
  type ICheckboxAttributes,
  checkboxFieldAttributesSchema,
} from '../checkbox';

describe('checkboxFieldAttributesSchema', () => {
  it('should validate valid checkbox field attributes', () => {
    const validAttributes = {
      options: 'Option 1,Option 2,Option 3',
      minSelected: 1,
      maxSelected: 3,
    };

    const result = checkboxFieldAttributesSchema.safeParse(validAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validAttributes);
    }
  });

  it('should validate attributes with only required fields', () => {
    const minimalAttributes = {
      options: 'Single Option',
    };

    const result = checkboxFieldAttributesSchema.safeParse(minimalAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(minimalAttributes);
    }
  });

  it('should reject missing options', () => {
    const invalidAttributes = {
      minSelected: 1,
      maxSelected: 3,
    };

    const result = checkboxFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['options']);
    }
  });

  it('should reject non-string options', () => {
    const invalidAttributes = {
      options: ['Option 1', 'Option 2'],
    };

    const result = checkboxFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['options']);
    }
  });

  it('should handle empty string options', () => {
    const attributes = {
      options: '',
    };

    const result = checkboxFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.options).toBe('');
    }
  });

  it('should reject invalid minSelected type', () => {
    const invalidAttributes = {
      options: 'Option 1,Option 2',
      minSelected: 'invalid',
    };

    const result = checkboxFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['minSelected']);
    }
  });

  it('should reject invalid maxSelected type', () => {
    const invalidAttributes = {
      options: 'Option 1,Option 2',
      maxSelected: 'invalid',
    };

    const result = checkboxFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['maxSelected']);
    }
  });

  it('should handle zero values for minSelected and maxSelected', () => {
    const attributes = {
      options: 'Option 1,Option 2',
      minSelected: 0,
      maxSelected: 0,
    };

    const result = checkboxFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minSelected).toBe(0);
      expect(result.data.maxSelected).toBe(0);
    }
  });

  it('should handle negative values for minSelected and maxSelected', () => {
    const attributes = {
      options: 'Option 1,Option 2',
      minSelected: -1,
      maxSelected: -1,
    };

    const result = checkboxFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minSelected).toBe(-1);
      expect(result.data.maxSelected).toBe(-1);
    }
  });

  it('should handle options with commas', () => {
    const attributes = {
      options: 'Option, with, commas,Option 2,Option 3',
    };

    const result = checkboxFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.options).toBe(
        'Option, with, commas,Option 2,Option 3'
      );
    }
  });

  it('should handle options with special characters', () => {
    const attributes = {
      options: 'Option with spaces,Option-with-dashes,Option_with_underscores',
    };

    const result = checkboxFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.options).toBe(
        'Option with spaces,Option-with-dashes,Option_with_underscores'
      );
    }
  });

  it('should handle single option', () => {
    const attributes = {
      options: 'Only Option',
    };

    const result = checkboxFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.options).toBe('Only Option');
    }
  });

  it('should handle options with numbers', () => {
    const attributes = {
      options: 'Option 1,Option 2,Option 3',
    };

    const result = checkboxFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.options).toBe('Option 1,Option 2,Option 3');
    }
  });
});
