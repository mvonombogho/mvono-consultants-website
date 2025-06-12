"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import PaymentTracker from '@/components/admin/finance/PaymentTracker';

export default function PaymentsPage() {
  return (
    <AdminLayout title="Payments Tracker">
      <Suspense fallback={<div>Loading payments...</div>}>
        <PaymentTracker />
      </Suspense>
    </AdminLayout>
  );
}
