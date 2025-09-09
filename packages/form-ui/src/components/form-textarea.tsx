import { useId } from 'react';

import type { IField, ITextareaAttributes } from '@repo/form-ui/types/form';

import { Label } from '@repo/core-ui/components/label';
import { Textarea } from '@repo/core-ui/components/textarea';

const FormTextarea = (field: IField) => {
  const id = field.id ?? useId();
  const { placeholder, defaultValue, rows } =
    field.attributes as ITextareaAttributes;

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
