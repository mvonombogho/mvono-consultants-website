import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, FileText, Download, Eye, MoreHorizontal, Calendar, Building } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InvoiceForm from '@/components/admin/InvoiceForm';
import { formatCurrency, formatDate } from '@/lib/utils';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  description?: string;
  issueDate: string;
  dueDate: string;
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
  lpoReference?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface InvoiceListProps {
  invoices: Invoice[];
  isLoading: boolean;
  onInvoiceDeleted: (id: string) => void;
  onInvoiceUpdated: (invoice: Invoice) => void;
}

export default function InvoiceList({ invoices, isLoading, onInvoiceDeleted, onInvoiceUpdated }: InvoiceListProps) {
  const { toast } = useToast();
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [deletingInvoice, setDeletingInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-amber-100 text-amber-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Delete invoice function
  const deleteInvoice = async () => {
    if (!deletingInvoice) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/invoices/${deletingInvoice.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete invoice');
      
      onInvoiceDeleted(deletingInvoice.id);
      toast({
        title: "Invoice deleted",
        description: `Invoice ${deletingInvoice.invoiceNumber} has been successfully removed.`,
      });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast({
        title: "Error",
        description: "Failed to delete invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeletingInvoice(null);
    }
  };

  // Generate PDF function
  const generatePDF = (invoice: Invoice) => {
    toast({
      title: "PDF Generation",
      description: `Generating PDF for invoice ${invoice.invoiceNumber}...`,
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
  if (!invoices.length) {
    return (
      <Card className="w-full overflow-hidden bg-gray-50 border-dashed border-2 invoice-item">
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-500">No Invoices Found</h3>
          <p className="text-gray-400 text-center mt-2 max-w-md">
            You haven't created any invoices yet. Click the "Create Invoice" button to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Invoice list
  return (
    <>
      <div className="space-y-4">
        {invoices.map((invoice) => {
          const statusClass = getStatusColor(invoice.status);
          const isOverdue = new Date(invoice.dueDate) < new Date() && invoice.status.toLowerCase() !== 'paid';
          
          return (
            <Card 
              key={invoice.id} 
              className={`w-full overflow-hidden hover:shadow-md transition-shadow duration-300 invoice-item ${isOverdue ? 'border-l-4 border-red-500' : ''}`}
            >
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-gray-900">Invoice #{invoice.invoiceNumber}</h3>
                        <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                          {invoice.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Building className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{invoice.client?.name || 'Unknown Client'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">{formatCurrency(invoice.totalAmount)}</span>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setViewingInvoice(invoice)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingInvoice(invoice)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => generatePDF(invoice)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setDeletingInvoice(invoice)}
                            className="text-red-600 focus:text-red-600"
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
                        {formatDate(invoice.issueDate)}
                      </span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">Due Date</span>
                      <span className={`font-medium flex items-center ${isOverdue ? 'text-red-600' : ''}`}>
                        <Calendar className={`h-3.5 w-3.5 mr-1 ${isOverdue ? 'text-red-400' : 'text-gray-400'}`} />
                        {formatDate(invoice.dueDate)}
                        {isOverdue && <span className="ml-2 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">Overdue</span>}
                      </span>
                    </div>
                    
                    {invoice.lpoReference && (
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">LPO Reference</span>
                        <span className="font-medium">{invoice.lpoReference}</span>
                      </div>
                    )}
                    
                    {invoice.project && (
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Project</span>
                        <span className="font-medium truncate">{invoice.project.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Invoice Dialog */}
      {editingInvoice && (
        <Dialog open={!!editingInvoice} onOpenChange={(open) => !open && setEditingInvoice(null)}>
          <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Edit Invoice #{editingInvoice.invoiceNumber}</DialogTitle>
            </DialogHeader>
            <InvoiceForm 
              invoice={editingInvoice} 
              onInvoiceAdded={onInvoiceUpdated}
              onCancel={() => setEditingInvoice(null)}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* View Invoice Dialog */}
      {viewingInvoice && (
        <Dialog open={!!viewingInvoice} onOpenChange={(open) => !open && setViewingInvoice(null)}>
          <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Invoice #{viewingInvoice.invoiceNumber}</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              {/* Invoice preview would go here */}
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">Client</h3>
                  <p>{viewingInvoice.client?.name}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-lg">Amount</h3>
                  <p className="text-xl font-bold text-primary">{formatCurrency(viewingInvoice.totalAmount)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-bold">Issue Date</h3>
                  <p>{formatDate(viewingInvoice.issueDate)}</p>
                </div>
                <div>
                  <h3 className="font-bold">Due Date</h3>
                  <p>{formatDate(viewingInvoice.dueDate)}</p>
                </div>
                {viewingInvoice.lpoReference && (
                  <div>
                    <h3 className="font-bold">LPO Reference</h3>
                    <p>{viewingInvoice.lpoReference}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-bold">Status</h3>
                  <p className={`inline-block px-2 py-1 rounded ${getStatusColor(viewingInvoice.status)}`}>
                    {viewingInvoice.status}
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
                    {viewingInvoice.items.map((item) => (
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
                      <td className="px-4 py-2 text-sm font-medium text-right">{formatCurrency(viewingInvoice.subtotal)}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Tax</td>
                      <td className="px-4 py-2 text-sm font-medium text-right">{formatCurrency(viewingInvoice.taxAmount)}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right font-bold">Total</td>
                      <td className="px-4 py-2 text-sm font-bold text-right">{formatCurrency(viewingInvoice.totalAmount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {viewingInvoice.notes && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-2">Notes</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{viewingInvoice.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewingInvoice(null)}>Close</Button>
                <Button onClick={() => generatePDF(viewingInvoice)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingInvoice && (
        <Dialog open={!!deletingInvoice} onOpenChange={(open) => !open && setDeletingInvoice(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete invoice #{deletingInvoice.invoiceNumber}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeletingInvoice(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={deleteInvoice}
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
