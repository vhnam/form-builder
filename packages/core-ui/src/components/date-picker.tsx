'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { type DateRange, type Matcher } from 'react-day-picker';

import { Button } from '@repo/core-ui/components/button';
import { Calendar } from '@repo/core-ui/components/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/core-ui/components/popover';
import { format } from '@repo/core-ui/lib/day';

interface DatePickerProps {
  id: string;
  placeholder?: string;
  defaultValue?: Date | Date[] | DateRange;
  disabled?: Matcher | Matcher[] | undefined;
  mode?: 'single' | 'multiple' | 'range';
  dateFormat?: string;
  onChange?: (value: number | number[] | { from?: number; to?: number } | undefined) => void;
}

const DatePicker = ({
  id,
  placeholder = 'Select date',
  defaultValue,
  disabled,
  mode = 'single',
  dateFormat,
  onChange,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const [singleDate, setSingleDate] = useState<Date | undefined>(
    mode === 'single' ? (defaultValue as Date) : undefined
  );
  const [multipleDates, setMultipleDates] = useState<Date[]>(
    mode === 'multiple' ? (defaultValue as Date[]) || [] : []
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    mode === 'range' ? (defaultValue as DateRange) : undefined
  );


  const formatDate = (date: Date) => {
    if (!dateFormat) return date.toLocaleDateString();
    
    try {
      return format(date, dateFormat);
    } catch {
      return date.toLocaleDateString();
    }
  };

  const getDisplayText = () => {
    switch (mode) {
      case 'single':
        return singleDate ? formatDate(singleDate) : placeholder;
      case 'multiple':
        if (multipleDates.length === 0) return placeholder;
        if (multipleDates.length === 1)
          return multipleDates[0] ? formatDate(multipleDates[0]) : placeholder;
        return `${multipleDates.length} dates selected`;
      case 'range':
        if (!dateRange?.from) return placeholder;
        if (!dateRange.to) return formatDate(dateRange.from);
        return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
      default:
        return singleDate ? formatDate(singleDate) : placeholder;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          className="w-full justify-between font-normal"
        >
          {getDisplayText()}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        {mode === 'single' && (
          <Calendar
            mode="single"
            selected={singleDate}
            disabled={disabled}
            captionLayout="dropdown"
            onSelect={(selected) => {
              setSingleDate(selected);
              onChange?.(selected ? selected.getTime() : undefined);
              setOpen(false);
            }}
          />
        )}
        {mode === 'multiple' && (
          <Calendar
            mode="multiple"
            selected={multipleDates}
            disabled={disabled}
            captionLayout="dropdown"
            onSelect={(selected) => {
              const dates = selected || [];
              setMultipleDates(dates);
              onChange?.(dates.map(date => date.getTime()));
              setOpen(false);
            }}
          />
        )}
        {mode === 'range' && (
          <Calendar
            mode="range"
            selected={dateRange}
            disabled={disabled}
            captionLayout="dropdown"
            onSelect={(selected) => {
              setDateRange(selected);
              onChange?.(selected ? {
                from: selected.from?.getTime(),
                to: selected.to?.getTime(),
              } : undefined);
              setOpen(false);
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
