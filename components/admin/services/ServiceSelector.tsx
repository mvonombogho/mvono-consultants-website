"use client";

import { useState, useEffect } from 'react';
import { CheckCircle2, Search, FilterIcon } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Service = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type SelectedService = Service & {
  quantity: number;
  discount?: number;
  notes?: string;
};

type ServiceSelectorProps = {
  onSelectService: (service: SelectedService) => void;
  selectedServices?: SelectedService[];
};

const ServiceSelector = ({ onSelectService, selectedServices = [] }: ServiceSelectorProps) => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        
        // Filter out inactive services and already selected services
        const activeServices = data.filter((service: Service) => 
          service.isActive && !selectedServices.some(s => s.id === service.id)
        );
        
        setServices(activeServices);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(activeServices.map((service: Service) => service.category)));
        setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast({
          title: 'Error',
          description: 'Failed to load services',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [toast, selectedServices]);

  // Filtered services
  const filteredServices = services.filter((service) => {
    const matchesSearch = searchTerm === '' || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === '' || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Handle service selection
  const handleSelectService = (service: Service) => {
    onSelectService({
      ...service,
      quantity: 1,
      discount: 0,
      notes: '',
    });

    // Remove the selected service from the list
    setServices(services.filter(s => s.id !== service.id));

    toast({
      title: 'Service Added',
      description: `${service.name} has been added to the quote`,
    });
  };

  // Format price
  const formatPrice = (price: number | null) => {
    if (price === null) return 'N/A';
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <FilterIcon size={16} />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No matching services found</p>
          <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 gap-3 pr-4">
            {filteredServices.map((service) => (
              <Card 
                key={service.id} 
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelectService(service)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{service.name}</h4>
                      <Badge variant="outline" size="sm">{service.category}</Badge>
                    </div>
                    {service.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {formatPrice(service.price)}
                    </span>
                    <div className="text-primary hover:text-primary/80">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ServiceSelector;