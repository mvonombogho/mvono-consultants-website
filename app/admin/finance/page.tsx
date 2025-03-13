"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FinancialDashboard from '@/components/admin/finance/FinancialDashboard';

export default function FinancePage() {
  return (
    <AdminLayout title="Financial Dashboard">
      <Suspense fallback={<div>Loading financial dashboard...</div>}>
        <FinancialDashboard />
      </Suspense>
    </AdminLayout>
  );
}
