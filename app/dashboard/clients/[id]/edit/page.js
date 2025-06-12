'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

// Mock client data
const clients = [
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
    notes: 'Major cement manufacturer with multiple sites across Kenya.'
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
    notes: 'Leading food processing company specializing in wheat and maize products.'
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
    notes: 'Kenya Tea Development Agency managing multiple tea factories.'
  }
];

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    contact: '',
    email: '',
    phone: '',
    status: 'active',
    address: '',
    website: '',
    taxPin: '',
    notes: ''
  });
  
  // Find client by ID from the mock data on component mount
  useEffect(() => {
    const client = clients.find(c => c.id === params.id);
    
    if (client) {
      setFormData({
        name: client.name,
        industry: client.industry,
        contact: client.contact,
        email: client.email,
        phone: client.phone,
        status: client.status,
        address: client.address || '',
        website: client.website || '',
        taxPin: client.taxPin || '',
        notes: client.notes || ''
      });
    } else {
      // Client not found, redirect to clients list
      router.push('/dashboard/clients');
    }
  }, [params.id, router]);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate updating the client data
    setTimeout(() => {
      // In a real application, you would update the data via API
      console.log('Updated client data:', formData);
      
      // Navigate back to the client details
      router.push(`/dashboard/clients/${params.id}`);
      
      // Show success message (in a real app, use a toast notification)
      alert('Client updated successfully!');
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            href={`/dashboard/clients/${params.id}`} 
            className="text-blue-600 hover:text-blue-500 p-1 rounded-md hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Edit Client: {formData.name}</h1>
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
              Save Changes
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
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
                  <label htmlFor="taxPin" className="block text-sm font-medium text-slate-700">KRA PIN</label>
                  <input
                    type="text"
                    name="taxPin"
                    id="taxPin"
                    value={formData.taxPin}
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
              href={`/dashboard/clients/${params.id}`}
              className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
