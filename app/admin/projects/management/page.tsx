"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectManagement from '@/components/admin/projects/ProjectManagement';

export default function ProjectManagementPage() {
  return (
    <AdminLayout title="Project Management">
      <Suspense fallback={<div className="p-8 animate-pulse">Loading project management tools...</div>}>
        <ProjectManagement />
      </Suspense>
    </AdminLayout>
  );
}
