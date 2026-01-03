import { useState } from 'react';
import { AttendanceRecord, AttendanceStatus } from '@/types/attendance';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, LogOut, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onUpdateRecord: (id: string, updates: Partial<AttendanceRecord>) => void;
}

export const AttendanceTable = ({ records, onUpdateRecord }: AttendanceTableProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleCheckIn = (record: AttendanceRecord) => {
    const now = format(new Date(), 'HH:mm');
    onUpdateRecord(record.id, { 
      checkIn: now, 
      status: 'present' 
    });
  };

  const handleCheckOut = (record: AttendanceRecord) => {
    const now = format(new Date(), 'HH:mm');
    onUpdateRecord(record.id, { checkOut: now });
  };

  const handleStatusChange = (record: AttendanceRecord, status: AttendanceStatus) => {
    onUpdateRecord(record.id, { status });
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Employee</TableHead>
            <TableHead className="font-semibold">Department</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Check In</TableHead>
            <TableHead className="font-semibold">Check Out</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, index) => (
            <TableRow 
              key={record.id} 
              className="table-row-hover"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {getInitials(record.employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{record.employee.name}</p>
                    <p className="text-sm text-muted-foreground">{record.employee.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{record.employee.department}</span>
              </TableCell>
              <TableCell>
                <Select
                  value={record.status}
                  onValueChange={(value: AttendanceStatus) => handleStatusChange(record, value)}
                >
                  <SelectTrigger className="w-32 h-8 border-0 bg-transparent p-0 focus:ring-0">
                    <StatusBadge status={record.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="halfday">Half-day</SelectItem>
                    <SelectItem value="leave">Leave</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {record.checkIn ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-status-present" />
                    <span>{record.checkIn}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                {record.checkOut ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-status-absent" />
                    <span>{record.checkOut}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {!record.checkIn && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-status-present border-status-present/30 hover:bg-status-present-bg"
                      onClick={() => handleCheckIn(record)}
                    >
                      <LogIn className="h-3.5 w-3.5" />
                      Check In
                    </Button>
                  )}
                  {record.checkIn && !record.checkOut && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-status-absent border-status-absent/30 hover:bg-status-absent-bg"
                      onClick={() => handleCheckOut(record)}
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Check Out
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
