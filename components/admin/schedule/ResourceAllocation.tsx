'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from '@/components/ui/calendar';
import { 
  BarChart, 
  AlertTriangle, 
  UserPlus,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  PieChart,
  Award,
  Users
} from 'lucide-react';
import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  addWeeks, 
  subWeeks, 
  isSameDay,
  startOfDay,
  addMonths,
  subMonths
} from 'date-fns';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Mock personnel data
interface Personnel {
  id: string;
  name: string;
  title: string;
  serviceTypes: string[];
  availability: 'available' | 'partial' | 'unavailable';
  utilization: number;
  appointments: number;
  performance: number;
  color: string;
}

// Mock appointment data
interface Appointment {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  client: string;
  location: string;
  personnelId: string;
}

// Generate mock data for personnel
const mockPersonnel: Personnel[] = [
  {
    id: 'p1',
    name: 'Donald Mbogho',
    title: 'Safety Advisor / Inspector',
    serviceTypes: ['Fire Safety Audit', 'Statutory Inspection', 'Environmental Impact Assessment', 'Energy Audit'],
    availability: 'partial',
    utilization: 85,
    appointments: 12,
    performance: 96,
    color: '#0ea5e9'
  },
  {
    id: 'p2',
    name: 'James Ochieng',
    title: 'Inspector',
    serviceTypes: ['Statutory Inspection', 'Non-Destructive Testing'],
    availability: 'available',
    utilization: 65,
    appointments: 8,
    performance: 91,
    color: '#f97316'
  },
  {
    id: 'p3',
    name: 'Sarah Kimani',
    title: 'Training Specialist',
    serviceTypes: ['Fire Safety Training', 'First Aider Training'],
    availability: 'available',
    utilization: 70,
    appointments: 9,
    performance: 93,
    color: '#8b5cf6'
  },
  {
    id: 'p4',
    name: 'Joseph Maina',
    title: 'Technical Assistant',
    serviceTypes: ['Statutory Inspection', 'Non-Destructive Testing'],
    availability: 'unavailable',
    utilization: 92,
    appointments: 14,
    performance: 89,
    color: '#22c55e'
  },
  {
    id: 'p5',
    name: 'Mary Njeri',
    title: 'Environmental Officer',
    serviceTypes: ['Environmental Impact Assessment', 'Occupational Safety'],
    availability: 'available',
    utilization: 78,
    appointments: 10,
    performance: 94,
    color: '#f43f5e'
  }
];

// Generate mock appointments for the month
const generateMockAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const currentDate = new Date();
  
  // Generate random appointments for each person over the next 30 days
  mockPersonnel.forEach(person => {
    const numAppointments = Math.floor(Math.random() * 5) + 3; // 3-7 appointments per person
    
    for (let i = 0; i < numAppointments; i++) {
      const dayOffset = Math.floor(Math.random() * 30); // Random day in the next 30 days
      const appointmentDate = new Date();
      appointmentDate.setDate(currentDate.getDate() + dayOffset);
      
      const clients = ['Lafarge', 'KTDA', 'Dormans Coffee', 'Autosterile', 'National Cement', 'Unga Group'];
      const client = clients[Math.floor(Math.random() * clients.length)];
      
      // Generate random start time between 8am and 3pm
      const startHour = 8 + Math.floor(Math.random() * 7); 
      const endHour = startHour + 1 + Math.floor(Math.random() * 3); // 1-3 hours later
      
      appointments.push({
        id: `apt-${person.id}-${i}`,
        title: person.serviceTypes[Math.floor(Math.random() * person.serviceTypes.length)],
        date: appointmentDate,
        startTime: `${startHour.toString().padStart(2, '0')}:00`,
        endTime: `${endHour.toString().padStart(2, '0')}:00`,
        client,
        location: `${client} Office/Factory`,
        personnelId: person.id
      });
    }
  });
  
  return appointments;
};

const mockAppointments = generateMockAppointments();

