'use client';

import { useId } from 'react';

import { IDateAttributes, type IField } from '@repo/form-ui/types/form';

import DatePicker from '@repo/core-ui/components/date-picker';
import { Label } from '@repo/core-ui/components/label';

const FormDate = (field: IField) => {
  const id = field.id ?? useId();
  const {
    placeholder,
    defaultValue,
    dateFormat,
    beforeDate,
    afterDate,
    mode = 'single',
  } = field.attributes as IDateAttributes;

  const getDisabledDates = () => {
    const disabled = [];

    if (beforeDate && afterDate) {
      disabled.push({ before: new Date(afterDate) });
      disabled.push({ after: new Date(beforeDate) });
    } else if (beforeDate) {
      disabled.push({ after: new Date(beforeDate) });
    } else if (afterDate) {
      disabled.push({ before: new Date(afterDate) });
    }

    return disabled.length > 0 ? disabled : undefined;
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <DatePicker
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue ? new Date(defaultValue) : undefined}
        disabled={getDisabledDates()}
        mode={mode}
        dateFormat={dateFormat}
      />
    </div>
  );
};

export default FormDate;
