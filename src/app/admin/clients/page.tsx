'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaChevronDown,
  FaEye,
  FaFileInvoice
} from 'react-icons/fa'

// Mock client data (will be replaced with actual DB data)
const mockClients = [
  {
    id: '1',
    name: 'Lafarge',
    contactPerson: 'John Smith',
    email: 'john@lafarge.com',
    phone: '+254 712 345 678',
    industry: 'Manufacturing',
    status: 'active',
    lastInvoice: '15 Feb 2025',
    totalSpent: 'KSh 550,000',
  },
  {
    id: '2',
    name: 'KTDA',
    contactPerson: 'Mary Johnson',
    email: 'mary@ktda.co.ke',
    phone: '+254 723 456 789',
    industry: 'Agriculture',
    status: 'active',
    lastInvoice: '03 Mar 2025',
    totalSpent: 'KSh 830,000',
  },
  {
    id: '3',
    name: 'Dormans Coffee',
    contactPerson: 'David Mwangi',
    email: 'david@dormans.com',
    phone: '+254 734 567 890',
    industry: 'Food Processing',
    status: 'active',
    lastInvoice: '22 Feb 2025',
    totalSpent: 'KSh 320,000',
  },
  {
    id: '4',
    name: 'Radisson Blu',
    contactPerson: 'Sarah Chen',
    email: 'sarah@radissonblu.com',
    phone: '+254 745 678 901',
    industry: 'Hospitality',
    status: 'inactive',
    lastInvoice: '10 Jan 2025',
    totalSpent: 'KSh 180,000',
  },
  {
    id: '5',
    name: 'National Cement',
    contactPerson: 'Daniel Ochieng',
    email: 'daniel@nationalcement.co.ke',
    phone: '+254 756 789 012',
    industry: 'Manufacturing',
    status: 'active',
    lastInvoice: '01 Mar 2025',
    totalSpent: 'KSh 670,000',
  },
]

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  
  // Filter clients based on search query and filters
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesIndustry = !filterIndustry || client.industry === filterIndustry
    const matchesStatus = !filterStatus || client.status === filterStatus
    
    return matchesSearch && matchesIndustry && matchesStatus
  })
  
  // Get unique industries for filter dropdown
  const industries = [...new Set(mockClients.map(client => client.industry))]
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        <Link 
          href="/admin/clients/new"
          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <FaPlus className="mr-2" />
          Add New Client
        </Link>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          
          {/* Industry Filter */}
          <div className="relative">
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Industries</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>{industry}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.contactPerson}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {client.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.lastInvoice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {client.totalSpent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        href={`/admin/clients/${client.id}`}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <Link 
                        href={`/admin/clients/${client.id}/edit`}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <Link 
                        href={`/admin/clients/${client.id}/invoices`}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Invoices"
                      >
                        <FaFileInvoice />
                      </Link>
                      <button 
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete"
                        onClick={() => window.confirm('Are you sure you want to delete this client?')}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500">No clients found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
