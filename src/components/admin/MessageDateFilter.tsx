
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
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
  const handleReset = () => {
    onDateRangeChange({ from: undefined, to: undefined });
  };

  const hasDateRange = dateRange.from || dateRange.to;

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(dateRange.from, "dd/MM/yyyy")
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
      {hasDateRange && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleReset}
          title="Réinitialiser le filtre"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
