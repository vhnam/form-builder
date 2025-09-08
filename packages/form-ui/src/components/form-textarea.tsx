import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import { Label } from '@repo/core-ui/components/label';
import { Textarea } from '@repo/core-ui/components/textarea';

const FormTextarea = (field: IField) => {
  const id = useId();

  return (
    <div className="grid w-full gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <Textarea id={id} />
    </div>
  );
};

export default FormTextarea;
