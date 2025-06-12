'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '../../../components/ui/use-toast.jsx';

export default function AddClientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Client form state
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    kraPin: '',
    notes: ''
  });
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Try to use the API first
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'active',
          lastService: 'New Client',
          lastServiceDate: new Date(),
        }),
      });
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Client added successfully!',
        });
        
        router.push('/dashboard/clients');
        return;
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add client');
      }
    } catch (error) {
      console.error('Error adding client to API:', error);
      
      // Fallback to localStorage
      console.log('Falling back to localStorage...');
      
      // Get existing clients from localStorage
      const existingClientsString = localStorage.getItem('mvono_clients');
      let clients = [];
      
      if (existingClientsString) {
        try {
          clients = JSON.parse(existingClientsString);
        } catch (error) {
          console.error('Error parsing clients from localStorage:', error);
          // Default to empty array if parsing fails
          clients = [];
        }
      }
      
      // Create new client object
      const newClient = {
        id: clients.length > 0 ? Math.max(...clients.map(client => client.id)) + 1 : 1,
        name: formData.name,
        industry: formData.industry || 'Other',
        contact: formData.contact,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        website: formData.website,
        kraPin: formData.kraPin,
        notes: formData.notes,
        status: 'active',
        lastService: 'New Client',
        lastServiceDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };
      
      // Add new client to the array
      clients.push(newClient);
      
      // Save updated clients array back to localStorage
      localStorage.setItem('mvono_clients', JSON.stringify(clients));
      
      toast({
        title: 'Success',
        description: 'Client added successfully (localStorage)!',
      });
      
      router.push('/dashboard/clients');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            href="/dashboard/clients" 
            className="text-blue-600 hover:text-blue-500 p-1 rounded-md hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Add New Client</h1>
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Client
            </>
          )}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-6 md:col-span-2">
              <h2 className="text-lg font-medium text-slate-900 border-b pb-2">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Company Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-slate-700">Industry</label>
                  <select
                    name="industry"
                    id="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  >
                    <option value="">Select an industry</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Construction/Manufacturing">Construction/Manufacturing</option>
                    <option value="Chemical Manufacturing">Chemical Manufacturing</option>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Mining">Mining</option>
                    <option value="Oil and Gas">Oil and Gas</option>
                    <option value="Pharmaceutical">Pharmaceutical</option>
                    <option value="Retail">Retail</option>
                    <option value="Transport">Transport</option>
                    <option value="Warehousing">Warehousing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6 md:col-span-2">
              <h2 className="text-lg font-medium text-slate-900 border-b pb-2">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-slate-700">Contact Person *</label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-slate-700">Website</label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Address & Additional Information */}
            <div className="space-y-6 md:col-span-2">
              <h2 className="text-lg font-medium text-slate-900 border-b pb-2">Additional Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700">Physical Address</label>
                  <textarea
                    name="address"
                    id="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="kraPin" className="block text-sm font-medium text-slate-700">KRA PIN</label>
                  <input
                    type="text"
                    name="kraPin"
                    id="kraPin"
                    value={formData.kraPin}
                    onChange={handleChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows="4"
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <Link
              href="/dashboard/clients"
              className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
