"use client";

import { useEffect, useState } from 'react';
import { Plus, Calendar, FilterX, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '@/components/PageHeader';
import PageContainer from '@/components/PageContainer';
import CertificationList from '@/components/certification/CertificationList';
import CertificationStats from '@/components/certification/CertificationStats';
import CertificationModal from '@/components/certification/CertificationModal';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [activeView, setActiveView] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    fetchCertifications();
  }, []);
  
  const fetchCertifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/certification');
      const data = await response.json();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddCertification = () => {
    setSelectedCertification(null);
    setShowModal(true);
  };
  
  const handleEditCertification = (certification) => {
    setSelectedCertification(certification);
    setShowModal(true);
  };
  
  const handleCloseModal = (refreshData = false) => {
    setShowModal(false);
    if (refreshData) {
      fetchCertifications();
    }
  };
  
  const filteredCertifications = certifications.filter(cert => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return cert.status === 'active';
    if (filterStatus === 'expiring') {
      const expiryDate = new Date(cert.expiryDate);
      const now = new Date();
      const daysUntilExpiry = Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }
    if (filterStatus === 'expired') return cert.status === 'expired';
    return true;
  });
  
  return (
    <PageContainer>
      <PageHeader
        title="Certification Tracking"
        description="Manage and monitor certification compliance for your clients and equipment."
        buttons={
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="mt-2 sm:mt-0"
            >
              {showFilters ? <FilterX className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Button onClick={handleAddCertification} className="mt-2 sm:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </div>
        }
      />
      
      {showFilters && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Certifications</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expiring">Expiring Soon (30 days)</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs value={activeView} onValueChange={setActiveView} className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="stats">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <CertificationList 
            certifications={filteredCertifications} 
            isLoading={isLoading} 
            onEdit={handleEditCertification} 
          />
        </TabsContent>
        
        <TabsContent value="stats" className="mt-6">
          <CertificationStats certifications={certifications} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
      
      {showModal && (
        <CertificationModal
          certification={selectedCertification}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </PageContainer>
  );
}
