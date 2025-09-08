import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';

const FormText = (field: IField) => {
  const id = useId();

  return (
    <div className="grid w-full items-center gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <Input type="text" id={id} />
    </div>
  );
};

export default FormText;
