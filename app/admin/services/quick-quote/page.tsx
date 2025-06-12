"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import QuickQuote from '@/components/admin/services/QuickQuote';

export default function QuickQuotePage() {
  return (
    <AdminLayout title="Quick Quote Generator">
      <Suspense fallback={<div>Loading Quick Quote Generator...</div>}>
        <QuickQuote />
      </Suspense>
    </AdminLayout>
  );
}
