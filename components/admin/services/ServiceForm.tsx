"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Form schema
const serviceFormSchema = z.object({
  name: z.string().min(1, { message: 'Service name is required' }),
  description: z.string().optional(),
  category: z.string().min(1, { message: 'Category is required' }),
  price: z.union([
    z.number().nonnegative({ message: 'Price must be a positive number' }),
    z.string().transform((val) => {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? 0 : parsed;
    }),
  ]),
  isActive: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

type ServiceFormProps = {
  serviceId?: string;
};

// Service categories
const SERVICE_CATEGORIES = [
  'Training Services',
  'Safety Services',
  'Inspection Services',
  'Energy Services',
  'Environmental Services',
  'Specialized Services',
];

const ServiceForm = ({ serviceId }: ServiceFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const isEditMode = !!serviceId;

  // Initialize form
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: 0,
      isActive: true,
    },
  });

  // Fetch service data if in edit mode
  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/services/${serviceId}`);
          if (!response.ok) throw new Error('Failed to fetch service');
          
          const data = await response.json();
          
          // Update form values
          form.reset({
            name: data.name,
            description: data.description || '',
            category: data.category,
            price: data.price || 0,
            isActive: data.isActive,
          });
        } catch (error) {
          console.error('Error fetching service:', error);
          toast({
            title: 'Error',
            description: 'Failed to load service data',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      };

      fetchService();
    }
  }, [serviceId, form, toast]);

  // Form submission handler
  const onSubmit = async (values: ServiceFormValues) => {
    setLoading(true);
    try {
      const endpoint = isEditMode ? `/api/services/${serviceId}` : '/api/services';
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} service`);

      toast({
        title: 'Success',
        description: `Service ${isEditMode ? 'updated' : 'created'} successfully`,
      });

      // Redirect back to service list
      router.push('/admin/services');
      router.refresh();
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} service:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${isEditMode ? 'update' : 'create'} service`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!serviceId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete service');

      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });

      // Redirect back to service list
      router.push('/admin/services');
      router.refresh();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Back to Service Catalog
        </Button>
        
        {isEditMode && (
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-2">
                <Trash2 size={16} />
                Delete Service
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the service and remove it from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Service' : 'Create New Service'}</CardTitle>
          <CardDescription>
            {isEditMode 
              ? 'Update service details, pricing, and status' 
              : 'Add a new service to your catalog with pricing and category'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter service name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SERVICE_CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
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
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (KES)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter price" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter service description" 
                            className="min-h-32" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Service Status</FormLabel>
                          <FormDescription>
                            {field.value ? 'This service is active and available' : 'This service is currently inactive'}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <CardFooter className="px-0 pb-0 pt-6">
                <Button 
                  type="submit" 
                  className="ml-auto flex items-center gap-2"
                  disabled={loading}
                >
                  {loading && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>}
                  <Save size={16} />
                  {isEditMode ? 'Save Changes' : 'Create Service'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceForm;