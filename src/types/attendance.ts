export type AttendanceStatus = 'present' | 'absent' | 'halfday' | 'leave';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employee: Employee;
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  notes?: string;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  halfday: number;
  leave: number;
  total: number;
}
