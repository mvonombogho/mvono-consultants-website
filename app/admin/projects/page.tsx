"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectsList from '@/components/admin/projects/ProjectsList';

export default function ProjectsPage() {
  return (
    <AdminLayout title="Projects">
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsList />
      </Suspense>
    </AdminLayout>
  );
}
