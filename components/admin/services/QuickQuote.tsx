"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ListFilter, FilePlus, FileCheck, X } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ServiceSelector from './ServiceSelector';
import ServiceEditor from './ServiceEditor';

type Client = {
  id: string;
  name: string;
};

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

const QuickQuote = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Fetch clients for the dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) throw new Error('Failed to fetch clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: 'Error',
          description: 'Failed to load clients',
          variant: 'destructive',
        });
      } finally {
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, [toast]);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return selectedServices.reduce((total, service) => {
      if (service.price === null) return total;
      
      const basePrice = service.price * service.quantity;
      const discountAmount = basePrice * (service.discount || 0) / 100;
      
      return total + (basePrice - discountAmount);
    }, 0);
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  // Handle adding a service
  const handleAddService = (service: SelectedService) => {
    setSelectedServices([...selectedServices, service]);
  };

  // Handle updating services
  const handleUpdateServices = (updatedServices: SelectedService[]) => {
    setSelectedServices(updatedServices);
  };

  // Handle removing a service
  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter(service => service.id !== serviceId));
  };

  // Handle creating a quote
  const handleCreateQuote = async () => {
    if (!selectedClient) {
      toast({
        title: 'Missing Client',
        description: 'Please select a client to continue',
        variant: 'destructive',
      });
      return;
    }

    if (selectedServices.length === 0) {
      toast({
        title: 'No Services',
        description: 'Please add at least one service to continue',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Create quote items from selected services
      const items = selectedServices.map(service => ({
        description: service.name,
        quantity: service.quantity,
        unitPrice: service.price || 0,
        taxRate: 16, // Default VAT rate in Kenya
        amount: (service.price || 0) * service.quantity * (1 - (service.discount || 0) / 100),
        notes: service.notes || '',
      }));

      // Calculate totals
      const subtotal = calculateSubtotal();
      const taxAmount = subtotal * 0.16; // 16% VAT
      const totalAmount = subtotal + taxAmount;

      // Prepare the quote data
      const quoteData = {
        clientId: selectedClient,
        issueDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days validity
        items,
        subtotal,
        taxAmount,
        totalAmount,
        status: 'draft',
      };

      // Send the quote to the API
      const response = await fetch('/api/quotations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) throw new Error('Failed to create quote');

      const data = await response.json();

      toast({
        title: 'Success',
        description: 'Quote created successfully',
      });

      // Redirect to the new quote
      router.push(`/admin/quotations/${data.id}`);
    } catch (error) {
      console.error('Error creating quote:', error);
      toast({
        title: 'Error',
        description: 'Failed to create quote',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Quote Generator</CardTitle>
          <CardDescription>
            Quickly create quotes by selecting services from your catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {loadingClients ? (
                    <div className="flex justify-center items-center h-10">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="selection">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selection" className="flex items-center gap-2">
                  <ListFilter size={16} />
                  Service Selection
                </TabsTrigger>
                <TabsTrigger value="review" className="flex items-center gap-2">
                  <FileCheck size={16} />
                  Review & Adjust
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="selection" className="p-4 border rounded-md mt-4">
                <ServiceSelector 
                  onSelectService={handleAddService} 
                  selectedServices={selectedServices} 
                />
              </TabsContent>
              
              <TabsContent value="review" className="p-4 border rounded-md mt-4">
                <ServiceEditor 
                  services={selectedServices} 
                  onUpdate={handleUpdateServices} 
                  onRemove={handleRemoveService} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start sm:flex-row sm:items-center justify-between py-6 border-t gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Quote Summary</p>
            <div className="flex gap-4">
              <div>
                <p className="text-sm">Items: <span className="font-medium">{selectedServices.length}</span></p>
              </div>
              <div>
                <p className="text-sm">Subtotal: <span className="font-medium">{formatPrice(calculateSubtotal())}</span></p>
              </div>
              <div>
                <p className="text-sm">Total with VAT: <span className="font-medium">{formatPrice(calculateSubtotal() * 1.16)}</span></p>
              </div>
            </div>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="flex items-center gap-2"
                disabled={selectedServices.length === 0 || !selectedClient}
              >
                <FilePlus size={16} />
                Generate Quote
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Quote Creation</DialogTitle>
                <DialogDescription>
                  Review the quote details before creating. You can edit the quote further later.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Client</h4>
                  <p>{clients.find(c => c.id === selectedClient)?.name || 'Unknown'}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Services</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedServices.map(service => (
                      <li key={service.id}>
                        {service.name} x {service.quantity}
                        {service.discount ? ` (${service.discount}% discount)` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (16%):</span>
                    <span>{formatPrice(calculateSubtotal() * 0.16)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t mt-2">
                    <span>Total:</span>
                    <span>{formatPrice(calculateSubtotal() * 1.16)}</span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                  className="flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateQuote} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>}
                  <FilePlus size={16} />
                  Create Quote
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default QuickQuote;