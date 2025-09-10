import { describe, expect, it } from 'vitest';

import { type IEmailAttributes, emailFieldAttributesSchema } from '../email';

describe('emailFieldAttributesSchema', () => {
  it('should validate valid email field attributes', () => {
    const validAttributes = {
      placeholder: 'Enter your email',
      minLength: 5,
      maxLength: 255,
      defaultValue: 'user@example.com',
    };

    const result = emailFieldAttributesSchema.safeParse(validAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validAttributes);
    }
  });

  it('should validate attributes with only required fields', () => {
    const minimalAttributes = {
      placeholder: 'Enter your email',
    };

    const result = emailFieldAttributesSchema.safeParse(minimalAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(minimalAttributes);
    }
  });

  it('should validate attributes without placeholder', () => {
    const attributes = {
      minLength: 5,
      maxLength: 255,
      defaultValue: 'user@example.com',
    };

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(attributes);
    }
  });

  it('should reject invalid minLength type', () => {
    const invalidAttributes = {
      placeholder: 'Enter your email',
      minLength: 'invalid',
    };

    const result = emailFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['minLength']);
    }
  });

  it('should reject invalid maxLength type', () => {
    const invalidAttributes = {
      placeholder: 'Enter your email',
      maxLength: 'invalid',
    };

    const result = emailFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['maxLength']);
    }
  });

  it('should reject invalid defaultValue type', () => {
    const invalidAttributes = {
      placeholder: 'Enter your email',
      defaultValue: 123,
    };

    const result = emailFieldAttributesSchema.safeParse(invalidAttributes);

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

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe('');
    }
  });

  it('should handle zero values for minLength and maxLength', () => {
    const attributes = {
      placeholder: 'Enter your email',
      minLength: 0,
      maxLength: 0,
    };

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minLength).toBe(0);
      expect(result.data.maxLength).toBe(0);
    }
  });

  it('should handle negative values for minLength and maxLength', () => {
    const attributes = {
      placeholder: 'Enter your email',
      minLength: -1,
      maxLength: -1,
    };

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minLength).toBe(-1);
      expect(result.data.maxLength).toBe(-1);
    }
  });

  it('should handle empty string defaultValue', () => {
    const attributes = {
      placeholder: 'Enter your email',
      defaultValue: '',
    };

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.defaultValue).toBe('');
    }
  });

  it('should handle valid email format in defaultValue', () => {
    const attributes = {
      placeholder: 'Enter your email',
      defaultValue: 'test@example.com',
    };

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.defaultValue).toBe('test@example.com');
    }
  });

  it('should handle invalid email format in defaultValue (still valid as string)', () => {
    const attributes = {
      placeholder: 'Enter your email',
      defaultValue: 'not-an-email',
    };

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.defaultValue).toBe('not-an-email');
    }
  });

  it('should handle placeholder with email format', () => {
    const attributes = {
      placeholder: 'your.email@example.com',
    };

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe('your.email@example.com');
    }
  });

  it('should handle large values for minLength and maxLength', () => {
    const attributes = {
      placeholder: 'Enter your email',
      minLength: 1000,
      maxLength: 10000,
    };

    const result = emailFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minLength).toBe(1000);
      expect(result.data.maxLength).toBe(10000);
    }
  });
});
