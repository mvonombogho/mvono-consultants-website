'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FaEdit, 
  FaTrash, 
  FaFileInvoice, 
  FaArrowLeft, 
  FaClipboardList,
  FaSpinner 
} from 'react-icons/fa'
import { useClients } from '@/contexts/ClientContext'
import { useRouter } from 'next/navigation'

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getClient, deleteClient } = useClients()
  
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }
  
  // Load client data
  useEffect(() => {
    const loadClient = async () => {
      try {
        const clientData = await getClient(params.id)
        if (clientData) {
          setClient(clientData)
        } else {
          setError('Client not found')
        }
      } catch (error) {
        console.error('Error loading client:', error)
        setError('Failed to load client data')
      } finally {
        setLoading(false)
      }
    }
    
    loadClient()
  }, [getClient, params.id])
  
  // Handle client delete
  const handleDeleteClient = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const success = await deleteClient(params.id)
        if (success) {
          router.push('/admin/clients')
        } else {
          setError('Failed to delete client')
        }
      } catch (error) {
        console.error('Error deleting client:', error)
        setError('An error occurred while deleting the client')
      }
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-primary-600 text-4xl" />
      </div>
    )
  }
  
  if (error || !client) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error || 'Client not found'}</p>
          <Link 
            href="/admin/clients"
            className="mt-2 text-primary-600 hover:text-primary-800 transition-colors inline-block"
          >
            Back to Clients
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link 
            href="/admin/clients"
            className="text-gray-600 hover:text-gray-800 mr-4 transition-colors"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Client Details</h1>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            href={`/admin/clients/${params.id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <FaEdit className="mr-2" />
            Edit
          </Link>
          <button
            onClick={handleDeleteClient}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Client Information</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Client Name</h3>
                  <p className="text-base text-gray-900">{client.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Person</h3>
                  <p className="text-base text-gray-900">{client.contactPerson || '—'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                  <p className="text-base text-gray-900">
                    {client.email ? (
                      <a 
                        href={`mailto:${client.email}`}
                        className="text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        {client.email}
                      </a>
                    ) : '—'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                  <p className="text-base text-gray-900">
                    {client.phone ? (
                      <a 
                        href={`tel:${client.phone}`}
                        className="text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        {client.phone}
                      </a>
                    ) : '—'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Industry</h3>
                  <p className="text-base text-gray-900">{client.industry || '—'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {client.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">KRA PIN</h3>
                  <p className="text-base text-gray-900">{client.kraPin || '—'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Client Since</h3>
                  <p className="text-base text-gray-900">
                    {client.createdAt ? formatDate(client.createdAt) : '—'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                <p className="text-base text-gray-900 whitespace-pre-wrap">
                  {client.address || '—'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Projects */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
              <Link 
                href={`/admin/projects/new?clientId=${client.id}`}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors"
              >
                + Add Project
              </Link>
            </div>
            
            <div className="p-6">
              {client._count?.projects > 0 ? (
                <div className="text-sm text-gray-600">
                  This client has {client._count.projects} projects. View all projects for full details.
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No projects yet.
                </div>
              )}
              
              <div className="mt-4">
                <Link 
                  href={`/admin/projects?clientId=${client.id}`}
                  className="text-primary-600 hover:text-primary-800 transition-colors inline-flex items-center"
                >
                  <FaClipboardList className="mr-2" />
                  View All Projects
                </Link>
              </div>
            </div>
          </div>
          
          {/* Invoices */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
              <Link 
                href={`/admin/finance/new-invoice?clientId=${client.id}`}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors"
              >
                + Create Invoice
              </Link>
            </div>
            
            <div className="p-6">
              {client._count?.invoices > 0 ? (
                <div className="text-sm text-gray-600">
                  This client has {client._count.invoices} invoices. View all invoices for full details.
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No invoices yet.
                </div>
              )}
              
              <div className="mt-4">
                <Link 
                  href={`/admin/finance?clientId=${client.id}`}
                  className="text-primary-600 hover:text-primary-800 transition-colors inline-flex items-center"
                >
                  <FaFileInvoice className="mr-2" />
                  View All Invoices
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Client Stats */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Client Overview</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Projects</h3>
                  <p className="text-2xl font-bold text-gray-900">{client._count?.projects || 0}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Invoices</h3>
                  <p className="text-2xl font-bold text-gray-900">{client._count?.invoices || 0}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                  <p className="text-sm text-gray-700">
                    {client.updatedAt ? formatDate(client.updatedAt) : '—'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link 
                    href={`/admin/clients/${client.id}/edit`}
                    className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                  >
                    Edit Client Information
                  </Link>
                  <Link 
                    href={`/admin/finance/new-invoice?clientId=${client.id}`}
                    className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                  >
                    Create New Invoice
                  </Link>
                  <Link 
                    href={`/admin/projects/new?clientId=${client.id}`}
                    className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                  >
                    Start New Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
