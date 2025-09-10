import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import {
  type ITextFieldAttributes,
  textFieldAttributesSchema,
} from '@repo/form-ui/schemas/text';

import { getFieldAttributes } from '@repo/form-ui/utils/field';

import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';

const FormText = (field: IField<ITextFieldAttributes>) => {
  const id = field.id ?? useId();
  const attributes = getFieldAttributes<ITextFieldAttributes>(
    textFieldAttributesSchema,
    field
  );

  if (!attributes) {
    return null;
  }

  const { placeholder, defaultValue } = attributes.data;

  return (
    <div className="grid w-full items-center gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <Input
        type="text"
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormText;
