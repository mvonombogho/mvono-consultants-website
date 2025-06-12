'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, FileText, Calendar, BadgeCheck, Package2, Printer, Mail, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

// Initial mock client data for backup
const initialClientsData = [
  { 
    id: "1", 
    name: 'Lafarge', 
    industry: 'Construction/Manufacturing',
    contact: 'John Smith',
    email: 'john.smith@lafarge.com',
    phone: '+254 712 345 678',
    status: 'active',
    address: '123 Mombasa Road, Nairobi, Kenya',
    website: 'https://www.lafarge.co.ke',
    taxPin: 'A123456789B',
    notes: 'Major cement manufacturer with multiple sites across Kenya.',
    lastService: 'Environmental Impact Assessment',
    lastServiceDate: '2025-02-15',
    servicesRendered: [
      { id: 101, name: 'Environmental Impact Assessment', date: '2025-02-15', status: 'Completed' },
      { id: 82, name: 'Fire Safety Audit', date: '2024-11-05', status: 'Completed' },
      { id: 65, name: 'Occupational Safety Training', date: '2024-08-22', status: 'Completed' }
    ],
    pendingServices: [
      { id: 115, name: 'Statutory Inspection', date: '2025-05-10', status: 'Scheduled' }
    ],
    invoices: [
      { id: 'INV-2025-042', date: '2025-02-20', amount: 320000, status: 'Paid' },
      { id: 'INV-2024-128', date: '2024-11-10', amount: 180000, status: 'Paid' },
      { id: 'INV-2024-089', date: '2024-08-25', amount: 150000, status: 'Paid' }
    ]
  },
  { 
    id: "2", 
    name: 'Unga Group', 
    industry: 'Food Processing',
    contact: 'Jane Doe',
    email: 'jane.doe@ungagroup.com',
    phone: '+254 723 456 789',
    status: 'active',
    address: '45 Industrial Area, Nairobi, Kenya',
    website: 'https://www.ungagroup.com',
    taxPin: 'C234567890D',
    notes: 'Leading food processing company specializing in wheat and maize products.',
    lastService: 'Occupational Safety Audit',
    lastServiceDate: '2025-03-01',
    servicesRendered: [
      { id: 105, name: 'Occupational Safety Audit', date: '2025-03-01', status: 'Completed' },
      { id: 90, name: 'Statutory Inspection', date: '2024-09-15', status: 'Completed' }
    ],
    pendingServices: [
      { id: 118, name: 'Fire Safety Training', date: '2025-06-12', status: 'Scheduled' }
    ],
    invoices: [
      { id: 'INV-2025-053', date: '2025-03-05', amount: 245000, status: 'Paid' },
      { id: 'INV-2024-098', date: '2024-09-20', amount: 200000, status: 'Paid' }
    ]
  },
  { 
    id: "3", 
    name: 'KTDA', 
    industry: 'Agriculture',
    contact: 'Robert Johnson',
    email: 'robert.j@ktda.com',
    phone: '+254 734 567 890',
    status: 'active',
    address: '78 Kenyatta Avenue, Nairobi, Kenya',
    website: 'https://www.ktdateas.com',
    taxPin: 'E345678901F',
    notes: 'Kenya Tea Development Agency managing multiple tea factories.',
    lastService: 'Statutory Inspection',
    lastServiceDate: '2025-03-12',
    servicesRendered: [
      { id: 108, name: 'Statutory Inspection', date: '2025-03-12', status: 'Completed' },
      { id: 95, name: 'Energy Audit', date: '2024-10-20', status: 'Completed' },
      { id: 80, name: 'Environmental Impact Assessment', date: '2024-07-15', status: 'Completed' }
    ],
    pendingServices: [],
    invoices: [
      { id: 'INV-2025-065', date: '2025-03-15', amount: 180000, status: 'Paid' },
      { id: 'INV-2024-112', date: '2024-10-25', amount: 210000, status: 'Paid' },
      { id: 'INV-2024-085', date: '2024-07-20', amount: 280000, status: 'Paid' }
    ]
  }
];