export function ResourceAllocation() {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<'week' | 'month'>('week');
  const [filterService, setFilterService] = useState<string>('all');
  const [filterAvailability, setFilterAvailability] = useState<string>('all');
  
  // Get week dates
  const weekStart = startOfWeek(currentWeek);
  const weekEnd = endOfWeek(currentWeek);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // Navigation functions
  const goToPreviousWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const goToNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const goToPreviousMonth = () => setCurrentWeek(subMonths(currentWeek, 1));
  const goToNextMonth = () => setCurrentWeek(addMonths(currentWeek, 1));
  const goToToday = () => {
    setCurrentWeek(new Date());
    setSelectedDate(new Date());
  };
  
  // Filter personnel based on selected filters
  const filteredPersonnel = mockPersonnel.filter(person => {
    const matchesService = filterService === 'all' || person.serviceTypes.includes(filterService);
    const matchesAvailability = filterAvailability === 'all' || person.availability === filterAvailability;
    
    return matchesService && matchesAvailability;
  });
  
  // Get appointments for a specific person on a specific day
  const getAppointmentsForPersonOnDay = (personnelId: string, date: Date) => {
    return mockAppointments.filter(apt => 
      apt.personnelId === personnelId && 
      isSameDay(new Date(apt.date), date)
    );
  };
  
  // Get all appointments for a specific day
  const getAppointmentsForDay = (date: Date) => {
    return mockAppointments.filter(apt => 
      isSameDay(new Date(apt.date), date)
    );
  };
  
  // Get availability status badge
  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Available</Badge>;
      case 'partial':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Partially Available</Badge>;
      case 'unavailable':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Unavailable</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Get utilization color based on percentage
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-500';
    if (utilization >= 75) return 'text-amber-500';
    if (utilization >= 50) return 'text-emerald-500';
    return 'text-blue-500';
  };
  
  // Get performance color based on percentage
  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return 'text-emerald-500';
    if (performance >= 85) return 'text-blue-500';
    if (performance >= 75) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Get service types for filter
  const allServiceTypes = Array.from(new Set(
    mockPersonnel.flatMap(person => person.serviceTypes)
  )).sort();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Tabs value={viewType} onValueChange={(v: 'week' | 'month') => setViewType(v)}>
            <TabsList>
              <TabsTrigger value="week">Week View</TabsTrigger>
              <TabsTrigger value="month">Month View</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" onClick={viewType === 'week' ? goToPreviousWeek : goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-sm font-medium">
            {viewType === 'week' 
              ? `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
              : format(currentWeek, 'MMMM yyyy')
            }
          </div>
          
          <Button variant="outline" size="sm" onClick={viewType === 'week' ? goToNextWeek : goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Personnel
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {allServiceTypes.map(service => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Availability</label>
                <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="partial">Partially Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Utilization</CardTitle>
              <CardDescription>
                Personnel workload and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {filteredPersonnel.map(person => (
                  <div key={person.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{person.name}</span>
                      <span className={cn(
                        "text-sm font-medium",
                        getUtilizationColor(person.utilization)
                      )}>
                        {person.utilization}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={cn(
                          "h-1.5 rounded-full",
                          person.utilization >= 90 ? "bg-red-500" :
                          person.utilization >= 75 ? "bg-amber-500" :
                          person.utilization >= 50 ? "bg-emerald-500" : "bg-blue-500"
                        )}
                        style={{ width: `${person.utilization}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Average Utilization</span>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round(
                      filteredPersonnel.reduce((sum, p) => sum + p.utilization, 0) / 
                      filteredPersonnel.length
                    )}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Average Performance</span>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round(
                      filteredPersonnel.reduce((sum, p) => sum + p.performance, 0) / 
                      filteredPersonnel.length
                    )}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Active Personnel</span>
                  </div>
                  <span className="text-sm font-medium">
                    {filteredPersonnel.filter(p => p.availability !== 'unavailable').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation Schedule</CardTitle>
              <CardDescription>
                Personnel assignments and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              {viewType === 'week' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-8 gap-2">
                    <div className="col-span-1 bg-muted/50 px-2 py-4 rounded-l font-medium text-sm">
                      Personnel
                    </div>
                    {weekDays.map((day, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "col-span-1 px-2 py-2 text-center text-sm font-medium",
                          isSameDay(day, new Date()) && "bg-primary/10"
                        )}
                      >
                        <div>{format(day, 'E')}</div>
                        <div>{format(day, 'MMM d')}</div>
                      </div>
                    ))}
                    
                    {filteredPersonnel.map(person => (
                      <React.Fragment key={person.id}>
                        <div className="col-span-1 flex items-center bg-muted/50 px-2 py-2 rounded-l">
                          <div className="w-full">
                            <p className="text-xs font-medium truncate">{person.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{person.title}</p>
                          </div>
                        </div>
                        
                        {weekDays.map((day, i) => {
                          const dayAppointments = getAppointmentsForPersonOnDay(person.id, day);
                          const hasAppointments = dayAppointments.length > 0;
                          
                          return (
                            <div 
                              key={i} 
                              className={cn(
                                "col-span-1 p-1 min-h-[60px] border-t border-b",
                                hasAppointments ? "bg-muted/20" : "bg-white",
                                isSameDay(day, new Date()) && "bg-primary/5"
                              )}
                            >
                              {dayAppointments.length > 0 ? (
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <div 
                                      className="h-full w-full rounded p-1 cursor-pointer"
                                      style={{ 
                                        backgroundColor: `${person.color}10`,
                                        borderLeft: `3px solid ${person.color}`
                                      }}
                                    >
                                      <p className="text-xs font-medium truncate">
                                        {dayAppointments.length} {dayAppointments.length === 1 ? 'appt' : 'appts'}
                                      </p>
                                      <p className="text-xs truncate">
                                        {dayAppointments[0].startTime} - {dayAppointments[0].endTime}
                                      </p>
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-80" align="start">
                                    <div className="space-y-2">
                                      <h4 className="text-sm font-semibold">Appointments on {format(day, 'MMM d')}</h4>
                                      {dayAppointments.map((apt, i) => (
                                        <div key={i} className="text-xs rounded-md px-2 py-1 bg-muted/50">
                                          <div className="font-medium">{apt.title}</div>
                                          <div>{apt.startTime} - {apt.endTime}</div>
                                          <div>Client: {apt.client}</div>
                                          <div>Location: {apt.location}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              ) : (
                                <div className="h-full flex items-center justify-center">
                                  <p className="text-xs text-muted-foreground">Available</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPersonnel.map(person => (
                      <Card key={person.id} className="border-t-4" style={{ borderTopColor: person.color }}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{person.name}</CardTitle>
                              <CardDescription>{person.title}</CardDescription>
                            </div>
                            {getAvailabilityBadge(person.availability)}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Utilization</span>
                            <span 
                              className={cn(
                                "text-sm font-medium",
                                getUtilizationColor(person.utilization)
                              )}
                            >
                              {person.utilization}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 mb-4">
                            <div 
                              className={cn(
                                "h-1.5 rounded-full",
                                person.utilization >= 90 ? "bg-red-500" :
                                person.utilization >= 75 ? "bg-amber-500" :
                                person.utilization >= 50 ? "bg-emerald-500" : "bg-blue-500"
                              )}
                              style={{ width: `${person.utilization}%` }}
                            />
                          </div>
                          
                          <div className="text-xs text-muted-foreground mb-2">Service Types:</div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {person.serviceTypes.map((service, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <div>Appointments: <span className="font-medium">{person.appointments}</span></div>
                              <div>
                                Performance: 
                                <span 
                                  className={cn(
                                    "ml-1 font-medium",
                                    getPerformanceColor(person.performance)
                                  )}
                                >
                                  {person.performance}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            View Schedule
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
