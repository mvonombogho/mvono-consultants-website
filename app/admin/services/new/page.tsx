"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ServiceForm from '@/components/admin/services/ServiceForm';

export default function NewServicePage() {
  return (
    <AdminLayout title="Add New Service">
      <ServiceForm />
    </AdminLayout>
  );
}
