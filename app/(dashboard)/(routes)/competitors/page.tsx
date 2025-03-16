"use client";

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/PageHeader';
import PageContainer from '@/components/PageContainer';
import CompetitorList from '@/components/competitor/CompetitorList';
import CompetitorStats from '@/components/competitor/CompetitorStats';
import CompetitorModal from '@/components/competitor/CompetitorModal';

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [activeView, setActiveView] = useState('list');
  
  useEffect(() => {
    fetchCompetitors();
  }, []);
  
  const fetchCompetitors = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/competitor');
      const data = await response.json();
      setCompetitors(data);
    } catch (error) {
      console.error('Error fetching competitors:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddCompetitor = () => {
    setSelectedCompetitor(null);
    setShowModal(true);
  };
  
  const handleEditCompetitor = (competitor) => {
    setSelectedCompetitor(competitor);
    setShowModal(true);
  };
  
  const handleCloseModal = (refreshData = false) => {
    setShowModal(false);
    if (refreshData) {
      fetchCompetitors();
    }
  };
  
  return (
    <PageContainer>
      <PageHeader
        title="Competitor Intelligence"
        description="Track and analyze your competitors to gain strategic insights."
        buttons={
          <Button onClick={handleAddCompetitor} className="mt-2 sm:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Competitor
          </Button>
        }
      />
      
      <Tabs value={activeView} onValueChange={setActiveView} className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="stats">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <CompetitorList 
            competitors={competitors} 
            isLoading={isLoading} 
            onEdit={handleEditCompetitor} 
          />
        </TabsContent>
        
        <TabsContent value="stats" className="mt-6">
          <CompetitorStats competitors={competitors} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
      
      {showModal && (
        <CompetitorModal
          competitor={selectedCompetitor}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </PageContainer>
  );
}
