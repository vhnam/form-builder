import { describe, expect, it } from 'vitest';

import { type ITextFieldAttributes, textFieldAttributesSchema } from '../text';

describe('textFieldAttributesSchema', () => {
  it('should validate valid text field attributes', () => {
    const validAttributes = {
      placeholder: 'Enter your name',
      minLength: 2,
      maxLength: 100,
      defaultValue: 'John Doe',
    };

    const result = textFieldAttributesSchema.safeParse(validAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validAttributes);
    }
  });

  it('should validate attributes with only required fields', () => {
    const minimalAttributes = {
      placeholder: 'Enter text',
    };

    const result = textFieldAttributesSchema.safeParse(minimalAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(minimalAttributes);
    }
  });

  it('should validate attributes without placeholder', () => {
    const attributes = {
      minLength: 2,
      maxLength: 100,
    };

    const result = textFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(attributes);
    }
  });

  it('should reject invalid minLength type', () => {
    const invalidAttributes = {
      placeholder: 'Enter text',
      minLength: 'invalid',
    };

    const result = textFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['minLength']);
    }
  });

  it('should reject invalid maxLength type', () => {
    const invalidAttributes = {
      placeholder: 'Enter text',
      maxLength: 'invalid',
    };

    const result = textFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['maxLength']);
    }
  });

  it('should reject invalid defaultValue type', () => {
    const invalidAttributes = {
      placeholder: 'Enter text',
      defaultValue: 123,
    };

    const result = textFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['defaultValue']);
    }
  });

  it('should handle empty string placeholder', () => {
    const attributes = {
      placeholder: '',
    };

    const result = textFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe('');
    }
  });

  it('should handle zero values for minLength and maxLength', () => {
    const attributes = {
      placeholder: 'Enter text',
      minLength: 0,
      maxLength: 0,
    };

    const result = textFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minLength).toBe(0);
      expect(result.data.maxLength).toBe(0);
    }
  });

  it('should handle negative values for minLength and maxLength', () => {
    const attributes = {
      placeholder: 'Enter text',
      minLength: -1,
      maxLength: -1,
    };

    const result = textFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minLength).toBe(-1);
      expect(result.data.maxLength).toBe(-1);
    }
  });
});
