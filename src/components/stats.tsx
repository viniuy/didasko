import type React from 'react';
import {
  Book,
  Tablet,
  GraduationCap,
  Headphones,
  DoorOpenIcon,
  Clock,
  DoorClosedIcon,
} from 'lucide-react';

// Define TypeScript props interface
interface StatCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  color: string;
}

// Single StatCard component
export function StatCard({ icon, count, label, color }: StatCardProps) {
  return (
    <div className='bg-white shadow-lg rounded-xl p-6 flex flex-col items-center'>
      {/* Icon with Background */}
      <div className='p-3 rounded-xl' style={{ backgroundColor: `${color}20` }}>
        {icon}
      </div>
      {/* Label */}
      <p className='text-gray-500 text-lg mt-2'>{label}</p>
      {/* Count */}
      <p className='text-4xl font-bold text-blue-900'>{count}</p>
      {/* Underline */}
      <div
        className='w-8 h-1 mt-2 rounded-full'
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}

// StatsGrid component
export default function StatsGrid() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 mb-20'>
      <StatCard
        icon={<Book size={32} color='#374151' />}
        count={5}
        label='Courses'
        color='#374151'
      />
      <StatCard
        icon={<DoorClosedIcon size={32} color='#374151' />}
        count={7}
        label='Classes'
        color='#374151'
      />
      <StatCard
        icon={<GraduationCap size={32} color='#374151' />}
        count={120}
        label='Students'
        color='#374151'
      />
      <StatCard
        icon={<Clock size={32} color='#374151' />}
        count={1}
        label='Pending'
        color='#374151'
      />
    </div>
  );
}
