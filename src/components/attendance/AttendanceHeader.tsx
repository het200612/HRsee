import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Search, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AttendanceHeaderProps {
  view: 'daily' | 'weekly';
  onViewChange: (view: 'daily' | 'weekly') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const AttendanceHeader = ({
  view,
  onViewChange,
  searchQuery,
  onSearchChange,
}: AttendanceHeaderProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Attendance Tracking
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage and monitor employee attendance for {format(new Date(), 'MMMM yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-foreground">{format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={view} onValueChange={(v) => onViewChange(v as 'daily' | 'weekly')}>
          <TabsList className="bg-muted">
            <TabsTrigger value="daily" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
              Daily View
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
              Weekly View
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="w-full pl-9 sm:w-[280px] bg-card"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
