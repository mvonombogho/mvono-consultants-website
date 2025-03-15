"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Search, Filter, FileText, AlertTriangle, Check } from 'lucide-react';

type Certification = {
  id: string;
  title: string;
  certType: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  client: {
    name: string;
  };
  document?: {
    id: string;
    title: string;
  } | null;
};

type CertificationListProps = {
  certifications: Certification[];
  isLoading: boolean;
  onCertificationClick: (certification: Certification) => void;
};

export default function CertificationList({ certifications, isLoading, onCertificationClick }: CertificationListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  
  // Extract unique values for filters
  const allStatuses = [...new Set(certifications.map(cert => cert.status))];
  const allTypes = [...new Set(certifications.map(cert => cert.certType))];
  
  // Apply filters
  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = (
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
    );
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(cert.status);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(cert.certType);
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>;
      case 'renewal-pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Renewal Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter([]);
    setTypeFilter([]);
  };
  
  if (isLoading) {
    return <div className="space-y-4">
      {[1, 2, 3, 4].map(i => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>;
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'renewal-pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search certifications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {allStatuses.map(status => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, status]);
                    } else {
                      setStatusFilter(statusFilter.filter(s => s !== status));
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <span className="capitalize">{status.replace('-', ' ')}</span>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {allTypes.map(type => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={typeFilter.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTypeFilter([...typeFilter, type]);
                    } else {
                      setTypeFilter(typeFilter.filter(t => t !== type));
                    }
                  }}
                >
                  <span className="capitalize">{type}</span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(searchTerm || statusFilter.length > 0 || typeFilter.length > 0) && (
            <Button variant="ghost" onClick={resetFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {filteredCertifications.length > 0 ? (
        <div className="space-y-3">
          {filteredCertifications.map(certification => (
            <Card key={certification.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => onCertificationClick(certification)}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <h3 className="font-medium">{certification.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Client: {certification.client.name}</p>
                    <p className="text-sm text-gray-500">
                      {certification.document ? (
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" /> 
                          {certification.document.title}
                        </span>
                      ) : (
                        'No document attached'
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-sm text-gray-600 capitalize">{certification.certType}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Expiry Date</p>
                    <p className="text-sm text-gray-600">{new Date(certification.expiryDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex items-center">
                    {getStatusBadge(certification.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-md bg-gray-50">
          <p className="text-gray-500">No certifications found matching your filters.</p>
          {(searchTerm || statusFilter.length > 0 || typeFilter.length > 0) && (
            <Button variant="link" onClick={resetFilters} className="mt-2">
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
