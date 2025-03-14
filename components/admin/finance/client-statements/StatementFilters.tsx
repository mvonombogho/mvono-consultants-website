import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type StatementFiltersProps = {
  showFilters: boolean;
  statusFilter: string; 
  setStatusFilter: (value: string) => void;
  periodFilter: string;
  setPeriodFilter: (value: string) => void;
};

export const StatementFilters = ({
  showFilters,
  statusFilter,
  setStatusFilter,
  periodFilter,
  setPeriodFilter,
}: StatementFiltersProps) => {
  const filtersRef = useRef<HTMLDivElement>(null);

  // Animation for filters
  useEffect(() => {
    if (filtersRef.current) {
      if (showFilters) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: 'auto', duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(
          filtersRef.current,
          { opacity: 0, height: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [showFilters]);

  return (
    <div ref={filtersRef} className="overflow-hidden h-0 opacity-0">
      <div className="bg-background rounded-lg border p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="allPaid">Fully Paid</SelectItem>
              <SelectItem value="partiallyPaid">Partially Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Period</label>
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Time</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="lastQuarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end col-span-1 sm:col-span-2 gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setStatusFilter('');
              setPeriodFilter('');
            }}
            className="flex-1 gap-1 text-sm"
          >
            <RefreshCcw className="h-3.5 w-3.5" /> Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
