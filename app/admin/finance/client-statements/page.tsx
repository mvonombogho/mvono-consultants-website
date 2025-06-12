"use client";

import { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ClientStatements from '@/components/admin/finance/ClientStatements';

export default function ClientStatementsPage() {
  return (
    <AdminLayout title="Client Statements">
      <Suspense fallback={<div>Loading client statements...</div>}>
        <ClientStatements />
      </Suspense>
    </AdminLayout>
  );
}
