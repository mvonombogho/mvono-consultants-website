"use client";

import { useState } from 'react';
import { Save, Trash2, Pencil, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

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

type ServiceEditorProps = {
  services: SelectedService[];
  onUpdate: (services: SelectedService[]) => void;
  onRemove: (serviceId: string) => void;
};

const ServiceEditor = ({ services, onUpdate, onRemove }: ServiceEditorProps) => {
  const [editingService, setEditingService] = useState<SelectedService | null>(null);
  const [open, setOpen] = useState(false);

  // Format price
  const formatPrice = (price: number | null) => {
    if (price === null) return 'N/A';
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  // Calculate item total
  const calculateTotal = (service: SelectedService) => {
    if (service.price === null) return 'N/A';
    
    const basePrice = service.price * service.quantity;
    const discountAmount = basePrice * (service.discount || 0) / 100;
    
    return formatPrice(basePrice - discountAmount);
  };

  // Handle edit click
  const handleEditClick = (service: SelectedService) => {
    setEditingService({ ...service });
    setOpen(true);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (!editingService) return;
    
    // Update the service in the services array
    const updatedServices = services.map(service => 
      service.id === editingService.id ? editingService : service
    );
    
    onUpdate(updatedServices);
    setOpen(false);
  };

  return (
    <>
      <div className="space-y-3">
        {services.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No services added yet. Please add services to continue.
          </div>
        ) : (
          services.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{service.name}</h4>
                      <div className="font-semibold">
                        {calculateTotal(service)}
                      </div>
                    </div>
                    
                    {service.description && (
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <span>Quantity: {service.quantity}</span>
                      <span>Unit Price: {formatPrice(service.price)}</span>
                      {service.discount ? <span>Discount: {service.discount}%</span> : null}
                    </div>
                    
                    {service.notes && (
                      <p className="text-xs italic mt-2 border-t pt-1">
                        Note: {service.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleEditClick(service)}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onRemove(service.id)}
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Service Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Service</SheetTitle>
            <SheetDescription>
              Adjust the quantity, discount, and notes for this service.
            </SheetDescription>
          </SheetHeader>
          
          {editingService && (
            <div className="py-6 space-y-6">
              <div>
                <h3 className="font-medium">{editingService.name}</h3>
                <p className="text-sm text-muted-foreground">{editingService.category}</p>
                <p className="text-sm mt-1">Unit Price: {formatPrice(editingService.price)}</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min={1}
                    value={editingService.quantity} 
                    onChange={(e) => setEditingService({
                      ...editingService,
                      quantity: parseInt(e.target.value) || 1,
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input 
                    id="discount" 
                    type="number" 
                    min={0}
                    max={100}
                    value={editingService.discount || 0} 
                    onChange={(e) => setEditingService({
                      ...editingService,
                      discount: parseInt(e.target.value) || 0,
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add any special requirements or notes" 
                    value={editingService.notes || ''} 
                    onChange={(e) => setEditingService({
                      ...editingService,
                      notes: e.target.value,
                    })}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Total:</div>
                  <div className="text-lg font-bold">{calculateTotal(editingService)}</div>
                </div>
              </div>
            </div>
          )}
          
          <SheetFooter className="pt-6">
            <SheetClose asChild>
              <Button variant="outline" className="gap-2">
                <X size={16} />
                Cancel
              </Button>
            </SheetClose>
            <Button onClick={handleSaveChanges} className="gap-2">
              <Save size={16} />
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ServiceEditor;