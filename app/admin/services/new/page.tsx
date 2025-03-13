"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceForm from '@/components/admin/services/ServiceForm';

export default function NewServicePage() {
  return (
    <AdminLayout title="Add New Service">
      <Suspense fallback={<div>Loading form...</div>}>
        <ServiceForm />
      </Suspense>
    </AdminLayout>
  );
}
