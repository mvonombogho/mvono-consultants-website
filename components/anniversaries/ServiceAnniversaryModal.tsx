'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface ServiceAnniversaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  anniversary?: any | null;
}

const ServiceAnniversaryModal = ({ isOpen, onClose, onSave, anniversary }: ServiceAnniversaryModalProps) => {
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    anniversaryDate: new Date(),
    serviceId: '',
    clientId: '',
    yearsOfService: 1,
    status: 'upcoming',
    notes: '',
  });

  // Fetch clients and services for the dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await fetch('/api/clients');
        const clientsData = await clientsResponse.json();
        
        const servicesResponse = await fetch('/api/services');
        const servicesData = await servicesResponse.json();
        
        if (clientsData.success) {
          setClients(clientsData.clients);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch clients",
            variant: "destructive",
          });
        }
        
        if (servicesData.success) {
          setServices(servicesData.services);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch services",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch required data",
          variant: "destructive",
        });
      }
    };
    
    fetchData();
  }, [toast]);

  // Initialize form data if anniversary is provided
  useEffect(() => {
    if (anniversary) {
      setFormData({
        id: anniversary.id || '',
        title: anniversary.title || '',
        description: anniversary.description || '',
        anniversaryDate: anniversary.anniversaryDate ? new Date(anniversary.anniversaryDate) : new Date(),
        serviceId: anniversary.serviceId || '',
        clientId: anniversary.clientId || '',
        yearsOfService: anniversary.yearsOfService || 1,
        status: anniversary.status || 'upcoming',
        notes: anniversary.notes || '',
      });
    } else {
      // Reset form for new anniversary
      setFormData({
        id: '',
        title: '',
        description: '',
        anniversaryDate: new Date(),
        serviceId: '',
        clientId: '',
        yearsOfService: 1,
        status: 'upcoming',
        notes: '',
      });
    }
  }, [anniversary]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 1 }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, anniversaryDate: date }));
  };

  const handleSave = () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.clientId) {
      toast({
        title: "Error",
        description: "Client is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.serviceId) {
      toast({
        title: "Error",
        description: "Service is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    onSave(formData);
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{anniversary ? 'Edit Service Anniversary' : 'Create Service Anniversary'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter service anniversary title"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter detailed description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="client">Client</Label>
              <Select 
                value={formData.clientId} 
                onValueChange={(value) => handleSelectChange('clientId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="service">Service</Label>
              <Select 
                value={formData.serviceId} 
                onValueChange={(value) => handleSelectChange('serviceId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-2">
              <Label>Anniversary Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !formData.anniversaryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.anniversaryDate ? format(formData.anniversaryDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.anniversaryDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="yearsOfService">Years of Service</Label>
              <Input
                id="yearsOfService"
                name="yearsOfService"
                type="number"
                min="1"
                value={formData.yearsOfService}
                onChange={handleNumberChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="celebrated">Celebrated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional notes or comments"
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : (anniversary ? 'Update' : 'Create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceAnniversaryModal;
