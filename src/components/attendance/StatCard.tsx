import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: 'present' | 'absent' | 'halfday' | 'leave' | 'total';
}

const variantStyles = {
  present: 'border-l-4 border-l-status-present',
  absent: 'border-l-4 border-l-status-absent',
  halfday: 'border-l-4 border-l-status-halfday',
  leave: 'border-l-4 border-l-status-leave',
  total: 'border-l-4 border-l-primary',
};

const iconStyles = {
  present: 'text-status-present bg-status-present-bg',
  absent: 'text-status-absent bg-status-absent-bg',
  halfday: 'text-status-halfday bg-status-halfday-bg',
  leave: 'text-status-leave bg-status-leave-bg',
  total: 'text-primary bg-primary/10',
};

export const StatCard = ({ title, value, icon: Icon, variant }: StatCardProps) => {
  return (
    <div className={cn('stat-card animate-fade-in', variantStyles[variant])}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn('rounded-xl p-3', iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
