
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface MessageDateFilterProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function MessageDateFilter({ dateRange, onDateRangeChange }: MessageDateFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          {dateRange.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "P")} - {format(dateRange.to, "P")}
              </>
            ) : (
              format(dateRange.from, "P")
            )
          ) : (
            "Sélectionner les dates"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          initialFocus
          mode="range"
          selected={{
            from: dateRange.from,
            to: dateRange.to,
          }}
          onSelect={(range: any) => onDateRangeChange(range)}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
