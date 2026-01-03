import { AttendanceRecord, AttendanceStatus } from '@/types/attendance';
import { StatusBadge } from './StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format, addDays, startOfWeek } from 'date-fns';
import { employees } from '@/data/mockAttendance';

interface WeeklyViewProps {
  records: AttendanceRecord[];
}

export const WeeklyView = ({ records }: WeeklyViewProps) => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getRecordForDay = (employeeId: string, date: Date): AttendanceRecord | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return records.find((r) => r.employeeId === employeeId && r.date === dateStr);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-4 font-semibold text-foreground min-w-[200px]">Employee</th>
              {weekDays.map((day) => (
                <th key={day.toISOString()} className="text-center p-4 font-semibold text-foreground min-w-[120px]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">{format(day, 'EEE')}</span>
                    <span className="text-sm">{format(day, 'MMM d')}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr 
                key={employee.id} 
                className="table-row-hover border-t border-border"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">{employee.department}</p>
                    </div>
                  </div>
                </td>
                {weekDays.map((day) => {
                  const record = getRecordForDay(employee.id, day);
                  return (
                    <td key={day.toISOString()} className="p-4 text-center">
                      {record ? (
                        <div className="flex flex-col items-center gap-1">
                          <StatusBadge status={record.status} />
                          {record.checkIn && (
                            <span className="text-xs text-muted-foreground">
                              {record.checkIn} - {record.checkOut || '...'}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
