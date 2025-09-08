import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import { Checkbox } from '@repo/core-ui/components/checkbox';
import { Label } from '@repo/core-ui/components/label';

const FormCheckbox = (field: IField) => {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
    </div>
  );
};

export default FormCheckbox;
