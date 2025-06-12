"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Save, FileText } from 'lucide-react';

type InvoiceItem = {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
};

type Client = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  title: string;
  clientId?: string;
};

type InvoiceFormProps = {
  initialData?: any;
  clientId?: string;
  projectId?: string;
  isEdit?: boolean;
};

export default function InvoiceForm({ initialData, clientId, projectId, isEdit = false }: InvoiceFormProps) {
  const router = useRouter();
  
  // Form state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clientProjects, setClientProjects] = useState<Project[]>([]);
  
  // Invoice data
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    description: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientId: clientId || '',
    projectId: projectId || '',
    lpoReference: '',
    status: 'draft',
    notes: '',
  });
  
  // Invoice items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 16, // Default VAT rate in Kenya
      amount: 0,
    },
  ]);
  
  // Calculate totals
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  // Load clients and projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clients
        const clientsResponse = await fetch('/api/clients?limit=100');
        const clientsData = await clientsResponse.json();
        setClients(clientsData.clients || []);
        
        // Fetch projects
        const projectsResponse = await fetch('/api/projects?limit=100');
        const projectsData = await projectsResponse.json();
        setProjects(projectsData.projects || []);
        
        // Filter projects by client if clientId is provided
        if (clientId) {
          filterProjectsByClient(clientId, projectsData.projects);
        }
        
        // Set initial data for edit mode
        if (isEdit && initialData) {
          populateFormData(initialData);
        }
      } catch (err) {
        setError('Failed to load data. Please try again.');
      }
    };
    
    fetchData();
  }, [clientId, isEdit, initialData]);
  
  // Filter projects when client changes
  const filterProjectsByClient = (selectedClientId: string, allProjects = projects) => {
    const filtered = allProjects.filter(project => project.clientId === selectedClientId);
    setClientProjects(filtered);
  };
  
  // Populate form data in edit mode
  const populateFormData = (data: any) => {
    setInvoiceData({
      invoiceNumber: data.invoiceNumber,
      description: data.description || '',
      issueDate: new Date(data.issueDate).toISOString().split('T')[0],
      dueDate: new Date(data.dueDate).toISOString().split('T')[0],
      clientId: data.clientId,
      projectId: data.projectId || '',
      lpoReference: data.lpoReference || '',
      status: data.status,
      notes: data.notes || '',
    });
    
    if (data.items && data.items.length > 0) {
      setItems(data.items.map((item: any) => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate,
        amount: item.amount,
      })));
    }
    
    filterProjectsByClient(data.clientId);
  };
  
  // Calculate item amount and update totals
  useEffect(() => {
    // Calculate each item's amount
    const updatedItems = items.map(item => ({
      ...item,
      amount: item.quantity * item.unitPrice,
    }));
    
    // Update items with calculated amounts
    setItems(updatedItems);
    
    // Calculate totals
    const newSubtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const newTaxAmount = updatedItems.reduce(
      (sum, item) => sum + item.amount * (item.taxRate / 100),
      0
    );
    
    setSubtotal(newSubtotal);
    setTaxAmount(newTaxAmount);
    setTotalAmount(newSubtotal + newTaxAmount);
  }, [items]);
  
  // Handle client change
  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientId = e.target.value;
    setInvoiceData(prev => ({ ...prev, clientId: selectedClientId, projectId: '' }));
    filterProjectsByClient(selectedClientId);
  };
  
  // Add new item
  const addItem = () => {
    setItems([...items, {
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 16,
      amount: 0,
    }]);
  };
  
  // Remove item
  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };
  
  // Update item
  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const updatedItems = [...items];
    
    // Update the specified field
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'description' ? value : parseFloat(value) || 0,
    };
    
    setItems(updatedItems);
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!invoiceData.clientId) {
        throw new Error('Please select a client');
      }
      
      if (items.some(item => !item.description || item.quantity <= 0)) {
        throw new Error('All items must have a description and quantity greater than zero');
      }
      
      // Prepare data
      const formData = {
        ...invoiceData,
        items: items.map(item => ({
          id: item.id, // Include ID for existing items in edit mode
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          amount: item.amount,
        })),
      };
      
      // Submit form
      let response;
      if (isEdit && initialData?.id) {
        // Update existing invoice
        response = await fetch(`/api/invoices/${initialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new invoice
        response = await fetch('/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save invoice');
      }
      
      // Redirect to invoice detail page
      router.push(`/admin/invoices/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="mr-2" size={20} />
          {isEdit ? 'Edit Invoice' : 'Create New Invoice'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Invoice Number */}
          <div>
            <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              id="invoiceNumber"
              placeholder="Will be auto-generated if left blank"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={invoiceData.invoiceNumber}
              onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
            />
          </div>
          
          {/* LPO Reference */}
          <div>
            <label htmlFor="lpoReference" className="block text-sm font-medium text-gray-700 mb-1">
              LPO Reference (optional)
            </label>
            <input
              type="text"
              id="lpoReference"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={invoiceData.lpoReference}
              onChange={(e) => setInvoiceData({ ...invoiceData, lpoReference: e.target.value })}
            />
          </div>
          
          {/* Client */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
              Client *
            </label>
            <select
              id="client"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={invoiceData.clientId}
              onChange={handleClientChange}
              required
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Project (optional) */}
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
              Project (optional)
            </label>
            <select
              id="project"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={invoiceData.projectId}
              onChange={(e) => setInvoiceData({ ...invoiceData, projectId: e.target.value })}
              disabled={!invoiceData.clientId || clientProjects.length === 0}
            >
              <option value="">Select Project</option>
              {clientProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            {invoiceData.clientId && clientProjects.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">No projects available for this client</p>
            )}
          </div>
          
          {/* Issue Date */}
          <div>
            <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date *
            </label>
            <input
              type="date"
              id="issueDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={invoiceData.issueDate}
              onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
              required
            />
          </div>
          
          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
              required
            />
          </div>
          
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={invoiceData.status}
              onChange={(e) => setInvoiceData({ ...invoiceData, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="partial">Partially Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={invoiceData.description}
              onChange={(e) => setInvoiceData({ ...invoiceData, description: e.target.value })}
            />
          </div>
        </div>
      </div>
      
      {/* Invoice Items */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-3 text-sm font-medium text-gray-700">Description</th>
                <th className="text-right p-3 text-sm font-medium text-gray-700">Quantity</th>
                <th className="text-right p-3 text-sm font-medium text-gray-700">Unit Price</th>
                <th className="text-right p-3 text-sm font-medium text-gray-700">Tax (%)</th>
                <th className="text-right p-3 text-sm font-medium text-gray-700">Amount</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3">
                    <input
                      type="text"
                      placeholder="Item description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      required
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      required
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                      required
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right"
                      value={item.taxRate}
                      onChange={(e) => updateItem(index, 'taxRate', e.target.value)}
                    />
                  </td>
                  <td className="p-3 text-right font-medium">
                    {item.amount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      disabled={items.length === 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <button
          type="button"
          onClick={addItem}
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add Item
        </button>
        
        {/* Totals */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  {subtotal.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax Amount:</span>
                <span className="font-medium">
                  {taxAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  {totalAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Additional Notes</h2>
        <textarea
          id="notes"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Enter any additional notes or payment instructions"
          value={invoiceData.notes}
          onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
        />
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save className="mr-2" size={18} />
          {loading ? 'Saving...' : (isEdit ? 'Update Invoice' : 'Create Invoice')}
        </button>
      </div>
    </form>
  );
}
