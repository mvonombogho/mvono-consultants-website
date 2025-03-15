"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DocumentView from '@/components/admin/documents/DocumentView';

export default function DocumentViewPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout title="Document Details">
      <Suspense fallback={<div className="p-8 animate-pulse">Loading document...</div>}>
        <DocumentView documentId={params.id} />
      </Suspense>
    </AdminLayout>
  );
}
