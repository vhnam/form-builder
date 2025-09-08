'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import { Calendar } from '@repo/core-ui/components/calendar';
import { Label } from '@repo/core-ui/components/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/core-ui/components/popover';

const FormDate = (field: IField) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            id={id}
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FormDate;
