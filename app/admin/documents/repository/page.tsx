import React from 'react';
import { Metadata } from 'next';
import { DocumentRepository } from '@/components/admin/documents/DocumentRepository';

export const metadata: Metadata = {
  title: 'Document Repository | Mvono Consultants',
  description: 'Centralized document storage and management system',
};

export default function DocumentRepositoryPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Document Repository</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <DocumentRepository />
      </div>
    </div>
  );
}
