import React from 'react';
import { Metadata } from 'next';
import { ServiceCalendar } from '@/components/admin/schedule/ServiceCalendar';

export const metadata: Metadata = {
  title: 'Service Calendar | Mvono Consultants',
  description: 'Schedule and manage service appointments and bookings',
};

export default function ServiceCalendarPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Service Calendar</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ServiceCalendar />
      </div>
    </div>
  );
}
