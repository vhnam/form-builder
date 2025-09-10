import { describe, expect, it } from 'vitest';

import { type ISelectAttributes, selectFieldAttributesSchema } from '../select';

describe('selectFieldAttributesSchema', () => {
  it('should validate valid select field attributes', () => {
    const validAttributes = {
      options: ['Option 1', 'Option 2', 'Option 3'],
      placeholder: 'Choose an option',
      defaultValue: 'Option 1',
      minSelected: 1,
      maxSelected: 1,
    };

    const result = selectFieldAttributesSchema.safeParse(validAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validAttributes);
    }
  });

  it('should validate attributes with only required fields', () => {
    const minimalAttributes = {
      options: ['Single Option'],
    };

    const result = selectFieldAttributesSchema.safeParse(minimalAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(minimalAttributes);
    }
  });

  it('should reject missing options', () => {
    const invalidAttributes = {
      placeholder: 'Choose an option',
      defaultValue: 'Option 1',
    };

    const result = selectFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0]?.path).toEqual(['options']);
    }
  });

  it('should reject non-array options', () => {
    const invalidAttributes = {
      options: 'Option 1,Option 2',
    };

    const result = selectFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0]?.path).toEqual(['options']);
    }
  });

  it('should handle empty options array', () => {
    const attributes = {
      options: [],
    };

    const result = selectFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.options).toEqual([]);
    }
  });

  it('should reject options with non-string elements', () => {
    const invalidAttributes = {
      options: ['Option 1', 123, 'Option 3'],
    };

    const result = selectFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0]?.path).toEqual(['options', 1]);
    }
  });

  it('should reject invalid minSelected type', () => {
    const invalidAttributes = {
      options: ['Option 1', 'Option 2'],
      minSelected: 'invalid',
    };

    const result = selectFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0]?.path).toEqual(['minSelected']);
    }
  });

  it('should reject invalid maxSelected type', () => {
    const invalidAttributes = {
      options: ['Option 1', 'Option 2'],
      maxSelected: 'invalid',
    };

    const result = selectFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0]?.path).toEqual(['maxSelected']);
    }
  });

  it('should handle empty string placeholder', () => {
    const attributes = {
      options: ['Option 1'],
      placeholder: '',
    };

    const result = selectFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe('');
    }
  });

  it('should handle zero values for minSelected and maxSelected', () => {
    const attributes = {
      options: ['Option 1', 'Option 2'],
      minSelected: 0,
      maxSelected: 0,
    };

    const result = selectFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minSelected).toBe(0);
      expect(result.data.maxSelected).toBe(0);
    }
  });

  it('should handle single option array', () => {
    const attributes = {
      options: ['Only Option'],
    };

    const result = selectFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.options).toEqual(['Only Option']);
    }
  });

  it('should handle options with special characters', () => {
    const attributes = {
      options: [
        'Option with spaces',
        'Option-with-dashes',
        'Option_with_underscores',
      ],
    };

    const result = selectFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.options).toEqual(attributes.options);
    }
  });
});
