"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronDown, DollarSign, Filter, Mail, Plus, Search, X } from 'lucide-react';

// Types
type Payment = {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  amount: number;
  paymentDate: string;
  method: 'bank_transfer' | 'mpesa' | 'cash' | 'cheque';
  reference: string;
  notes: string;
};

// Mock data
const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceId: '101',
    invoiceNumber: 'INV-2023-001',
    clientId: '201',
    clientName: 'Unga Group',
    amount: 150000,
    paymentDate: '2023-06-25',
    method: 'bank_transfer',
    reference: 'TRF98765432',
    notes: 'Payment for Q2 services',
  },
  {
    id: '2',
    invoiceId: '102',
    invoiceNumber: 'INV-2023-005',
    clientId: '202',
    clientName: 'Dormans Coffee',
    amount: 85000,
    paymentDate: '2023-06-18',
    method: 'mpesa',
    reference: 'MPE123456789',
    notes: '',
  },
  {
    id: '3',
    invoiceId: '103',
    invoiceNumber: 'INV-2023-008',
    clientId: '203',
    clientName: 'Tata Chemicals',
    amount: 240000,
    paymentDate: '2023-06-28',
    method: 'cheque',
    reference: 'CHQ00123456',
    notes: 'Cheque cleared on 30th',
  },
  {
    id: '4',
    invoiceId: '104',
    invoiceNumber: 'INV-2023-003',
    clientId: '204',
    clientName: 'KTDA',
    amount: 180000,
    paymentDate: '2023-06-10',
    method: 'bank_transfer',
    reference: 'TRF87654321',
    notes: 'Partial payment',
  },
  {
    id: '5',
    invoiceId: '105',
    invoiceNumber: 'INV-2023-010',
    clientId: '205',
    clientName: 'Lafarge',
    amount: 320000,
    paymentDate: '2023-06-30',
    method: 'mpesa',
    reference: 'MPE987654321',
    notes: '',
  },
];

export default function PaymentTracker() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  
  // Initialize data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPayments(mockPayments);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter payments based on search and method
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    return matchesSearch && matchesMethod;
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Format payment method
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'mpesa':
        return 'M-Pesa';
      case 'cash':
        return 'Cash';
      case 'cheque':
        return 'Cheque';
      default:
        return method;
    }
  };
  
  // Get payment method badge color
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'bg-blue-100 text-blue-800';
      case 'mpesa':
        return 'bg-green-100 text-green-800';
      case 'cash':
        return 'bg-yellow-100 text-yellow-800';
      case 'cheque':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payment Tracker</h1>
          <p className="text-gray-500 mt-1">Record and manage all client payments</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => setIsAddPaymentModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search clients, invoices, references..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </button>
            )}
          </div>
          
          {/* Method Filter */}
          <div className="flex-shrink-0 w-full md:w-48">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="all">All Methods</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="mpesa">M-Pesa</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No payments found matching your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {formatDate(payment.paymentDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/admin/invoices/${payment.invoiceId}`} className="text-blue-600 hover:text-blue-900">
                        {payment.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/admin/clients/${payment.clientId}`} className="font-medium text-gray-900 hover:text-blue-600">
                        {payment.clientName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                        {formatCurrency(payment.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getMethodColor(payment.method)}`}>
                        {formatPaymentMethod(payment.method)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Collected */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Collected</h3>
          <div className="flex items-center mt-2">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(payments.reduce((sum, payment) => sum + payment.amount, 0))}
              </p>
              <p className="text-sm text-gray-500">All time</p>
            </div>
          </div>
        </div>
        
        {/* Recent Collections */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Collections</h3>
          <div className="flex items-center mt-2">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(payments
                  .filter(p => new Date(p.paymentDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                  .reduce((sum, payment) => sum + payment.amount, 0))}
              </p>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow p-6 col-span-1 sm:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {['bank_transfer', 'mpesa', 'cash', 'cheque'].map((method) => {
              const count = payments.filter(p => p.method === method).length;
              const total = payments
                .filter(p => p.method === method)
                .reduce((sum, payment) => sum + payment.amount, 0);
              
              return (
                <div key={method} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getMethodColor(method).split(' ')[0]} mr-2`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formatPaymentMethod(method)}</p>
                    <p className="text-xs text-gray-500">{count} payments, {formatCurrency(total)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
