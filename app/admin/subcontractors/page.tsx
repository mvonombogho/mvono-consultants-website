"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SubcontractorsList from '@/components/admin/subcontractors/SubcontractorsList';

export default function SubcontractorsPage() {
  return (
    <AdminLayout title="Subcontractors">
      <Suspense fallback={<div>Loading subcontractors...</div>}>
        <SubcontractorsList />
      </Suspense>
    </AdminLayout>
  );
}
