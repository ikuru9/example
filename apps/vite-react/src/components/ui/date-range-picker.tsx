"use client";

import * as React from "react";
import { CalendarIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverPositioner,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/format";

type DateRangePickerProps = {
  from?: Date | null;
  to?: Date | null;
  onChangeFrom?: (date: Date | null) => void;
  onChangeTo?: (date: Date | null) => void;
  onChange?: (range: { from?: Date | null; to?: Date | null } | null) => void;
  disabled?: boolean;
  min?: Date;
  max?: Date;
  placeholder?: { from?: string; to?: string };
};

function DateRangePicker({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onChange,
  disabled = false,
  min,
  max,
  placeholder,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [fromInput, setFromInput] = React.useState(formatDate(from));
  const [toInput, setToInput] = React.useState(formatDate(to));

  React.useEffect(() => {
    setFromInput(formatDate(from));
  }, [from]);

  React.useEffect(() => {
    setToInput(formatDate(to));
  }, [to]);

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    const newFrom = range?.from ?? null;
    const newTo = range?.to ?? null;
    onChangeFrom?.(newFrom);
    onChangeTo?.(newTo);
    onChange?.({ from: newFrom, to: newTo });
  };

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFromInput(newValue);

    const parsedDate = new Date(newValue);
    if (!isNaN(parsedDate.getTime())) {
      if ((!min || parsedDate >= min) && (!max || parsedDate <= max) && (!to || parsedDate <= to)) {
        onChangeFrom?.(parsedDate);
        onChange?.({ from: parsedDate, to });
      }
    } else if (newValue === "") {
      onChangeFrom?.(null);
      onChange?.({ from: null, to });
    }
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setToInput(newValue);

    const parsedDate = new Date(newValue);
    if (!isNaN(parsedDate.getTime())) {
      if (
        (!min || parsedDate >= min) &&
        (!max || parsedDate <= max) &&
        (!from || parsedDate >= from)
      ) {
        onChangeTo?.(parsedDate);
        onChange?.({ from, to: parsedDate });
      }
    } else if (newValue === "") {
      onChangeTo?.(null);
      onChange?.({ from, to: null });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            "relative w-full flex items-center gap-2",
            disabled && "pointer-events-none opacity-50",
          )}
        >
          <div className="relative flex-1">
            <Input
              type="text"
              value={fromInput}
              onChange={handleFromInputChange}
              placeholder={placeholder?.from}
              disabled={disabled}
              mask="datetime"
              maskOptions={{ inputFormat: "yyyy-mm-dd" }}
              className={cn("pr-10", !from && "text-muted-foreground")}
            />
            <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <MinusIcon className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="relative flex-1">
            <Input
              type="text"
              value={toInput}
              onChange={handleToInputChange}
              placeholder={placeholder?.to}
              disabled={disabled}
              mask="datetime"
              maskOptions={{ inputFormat: "yyyy-mm-dd" }}
              className={cn("pr-10", !to && "text-muted-foreground")}
            />
            <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={{
              from: from ?? undefined,
              to: to ?? undefined,
            }}
            onSelect={handleSelect}
            disabled={(date) => {
              if (min && date < min) return true;
              if (max && date > max) return true;
              return false;
            }}
          />
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}

export { DateRangePicker };
