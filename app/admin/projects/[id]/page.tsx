"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectDetail from '@/components/admin/projects/ProjectDetail';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  return (
    <AdminLayout title="Project Details">
      <Suspense fallback={<div>Loading project details...</div>}>
        <ProjectDetail id={id} />
      </Suspense>
    </AdminLayout>
  );
}
