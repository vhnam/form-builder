'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@repo/core-ui/components/button';
import { Calendar } from '@repo/core-ui/components/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/core-ui/components/popover';

interface DatePickerProps {
  id: string;
  placeholder?: string;
}

const DatePicker = ({ id, placeholder = 'Select date' }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          className="w-full justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : placeholder}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
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
  );
};

export default DatePicker;
