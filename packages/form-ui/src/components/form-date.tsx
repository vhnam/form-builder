'use client';

import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import DatePicker from '@repo/core-ui/components/date-picker';
import { Label } from '@repo/core-ui/components/label';

const FormDate = (field: IField) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <DatePicker id={id} placeholder={field.placeholder} />
    </div>
  );
};

export default FormDate;
