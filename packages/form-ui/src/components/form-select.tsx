'use client';

import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import { Label } from '@repo/core-ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

const FormEmail = (field: IField) => {
  const id = useId();

  return (
    <div className="grid w-full items-center gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue id={id} placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormEmail;
