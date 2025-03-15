"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

type Client = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  name: string;
};

type Anniversary = {
  id: string;
  title: string;
  description?: string;
  anniversaryDate: string;
  serviceId: string;
  clientId: string;
  yearsOfService: number;
  status: string;
  notes?: string;
  client: Client;
  service: Service;
};

type AnniversaryModalProps = {
  anniversary: Anniversary | null;
  isOpen: boolean;
  onClose: (refreshData?: boolean) => void;
};

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  anniversaryDate: z.date({
    required_error: 'Anniversary date is required',
  }),
  serviceId: z.string({
    required_error: 'Service is required',
  }),
  clientId: z.string({
    required_error: 'Client is required',
  }),
  yearsOfService: z.number({
    required_error: 'Years of service is required',
    invalid_type_error: 'Years of service must be a number',
  }).int().positive(),
  status: z.string({
    required_error: 'Status is required',
  }),
  notes: z.string().optional(),
});

export default function AnniversaryModal({ anniversary, isOpen, onClose }: AnniversaryModalProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      anniversaryDate: new Date(),
      serviceId: '',
      clientId: '',
      yearsOfService: 1,
      status: 'upcoming',
      notes: '',
    },
  });
  
  // Fetch clients and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsResponse, servicesResponse] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/services')
        ]);
        
        if (clientsResponse.ok) {
          const clientsData = await clientsResponse.json();
          setClients(clientsData);
        }
        
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  // Populate form when editing an existing anniversary
  useEffect(() => {
    if (anniversary) {
      form.reset({
        title: anniversary.title,
        description: anniversary.description || '',
        anniversaryDate: new Date(anniversary.anniversaryDate),
        serviceId: anniversary.serviceId,
        clientId: anniversary.clientId,
        yearsOfService: anniversary.yearsOfService,
        status: anniversary.status,
        notes: anniversary.notes || '',
      });
    }
  }, [anniversary, form]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const url = anniversary ? `/api/anniversary/${anniversary.id}` : '/api/anniversary';
      const method = anniversary ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        onClose(true);
      } else {
        const error = await response.json();
        console.error('Error submitting form:', error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!anniversary) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/anniversary/${anniversary.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onClose(true);
      } else {
        const error = await response.json();
        console.error('Error deleting anniversary:', error);
      }
    } catch (error) {
      console.error('Error deleting anniversary:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{anniversary ? 'Edit Service Anniversary' : 'Add Service Anniversary'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter anniversary title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="acknowledged">Acknowledged</SelectItem>
                        <SelectItem value="celebrated">Celebrated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />