import { describe, expect, it } from 'vitest';

import {
  type ITextareaAttributes,
  textareaFieldAttributesSchema,
} from '../textarea';

describe('textareaFieldAttributesSchema', () => {
  it('should validate valid textarea field attributes', () => {
    const validAttributes = {
      placeholder: 'Enter your message',
      minLength: 10,
      maxLength: 1000,
      defaultValue: 'Default message',
      rows: 4,
    };

    const result = textareaFieldAttributesSchema.safeParse(validAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validAttributes);
    }
  });

  it('should validate attributes with only required fields', () => {
    const minimalAttributes = {
      placeholder: 'Enter your message',
    };

    const result = textareaFieldAttributesSchema.safeParse(minimalAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(minimalAttributes);
    }
  });

  it('should validate attributes without placeholder', () => {
    const attributes = {
      minLength: 10,
      maxLength: 1000,
      defaultValue: 'Default message',
      rows: 4,
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(attributes);
    }
  });

  it('should reject invalid minLength type', () => {
    const invalidAttributes = {
      placeholder: 'Enter your message',
      minLength: 'invalid',
    };

    const result = textareaFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['minLength']);
    }
  });

  it('should reject invalid maxLength type', () => {
    const invalidAttributes = {
      placeholder: 'Enter your message',
      maxLength: 'invalid',
    };

    const result = textareaFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['maxLength']);
    }
  });

  it('should reject invalid defaultValue type', () => {
    const invalidAttributes = {
      placeholder: 'Enter your message',
      defaultValue: 123,
    };

    const result = textareaFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['defaultValue']);
    }
  });

  it('should reject invalid rows type', () => {
    const invalidAttributes = {
      placeholder: 'Enter your message',
      rows: 'invalid',
    };

    const result = textareaFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['rows']);
    }
  });

  it('should handle empty string placeholder', () => {
    const attributes = {
      placeholder: '',
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe('');
    }
  });

  it('should handle zero values for minLength, maxLength, and rows', () => {
    const attributes = {
      placeholder: 'Enter your message',
      minLength: 0,
      maxLength: 0,
      rows: 0,
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minLength).toBe(0);
      expect(result.data.maxLength).toBe(0);
      expect(result.data.rows).toBe(0);
    }
  });

  it('should handle negative values for minLength, maxLength, and rows', () => {
    const attributes = {
      placeholder: 'Enter your message',
      minLength: -1,
      maxLength: -1,
      rows: -1,
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minLength).toBe(-1);
      expect(result.data.maxLength).toBe(-1);
      expect(result.data.rows).toBe(-1);
    }
  });

  it('should handle empty string defaultValue', () => {
    const attributes = {
      placeholder: 'Enter your message',
      defaultValue: '',
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.defaultValue).toBe('');
    }
  });

  it('should handle large values for minLength, maxLength, and rows', () => {
    const attributes = {
      placeholder: 'Enter your message',
      minLength: 1000,
      maxLength: 10000,
      rows: 100,
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minLength).toBe(1000);
      expect(result.data.maxLength).toBe(10000);
      expect(result.data.rows).toBe(100);
    }
  });

  it('should handle multiline placeholder', () => {
    const attributes = {
      placeholder: 'Enter your message\nThis is a multiline placeholder',
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe(
        'Enter your message\nThis is a multiline placeholder'
      );
    }
  });

  it('should handle multiline defaultValue', () => {
    const attributes = {
      placeholder: 'Enter your message',
      defaultValue: 'Line 1\nLine 2\nLine 3',
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.defaultValue).toBe('Line 1\nLine 2\nLine 3');
    }
  });

  it('should handle special characters in placeholder and defaultValue', () => {
    const attributes = {
      placeholder: 'Enter your message (minimum 10 characters)',
      defaultValue: 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe(
        'Enter your message (minimum 10 characters)'
      );
      expect(result.data.defaultValue).toBe(
        'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?'
      );
    }
  });

  it('should handle fractional values for rows', () => {
    const attributes = {
      placeholder: 'Enter your message',
      rows: 4.5,
    };

    const result = textareaFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rows).toBe(4.5);
    }
  });
});
