'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, FileText, AlertTriangle, CheckCircle, Pencil, Trash2, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Appointment type definitions from ServiceCalendar.tsx
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

interface AppointmentDetailDialogProps {
  open: boolean;
  onClose: () => void;
  appointment: ServiceAppointment;
}

export function AppointmentDetailDialog({ open, onClose, appointment }: AppointmentDetailDialogProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Handle appointment cancellation
  const handleCancelAppointment = () => {
    setIsProcessing(true);
    
    // In a real implementation, this would call an API to update the appointment status
    console.log('Cancelling appointment', appointment.id);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowCancelDialog(false);
      onClose();
      // Would show success message in real implementation
    }, 1000);
  };
  
  // Handle marking appointment as completed
  const handleCompleteAppointment = () => {
    setIsProcessing(true);
    
    // In a real implementation, this would call an API to update the appointment status
    console.log('Completing appointment', appointment.id);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowCompleteDialog(false);
      onClose();
      // Would show success message in real implementation
    }, 1000);
  };
  
  // Get status badge based on status
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Scheduled
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Completed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            Cancelled
          </Badge>
        );
      case 'rescheduled':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            Rescheduled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{appointment.title}</DialogTitle>
              {getStatusBadge(appointment.status)}
            </div>
            <DialogDescription>
              Appointment details and management
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{appointment.startTime} - {appointment.endTime}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{appointment.location}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Client Details</h4>
              <div className="bg-background p-4 rounded-lg border space-y-2">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">{appointment.clientName}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{appointment.serviceType}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Assigned Personnel</h4>
              <div className="flex flex-wrap gap-2">
                {appointment.personnel.map((person) => (
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
                    {person.name} ({person.title})
                  </Badge>
                ))}
              </div>
            </div>
            
            {appointment.notes && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Notes</h4>
                <div className="bg-muted/50 p-4 rounded-lg text-sm">
                  {appointment.notes}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <div className="flex w-full items-center justify-between">
              <div>
                {appointment.status === 'scheduled' && (
                  <Button 
                    variant="destructive" 
                    onClick={() => setShowCancelDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel Appointment
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                
                {appointment.status === 'scheduled' && (
                  <>
                    <Button onClick={() => setShowCompleteDialog(true)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                    
                    <Button variant="secondary">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Appointment Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelAppointment}
              disabled={isProcessing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isProcessing ? 'Cancelling...' : 'Yes, Cancel Appointment'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Complete Appointment Confirmation Dialog */}
      <AlertDialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Completed</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this appointment as completed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCompleteAppointment}
              disabled={isProcessing}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isProcessing ? 'Processing...' : 'Yes, Mark as Completed'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