// Helper function to get detailed client data
const getDetailedClientData = (id) => {
  // First try to get from localStorage
  if (typeof window !== 'undefined') {
    try {
      const storedClientsString = localStorage.getItem('mvono_clients');
      if (storedClientsString) {
        const storedClients = JSON.parse(storedClientsString);
        
        // Find the client with basic info
        const basicClient = storedClients.find(c => c.id.toString() === id.toString());
        
        if (basicClient) {
          // Now get the detailed info from our initialData or create it if not found
          const detailedTemplate = initialClientsData.find(c => c.id.toString() === id.toString());
          
          if (detailedTemplate) {
            // Merge the basic info with detailed template
            return {
              ...detailedTemplate,
              ...basicClient
            };
          } else {
            // If no template exists, add default empty arrays for services and invoices
            return {
              ...basicClient,
              address: basicClient.address || '',
              website: basicClient.website || '',
              taxPin: basicClient.taxPin || '',
              notes: basicClient.notes || '',
              servicesRendered: [],
              pendingServices: [],
              invoices: []
            };
          }
        }
      }
    } catch (error) {
      console.error('Error parsing clients from localStorage:', error);
    }
  }
  
  // Fallback to initialData if nothing found in localStorage
  return initialClientsData.find(c => c.id.toString() === id.toString());
};

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load client data from localStorage
  useEffect(() => {
    setIsLoading(true);
    const clientData = getDetailedClientData(params.id);
    
    if (clientData) {
      setClient(clientData);
      setIsLoading(false);
    } else {
      // Client not found, redirect to clients list
      router.push('/dashboard/clients');
    }
  }, [params.id, router]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading client information...</p>
      </div>
    );
  }
  
  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-semibold text-slate-800">Client Not Found</h2>
        <p className="text-slate-600 mt-2">The client you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/dashboard/clients" 
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Link>
      </div>
    );
  }
  
  // Handle delete client
  const handleDelete = () => {
    try {
      const storedClientsString = localStorage.getItem('mvono_clients');
      if (storedClientsString) {
        const storedClients = JSON.parse(storedClientsString);
        const updatedClients = storedClients.filter(c => c.id.toString() !== params.id.toString());
        
        // Update localStorage
        localStorage.setItem('mvono_clients', JSON.stringify(updatedClients));
      }
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
    
    // Close modal and redirect to clients list
    setShowDeleteModal(false);
    router.push('/dashboard/clients');

    // Show deletion message
    setTimeout(() => {
      alert(`${client.name} has been deleted successfully.`);
    }, 500);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link 
            href="/dashboard/clients" 
            className="text-blue-600 hover:text-blue-500 p-1 rounded-md hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{client.name}</h1>
            <p className="text-slate-600 mt-1">{client.industry}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link 
            href={`/dashboard/clients/${client.id}/edit`}
            className="inline-flex items-center px-3 py-2 border border-slate-300 shadow-sm text-sm leading-4 font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
      
      {/* Client details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main info card */}
        <div className="bg-white rounded-lg shadow md:col-span-2">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">Client Information</h2>
          </div>
          
          <div className="px-6 py-5">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <dt className="text-sm font-medium text-slate-500">Contact Person</dt>
                <dd className="mt-1 text-sm text-slate-900">{client.contact}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-slate-500">Email Address</dt>
                <dd className="mt-1 text-sm text-slate-900">
                  <a href={`mailto:${client.email}`} className="text-blue-600 hover:text-blue-500">{client.email}</a>
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-slate-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-slate-900">
                  <a href={`tel:${client.phone}`} className="text-blue-600 hover:text-blue-500">{client.phone}</a>
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-slate-500">Website</dt>
                <dd className="mt-1 text-sm text-slate-900">
                  {client.website ? (
                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                      {client.website}
                    </a>
                  ) : (
                    <span className="text-slate-500">Not provided</span>
                  )}
                </dd>
              </div>
              
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-slate-500">Physical Address</dt>
                <dd className="mt-1 text-sm text-slate-900">{client.address || 'Not provided'}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-slate-500">KRA PIN</dt>
                <dd className="mt-1 text-sm text-slate-900">{client.taxPin || 'Not provided'}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-slate-500">Status</dt>
                <dd className="mt-1 text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </dd>
              </div>
              
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-slate-500">Notes</dt>
                <dd className="mt-1 text-sm text-slate-900">{client.notes || 'No notes available'}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">Client Summary</h2>
          </div>
          
          <div className="px-6 py-5 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Last Service</h3>
              <p className="mt-1 text-lg font-medium text-slate-900">{client.lastService}</p>
              <p className="text-sm text-slate-500">{new Date(client.lastServiceDate).toLocaleDateString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-500">Services Rendered</h3>
              <p className="mt-1 text-lg font-medium text-slate-900">{client.servicesRendered?.length || 0}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-500">Pending Services</h3>
              <p className="mt-1 text-lg font-medium text-slate-900">{client.pendingServices?.length || 0}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-500">Total Revenue</h3>
              <p className="mt-1 text-lg font-medium text-slate-900">
                {formatCurrency((client.invoices || []).reduce((sum, invoice) => sum + invoice.amount, 0))}
              </p>
            </div>
            
            <div className="pt-4 flex flex-col space-y-2">
              <Link
                href={`/dashboard/clients/${client.id}/services/add`}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Package2 className="mr-2 h-4 w-4" />
                Add Service
              </Link>
              
              <Link
                href={`/dashboard/invoices/create?client=${client.id}`}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                Create Invoice
              </Link>
              
              <button
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-slate-900">Services</h2>
          <Link
            href={`/dashboard/clients/${client.id}/services`}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {[...(client.servicesRendered || []), ...(client.pendingServices || [])]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{service.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{new Date(service.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <Link href={`/dashboard/services/${service.id}`} className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              
              {([...(client.servicesRendered || []), ...(client.pendingServices || [])].length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-slate-500">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Invoices section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-slate-900">Invoices</h2>
          <Link
            href={`/dashboard/invoices?client=${client.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {(client.invoices || [])
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{invoice.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{new Date(invoice.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{formatCurrency(invoice.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/invoices/${invoice.id}`} className="text-blue-600 hover:text-blue-900">
                        View
                      </Link>
                      <button className="text-blue-600 hover:text-blue-900">
                        Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {(client.invoices || []).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-slate-900">Delete Client</h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to delete <span className="font-medium text-slate-700">{client.name}</span>? This action cannot be undone and all associated data will be permanently removed.
            </p>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
              >
                Cancel
              </button>
              
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
