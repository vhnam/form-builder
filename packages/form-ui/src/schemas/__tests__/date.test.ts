import { describe, expect, it } from 'vitest';

import { type IDateAttributes, dateFieldAttributesSchema } from '../date';

describe('dateFieldAttributesSchema', () => {
  it('should validate valid date field attributes', () => {
    const validAttributes = {
      placeholder: 'Select a date',
      defaultValue: Date.now(),
      dateFormat: 'YYYY-MM-DD',
      beforeDate: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
      afterDate: Date.now() - 365 * 24 * 60 * 60 * 1000, // 1 year ago
      mode: 'single' as const,
    };

    const result = dateFieldAttributesSchema.safeParse(validAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validAttributes);
    }
  });

  it('should validate attributes with only required fields', () => {
    const minimalAttributes = {
      placeholder: 'Select a date',
    };

    const result = dateFieldAttributesSchema.safeParse(minimalAttributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(minimalAttributes);
    }
  });

  it('should validate attributes without placeholder', () => {
    const attributes = {
      defaultValue: Date.now(),
      dateFormat: 'YYYY-MM-DD',
    };

    const result = dateFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(attributes);
    }
  });

  it('should reject invalid defaultValue type', () => {
    const invalidAttributes = {
      placeholder: 'Select a date',
      defaultValue: 'invalid',
    };

    const result = dateFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['defaultValue']);
    }
  });

  it('should reject invalid dateFormat type', () => {
    const invalidAttributes = {
      placeholder: 'Select a date',
      dateFormat: 123,
    };

    const result = dateFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['dateFormat']);
    }
  });

  it('should reject invalid beforeDate type', () => {
    const invalidAttributes = {
      placeholder: 'Select a date',
      beforeDate: 'invalid',
    };

    const result = dateFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['beforeDate']);
    }
  });

  it('should reject invalid afterDate type', () => {
    const invalidAttributes = {
      placeholder: 'Select a date',
      afterDate: 'invalid',
    };

    const result = dateFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['afterDate']);
    }
  });

  it('should reject invalid mode value', () => {
    const invalidAttributes = {
      placeholder: 'Select a date',
      mode: 'invalid',
    };

    const result = dateFieldAttributesSchema.safeParse(invalidAttributes);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].path).toEqual(['mode']);
    }
  });

  it('should accept all valid mode values', () => {
    const modes = ['single', 'multiple', 'range'] as const;

    modes.forEach((mode) => {
      const attributes = {
        placeholder: 'Select a date',
        mode,
      };

      const result = dateFieldAttributesSchema.safeParse(attributes);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.mode).toBe(mode);
      }
    });
  });

  it('should handle zero timestamp values', () => {
    const attributes = {
      placeholder: 'Select a date',
      defaultValue: 0,
      beforeDate: 0,
      afterDate: 0,
    };

    const result = dateFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.defaultValue).toBe(0);
      expect(result.data.beforeDate).toBe(0);
      expect(result.data.afterDate).toBe(0);
    }
  });

  it('should handle negative timestamp values', () => {
    const attributes = {
      placeholder: 'Select a date',
      defaultValue: -1000,
      beforeDate: -2000,
      afterDate: -3000,
    };

    const result = dateFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.defaultValue).toBe(-1000);
      expect(result.data.beforeDate).toBe(-2000);
      expect(result.data.afterDate).toBe(-3000);
    }
  });

  it('should handle empty string placeholder', () => {
    const attributes = {
      placeholder: '',
    };

    const result = dateFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.placeholder).toBe('');
    }
  });

  it('should handle empty string dateFormat', () => {
    const attributes = {
      placeholder: 'Select a date',
      dateFormat: '',
    };

    const result = dateFieldAttributesSchema.safeParse(attributes);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.dateFormat).toBe('');
    }
  });
});
