'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  FileText,
  Download 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, differenceInDays, isBefore, addDays } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import CertificationModal from '@/components/certifications/CertificationModal';
import { Progress } from '@/components/ui/progress';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const { toast } = useToast();

  // Fetch certifications
  const fetchCertifications = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/certifications');
      const data = await response.json();
      
      if (data.success) {
        setCertifications(data.certifications);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch certifications",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching certifications:", error);
      toast({
        title: "Error",
        description: "Failed to fetch certifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleCreateCertification = () => {
    setSelectedCertification(null);
    setIsModalOpen(true);
  };

  const handleSelectCertification = (certification) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertification(null);
  };

  const handleSaveCertification = async (certificationData) => {
    try {
      const url = certificationData.id 
        ? `/api/certifications/${certificationData.id}` 
        : '/api/certifications';
      
      const method = certificationData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certificationData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: certificationData.id 
            ? "Certification updated successfully" 
            : "Certification created successfully",
        });
        setIsModalOpen(false);
        fetchCertifications();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to save certification",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving certification:", error);
      toast({
        title: "Error",
        description: "Failed to save certification",
        variant: "destructive",
      });
    }
  };

  const getCertificationStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'renewal-pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCertificationStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 mr-1" />;
      case 'renewal-pending':
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return <FileText className="h-4 w-4 mr-1" />;
    }
  };

  // Calculate remaining validity percentage
  const getValidityPercentage = (issueDate, expiryDate) => {
    const today = new Date();
    const issue = new Date(issueDate);
    const expiry = new Date(expiryDate);
    
    const totalDays = differenceInDays(expiry, issue);
    const daysElapsed = differenceInDays(today, issue);
    
    if (daysElapsed < 0) return 100;
    if (daysElapsed > totalDays) return 0;
    
    return Math.round(((totalDays - daysElapsed) / totalDays) * 100);
  };

  // Update certification status based on expiry date
  const certificationsWithUpdatedStatus = certifications.map(cert => {
    const today = new Date();
    const expiryDate = new Date(cert.expiryDate);
    const warningDate = addDays(today, 30); // 30 days warning
    
    let updatedStatus = cert.status;
    
    if (isBefore(expiryDate, today)) {
      updatedStatus = 'expired';
    } else if (isBefore(expiryDate, warningDate) && cert.status === 'active') {
      updatedStatus = 'renewal-pending';
    }
    
    return {
      ...cert,
      status: updatedStatus,
      validityPercentage: getValidityPercentage(cert.issueDate, cert.expiryDate)
    };
  });

  // Filter certifications based on active tab
  const filteredCertifications = certificationsWithUpdatedStatus.filter(cert => {
    switch (activeTab) {
      case 'active':
        return cert.status === 'active';
      case 'renewal-pending':
        return cert.status === 'renewal-pending';
      case 'expired':
        return cert.status === 'expired';
      case 'all':
        return true;
      default:
        return true;
    }
  });

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const days = differenceInDays(expiry, today);
    
    if (days < 0) {
      return `Expired ${Math.abs(days)} days ago`;
    } else if (days === 0) {
      return 'Expires today';
    } else if (days === 1) {
      return 'Expires tomorrow';
    } else {
      return `Expires in ${days} days`;
    }
  };

  // Calculate statistics
  const stats = {
    active: certificationsWithUpdatedStatus.filter(cert => cert.status === 'active').length,
    renewalPending: certificationsWithUpdatedStatus.filter(cert => cert.status === 'renewal-pending').length,
    expired: certificationsWithUpdatedStatus.filter(cert => cert.status === 'expired').length,
    total: certificationsWithUpdatedStatus.length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Certification Tracking</h1>
        <Button onClick={handleCreateCertification} className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Add Certification</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-green-700">Active</span>
                <span className="text-2xl font-bold text-green-900">{stats.active}</span>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-amber-700">Renewal Pending</span>
                <span className="text-2xl font-bold text-amber-900">{stats.renewalPending}</span>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-red-700">Expired</span>
                <span className="text-2xl font-bold text-red-900">{stats.expired}</span>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total</span>
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
              <Shield className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Active</span>
          </TabsTrigger>
          <TabsTrigger value="renewal-pending" className="flex items-center gap-2">
            <Clock size={16} />
            <span>Renewal Pending</span>
          </TabsTrigger>
          <TabsTrigger value="expired" className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>Expired</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Shield size={16} />
            <span>All</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredCertifications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertifications.map((certification) => (
                  <TableRow key={certification.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{certification.title}</TableCell>
                    <TableCell>{certification.client?.name || 'N/A'}</TableCell>
                    <TableCell className="capitalize">{certification.certType}</TableCell>
                    <TableCell>{format(new Date(certification.issueDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{format(new Date(certification.expiryDate), 'MMM dd, yyyy')}</span>
                        <span className="text-xs text-muted-foreground">
                          {getDaysUntilExpiry(certification.expiryDate)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getCertificationStatusClass(certification.status)}>
                        <span className="flex items-center">
                          {getCertificationStatusIcon(certification.status)}
                          {certification.status === 'renewal-pending' 
                            ? 'Renewal Pending' 
                            : certification.status.charAt(0).toUpperCase() + certification.status.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Progress value={certification.validityPercentage} className="h-2" />
                        <span className="text-xs text-muted-foreground">{certification.validityPercentage}% valid</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {certification.documentId && (
                          <Button variant="ghost" size="icon" title="Download Certificate">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleSelectCertification(certification)}>
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                No {activeTab !== 'all' ? activeTab.replace('-', ' ') : ''} certifications found. 
                {activeTab === 'active' && ' Add your first certification to get started.'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {isModalOpen && (
        <CertificationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveCertification}
          certification={selectedCertification}
        />
      )}
    </div>
  );
}
