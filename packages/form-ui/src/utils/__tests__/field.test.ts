import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import type { IField, IFieldAttributes } from '@repo/form-ui/types/form';

import { getFieldAttributes } from '../field';

// Mock schemas for testing
const testSchema = z.object({
  placeholder: z.string(),
  defaultValue: z.string().optional(),
  minLength: z.number().optional(),
});

type TestAttributes = z.infer<typeof testSchema>;

describe('getFieldAttributes', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should return parsed attributes for valid data', () => {
    const field: IField<IFieldAttributes> = {
      id: 'test-field',
      sectionId: 'test-section',
      type: 'text',
      label: 'Test Field',
      required: true,
      order: 1,
      attributes: {
        placeholder: 'Enter text',
        defaultValue: 'default',
        minLength: 5,
      },
    };

    const result = getFieldAttributes<TestAttributes>(testSchema, field);

    expect(result).toBeTruthy();
    expect(result?.success).toBe(true);
    expect(result?.data).toEqual({
      placeholder: 'Enter text',
      defaultValue: 'default',
      minLength: 5,
    });
  });

  it('should return null and log warning for invalid data', () => {
    const field: IField<IFieldAttributes> = {
      id: 'test-field',
      sectionId: 'test-section',
      type: 'text',
      label: 'Test Field',
      required: true,
      order: 1,
      attributes: {
        // Missing required placeholder
        defaultValue: 'default',
        minLength: 'invalid', // Wrong type
      } as any,
    };

    const result = getFieldAttributes<TestAttributes>(testSchema, field);

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Invalid attributes provided',
      expect.objectContaining({
        attributes: field.attributes,
        errors: expect.any(Object),
      })
    );
  });

  it('should handle missing attributes gracefully', () => {
    const field: IField<IFieldAttributes> = {
      id: 'test-field',
      sectionId: 'test-section',
      type: 'text',
      label: 'Test Field',
      required: true,
      order: 1,
      attributes: {} as any,
    };

    const result = getFieldAttributes<TestAttributes>(testSchema, field);

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it('should handle null attributes', () => {
    const field: IField<IFieldAttributes> = {
      id: 'test-field',
      sectionId: 'test-section',
      type: 'text',
      label: 'Test Field',
      required: true,
      order: 1,
      attributes: null as any,
    };

    const result = getFieldAttributes<TestAttributes>(testSchema, field);

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it('should handle undefined attributes', () => {
    const field: IField<IFieldAttributes> = {
      id: 'test-field',
      sectionId: 'test-section',
      type: 'text',
      label: 'Test Field',
      required: true,
      order: 1,
      attributes: undefined as any,
    };

    const result = getFieldAttributes<TestAttributes>(testSchema, field);

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it('should work with optional fields', () => {
    const field: IField<IFieldAttributes> = {
      id: 'test-field',
      sectionId: 'test-section',
      type: 'text',
      label: 'Test Field',
      required: true,
      order: 1,
      attributes: {
        placeholder: 'Enter text',
        // Optional fields can be omitted
      },
    };

    const result = getFieldAttributes<TestAttributes>(testSchema, field);

    expect(result).toBeTruthy();
    expect(result?.success).toBe(true);
    expect(result?.data).toEqual({
      placeholder: 'Enter text',
      defaultValue: undefined,
      minLength: undefined,
    });
  });
});
