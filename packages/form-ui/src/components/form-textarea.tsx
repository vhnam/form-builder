import { useId } from 'react';

import type { IField } from '@repo/form-ui/types/form';

import {
  type ITextareaAttributes,
  textareaFieldAttributesSchema,
} from '@repo/form-ui/schemas/textarea';

import { getFieldAttributes } from '@repo/form-ui/utils/field';

import { Label } from '@repo/core-ui/components/label';
import { Textarea } from '@repo/core-ui/components/textarea';

const FormTextarea = (field: IField) => {
  const id = field.id ?? useId();
  const attributes = getFieldAttributes<ITextareaAttributes>(
    textareaFieldAttributesSchema,
    field
  );

  if (!attributes) {
    return null;
  }

  const { placeholder, defaultValue, rows } = attributes.data;

  return (
    <div className="grid w-full gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <Textarea
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};

export default FormTextarea;
