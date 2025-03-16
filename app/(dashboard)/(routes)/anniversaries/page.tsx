"use client";

import { useEffect, useState } from 'react';
import { Plus, Calendar, BellRing, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, isBefore, addMonths, differenceInDays } from 'date-fns';
import PageHeader from '@/components/PageHeader';
import PageContainer from '@/components/PageContainer';
import AnniversaryModal from '@/components/anniversary/AnniversaryModal';
import { Badge } from '@/components/ui/badge';

const dummyAnniversaries = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Lafarge',
    serviceType: 'Safety Audit',
    lastServiceDate: '2024-03-20T00:00:00.000Z',
    frequencyMonths: 12,
    status: 'upcoming',
    notes: 'Annual safety audit required for compliance',
    contactName: 'John Smith',
    contactEmail: 'jsmith@lafarge.com',
    contactPhone: '+254 712 345 678'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'KTDA',
    serviceType: 'Pressure Vessel Inspection',
    lastServiceDate: '2024-01-10T00:00:00.000Z',
    frequencyMonths: 6,
    status: 'due',
    notes: 'Inspection of factory boilers',
    contactName: 'Sarah Jones',
    contactEmail: 'sjones@ktda.com',
    contactPhone: '+254 723 456 789'
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Unga Group',
    serviceType: 'Energy Audit',
    lastServiceDate: '2023-12-05T00:00:00.000Z',
    frequencyMonths: 12,
    status: 'due',
    notes: 'Annual energy usage review',
    contactName: 'Michael Ochieng',
    contactEmail: 'mochieng@unga.com',
    contactPhone: '+254 734 567 890'
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Dormans Coffee',
    serviceType: 'Fire Safety Training',
    lastServiceDate: '2024-02-15T00:00:00.000Z',
    frequencyMonths: 6,
    status: 'upcoming',
    notes: 'Training for all staff',
    contactName: 'Lucy Wambui',
    contactEmail: 'lwambui@dormans.com',
    contactPhone: '+254 745 678 901'
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Tata Chemicals',
    serviceType: 'Lifting Equipment Inspection',
    lastServiceDate: '2023-11-20T00:00:00.000Z',
    frequencyMonths: 6,
    status: 'overdue',
    notes: 'Critical inspection of cranes and hoists',
    contactName: 'Peter Karimi',
    contactEmail: 'pkarimi@tata.com',
    contactPhone: '+254 756 789 012'
  }
];

export default function AnniversariesPage() {
  const [anniversaries, setAnniversaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnniversary, setSelectedAnniversary] = useState(null);
  const [activeView, setActiveView] = useState('upcoming');
  
  useEffect(() => {
    // In a real implementation, we'd fetch this from an API
    // fetchAnniversaries();
    setAnniversaries(dummyAnniversaries);
    setIsLoading(false);
  }, []);
  
  const fetchAnniversaries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/anniversary');
      const data = await response.json();
      setAnniversaries(data);
    } catch (error) {
      console.error('Error fetching anniversaries:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddAnniversary = () => {
    setSelectedAnniversary(null);
    setShowModal(true);
  };
  
  const handleEditAnniversary = (anniversary) => {
    setSelectedAnniversary(anniversary);
    setShowModal(true);
  };
  
  const handleCloseModal = (refreshData = false) => {
    setShowModal(false);
    if (refreshData) {
      // fetchAnniversaries();
      // Just for demo purposes
      setAnniversaries([...anniversaries]);
    }
  };
  
  const getNextServiceDate = (lastServiceDate, frequencyMonths) => {
    return addMonths(new Date(lastServiceDate), frequencyMonths);
  };
  
  const getDaysUntilDue = (nextServiceDate) => {
    return differenceInDays(nextServiceDate, new Date());
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      case 'due':
        return <Badge className="bg-yellow-100 text-yellow-800">Due Now</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  const upcomingAnniversaries = anniversaries.filter(a => a.status === 'upcoming');
  const dueAnniversaries = anniversaries.filter(a => a.status === 'due');
  const overdueAnniversaries = anniversaries.filter(a => a.status === 'overdue');
  
  const renderAnniversaryList = (anniversaryList) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">Loading anniversaries...</p>
        </div>
      );
    }
    
    if (anniversaryList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-40 border rounded-lg">
          <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No anniversaries found</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {anniversaryList.map((anniversary) => {
          const nextServiceDate = getNextServiceDate(anniversary.lastServiceDate, anniversary.frequencyMonths);
          const daysUntilDue = getDaysUntilDue(nextServiceDate);
          
          return (
            <Card key={anniversary.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleEditAnniversary(anniversary)}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{anniversary.clientName}</h3>
                    <p className="text-sm text-muted-foreground">{anniversary.serviceType}</p>
                  </div>
                  {getStatusBadge(anniversary.status)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium">Last Service:</p>
                    <p className="text-sm">{format(new Date(anniversary.lastServiceDate), 'MMMM d, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Next Service:</p>
                    <p className="text-sm">{format(nextServiceDate, 'MMMM d, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Frequency:</p>
                    <p className="text-sm">{anniversary.frequencyMonths} {anniversary.frequencyMonths === 1 ? 'month' : 'months'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status:</p>
                    <p className="text-sm">
                      {anniversary.status === 'overdue' ? 'Overdue by ' : 'Due in '}
                      {Math.abs(daysUntilDue)} {Math.abs(daysUntilDue) === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                </div>
                
                {anniversary.notes && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm">{anniversary.notes}</p>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium">Contact:</p>
                  <p className="text-sm">{anniversary.contactName || 'N/A'}</p>
                  {anniversary.contactEmail && (
                    <p className="text-sm">{anniversary.contactEmail}</p>
                  )}
                  {anniversary.contactPhone && (
                    <p className="text-sm">{anniversary.contactPhone}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };
  
  return (
    <PageContainer>
      <PageHeader
        title="Service Anniversaries"
        description="Track recurring service schedules and upcoming anniversaries for your clients."
        buttons={
          <Button onClick={handleAddAnniversary} className="mt-2 sm:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Anniversary
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-blue-500" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{upcomingAnniversaries.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BellRing className="mr-2 h-4 w-4 text-yellow-500" />
              Due Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dueAnniversaries.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-red-500" />
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{overdueAnniversaries.length}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeView} onValueChange={setActiveView} className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="due">Due Now</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          {renderAnniversaryList(upcomingAnniversaries)}
        </TabsContent>
        
        <TabsContent value="due" className="mt-6">
          {renderAnniversaryList(dueAnniversaries)}
        </TabsContent>
        
        <TabsContent value="overdue" className="mt-6">
          {renderAnniversaryList(overdueAnniversaries)}
        </TabsContent>
      </Tabs>
      
      {showModal && (
        <AnniversaryModal
          anniversary={selectedAnniversary}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </PageContainer>
  );
}
