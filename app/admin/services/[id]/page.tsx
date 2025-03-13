"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceDetail from '@/components/admin/services/ServiceDetail';

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  return (
    <AdminLayout title="Service Details">
      <Suspense fallback={<div>Loading service details...</div>}>
        <ServiceDetail id={id} />
      </Suspense>
    </AdminLayout>
  );
}
