import { useId } from 'react';

import type { IField, ITextFieldAttributes } from '@repo/form-ui/types/form';

import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';

const FormText = (field: IField) => {
  const id = field.id ?? useId();
  const { placeholder, defaultValue } =
    field.attributes as ITextFieldAttributes;

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
