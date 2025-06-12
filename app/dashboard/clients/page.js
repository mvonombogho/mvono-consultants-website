'use client';

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useToast } from '../../../components/ui/use-toast.jsx';

// Initial mock data
const initialClientsData = [
  { 
    id: 1, 
    name: 'Lafarge', 
    industry: 'Construction/Manufacturing',
    contact: 'John Smith',
    email: 'john.smith@lafarge.com',
    phone: '+254 712 345 678',
    status: 'active',
    lastService: 'Environmental Impact Assessment',
    lastServiceDate: '2025-02-15'
  },
  { 
    id: 2, 
    name: 'Unga Group', 
    industry: 'Food Processing',
    contact: 'Jane Doe',
    email: 'jane.doe@ungagroup.com',
    phone: '+254 723 456 789',
    status: 'active',
    lastService: 'Occupational Safety Audit',
    lastServiceDate: '2025-03-01'
  },
  { 
    id: 3, 
    name: 'KTDA', 
    industry: 'Agriculture',
    contact: 'Robert Johnson',
    email: 'robert.j@ktda.com',
    phone: '+254 734 567 890',
    status: 'active',
    lastService: 'Statutory Inspection',
    lastServiceDate: '2025-03-12'
  },
  { 
    id: 4, 
    name: 'Dormans Coffee', 
    industry: 'Food Processing',
    contact: 'Emily Williams',
    email: 'emily.w@dormanscoffee.com',
    phone: '+254 745 678 901',
    status: 'active',
    lastService: 'Fire Safety Audit',
    lastServiceDate: '2025-02-28'
  },
  { 
    id: 5, 
    name: 'Radisson Blu', 
    industry: 'Hospitality',
    contact: 'Michael Brown',
    email: 'michael.b@radissonblu.com',
    phone: '+254 756 789 012',
    status: 'active',
    lastService: 'Energy Audit',
    lastServiceDate: '2025-01-20'
  },
  { 
    id: 6, 
    name: 'Welding Alloys', 
    industry: 'Manufacturing',
    contact: 'Sarah Jones',
    email: 'sarah.j@weldingalloys.com',
    phone: '+254 767 890 123',
    status: 'inactive',
    lastService: 'Occupational Safety Training',
    lastServiceDate: '2024-11-15'
  },
  { 
    id: 7, 
    name: 'National Cement', 
    industry: 'Construction/Manufacturing',
    contact: 'David Miller',
    email: 'david.m@nationalcement.com',
    phone: '+254 778 901 234',
    status: 'active',
    lastService: 'Environmental Impact Assessment',
    lastServiceDate: '2025-02-10'
  },
  { 
    id: 8, 
    name: 'Tata Chemicals', 
    industry: 'Chemical Manufacturing',
    contact: 'Jennifer Davis',
    email: 'jennifer.d@tatachemicals.com',
    phone: '+254 789 012 345',
    status: 'active',
    lastService: 'Safety Management Systems Audit',
    lastServiceDate: '2025-03-05'
  }
];

export default function ClientsPage() {
  // State to hold clients and manage deletions
  const [clients, setClients] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [useApi, setUseApi] = useState(true); // Try to use API first
  const { toast } = useToast();
  
  // Use pathname and searchParams for navigation detection
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Load clients from API or localStorage
  const loadClients = async () => {
    setIsLoading(true);
    
    if (useApi) {
      try {
        const response = await fetch('/api/clients');
        
        if (response.ok) {
          const data = await response.json();
          setClients(data);
          setIsLoading(false);
          return;
        } else {
          console.warn('API request failed, falling back to localStorage');
          setUseApi(false); // Disable API for future requests in this session
        }
      } catch (error) {
        console.error('Error fetching clients from API:', error);
        setUseApi(false); // Disable API for future requests in this session
      }
    }
    
    // Fallback to localStorage if API is not available
    const storedClientsString = localStorage.getItem('mvono_clients');
    
    if (storedClientsString) {
      try {
        const storedClients = JSON.parse(storedClientsString);
        setClients(storedClients);
      } catch (error) {
        console.error('Error parsing clients from localStorage:', error);
        // Fallback to initial data if parsing fails
        setClients(initialClientsData);
        // Update localStorage with correct format
        localStorage.setItem('mvono_clients', JSON.stringify(initialClientsData));
      }
    } else {
      // No data in localStorage, use initial data
      setClients(initialClientsData);
      // Store initial data in localStorage
      localStorage.setItem('mvono_clients', JSON.stringify(initialClientsData));
    }
    
    setIsLoading(false);
  };

  // Load clients on component mount and when returning to this page
  useEffect(() => {
    loadClients();
    
    // Add event listener for focus to reload data when returning to this tab/window
    window.addEventListener('focus', loadClients);
    
    // Cleanup
    return () => {
      window.removeEventListener('focus', loadClients);
    };
  }, [pathname, searchParams]); // Re-run when navigation changes

  // Handle initiating delete process
  const initiateDelete = (client) => {
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  // Handle confirming deletion
  const confirmDelete = async () => {
    if (!clientToDelete) return;
    
    if (useApi) {
      try {
        const response = await fetch(`/api/clients/${clientToDelete._id || clientToDelete.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Client deleted successfully',
          });
          
          // Refresh the client list
          loadClients();
        } else {
          const data = await response.json();
          throw new Error(data.error || 'Failed to delete client');
        }
      } catch (error) {
        console.error('Error deleting client from API:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to delete client',
          variant: 'destructive',
        });
      }
    } else {
      // Fallback to localStorage
      const updatedClients = clients.filter(client => client.id !== clientToDelete.id);
      setClients(updatedClients);
      
      // Update localStorage
      localStorage.setItem('mvono_clients', JSON.stringify(updatedClients));
      
      toast({
        title: 'Success',
        description: 'Client deleted successfully',
      });
    }
    
    setShowDeleteModal(false);
    setClientToDelete(null);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client.industry && client.industry.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (client.contact && client.contact.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (client.email && client.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle reset to initial data (for development purposes)
  const handleResetData = () => {
    if (confirm('This will reset all client data to initial values. Continue?')) {
      setClients(initialClientsData);
      localStorage.setItem('mvono_clients', JSON.stringify(initialClientsData));
    }
  };

  // Determine the client ID for links (MongoDB _id or localStorage id)
  const getClientId = (client) => {
    return client._id || client.id;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-600">Manage your client relationships and information</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={handleSearch}
              className="border border-gray-300 rounded-md py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <Link 
            href="/dashboard/clients/add"
            className="inline-flex items-center justify-center bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Client
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading clients...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={getClientId(client)} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/dashboard/clients/${getClientId(client)}`} className="text-blue-600 hover:text-blue-900 font-medium">
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.industry || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.contact}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {client.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.lastService}</div>
                      <div className="text-sm text-gray-500">
                        {client.lastServiceDate && new Date(client.lastServiceDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link href={`/dashboard/clients/${getClientId(client)}`} className="text-blue-600 hover:text-blue-900">View</Link>
                        <Link href={`/dashboard/clients/${getClientId(client)}/edit`} className="text-amber-600 hover:text-amber-900">Edit</Link>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => initiateDelete(client)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No clients found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Development tools */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
            <button 
              onClick={handleResetData}
              className="text-xs text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
            >
              Reset demo data
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-slate-900">Delete Client</h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to delete <span className="font-medium text-slate-700">{clientToDelete.name}</span>? This action cannot be undone and all associated data will be permanently removed.
            </p>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
              >
                Cancel
              </button>
              
              <button
                onClick={confirmDelete}
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
