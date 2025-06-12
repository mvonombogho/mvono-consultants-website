import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, XCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { gsap } from 'gsap';

interface QuotationItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
}

interface Quotation {
  id: string;
  quotationNumber: string;
  description?: string;
  issueDate: string;
  validUntil: string;
  clientId: string;
  projectId?: string;
  referenceNumber?: string;
  items: QuotationItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: string;
  notes?: string;
  terms?: string;
  createdAt: string;
  updatedAt: string;
}

interface Client {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  clientId: string;
}

interface QuotationFormProps {
  quotation?: Quotation;
  onQuotationAdded: (quotation: Quotation) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function QuotationForm({ quotation, onQuotationAdded, onCancel, isEditing = false }: QuotationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [lastQuotationNumber, setLastQuotationNumber] = useState('');
  
  // Form setup
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      id: quotation?.id || '',
      quotationNumber: quotation?.quotationNumber || '',
      description: quotation?.description || '',
      issueDate: quotation?.issueDate ? new Date(quotation.issueDate) : new Date(),
      validUntil: quotation?.validUntil ? new Date(quotation.validUntil) : new Date(new Date().setDate(new Date().getDate() + 30)),
      clientId: quotation?.clientId || '',
      projectId: quotation?.projectId || '',
      referenceNumber: quotation?.referenceNumber || '',
      items: quotation?.items || [
        { description: '', quantity: 1, unitPrice: 0, taxRate: 16, amount: 0 }
      ],
      status: quotation?.status || 'draft',
      notes: quotation?.notes || '',
      terms: quotation?.terms || 'This quotation is valid for 30 days from the issue date.\nPayment terms: 50% advance, 50% upon completion.\nPrices are subject to change if the order is delayed beyond the validity period.',
    }
  });

  // Items field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  // Watch values for calculations
  const formValues = watch();
  const watchedClientId = watch('clientId');
  
  // Load clients and projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clients
        const clientsResponse = await fetch('/api/clients');
        if (!clientsResponse.ok) throw new Error('Failed to fetch clients');
        const clientsData = await clientsResponse.json();
        setClients(clientsData);
        
        // Fetch projects
        const projectsResponse = await fetch('/api/projects');
        if (!projectsResponse.ok) throw new Error('Failed to fetch projects');
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
        
        // Get last quotation number
        if (!isEditing) {
          const quotationsResponse = await fetch('/api/quotations/last-number');
          if (quotationsResponse.ok) {
            const { lastNumber } = await quotationsResponse.json();
            if (lastNumber) {
              setLastQuotationNumber(lastNumber);
              // Generate next number
              const numberPart = parseInt(lastNumber.replace('QT-', ''));
              const nextNumber = `QT-${(numberPart + 1).toString().padStart(4, '0')}`;
              setValue('quotationNumber', nextNumber);
            } else {
              // No quotations yet
              setValue('quotationNumber', 'QT-0001');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load necessary data",
          variant: "destructive",
        });
      }
    };
    
    fetchData();
  }, []);
  
  // Filter projects based on selected client
  useEffect(() => {
    if (watchedClientId) {
      const filtered = projects.filter(project => project.clientId === watchedClientId);
      setFilteredProjects(filtered);
      
      // If the currently selected project doesn't belong to the selected client, clear it
      const currentProjectId = watch('projectId');
      if (currentProjectId && !filtered.find(p => p.id === currentProjectId)) {
        setValue('projectId', '');
      }
    } else {
      setFilteredProjects([]);
      setValue('projectId', '');
    }
  }, [watchedClientId, projects]);
  
  // Calculate item amounts and totals
  useEffect(() => {
    let subtotal = 0;
    let taxAmount = 0;
    
    formValues.items.forEach((item, index) => {
      const quantity = parseFloat(item.quantity.toString()) || 0;
      const unitPrice = parseFloat(item.unitPrice.toString()) || 0;
      const taxRate = parseFloat(item.taxRate.toString()) || 0;
      
      const amount = quantity * unitPrice;
      const itemTax = amount * (taxRate / 100);
      
      setValue(`items.${index}.amount`, amount);
      
      subtotal += amount;
      taxAmount += itemTax;
    });
    
    const totalAmount = subtotal + taxAmount;
    
    document.getElementById('subtotal')!.textContent = subtotal.toFixed(2);
    document.getElementById('taxAmount')!.textContent = taxAmount.toFixed(2);
    document.getElementById('totalAmount')!.textContent = totalAmount.toFixed(2);
  }, [formValues.items]);
  
  // Animation for new items
  useEffect(() => {
    gsap.from('.item-row:last-child', {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, [fields.length]);
  
  // Form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Calculate totals
      let subtotal = 0;
      let taxAmount = 0;
      
      const items = data.items.map(item => {
        const quantity = parseFloat(item.quantity) || 0;
        const unitPrice = parseFloat(item.unitPrice) || 0;
        const taxRate = parseFloat(item.taxRate) || 0;
        
        const amount = quantity * unitPrice;
        const itemTax = amount * (taxRate / 100);
        
        subtotal += amount;
        taxAmount += itemTax;
        
        return {
          ...item,
          quantity,
          unitPrice,
          taxRate,
          amount
        };
      });
      
      const totalAmount = subtotal + taxAmount;
      
      // Prepare quotation data
      const quotationData = {
        ...data,
        items,
        subtotal,
        taxAmount,
        totalAmount,
        issueDate: data.issueDate.toISOString(),
        validUntil: data.validUntil.toISOString()
      };
      
      // Send to API
      const url = isEditing ? `/api/quotations/${data.id}` : '/api/quotations';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quotationData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save quotation');
      }
      
      const savedQuotation = await response.json();
      
      onQuotationAdded(savedQuotation);
      toast({
        title: isEditing ? "Quotation Updated" : "Quotation Created",
        description: `Quotation ${savedQuotation.quotationNumber} has been successfully ${isEditing ? 'updated' : 'created'}.`,
      });
    } catch (error) {
      console.error('Error saving quotation:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save quotation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Add new item
  const addItem = () => {
    append({ description: '', quantity: 1, unitPrice: 0, taxRate: 16, amount: 0 });
  };
  
  // Convert to invoice
  const convertToInvoice = async () => {
    // Implementation would be added here
    toast({
      title: "Feature Coming Soon",
      description: "Convert to invoice functionality is under development.",
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="quotationNumber">Quotation Number</Label>
            <Input
              id="quotationNumber"
              {...register('quotationNumber', { required: 'Quotation number is required' })}
              className={errors.quotationNumber ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.quotationNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.quotationNumber.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="clientId">Client</Label>
            <Select 
              onValueChange={(value) => setValue('clientId', value)} 
              value={formValues.clientId}
              disabled={isSubmitting}
            >
              <SelectTrigger className={errors.clientId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.clientId && (
              <p className="text-red-500 text-sm mt-1">{errors.clientId.message}</p>
            )}
          </div>
          
          {watchedClientId && filteredProjects.length > 0 && (
            <div>
              <Label htmlFor="projectId">Project (Optional)</Label>
              <Select 
                onValueChange={(value) => setValue('projectId', value)} 
                value={formValues.projectId}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {filteredProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <Label htmlFor="referenceNumber">Reference Number (Optional)</Label>
            <Input
              id="referenceNumber"
              {...register('referenceNumber')}
              disabled={isSubmitting}
              placeholder="Client reference or order number"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="issueDate">Issue Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${errors.issueDate ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formValues.issueDate ? format(formValues.issueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formValues.issueDate}
                  onSelect={(date) => setValue('issueDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.issueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.issueDate.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="validUntil">Valid Until</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${errors.validUntil ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formValues.validUntil ? format(formValues.validUntil, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formValues.validUntil}
                  onSelect={(date) => setValue('validUntil', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.validUntil && (
              <p className="text-red-500 text-sm mt-1">{errors.validUntil.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              onValueChange={(value) => setValue('status', value)} 
              value={formValues.status}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="converted">Converted to Invoice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              {...register('description')}
              disabled={isSubmitting}
              placeholder="Brief description of the quotation"
            />
          </div>
        </div>
      </div>
      
      {/* Items Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-2 text-sm font-medium text-gray-500">Description</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-500 w-24">Quantity</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-500 w-32">Unit Price</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-500 w-24">Tax (%)</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-500 w-32">Amount</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-500 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="border-b item-row">
                  <td className="px-4 py-2">
                    <Input
                      {...register(`items.${index}.description`, { required: 'Description is required' })}
                      className={errors.items?.[index]?.description ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                      placeholder="Item description"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      {...register(`items.${index}.quantity`, { 
                        required: 'Required',
                        min: { value: 0.01, message: 'Min 0.01' } 
                      })}
                      type="number"
                      step="0.01"
                      className={errors.items?.[index]?.quantity ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      {...register(`items.${index}.unitPrice`, { 
                        required: 'Required',
                        min: { value: 0, message: 'Min 0' } 
                      })}
                      type="number"
                      step="0.01"
                      className={errors.items?.[index]?.unitPrice ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      {...register(`items.${index}.taxRate`, { 
                        required: 'Required',
                        min: { value: 0, message: 'Min 0' } 
                      })}
                      type="number"
                      step="0.01"
                      className={errors.items?.[index]?.taxRate ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      value={field.amount?.toFixed(2) || '0.00'}
                      disabled
                      className="bg-gray-50"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => remove(index)}
                      disabled={fields.length <= 1 || isSubmitting}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="px-4 py-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addItem}
                    disabled={isSubmitting}
                    className="text-primary border-primary hover:bg-primary/10"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </td>
              </tr>
              <tr className="border-t">
                <td colSpan={3} className="px-4 py-2"></td>
                <td className="px-4 py-2 text-right font-medium">Subtotal:</td>
                <td className="px-4 py-2 font-medium">
                  <span id="subtotal">0.00</span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-2"></td>
                <td className="px-4 py-2 text-right font-medium">Tax:</td>
                <td className="px-4 py-2 font-medium">
                  <span id="taxAmount">0.00</span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-2"></td>
                <td className="px-4 py-2 text-right font-bold">Total:</td>
                <td className="px-4 py-2 font-bold text-primary">
                  <span id="totalAmount">0.00</span>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            rows={4}
            disabled={isSubmitting}
            placeholder="Additional notes for the client"
          />
        </div>
        <div>
          <Label htmlFor="terms">Terms & Conditions</Label>
          <Textarea
            id="terms"
            {...register('terms')}
            rows={4}
            disabled={isSubmitting}
            placeholder="Terms and conditions for the quotation"
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-2 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        
        {isEditing && formValues.status !== 'converted' && (
          <Button 
            type="button" 
            variant="secondary" 
            onClick={convertToInvoice}
            disabled={isSubmitting}
          >
            Convert to Invoice
          </Button>
        )}
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Quotation' : 'Create Quotation'}
        </Button>
      </div>
    </form>
  );
}
