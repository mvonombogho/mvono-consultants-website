import React from 'react';
import { Metadata } from 'next';
import { ResourceAllocation } from '@/components/admin/schedule/ResourceAllocation';

export const metadata: Metadata = {
  title: 'Resource Allocation | Mvono Consultants',
  description: 'Manage personnel and resource allocation for services',
};

export default function ResourcesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Resource Allocation</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ResourceAllocation />
      </div>
    </div>
  );
}
