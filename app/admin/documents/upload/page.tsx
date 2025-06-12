"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DocumentUpload from '@/components/admin/documents/DocumentUpload';

export default function DocumentUploadPage() {
  return (
    <AdminLayout title="Upload Document">
      <Suspense fallback={<div className="p-8 animate-pulse">Loading upload form...</div>}>
        <DocumentUpload />
      </Suspense>
    </AdminLayout>
  );
}
