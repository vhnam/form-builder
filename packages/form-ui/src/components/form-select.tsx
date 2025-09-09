'use client';

import { useId } from 'react';

import type { IField, ISelectAttributes } from '@repo/form-ui/types/form';

import { Label } from '@repo/core-ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

const FormSelect = (field: IField) => {
  const id = field.id ?? useId();
  const { options, placeholder, defaultValue } =
    field.attributes as ISelectAttributes;

  return (
    <div className="grid w-full items-center gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue id={id} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;
