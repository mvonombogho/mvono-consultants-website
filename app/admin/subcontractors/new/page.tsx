"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import SubcontractorForm from '@/components/admin/subcontractors/SubcontractorForm';

export default function NewSubcontractorPage() {
  return (
    <AdminLayout title="Add New Subcontractor">
      <SubcontractorForm />
    </AdminLayout>
  );
}
