'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaChevronDown,
  FaEye,
  FaFileInvoice,
  FaSpinner
} from 'react-icons/fa'
import { useClients } from '@/contexts/ClientContext'

// Industry options for filtering
const industryOptions = [
  'All Industries',
  'Manufacturing',
  'Construction',
  'Oil and Gas',
  'Mining',
  'Food Processing',
  'Pharmaceutical',
  'Chemical',
  'Hospitality',
  'Healthcare',
  'Education',
  'Warehousing and Logistics',
  'Agriculture',
  'Retail',
  'Transport',
  'Other'
]

export default function ClientsPage() {
  // Get client data and functions from context
  const { 
    clients, 
    loading, 
    error, 
    pagination, 
    filters, 
    fetchClients, 
    deleteClient,
    setFilters,
    resetFilters
  } = useClients()
  
  // Handle client delete
  const handleDeleteClient = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      await deleteClient(id)
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchClients(page)
  }
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value })
  }
  
  // Handle industry filter
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const industry = e.target.value === 'All Industries' ? '' : e.target.value
    setFilters({ industry })
  }
  
  // Handle status filter
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ status: e.target.value })
  }
  
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
              value={filters.search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          
          {/* Industry Filter */}
          <div className="relative">
            <select
              value={filters.industry || 'All Industries'}
              onChange={handleIndustryChange}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {industryOptions.map((industry, index) => (
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
              value={filters.status}
              onChange={handleStatusChange}
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
        
        {/* Reset Filters Button */}
        {(filters.search || filters.industry || filters.status) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-primary-600 hover:text-primary-800 text-sm transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-32 text-center">
              <FaSpinner className="animate-spin text-primary-600 mx-auto mb-4 text-4xl" />
              <p className="text-gray-500">Loading clients...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => fetchClients(pagination.page)}
                className="text-primary-600 hover:text-primary-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : clients.length > 0 ? (
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
                    Projects
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.contactPerson || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.email || '-'}</div>
                      <div className="text-sm text-gray-500">{client.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.industry || '-'}
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
                      {client._count?.projects || 0}
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
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-500 mb-4">No clients found matching your search criteria.</p>
              <button 
                onClick={resetFilters}
                className="text-primary-600 hover:text-primary-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Pagination */}
      {clients.length > 0 && pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                pagination.page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } text-sm font-medium`}
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {[...Array(pagination.totalPages)].map((_, index) => {
              const pageNumber = index + 1
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    pagination.page === pageNumber
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } text-sm font-medium`}
                >
                  {pageNumber}
                </button>
              )
            })}
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                pagination.page === pagination.totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } text-sm font-medium`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
