import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import {
  type IEmailAttributes,
  emailFieldAttributesSchema,
} from '@repo/form-ui/schemas/email';

import { getFieldAttributes } from '@repo/form-ui/utils/field';

import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';

const FormEmail = (field: IField) => {
  const id = field.id ?? useId();
  const attributes = getFieldAttributes<IEmailAttributes>(
    emailFieldAttributesSchema,
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
        type="email"
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormEmail;
