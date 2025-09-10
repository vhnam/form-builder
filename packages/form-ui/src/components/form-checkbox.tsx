import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import {
  type ICheckboxAttributes,
  checkboxFieldAttributesSchema,
} from '@repo/form-ui/schemas/checkbox';

import { getFieldAttributes } from '@repo/form-ui/utils/field';

import { Checkbox } from '@repo/core-ui/components/checkbox';
import { Label } from '@repo/core-ui/components/label';

const FormCheckbox = (field: IField) => {
  const id = useId();
  const attributes = getFieldAttributes<ICheckboxAttributes>(
    checkboxFieldAttributesSchema,
    field
  );

  if (!attributes) {
    return null;
  }

  const { options } = attributes.data;

  return (
    <div className="grid w-full gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      {options.split(',').map((option) => (
        <div key={option} className="flex items-center gap-2">
          <Checkbox id={id} />
          <Label className="text-sm font-medium" htmlFor={id}>
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FormCheckbox;
