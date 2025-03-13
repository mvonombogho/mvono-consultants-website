"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceCatalog from '@/components/admin/services/ServiceCatalog';

export default function ServicesPage() {
  return (
    <AdminLayout title="Service Catalog">
      <Suspense fallback={<div>Loading service catalog...</div>}>
        <ServiceCatalog />
      </Suspense>
    </AdminLayout>
  );
}
