'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Calendar, 
  Gift, 
  Clock, 
  Check, 
  Bell
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
import { format, addDays, isBefore, differenceInDays } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceAnniversaryModal from '@/components/anniversaries/ServiceAnniversaryModal';

export default function ServiceAnniversariesPage() {
  const [anniversaries, setAnniversaries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnniversary, setSelectedAnniversary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const { toast } = useToast();

  // Fetch service anniversaries
  const fetchAnniversaries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/service-anniversaries');
      const data = await response.json();
      
      if (data.success) {
        setAnniversaries(data.anniversaries);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch service anniversaries",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching service anniversaries:", error);
      toast({
        title: "Error",
        description: "Failed to fetch service anniversaries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnniversaries();
  }, []);

  const handleCreateAnniversary = () => {
    setSelectedAnniversary(null);
    setIsModalOpen(true);
  };

  const handleSelectAnniversary = (anniversary) => {
    setSelectedAnniversary(anniversary);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnniversary(null);
  };

  const handleSaveAnniversary = async (anniversaryData) => {
    try {
      const url = anniversaryData.id 
        ? `/api/service-anniversaries/${anniversaryData.id}` 
        : '/api/service-anniversaries';
      
      const method = anniversaryData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(anniversaryData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: anniversaryData.id 
            ? "Service anniversary updated successfully" 
            : "Service anniversary created successfully",
        });
        setIsModalOpen(false);
        fetchAnniversaries();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to save service anniversary",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving service anniversary:", error);
      toast({
        title: "Error",
        description: "Failed to save service anniversary",
        variant: "destructive",
      });
    }
  };

  const getAnniversaryStatusClass = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'acknowledged':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'celebrated':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getAnniversaryStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'acknowledged':
        return <Check className="h-4 w-4 mr-1" />;
      case 'celebrated':
        return <Gift className="h-4 w-4 mr-1" />;
      default:
        return <Bell className="h-4 w-4 mr-1" />;
    }
  };

  // Filter anniversaries based on active tab
  const filteredAnniversaries = anniversaries.filter(anniversary => {
    const today = new Date();
    const anniversaryDate = new Date(anniversary.anniversaryDate);
    
    switch (activeTab) {
      case 'upcoming':
        return anniversary.status === 'upcoming' && !isBefore(anniversaryDate, today);
      case 'acknowledged':
        return anniversary.status === 'acknowledged';
      case 'celebrated':
        return anniversary.status === 'celebrated';
      case 'all':
        return true;
      default:
        return true;
    }
  });

  const getTiming = (anniversaryDate) => {
    const today = new Date();
    const date = new Date(anniversaryDate);
    const daysLeft = differenceInDays(date, today);
    
    if (daysLeft < 0) {
      return 'Past';
    } else if (daysLeft === 0) {
      return 'Today';
    } else if (daysLeft === 1) {
      return 'Tomorrow';
    } else if (daysLeft < 30) {
      return `In ${daysLeft} days`;
    } else {
      return format(date, 'MMM dd, yyyy');
    }
  };

  // Calculate statistics
  const stats = {
    upcoming: anniversaries.filter(a => a.status === 'upcoming').length,
    acknowledged: anniversaries.filter(a => a.status === 'acknowledged').length,
    celebrated: anniversaries.filter(a => a.status === 'celebrated').length,
    total: anniversaries.length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Service Anniversary Reminders</h1>
        <Button onClick={handleCreateAnniversary} className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Add Anniversary</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-blue-700">Upcoming</span>
                <span className="text-2xl font-bold text-blue-900">{stats.upcoming}</span>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-green-700">Acknowledged</span>
                <span className="text-2xl font-bold text-green-900">{stats.acknowledged}</span>
              </div>
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-purple-700">Celebrated</span>
                <span className="text-2xl font-bold text-purple-900">{stats.celebrated}</span>
              </div>
              <Gift className="h-8 w-8 text-purple-500" />
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
              <Calendar className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Clock size={16} />
            <span>Upcoming</span>
          </TabsTrigger>
          <TabsTrigger value="acknowledged" className="flex items-center gap-2">
            <Check size={16} />
            <span>Acknowledged</span>
          </TabsTrigger>
          <TabsTrigger value="celebrated" className="flex items-center gap-2">
            <Gift size={16} />
            <span>Celebrated</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Calendar size={16} />
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
          ) : filteredAnniversaries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Anniversary Date</TableHead>
                  <TableHead>Timing</TableHead>
                  <TableHead>Years of Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnniversaries.map((anniversary) => (
                  <TableRow key={anniversary.id} className="hover:bg-gray-50">
                    <TableCell>{anniversary.client?.name || 'N/A'}</TableCell>
                    <TableCell>{anniversary.service?.name || 'N/A'}</TableCell>
                    <TableCell>{format(new Date(anniversary.anniversaryDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{getTiming(anniversary.anniversaryDate)}</TableCell>
                    <TableCell>{anniversary.yearsOfService} {anniversary.yearsOfService === 1 ? 'year' : 'years'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getAnniversaryStatusClass(anniversary.status)}>
                        <span className="flex items-center">
                          {getAnniversaryStatusIcon(anniversary.status)}
                          {anniversary.status.charAt(0).toUpperCase() + anniversary.status.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleSelectAnniversary(anniversary)}>
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                No {activeTab !== 'all' ? activeTab : ''} anniversaries found. 
                {activeTab === 'upcoming' && ' Create your first service anniversary reminder to get started.'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {isModalOpen && (
        <ServiceAnniversaryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveAnniversary}
          anniversary={selectedAnniversary}
        />
      )}
    </div>
  );
}
