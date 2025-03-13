"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FinancialReports from '@/components/admin/finance/FinancialReports';

export default function FinancialReportsPage() {
  return (
    <AdminLayout title="Financial Reports">
      <Suspense fallback={<div>Loading financial reports...</div>}>
        <FinancialReports />
      </Suspense>
    </AdminLayout>
  );
}
