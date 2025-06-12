import React from 'react';
import { Metadata } from 'next';
import { FinancialDashboard } from '@/components/admin/analytics/FinancialDashboard';

export const metadata: Metadata = {
  title: 'Financial Analytics | Mvono Consultants',
  description: 'Financial analytics and reporting dashboard for Mvono Consultants',
};

export default function FinancialAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Financial Analytics</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <FinancialDashboard />
      </div>
    </div>
  );
}
