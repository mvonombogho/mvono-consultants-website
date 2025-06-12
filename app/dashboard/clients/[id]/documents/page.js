'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DocumentList from '@/components/documents/DocumentList';
import FileUploadForm from '@/components/documents/FileUploadForm';
import { PlusCircle, Upload, Files } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { toast } from '@/components/ui/use-toast';

export default function ClientDocumentsPage() {
  const params = useParams();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`/api/clients/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client');
        }
        const data = await response.json();
        setClient(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to load client details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchClient();
    }
  }, [params.id]);

  const handleDocumentUploaded = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab('all');
  };

  if (loading) {
    return <div className="p-6 text-center">Loading client information...</div>;
  }

  if (!client) {
    return <div className="p-6 text-center">Client not found</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/clients">Clients</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/clients/${params.id}`}>{client.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Documents</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{client.name} - Documents</h1>
        <p className="text-muted-foreground mt-2">
          Manage documents for this client
        </p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-6">
          <DocumentList clientId={params.id} refreshTrigger={refreshTrigger} />
        </TabsContent>

        <TabsContent value="upload" className="max-w-2xl mx-auto">
          <FileUploadForm 
            clientId={params.id}
            onSuccess={handleDocumentUploaded} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
