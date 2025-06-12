"use client";

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import SegmentList from '@/components/marketing/segment/SegmentList';

export default function CustomerSegmentsPage() {
  return (
    <AdminLayout title="Customer Segments">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Customer Segments</h1>
          <Link href="/admin/marketing/segments/new">
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Segment
            </Button>
          </Link>
        </div>

        <SegmentList />
      </div>
    </AdminLayout>
  );
}
