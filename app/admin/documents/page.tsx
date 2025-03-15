"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DocumentRepository from '@/components/admin/documents/DocumentRepository';

export default function DocumentsPage() {
  return (
    <AdminLayout title="Document Repository">
      <Suspense fallback={<div className="p-8 animate-pulse">Loading document repository...</div>}>
        <DocumentRepository />
      </Suspense>
    </AdminLayout>
  );
}
