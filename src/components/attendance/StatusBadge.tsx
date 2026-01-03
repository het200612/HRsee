import { cn } from '@/lib/utils';
import { AttendanceStatus } from '@/types/attendance';

interface StatusBadgeProps {
  status: AttendanceStatus;
}

const statusLabels: Record<AttendanceStatus, string> = {
  present: 'Present',
  absent: 'Absent',
  halfday: 'Half-day',
  leave: 'Leave',
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize transition-all',
        {
          'status-present': status === 'present',
          'status-absent': status === 'absent',
          'status-halfday': status === 'halfday',
          'status-leave': status === 'leave',
        }
      )}
    >
      {statusLabels[status]}
    </span>
  );
};
