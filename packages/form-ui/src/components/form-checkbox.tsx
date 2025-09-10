import { useCallback, useId } from 'react';

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

  const renderCheckboxOption = useCallback(
    (option: string) => {
      const optionId = `${id}-${option}`;
      return (
        <div key={option} className="flex items-center gap-2" id={id}>
          <Checkbox id={optionId} />
          <Label className="text-sm font-medium" htmlFor={optionId}>
            {option}
          </Label>
        </div>
      );
    },
    [id]
  );

  return (
    <div className="grid w-full gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      {options.split(',').map((option) => renderCheckboxOption(option))}
    </div>
  );
};

export default FormCheckbox;
