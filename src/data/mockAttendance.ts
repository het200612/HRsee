import { Employee, AttendanceRecord, AttendanceStatus } from '@/types/attendance';
import { format, subDays, addDays, startOfWeek } from 'date-fns';

export const employees: Employee[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@company.com', department: 'Engineering' },
  { id: '2', name: 'Michael Chen', email: 'michael.c@company.com', department: 'Design' },
  { id: '3', name: 'Emily Davis', email: 'emily.d@company.com', department: 'Marketing' },
  { id: '4', name: 'James Wilson', email: 'james.w@company.com', department: 'Engineering' },
  { id: '5', name: 'Olivia Brown', email: 'olivia.b@company.com', department: 'HR' },
  { id: '6', name: 'William Martinez', email: 'william.m@company.com', department: 'Finance' },
  { id: '7', name: 'Sophia Anderson', email: 'sophia.a@company.com', department: 'Engineering' },
  { id: '8', name: 'Alexander Lee', email: 'alex.l@company.com', department: 'Design' },
];

const statuses: AttendanceStatus[] = ['present', 'absent', 'halfday', 'leave'];

const generateCheckInTime = (): string => {
  const hours = 8 + Math.floor(Math.random() * 2);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const generateCheckOutTime = (): string => {
  const hours = 17 + Math.floor(Math.random() * 2);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const generateAttendanceRecords = (date: Date): AttendanceRecord[] => {
  return employees.map((employee, index) => {
    const randomStatus = statuses[Math.floor(Math.random() * 10) % 4];
    const status: AttendanceStatus = index < 5 ? 'present' : randomStatus;
    
    return {
      id: `${employee.id}-${format(date, 'yyyy-MM-dd')}`,
      employeeId: employee.id,
      employee,
      date: format(date, 'yyyy-MM-dd'),
      status,
      checkIn: status === 'present' || status === 'halfday' ? generateCheckInTime() : undefined,
      checkOut: status === 'present' ? generateCheckOutTime() : status === 'halfday' ? '13:00' : undefined,
    };
  });
};

export const generateWeeklyRecords = (weekStart: Date): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  for (let i = 0; i < 5; i++) {
    const currentDate = addDays(weekStart, i);
    records.push(...generateAttendanceRecords(currentDate));
  }
  return records;
};

export const getTodayRecords = (): AttendanceRecord[] => {
  return generateAttendanceRecords(new Date());
};

export const getWeekRecords = (): AttendanceRecord[] => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  return generateWeeklyRecords(weekStart);
};
