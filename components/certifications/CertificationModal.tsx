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
import { CalendarIcon, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  certification?: any | null;
}

const CertificationModal = ({ isOpen, onClose, onSave, certification }: CertificationModalProps) => {
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    certType: 'safety',
    issueDate: new Date(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Default to 1 year expiry
    status: 'active',
    clientId: '',
    documentId: '',
    reminderSent: false,
    notes: '',
  });

  // Fetch clients and documents for the dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await fetch('/api/clients');
        const clientsData = await clientsResponse.json();
        
        const documentsResponse = await fetch('/api/documents?category=certificate');
        const documentsData = await documentsResponse.json();
        
        if (clientsData.success) {
          setClients(clientsData.clients);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch clients",
            variant: "destructive",
          });
        }
        
        if (documentsData.success) {
          setDocuments(documentsData.documents);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch documents",
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

  // Initialize form data if certification is provided
  useEffect(() => {
    if (certification) {
      setFormData({
        id: certification.id || '',
        title: certification.title || '',
        description: certification.description || '',
        certType: certification.certType || 'safety',
        issueDate: certification.issueDate ? new Date(certification.issueDate) : new Date(),
        expiryDate: certification.expiryDate 
          ? new Date(certification.expiryDate) 
          : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        status: certification.status || 'active',
        clientId: certification.clientId || '',
        documentId: certification.documentId || '',
        reminderSent: certification.reminderSent || false,
        notes: certification.notes || '',
      });
    } else {
      // Reset form for new certification
      setFormData({
        id: '',
        title: '',
        description: '',
        certType: 'safety',
        issueDate: new Date(),
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        status: 'active',
        clientId: '',
        documentId: '',
        reminderSent: false,
        notes: '',
      });
    }
  }, [certification]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
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

    if (!formData.issueDate || !formData.expiryDate) {
      toast({
        title: "Error",
        description: "Issue date and expiry date are required",
        variant: "destructive",
      });
      return;
    }

    // Check if expiry date is after issue date
    if (new Date(formData.expiryDate) <= new Date(formData.issueDate)) {
      toast({
        title: "Error",
        description: "Expiry date must be after issue date",
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
          <DialogTitle>{certification ? 'Edit Certification' : 'Create Certification'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter certification title"
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
              <Label htmlFor="certType">Certification Type</Label>
              <Select 
                value={formData.certType} 
                onValueChange={(value) => handleSelectChange('certType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="quality">Quality</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-2">
              <Label>Issue Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !formData.issueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.issueDate ? format(formData.issueDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.issueDate}
                    onSelect={(date) => handleDateChange('issueDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label>Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !formData.expiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expiryDate ? format(formData.expiryDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.expiryDate}
                    onSelect={(date) => handleDateChange('expiryDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="renewal-pending">Renewal Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="documentId">Certificate Document</Label>
              <Select 
                value={formData.documentId} 
                onValueChange={(value) => handleSelectChange('documentId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {documents.map((document) => (
                    <SelectItem key={document.id} value={document.id}>
                      {document.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => {
                    // This would normally open a document upload modal or redirect
                    toast({
                      title: "Info",
                      description: "Document upload functionality will be integrated here",
                    });
                  }}
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload New Certificate</span>
                </Button>
              </div>
            </div>
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
            {isLoading ? 'Saving...' : (certification ? 'Update' : 'Create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationModal;
