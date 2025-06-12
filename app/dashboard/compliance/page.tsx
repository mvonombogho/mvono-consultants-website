'use client';

import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  Calendar as CalendarIcon, 
  List, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ComplianceEventModal from '@/components/compliance/ComplianceEventModal';
import ComplianceEventList from '@/components/compliance/ComplianceEventList';
import { useToast } from '@/components/ui/use-toast';

const localizer = momentLocalizer(moment);

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-300',
  medium: 'bg-amber-100 text-amber-800 border-amber-300',
  low: 'bg-green-100 text-green-800 border-green-300',
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800 border-gray-300',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
  completed: 'bg-green-100 text-green-800 border-green-300',
  overdue: 'bg-red-100 text-red-800 border-red-300',
};

export default function ComplianceCalendarPage() {
  const [complianceEvents, setComplianceEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('calendar');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    upcoming: 0,
    pending: 0,
    overdue: 0,
    completed: 0,
    total: 0
  });
  const { toast } = useToast();

  // Fetch compliance events
  const fetchComplianceEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/compliance-events');
      const data = await response.json();
      
      if (data.success) {
        // Transform data for calendar
        const formattedEvents = data.events.map(event => ({
          ...event,
          start: new Date(event.dueDate),
          end: new Date(event.dueDate),
          title: event.title,
          priorityClass: priorityColors[event.priority] || priorityColors.medium,
          statusClass: statusColors[event.status] || statusColors.pending
        }));
        
        setComplianceEvents(formattedEvents);
        
        // Calculate statistics
        const now = new Date();
        const upcoming = formattedEvents.filter(event => 
          new Date(event.dueDate) > now && event.status !== 'completed'
        ).length;
        
        const pending = formattedEvents.filter(event => 
          event.status === 'pending'
        ).length;
        
        const overdue = formattedEvents.filter(event => 
          new Date(event.dueDate) < now && event.status !== 'completed'
        ).length;
        
        const completed = formattedEvents.filter(event => 
          event.status === 'completed'
        ).length;
        
        setStats({
          upcoming,
          pending,
          overdue,
          completed,
          total: formattedEvents.length
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch compliance events",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching compliance events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch compliance events",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplianceEvents();
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      const url = eventData.id 
        ? `/api/compliance-events/${eventData.id}` 
        : '/api/compliance-events';
      
      const method = eventData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: eventData.id 
            ? "Compliance event updated successfully" 
            : "Compliance event created successfully",
        });
        setIsModalOpen(false);
        fetchComplianceEvents();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to save compliance event",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving compliance event:", error);
      toast({
        title: "Error",
        description: "Failed to save compliance event",
        variant: "destructive",
      });
    }
  };

  const eventStyleGetter = (event) => {
    return {
      className: `${event.priorityClass} ${event.statusClass}`,
      style: {
        border: '1px solid',
        borderRadius: '4px',
        opacity: 0.8,
        color: 'black',
        display: 'block'
      }
    };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Regulatory Compliance Calendar</h1>
        <Button onClick={handleCreateEvent} className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Add Compliance Event</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Upcoming</span>
                <span className="text-2xl font-bold">{stats.upcoming}</span>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Pending</span>
                <span className="text-2xl font-bold">{stats.pending}</span>
              </div>
              <FileText className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Overdue</span>
                <span className="text-2xl font-bold">{stats.overdue}</span>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Completed</span>
                <span className="text-2xl font-bold">{stats.completed}</span>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="calendar" value={viewMode} onValueChange={setViewMode}>
        <TabsList>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon size={16} />
            <span>Calendar View</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List size={16} />
            <span>List View</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="p-0 border rounded-md mt-4">
          <div className="h-[700px] p-4">
            <Calendar
              localizer={localizer}
              events={complianceEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleEventSelect}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day']}
              defaultView="month"
              defaultDate={new Date()}
              popup
            />
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="p-0 border rounded-md mt-4">
          <ComplianceEventList 
            events={complianceEvents} 
            onEventSelect={handleEventSelect} 
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
      
      {isModalOpen && (
        <ComplianceEventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          event={selectedEvent}
        />
      )}
    </div>
  );
}
