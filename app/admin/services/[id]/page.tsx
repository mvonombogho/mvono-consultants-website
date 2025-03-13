"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceForm from '@/components/admin/services/ServiceForm';

interface ServicePageProps {
  params: {
    id: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  return (
    <AdminLayout title="Edit Service">
      <Suspense fallback={<div>Loading service data...</div>}>
        <ServiceForm serviceId={params.id} />
      </Suspense>
    </AdminLayout>
  );
}
