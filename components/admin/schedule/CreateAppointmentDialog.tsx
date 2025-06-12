'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, X } from 'lucide-react';
import { format, addHours } from 'date-fns';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  defaultDate: Date;
}

export function CreateAppointmentDialog({ open, onClose, defaultDate }: CreateAppointmentDialogProps) {
  const [date, setDate] = useState<Date>(defaultDate);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>([]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real implementation, this would send data to an API
    console.log('Submitting appointment', {
      date,
      startTime,
      endTime,
      // other form fields would be captured here
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // Would show success message in real implementation
    }, 1000);
  };
  
  // Mock personnel data
  const personnel = [
    { id: 'p1', name: 'Donald Mbogho', title: 'Safety Advisor' },
    { id: 'p2', name: 'James Ochieng', title: 'Inspector' },
    { id: 'p3', name: 'Sarah Kimani', title: 'Training Specialist' },
    { id: 'p4', name: 'Joseph Maina', title: 'Technical Assistant' },
    { id: 'p5', name: 'Mary Njeri', title: 'Environmental Officer' },
  ];
  
  // Mock client data
  const clients = [
    { id: 'client1', name: 'Lafarge' },
    { id: 'client2', name: 'KTDA' },
    { id: 'client3', name: 'Dormans Coffee' },
    { id: 'client4', name: 'Autosterile' },
    { id: 'client5', name: 'National Cement' },
    { id: 'client6', name: 'Unga Group' },
    { id: 'client7', name: 'Movenpick' },
    { id: 'client8', name: 'Husseini Builders' },
  ];
  
  // Mock service types
  const serviceTypes = [
    'Environmental Impact Assessment',
    'Occupational Safety',
    'Fire Safety Audit',
    'Energy Audit',
    'Statutory Inspection',
    'Non-Destructive Testing',
    'Fire Safety Training',
    'First Aider Training',
  ];
  
  // Handle personnel selection
  const handlePersonnelSelect = (id: string) => {
    setSelectedPersonnel(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>
            Create a new service appointment or booking for a client.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Appointment Title</Label>
              <Input id="title" required placeholder="Enter appointment title" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select required>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={date => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-type">Service Type</Label>
              <Select required>
                <SelectTrigger id="service-type">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" required placeholder="Enter location" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Assigned Personnel</Label>
            <div className="border rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {personnel.map(person => (
                  <div 
                    key={person.id} 
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors",
                      selectedPersonnel.includes(person.id) 
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                    onClick={() => handlePersonnelSelect(person.id)}
                  >
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={selectedPersonnel.includes(person.id)}
                      onChange={() => {}}
                    />
                    <div>
                      <p className="text-sm font-medium">{person.name}</p>
                      <p className="text-xs">{person.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Add any additional notes or information about this appointment"
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
