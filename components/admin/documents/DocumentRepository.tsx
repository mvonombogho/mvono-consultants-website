'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Upload, 
  FolderPlus, 
  Download, 
  Trash2, 
  FileText, 
  FilePdf, 
  FileImage, 
  FileSpreadsheet, 
  Calendar,
  Check,
  AlertCircle,
  Clock,
  MoreHorizontal,
  ExternalLink,
  Eye,
  Pencil
} from 'lucide-react';
import { DocumentUploadForm } from './DocumentUploadForm';
import { DocumentFolderTree } from './DocumentFolderTree';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Document type definition
type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  category: string;
  client?: string;
  project?: string;
  uploadedBy: string;
  uploadDate: string;
  expiryDate?: string;
  status: 'active' | 'expiring' | 'expired' | 'archived';
};

export function DocumentRepository() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState<'grid' | 'list' | 'tree'>('grid');
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  // Mock document data - in a real implementation, this would be fetched from a database
  const documents: Document[] = [
    {
      id: 'doc-001',
      name: 'Environmental Impact Assessment - Lafarge',
      type: 'pdf',
      size: '2.4 MB',
      category: 'assessments',
      client: 'Lafarge',
      uploadedBy: 'Donald Mbogho',
      uploadDate: '2025-02-15',
      status: 'active'
    },
    {
      id: 'doc-002',
      name: 'Safety Audit Report - KTDA',
      type: 'pdf',
      size: '1.8 MB',
      category: 'audits',
      client: 'KTDA',
      uploadedBy: 'Donald Mbogho',
      uploadDate: '2025-02-10',
      expiryDate: '2026-02-10',
      status: 'active'
    },
    {
      id: 'doc-003',
      name: 'Fire Safety Certificate - Unga Group',
      type: 'pdf',
      size: '0.5 MB',
      category: 'certificates',
      client: 'Unga Group',
      uploadedBy: 'Sarah Kimani',
      uploadDate: '2024-10-05',
      expiryDate: '2025-04-05',
      status: 'expiring'
    },
    {
      id: 'doc-004',
      name: 'Inspection Report - Autosterile',
      type: 'pdf',
      size: '3.2 MB',
      category: 'inspections',
      client: 'Autosterile',
      project: 'Pressure Vessel Inspection',
      uploadedBy: 'Donald Mbogho',
      uploadDate: '2025-01-22',
      status: 'active'
    },
    {
      id: 'doc-005',
      name: 'First Aid Training Attendees',
      type: 'xlsx',
      size: '0.8 MB',
      category: 'training',
      client: 'Dormans Coffee',
      project: 'First Aid Training Q1 2025',
      uploadedBy: 'James Ochieng',
      uploadDate: '2025-03-02',
      status: 'active'
    },
    {
      id: 'doc-006',
      name: 'Energy Audit Data - Iberafrica',
      type: 'xlsx',
      size: '1.5 MB',
      category: 'audits',
      client: 'Iberafrica',
      project: 'Energy Optimization 2025',
      uploadedBy: 'Donald Mbogho',
      uploadDate: '2025-02-28',
      status: 'active'
    },
    {
      id: 'doc-007',
      name: 'Fire Safety Training Presentation',
      type: 'pptx',
      size: '5.2 MB',
      category: 'training',
      uploadedBy: 'Sarah Kimani',
      uploadDate: '2025-01-15',
      status: 'active'
    },
    {
      id: 'doc-008',
      name: 'Statutory Compliance Certificate - Welding Alloys',
      type: 'pdf',
      size: '0.6 MB',
      category: 'certificates',
      client: 'Welding Alloys',
      uploadedBy: 'Donald Mbogho',
      uploadDate: '2024-08-12',
      expiryDate: '2025-02-12',
      status: 'expired'
    }
  ];
  
  // Filter documents based on search query and selected category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (doc.client || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get document icon based on file type
  const getDocumentIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'pdf':
        return <FilePdf className="h-6 w-6 text-red-500" />;
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <FileSpreadsheet className="h-6 w-6 text-green-600" />;
      case 'jpg':
      case 'png':
      case 'gif':
        return <FileImage className="h-6 w-6 text-blue-500" />;
      case 'pptx':
      case 'ppt':
        return <FileText className="h-6 w-6 text-orange-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };
  
  // Get status badge based on document status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
          <Check className="h-3 w-3 mr-1" /> Active
        </Badge>;
      case 'expiring':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">
          <Clock className="h-3 w-3 mr-1" /> Expiring Soon
        </Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 border-red-200">
          <AlertCircle className="h-3 w-3 mr-1" /> Expired
        </Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate?: string) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  return (
    <div className="space-y-6">
      {showUploadForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Add a new document to the repository
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUploadForm onCancel={() => setShowUploadForm(false)} />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px]"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="assessments">Assessments</SelectItem>
                  <SelectItem value="audits">Audits</SelectItem>
                  <SelectItem value="certificates">Certificates</SelectItem>
                  <SelectItem value="inspections">Inspections</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={(value: string) => setView(value as 'grid' | 'list' | 'tree')}>
                <TabsList className="w-fit">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="tree">Folders</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button onClick={() => setShowUploadForm(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
            </div>
          </div>
          
          {view === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map(doc => (
                <Card key={doc.id} className="flex flex-col h-full">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        {getDocumentIcon(doc.type)}
                        <div>
                          <CardTitle className="text-base">{doc.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {doc.client && `Client: ${doc.client}`}
                            {doc.client && doc.project && ' • '}
                            {doc.project && `Project: ${doc.project}`}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <div className="text-sm text-muted-foreground">
                      <p className="flex justify-between">
                        <span>Type:</span> 
                        <span className="font-medium uppercase">{doc.type}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Size:</span> 
                        <span className="font-medium">{doc.size}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Uploaded:</span> 
                        <span className="font-medium">{formatDate(doc.uploadDate)}</span>
                      </p>
                      {doc.expiryDate && (
                        <p className="flex justify-between">
                          <span>Expires:</span> 
                          <span className="font-medium">
                            {formatDate(doc.expiryDate)}
                            {getDaysUntilExpiry(doc.expiryDate) !== null && (
                              <span className={`ml-1 ${
                                getDaysUntilExpiry(doc.expiryDate)! < 0 ? 'text-red-500' : 
                                getDaysUntilExpiry(doc.expiryDate)! < 30 ? 'text-amber-500' : ''
                              }`}>
                                ({getDaysUntilExpiry(doc.expiryDate)} days)
                              </span>
                            )}
                          </span>
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <div>
                      {getStatusBadge(doc.status)}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {view === 'list' && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Upload Date</TableHead>
                    <TableHead className="text-right">Expiry Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getDocumentIcon(doc.type)}
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {doc.size} • {doc.type.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.client || '—'}</TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(doc.status)}
                      </TableCell>
                      <TableCell className="text-right">{formatDate(doc.uploadDate)}</TableCell>
                      <TableCell className="text-right">
                        {doc.expiryDate ? formatDate(doc.expiryDate) : '—'}
                        {getDaysUntilExpiry(doc.expiryDate) !== null && (
                          <div className={`text-xs ${
                            getDaysUntilExpiry(doc.expiryDate)! < 0 ? 'text-red-500' : 
                            getDaysUntilExpiry(doc.expiryDate)! < 30 ? 'text-amber-500' : ''
                          }`}>
                            {getDaysUntilExpiry(doc.expiryDate)} days
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {view === 'tree' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Folder Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentFolderTree />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Documents in Selected Folder</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Size</TableHead>
                          <TableHead className="text-right">Modified</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocuments.slice(0, 5).map(doc => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {getDocumentIcon(doc.type)}
                                <div className="font-medium">{doc.name}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{doc.size}</TableCell>
                            <TableCell className="text-right">{formatDate(doc.uploadDate)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Documents Expiring Soon</CardTitle>
          <CardDescription>
            Documents and certificates that require renewal within the next 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Expiry Date</TableHead>
                  <TableHead className="text-right">Days Remaining</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents
                  .filter(doc => doc.expiryDate && getDaysUntilExpiry(doc.expiryDate)! >= 0 && getDaysUntilExpiry(doc.expiryDate)! <= 30)
                  .map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getDocumentIcon(doc.type)}
                          <div className="font-medium">{doc.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.client || '—'}</TableCell>
                      <TableCell className="text-right">{formatDate(doc.expiryDate || '')}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={`
                          ${getDaysUntilExpiry(doc.expiryDate)! <= 7 ? 'bg-red-100 text-red-800 border-red-200' : 
                            'bg-amber-100 text-amber-800 border-amber-200'}
                        `}>
                          {getDaysUntilExpiry(doc.expiryDate)} days
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Renewal
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {documents.filter(doc => doc.expiryDate && getDaysUntilExpiry(doc.expiryDate)! >= 0 && getDaysUntilExpiry(doc.expiryDate)! <= 30).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No documents expiring soon
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
