"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/projects/ProjectForm';

export default function NewProjectPage() {
  return (
    <AdminLayout title="Create New Project">
      <ProjectForm />
    </AdminLayout>
  );
}
