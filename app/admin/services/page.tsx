"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { PlusCircle, FilePlus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceCatalog from '@/components/admin/services/ServiceCatalog';
import ServiceCategoryDisplay from '@/components/admin/services/ServiceCategoryDisplay';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  return (
    <AdminLayout title="Service Catalog">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Service Catalog Management</h1>
          <p className="text-muted-foreground">Manage your service offerings and standardize pricing</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/admin/services/quick-quote">
            <Button variant="outline" className="flex items-center gap-2">
              <FilePlus size={18} />
              Quick Quote
            </Button>
          </Link>
          <Link href="/admin/services/new">
            <Button className="flex items-center gap-2">
              <PlusCircle size={18} />
              Add Service
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Service Categories</h2>
        <Suspense fallback={<div>Loading categories...</div>}>
          <ServiceCategoryDisplay />
        </Suspense>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">All Services</h2>
        <Suspense fallback={<div>Loading service catalog...</div>}>
          <ServiceCatalog />
        </Suspense>
      </div>
    </AdminLayout>
  );
}
