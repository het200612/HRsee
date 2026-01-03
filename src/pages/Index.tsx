import { useState, useMemo } from 'react';
import { AttendanceHeader } from '@/components/attendance/AttendanceHeader';
import { StatCard } from '@/components/attendance/StatCard';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';
import { WeeklyView } from '@/components/attendance/WeeklyView';
import { getTodayRecords, getWeekRecords } from '@/data/mockAttendance';
import { AttendanceRecord, AttendanceStats } from '@/types/attendance';
import { Users, UserCheck, UserX, Clock, CalendarOff } from 'lucide-react';

const Index = () => {
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyRecords, setDailyRecords] = useState<AttendanceRecord[]>(getTodayRecords);
  const [weeklyRecords] = useState<AttendanceRecord[]>(getWeekRecords);

  const stats: AttendanceStats = useMemo(() => {
    const records = view === 'daily' ? dailyRecords : weeklyRecords;
    const todayRecords = view === 'weekly' 
      ? records.filter(r => r.date === new Date().toISOString().split('T')[0])
      : records;
    
    return {
      present: todayRecords.filter((r) => r.status === 'present').length,
      absent: todayRecords.filter((r) => r.status === 'absent').length,
      halfday: todayRecords.filter((r) => r.status === 'halfday').length,
      leave: todayRecords.filter((r) => r.status === 'leave').length,
      total: todayRecords.length,
    };
  }, [dailyRecords, weeklyRecords, view]);

  const filteredDailyRecords = useMemo(() => {
    if (!searchQuery) return dailyRecords;
    const query = searchQuery.toLowerCase();
    return dailyRecords.filter(
      (record) =>
        record.employee.name.toLowerCase().includes(query) ||
        record.employee.email.toLowerCase().includes(query) ||
        record.employee.department.toLowerCase().includes(query)
    );
  }, [dailyRecords, searchQuery]);

  const filteredWeeklyRecords = useMemo(() => {
    if (!searchQuery) return weeklyRecords;
    const query = searchQuery.toLowerCase();
    return weeklyRecords.filter(
      (record) =>
        record.employee.name.toLowerCase().includes(query) ||
        record.employee.email.toLowerCase().includes(query) ||
        record.employee.department.toLowerCase().includes(query)
    );
  }, [weeklyRecords, searchQuery]);

  const handleUpdateRecord = (id: string, updates: Partial<AttendanceRecord>) => {
    setDailyRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, ...updates } : record
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AttendanceHeader
          view={view}
          onViewChange={setView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Stats Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Total Employees" value={stats.total} icon={Users} variant="total" />
          <StatCard title="Present" value={stats.present} icon={UserCheck} variant="present" />
          <StatCard title="Absent" value={stats.absent} icon={UserX} variant="absent" />
          <StatCard title="Half-day" value={stats.halfday} icon={Clock} variant="halfday" />
          <StatCard title="On Leave" value={stats.leave} icon={CalendarOff} variant="leave" />
        </div>

        {/* Attendance Table/View */}
        <div className="mt-8">
          {view === 'daily' ? (
            <AttendanceTable records={filteredDailyRecords} onUpdateRecord={handleUpdateRecord} />
          ) : (
            <WeeklyView records={filteredWeeklyRecords} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
