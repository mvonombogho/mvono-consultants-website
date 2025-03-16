import React from 'react';
import { Metadata } from 'next';
import { KPIDashboard } from '@/components/admin/analytics/KPIDashboard';

export const metadata: Metadata = {
  title: 'KPI Dashboard | Mvono Consultants',
  description: 'Key Performance Indicators dashboard for Mvono Consultants',
};

export default function KPIPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Key Performance Indicators</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <KPIDashboard />
      </div>
    </div>
  );
}
