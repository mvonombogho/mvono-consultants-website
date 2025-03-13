"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SubcontractorDetail from '@/components/admin/subcontractors/SubcontractorDetail';

export default function SubcontractorDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  return (
    <AdminLayout title="Subcontractor Details">
      <Suspense fallback={<div>Loading subcontractor details...</div>}>
        <SubcontractorDetail id={id} />
      </Suspense>
    </AdminLayout>
  );
}
