'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FaFileInvoiceDollar, 
  FaPlus, 
  FaMoneyBillWave,
  FaChartLine,
  FaRegClock,
  FaFilter,
  FaSearch,
  FaEye,
  FaPrint,
  FaFilePdf,
  FaFileExcel
} from 'react-icons/fa'

// Mock invoice data
const mockInvoices = [
  {
    id: 'INV-2025-001',
    client: 'Lafarge',
    amount: 120000,
    issueDate: '2025-03-10',
    dueDate: '2025-04-10',
    status: 'paid',
    paymentDate: '2025-03-15',
  },
  {
    id: 'INV-2025-002',
    client: 'KTDA',
    amount: 85000,
    issueDate: '2025-03-05',
    dueDate: '2025-04-05',
    status: 'paid',
    paymentDate: '2025-03-20',
  },
  {
    id: 'INV-2025-003',
    client: 'Dormans Coffee',
    amount: 65000,
    issueDate: '2025-02-28',
    dueDate: '2025-03-28',
    status: 'pending',
    paymentDate: null,
  },
  {
    id: 'INV-2025-004',
    client: 'Radisson Blu',
    amount: 110000,
    issueDate: '2025-02-15',
    dueDate: '2025-03-15',
    status: 'overdue',
    paymentDate: null,
  },
  {
    id: 'INV-2025-005',
    client: 'National Cement',
    amount: 220000,
    issueDate: '2025-02-12',
    dueDate: '2025-03-12',
    status: 'paid',
    paymentDate: '2025-03-01',
  },
]

// Mock current month stats
const currentMonthStats = {
  totalInvoiced: 650000,
  totalPaid: 425000,
  totalPending: 65000,
  totalOverdue: 160000,
  averageInvoiceAmount: 130000,
}

export default function FinancePage() {
  // Filter state
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  
  // Filter invoices based on search and filters
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesStatus = !statusFilter || invoice.status === statusFilter
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Date range filtering
    let matchesDateRange = true
    if (dateRange.from && dateRange.to) {
      const invoiceDate = new Date(invoice.issueDate)
      const fromDate = new Date(dateRange.from)
      const toDate = new Date(dateRange.to)
      matchesDateRange = invoiceDate >= fromDate && invoiceDate <= toDate
    }
    
    return matchesStatus && matchesSearch && matchesDateRange
  })
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Financial Management</h1>
        <div className="flex space-x-2">
          <Link 
            href="/admin/finance/new-invoice"
            className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <FaPlus className="mr-2" />
            New Invoice
          </Link>
          <Link 
            href="/admin/finance/expenses"
            className="bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <FaMoneyBillWave className="mr-2" />
            Track Expenses
          </Link>
        </div>
      </div>
      
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary-500">
          <div className="flex items-center">
            <div className="rounded-full bg-primary-100 p-2 mr-3">
              <FaFileInvoiceDollar className="text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Invoiced</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(currentMonthStats.totalInvoiced)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <FaMoneyBillWave className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Paid</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(currentMonthStats.totalPaid)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-2 mr-3">
              <FaRegClock className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(currentMonthStats.totalPending)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-2 mr-3">
              <FaRegClock className="text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(currentMonthStats.totalOverdue)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-500">
          <div className="flex items-center">
            <div className="rounded-full bg-gray-100 p-2 mr-3">
              <FaChartLine className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Invoice</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(currentMonthStats.averageInvoiceAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            
            <div className="w-full sm:w-auto flex gap-2">
              <input
                type="date"
                placeholder="From"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              
              <input
                type="date"
                placeholder="To"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <button 
              onClick={() => {
                setStatusFilter('')
                setSearchQuery('')
                setDateRange({ from: '', to: '' })
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Recent Invoices</h2>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <FaFilePdf title="Export as PDF" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <FaFileExcel title="Export as Excel" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <FaPrint title="Print" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatDate(invoice.issueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : invoice.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/admin/finance/invoices/${invoice.id}`}
                      className="text-primary-600 hover:text-primary-900 transition-colors"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredInvoices.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500">No invoices found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
