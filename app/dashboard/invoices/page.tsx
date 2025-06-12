'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  useEffect(() => {
    // Fetch invoices - in a real app this would be an API call
    // For demo purposes, let's create some mock data
    const mockInvoices = [
      {
        id: '1',
        invoiceNumber: 'INV-2025-0001',
        client: 'Lafarge',
        issueDate: '2025-05-01',
        dueDate: '2025-05-31',
        amount: 125000,
        status: 'paid'
      },
      {
        id: '2',
        invoiceNumber: 'INV-2025-0002',
        client: 'Alpine Coolers',
        issueDate: '2025-05-05',
        dueDate: '2025-06-04',
        amount: 75000,
        status: 'sent'
      },
      {
        id: '3',
        invoiceNumber: 'INV-2025-0003',
        client: 'KTDA',
        issueDate: '2025-05-10',
        dueDate: '2025-06-09',
        amount: 230000,
        status: 'viewed'
      },
      {
        id: '4',
        invoiceNumber: 'INV-2025-0004',
        client: 'Unga Group',
        issueDate: '2025-04-15',
        dueDate: '2025-05-15',
        amount: 150000,
        status: 'overdue'
      }
    ];
    
    setInvoices(mockInvoices);
    setLoading(false);
  }, []);

  // Sort function for invoices
  const sortedInvoices = [...invoices].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter invoices by search and status
  const filteredInvoices = sortedInvoices.filter((invoice) => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
      invoice.amount.toString().includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Request sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `KES ${new Intl.NumberFormat('en-KE').format(amount)}`;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusColors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      viewed: 'bg-purple-100 text-purple-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-orange-100 text-orange-800'
    };

    const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800';
    const label = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-500 mt-2">
            Create, manage and track all your invoices in one place.
          </p>
        </div>
        
        <Link href="/dashboard/invoices/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
            <span className="mr-2">+</span>
            Create Invoice
          </button>
        </Link>
      </div>
      
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Invoices</div>
          <div className="text-2xl font-bold">{loading ? '...' : invoices.length}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 mb-1">Paid</div>
          <div className="text-2xl font-bold text-green-600">
            {loading ? '...' : invoices.filter(i => i?.status === 'paid').length}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 mb-1">Outstanding</div>
          <div className="text-2xl font-bold text-blue-600">
            {loading ? '...' : invoices.filter(i => i?.status === 'sent' || i?.status === 'viewed').length}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 mb-1">Overdue</div>
          <div className="text-2xl font-bold text-red-600">
            {loading ? '...' : invoices.filter(i => i?.status === 'overdue').length}
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search invoices by number, client, or amount"
            className="w-full p-2 pl-8 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-2.5 top-2.5 text-gray-500">🔍</span>
        </div>
        
        <div>
          <select 
            className="w-full md:w-[160px] p-2 border rounded"
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="viewed">Viewed</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 cursor-pointer" 
                  onClick={() => requestSort('invoiceNumber')}
                >
                  <div className="flex items-center">
                    Invoice {getSortDirectionIndicator('invoiceNumber')}
                    <span className="ml-1">⇅</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 cursor-pointer" 
                  onClick={() => requestSort('client')}
                >
                  <div className="flex items-center">
                    Client {getSortDirectionIndicator('client')}
                    <span className="ml-1">⇅</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 cursor-pointer" 
                  onClick={() => requestSort('issueDate')}
                >
                  <div className="flex items-center">
                    Issue Date {getSortDirectionIndicator('issueDate')}
                    <span className="ml-1">⇅</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 cursor-pointer" 
                  onClick={() => requestSort('dueDate')}
                >
                  <div className="flex items-center">
                    Due Date {getSortDirectionIndicator('dueDate')}
                    <span className="ml-1">⇅</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 cursor-pointer" 
                  onClick={() => requestSort('amount')}
                >
                  <div className="flex items-center">
                    Amount {getSortDirectionIndicator('amount')}
                    <span className="ml-1">⇅</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 cursor-pointer" 
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center">
                    Status {getSortDirectionIndicator('status')}
                    <span className="ml-1">⇅</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                    <p className="mt-2 text-gray-500">Loading invoices...</p>
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-gray-400 mb-4">📄</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No Invoices Found</h3>
                    <p className="text-gray-500">Get started by creating your first invoice.</p>
                    <div className="mt-4">
                      <Link href="/dashboard/invoices/create">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center mx-auto">
                          <span className="mr-2">+</span>
                          Create Your First Invoice
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : filteredInvoices.map(invoice => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(invoice.issueDate)}
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      className="inline-flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-800"
                      title="View Invoice"
                    >
                      👁️
                    </button>
                    
                    <button 
                      className="inline-flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-800"
                      title="Edit Invoice"
                    >
                      ✏️
                    </button>
                    
                    <button 
                      className="inline-flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-800"
                      title="Download PDF"
                    >
                      ⬇️
                    </button>
                    
                    <button 
                      className="inline-flex h-8 w-8 items-center justify-center text-red-500 hover:text-red-700"
                      title="Delete Invoice"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
