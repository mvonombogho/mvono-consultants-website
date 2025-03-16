import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, FileText, Download, Eye, MoreHorizontal, Calendar, Building, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import QuotationForm from '@/components/admin/finance/QuotationForm';
import { formatCurrency, formatDate } from '@/lib/utils';

interface QuotationItem {
  id: string;
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
  client: {
    id: string;
    name: string;
  };
  projectId?: string;
  project?: {
    id: string;
    title: string;
  };
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

interface QuotationListProps {
  quotations: Quotation[];
  isLoading: boolean;
  onQuotationDeleted: (id: string) => void;
  onQuotationUpdated: (quotation: Quotation) => void;
}

export default function QuotationList({ quotations, isLoading, onQuotationDeleted, onQuotationUpdated }: QuotationListProps) {
  const { toast } = useToast();
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [deletingQuotation, setDeletingQuotation] = useState<Quotation | null>(null);
  const [viewingQuotation, setViewingQuotation] = useState<Quotation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-amber-100 text-amber-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Delete quotation function
  const deleteQuotation = async () => {
    if (!deletingQuotation) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/quotations/${deletingQuotation.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete quotation');
      
      onQuotationDeleted(deletingQuotation.id);
      toast({
        title: "Quotation deleted",
        description: `Quotation ${deletingQuotation.quotationNumber} has been successfully removed.`,
      });
    } catch (error) {
      console.error('Error deleting quotation:', error);
      toast({
        title: "Error",
        description: "Failed to delete quotation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeletingQuotation(null);
    }
  };

  // Convert to invoice function
  const convertToInvoice = async (quotation: Quotation) => {
    setIsConverting(true);
    try {
      const response = await fetch(`/api/quotations/${quotation.id}/convert`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to convert quotation to invoice');
      
      const data = await response.json();
      
      // Update the quotation with converted status
      onQuotationUpdated({
        ...quotation,
        status: 'converted'
      });
      
      toast({
        title: "Conversion successful",
        description: `Quotation ${quotation.quotationNumber} has been converted to Invoice ${data.invoiceNumber}.`,
      });
    } catch (error) {
      console.error('Error converting quotation:', error);
      toast({
        title: "Error",
        description: "Failed to convert quotation to invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  // Generate PDF function
  const generatePDF = (quotation: Quotation) => {
    toast({
      title: "PDF Generation",
      description: `Generating PDF for quotation ${quotation.quotationNumber}...`,
    });
    // Actual PDF generation logic would go here
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full overflow-hidden animate-pulse">
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/6 mb-4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Empty state
  if (!quotations.length) {
    return (
      <Card className="w-full overflow-hidden bg-gray-50 border-dashed border-2 quotation-item">
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-500">No Quotations Found</h3>
          <p className="text-gray-400 text-center mt-2 max-w-md">
            You haven't created any quotations yet. Click the "Create Quotation" button to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Quotation list
  return (
    <>
      <div className="space-y-4">
        {quotations.map((quotation) => {
          const statusClass = getStatusColor(quotation.status);
          const isExpired = new Date(quotation.validUntil) < new Date() && quotation.status.toLowerCase() !== 'converted' && quotation.status.toLowerCase() !== 'accepted';
          
          return (
            <Card 
              key={quotation.id} 
              className={`w-full overflow-hidden hover:shadow-md transition-shadow duration-300 quotation-item ${isExpired ? 'border-l-4 border-amber-500' : ''}`}
            >
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-gray-900">Quotation #{quotation.quotationNumber}</h3>
                        <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                          {quotation.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Building className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{quotation.client?.name || 'Unknown Client'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">{formatCurrency(quotation.totalAmount)}</span>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setViewingQuotation(quotation)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingQuotation(quotation)} disabled={quotation.status === 'converted'}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatePDF(quotation)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          {quotation.status !== 'converted' && (
                            <DropdownMenuItem onClick={() => convertToInvoice(quotation)} disabled={isConverting}>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Convert to Invoice
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setDeletingQuotation(quotation)}
                            className="text-red-600 focus:text-red-600"
                            disabled={quotation.status === 'converted'}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">Issue Date</span>
                      <span className="font-medium flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {formatDate(quotation.issueDate)}
                      </span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">Valid Until</span>
                      <span className={`font-medium flex items-center ${isExpired ? 'text-amber-600' : ''}`}>
                        <Calendar className={`h-3.5 w-3.5 mr-1 ${isExpired ? 'text-amber-400' : 'text-gray-400'}`} />
                        {formatDate(quotation.validUntil)}
                        {isExpired && <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Expired</span>}
                      </span>
                    </div>
                    
                    {quotation.referenceNumber && (
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Reference Number</span>
                        <span className="font-medium">{quotation.referenceNumber}</span>
                      </div>
                    )}
                    
                    {quotation.project && (
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Project</span>
                        <span className="font-medium truncate">{quotation.project.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Quotation Dialog */}
      {editingQuotation && (
        <Dialog open={!!editingQuotation} onOpenChange={(open) => !open && setEditingQuotation(null)}>
          <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Edit Quotation #{editingQuotation.quotationNumber}</DialogTitle>
            </DialogHeader>
            <QuotationForm 
              quotation={editingQuotation} 
              onQuotationAdded={onQuotationUpdated}
              onCancel={() => setEditingQuotation(null)}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* View Quotation Dialog */}
      {viewingQuotation && (
        <Dialog open={!!viewingQuotation} onOpenChange={(open) => !open && setViewingQuotation(null)}>
          <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Quotation #{viewingQuotation.quotationNumber}</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              {/* Quotation preview would go here */}
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">Client</h3>
                  <p>{viewingQuotation.client?.name}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-lg">Amount</h3>
                  <p className="text-xl font-bold text-primary">{formatCurrency(viewingQuotation.totalAmount)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-bold">Issue Date</h3>
                  <p>{formatDate(viewingQuotation.issueDate)}</p>
                </div>
                <div>
                  <h3 className="font-bold">Valid Until</h3>
                  <p>{formatDate(viewingQuotation.validUntil)}</p>
                </div>
                {viewingQuotation.referenceNumber && (
                  <div>
                    <h3 className="font-bold">Reference Number</h3>
                    <p>{viewingQuotation.referenceNumber}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-bold">Status</h3>
                  <p className={`inline-block px-2 py-1 rounded ${getStatusColor(viewingQuotation.status)}`}>
                    {viewingQuotation.status}
                  </p>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2">Items</h3>
              <div className="border rounded-md mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {viewingQuotation.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 whitespace-normal text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Subtotal</td>
                      <td className="px-4 py-2 text-sm font-medium text-right">{formatCurrency(viewingQuotation.subtotal)}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Tax</td>
                      <td className="px-4 py-2 text-sm font-medium text-right">{formatCurrency(viewingQuotation.taxAmount)}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right font-bold">Total</td>
                      <td className="px-4 py-2 text-sm font-bold text-right">{formatCurrency(viewingQuotation.totalAmount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {viewingQuotation.terms && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-2">Terms & Conditions</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{viewingQuotation.terms}</p>
                </div>
              )}
              
              {viewingQuotation.notes && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-2">Notes</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{viewingQuotation.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewingQuotation(null)}>Close</Button>
                <Button onClick={() => generatePDF(viewingQuotation)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingQuotation && (
        <Dialog open={!!deletingQuotation} onOpenChange={(open) => !open && setDeletingQuotation(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete quotation #{deletingQuotation.quotationNumber}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeletingQuotation(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={deleteQuotation}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
