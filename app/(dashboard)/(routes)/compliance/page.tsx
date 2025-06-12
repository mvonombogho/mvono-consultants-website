"use client";

import { useEffect, useState } from 'react';
import { Plus, Calendar, FileCheck, AlertTriangle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, differenceInDays, isBefore } from 'date-fns';
import PageHeader from '@/components/PageHeader';
import PageContainer from '@/components/PageContainer';
import ComplianceModal from '@/components/compliance/ComplianceModal';
import { Badge } from '@/components/ui/badge';

const dummyCompliance = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Lafarge',
    requirementType: 'DOSH Inspection',
    description: 'Annual workplace safety inspection by DOSH',
    dueDate: '2025-05-15T00:00:00.000Z',
    status: 'upcoming',
    priority: 'high',
    responsiblePerson: 'John Smith',
    email: 'jsmith@lafarge.com',
    phone: '+254 712 345 678',
    documents: ['Last year inspection report'],
    notes: 'Previous inspection had minor findings to be addressed'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'KTDA',
    requirementType: 'Environmental Audit',
    description: 'NEMA compliance audit',
    dueDate: '2025-04-02T00:00:00.000Z',
    status: 'urgent',
    priority: 'high',
    responsiblePerson: 'Sarah Jones',
    email: 'sjones@ktda.com',
    phone: '+254 723 456 789',
    documents: ['Previous audit findings', 'Remediation plan'],
    notes: 'Need to follow up on effluent treatment improvements'
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Unga Group',
    requirementType: 'Fire Safety Certification',
    description: 'Annual fire safety certification',
    dueDate: '2025-06-10T00:00:00.000Z',
    status: 'upcoming',
    priority: 'medium',
    responsiblePerson: 'Michael Ochieng',
    email: 'mochieng@unga.com',
    phone: '+254 734 567 890',
    documents: ['Previous certificate'],
    notes: 'New building wing to be included in this audit'
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Dormans Coffee',
    requirementType: 'Health & Safety Committee',
    description: 'Quarterly health & safety committee meeting',
    dueDate: '2025-03-25T00:00:00.000Z',
    status: 'urgent',
    priority: 'medium',
    responsiblePerson: 'Lucy Wambui',
    email: 'lwambui@dormans.com',
    phone: '+254 745 678 901',
    documents: ['Previous meeting minutes', 'Action items'],
    notes: 'Need to follow up on training completion for new members'
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Tata Chemicals',
    requirementType: 'Equipment Certification',
    description: 'Pressure vessel certification renewal',
    dueDate: '2025-04-30T00:00:00.000Z',
    status: 'complete',
    priority: 'critical',
    responsiblePerson: 'Peter Karimi',
    email: 'pkarimi@tata.com',
    phone: '+254 756 789 012',
    documents: ['Inspection reports', 'Certification documents'],
    notes: 'All vessels passed inspection and have been certified for another year'
  }
];

export default function CompliancePage() {
  const [complianceItems, setComplianceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [activeView, setActiveView] = useState('urgent');
  
  useEffect(() => {
    // In a real implementation, we'd fetch this from an API
    // fetchComplianceItems();
    setComplianceItems(dummyCompliance);
    setIsLoading(false);
  }, []);
  
  const fetchComplianceItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/compliance');
      const data = await response.json();
      setComplianceItems(data);
    } catch (error) {
      console.error('Error fetching compliance items:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddCompliance = () => {
    setSelectedCompliance(null);
    setShowModal(true);
  };
  
  const handleEditCompliance = (compliance) => {
    setSelectedCompliance(compliance);
    setShowModal(true);
  };
  
  const handleCloseModal = (refreshData = false) => {
    setShowModal(false);
    if (refreshData) {
      // fetchComplianceItems();
      // Just for demo purposes
      setComplianceItems([...complianceItems]);
    }
  };
  
  const getDaysUntilDue = (dueDate) => {
    return differenceInDays(new Date(dueDate), new Date());
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{priority}</Badge>;
    }
  };
  
  const urgentItems = complianceItems.filter(item => item.status === 'urgent');
  const upcomingItems = complianceItems.filter(item => item.status === 'upcoming');
  const completedItems = complianceItems.filter(item => item.status === 'complete');
  
  const renderComplianceList = (complianceList) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">Loading compliance requirements...</p>
        </div>
      );
    }
    
    if (complianceList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-40 border rounded-lg">
          <FileCheck className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No compliance requirements found</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {complianceList.map((compliance) => {
          const daysUntilDue = getDaysUntilDue(compliance.dueDate);
          const isPastDue = isBefore(new Date(compliance.dueDate), new Date());
          
          return (
            <Card key={compliance.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleEditCompliance(compliance)}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{compliance.clientName}</h3>
                    <p className="text-sm text-muted-foreground">{compliance.requirementType}</p>
                  </div>
                  <div className="flex space-x-2">
                    {getStatusBadge(compliance.status)}
                    {getPriorityBadge(compliance.priority)}
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium">Description:</p>
                  <p className="text-sm">{compliance.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium">Due Date:</p>
                    <p className="text-sm">{format(new Date(compliance.dueDate), 'MMMM d, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status:</p>
                    <p className="text-sm">
                      {compliance.status === 'complete' 
                        ? 'Completed' 
                        : (isPastDue 
                            ? `Overdue by ${Math.abs(daysUntilDue)} ${Math.abs(daysUntilDue) === 1 ? 'day' : 'days'}`
                            : `Due in ${daysUntilDue} ${daysUntilDue === 1 ? 'day' : 'days'}`
                          )
                      }
                    </p>
                  </div>
                </div>
                
                {compliance.notes && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm">{compliance.notes}</p>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium">Responsible Person:</p>
                  <p className="text-sm">{compliance.responsiblePerson || 'N/A'}</p>
                  {compliance.email && (
                    <p className="text-sm">{compliance.email}</p>
                  )}
                  {compliance.phone && (
                    <p className="text-sm">{compliance.phone}</p>
                  )}
                </div>
                
                {compliance.documents && compliance.documents.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Related Documents:</p>
                    <ul className="text-sm list-disc pl-5">
                      {compliance.documents.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
        title="Regulatory Compliance Calendar"
        description="Track and manage regulatory compliance requirements for your clients."
        buttons={
          <Button onClick={handleAddCompliance} className="mt-2 sm:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Requirement
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
              Urgent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{urgentItems.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-blue-500" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{upcomingItems.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{completedItems.length}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeView} onValueChange={setActiveView} className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="urgent" className="mt-6">
          {renderComplianceList(urgentItems)}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          {renderComplianceList(upcomingItems)}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          {renderComplianceList(completedItems)}
        </TabsContent>
      </Tabs>
      
      {showModal && (
        <ComplianceModal
          compliance={selectedCompliance}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </PageContainer>
  );
}
