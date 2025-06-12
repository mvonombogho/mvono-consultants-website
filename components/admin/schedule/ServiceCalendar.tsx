'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, isToday, startOfWeek, endOfWeek, getDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { CreateAppointmentDialog } from './CreateAppointmentDialog';
import { AppointmentDetailDialog } from './AppointmentDetailDialog';

// Define appointment types
type ServiceType = 
  | 'Environmental Impact Assessment'
  | 'Occupational Safety'
  | 'Fire Safety Audit'
  | 'Energy Audit'
  | 'Statutory Inspection'
  | 'Non-Destructive Testing'
  | 'Fire Safety Training'
  | 'First Aider Training';

type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

interface ServicePersonnel {
  id: string;
  name: string;
  title: string;
  color: string;
}

interface ServiceAppointment {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  serviceType: ServiceType;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  personnel: ServicePersonnel[];
  status: AppointmentStatus;
  notes?: string;
}

export function ServiceCalendar() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<ServiceAppointment | null>(null);
  
  // Generate days for the current month view (including days from prev/next month to fill the grid)
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Handle month navigation
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };
  
  // Mock appointments data - would be fetched from API in real implementation
  const appointments: ServiceAppointment[] = [
    {
      id: 'apt1',
      title: 'Fire Safety Audit',
      clientId: 'client1',
      clientName: 'Lafarge',
      serviceType: 'Fire Safety Audit',
      date: new Date(2025, 2, 15),  // March 15, 2025
      startTime: '09:00',
      endTime: '12:00',
      location: 'Lafarge Office, Nairobi',
      personnel: [
        { id: 'p1', name: 'Donald Mbogho', title: 'Safety Advisor', color: '#0ea5e9' },
        { id: 'p2', name: 'James Ochieng', title: 'Inspector', color: '#f97316' }
      ],
      status: 'scheduled'
    },
    {
      id: 'apt2',
      title: 'Energy Optimization Assessment',
      clientId: 'client2',
      clientName: 'KTDA',
      serviceType: 'Energy Audit',
      date: new Date(2025, 2, 18),  // March 18, 2025
      startTime: '10:00',
      endTime: '16:00',
      location: 'KTDA Factory, Kericho',
      personnel: [
        { id: 'p1', name: 'Donald Mbogho', title: 'Energy Advisor', color: '#0ea5e9' }
      ],
      status: 'scheduled'
    },
    {
      id: 'apt3',
      title: 'Staff First Aid Training',
      clientId: 'client3',
      clientName: 'Dormans Coffee',
      serviceType: 'First Aider Training',
      date: new Date(2025, 2, 22),  // March 22, 2025
      startTime: '09:00',
      endTime: '17:00',
      location: 'Dormans Office, Nairobi',
      personnel: [
        { id: 'p3', name: 'Sarah Kimani', title: 'Training Specialist', color: '#8b5cf6' }
      ],
      status: 'scheduled'
    },
    {
      id: 'apt4',
      title: 'Pressure Vessel Inspection',
      clientId: 'client4',
      clientName: 'Autosterile',
      serviceType: 'Statutory Inspection',
      date: new Date(2025, 2, 25),  // March 25, 2025
      startTime: '08:00',
      endTime: '13:00',
      location: 'Autosterile Factory, Athi River',
      personnel: [
        { id: 'p1', name: 'Donald Mbogho', title: 'Inspector', color: '#0ea5e9' },
        { id: 'p4', name: 'Joseph Maina', title: 'Technical Assistant', color: '#22c55e' }
      ],
      status: 'scheduled'
    },
    {
      id: 'apt5',
      title: 'Environmental Impact Assessment',
      clientId: 'client5',
      clientName: 'National Cement',
      serviceType: 'Environmental Impact Assessment',
      date: new Date(),  // Today
      startTime: '10:00',
      endTime: '15:00',
      location: 'National Cement Factory, Athi River',
      personnel: [
        { id: 'p1', name: 'Donald Mbogho', title: 'Environmental Specialist', color: '#0ea5e9' },
        { id: 'p5', name: 'Mary Njeri', title: 'Environmental Officer', color: '#f43f5e' }
      ],
      status: 'scheduled'
    }
  ];
  
  // Get appointments for a specific day
  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(apt => isSameDay(new Date(apt.date), date));
  };
  
  // Get appointments for the selected date
  const selectedDateAppointments = getAppointmentsForDay(selectedDate);
  
  // Handle day selection
  const handleSelectDay = (day: Date) => {
    setSelectedDate(day);
  };
  
  // Open appointment details
  const handleAppointmentClick = (appointment: ServiceAppointment) => {
    setSelectedAppointment(appointment);
  };
  
  // Status badge styles
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      case 'rescheduled':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Rescheduled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="px-6 py-4 flex-row items-center justify-between space-y-0">
          <CardTitle>Service Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </div>
            <Button variant="outline" size="sm" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-0">
          <div className="grid grid-cols-7 gap-px bg-muted text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-2 font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-muted">
            {days.map((day, dayIdx) => {
              const dayAppointments = getAppointmentsForDay(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    'min-h-28 p-2 bg-white',
                    !isCurrentMonth && 'bg-muted/50 text-muted-foreground',
                    isSelected && 'bg-muted/20'
                  )}
                  onClick={() => handleSelectDay(day)}
                >
                  <div className={cn(
                    'flex items-center justify-center h-7 w-7 rounded-full text-sm',
                    isToday(day) && 'bg-primary text-primary-foreground font-semibold',
                    isSelected && !isToday(day) && 'border border-primary text-primary font-semibold'
                  )}>
                    {format(day, 'd')}
                  </div>
                  <div className="mt-1 space-y-1 max-h-20 overflow-y-auto">
                    {dayAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="text-xs p-1 rounded truncate cursor-pointer hover:bg-muted"
                        style={{ 
                          backgroundColor: `${apt.personnel[0]?.color}20`,
                          borderLeft: `3px solid ${apt.personnel[0]?.color}`
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAppointmentClick(apt);
                        }}
                      >
                        <div className="font-medium">{apt.startTime} | {apt.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{apt.clientName}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            {isToday(selectedDate) && (
              <Badge className="ml-2 bg-primary text-primary-foreground">Today</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Scheduled appointments and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDateAppointments.length > 0 ? (
            <div className="space-y-4">
              {selectedDateAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleAppointmentClick(apt)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{apt.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {apt.startTime} - {apt.endTime} | {apt.location}
                      </p>
                    </div>
                    {getStatusBadge(apt.status)}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Client:</span> {apt.clientName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Service:</span> {apt.serviceType}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {apt.personnel.map((person) => (
                      <Badge 
                        key={person.id} 
                        className="flex items-center gap-1" 
                        style={{ 
                          backgroundColor: `${person.color}20`,
                          color: person.color,
                          borderColor: `${person.color}40`
                        }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: person.color }}
                        ></span>
                        {person.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CalendarIcon className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <h3 className="font-medium text-muted-foreground">No appointments scheduled</h3>
              <p className="text-sm text-muted-foreground/70 mt-1 mb-4">
                There are no appointments or services scheduled for this date.
              </p>
              <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Dialogs for creating new appointments and viewing appointment details */}
      <CreateAppointmentDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        defaultDate={selectedDate}
      />
      
      {selectedAppointment && (
        <AppointmentDetailDialog
          open={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
}
