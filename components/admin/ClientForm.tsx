"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Users } from 'lucide-react';

type ClientFormProps = {
  initialData?: any;
  isEdit?: boolean;
};

const industries = [
  "Manufacturing",
  "Construction",
  "Oil and Gas",
  "Mining",
  "Food Processing",
  "Pharmaceutical",
  "Chemical",
  "Hospitality",
  "Healthcare",
  "Education",
  "Warehousing and Logistics",
  "Agricultural",
  "Retail",
  "Transport",
  "Other"
];

export default function ClientForm({ initialData, isEdit = false }: ClientFormProps) {
  const router = useRouter();
  
  // Form state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Client data
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    kraPin: '',
    industry: '',
    contactPerson: '',
    contactPosition: '',
    notes: '',
  });
  
  // Populate form data in edit mode
  useEffect(() => {
    if (isEdit && initialData) {
      setClientData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        kraPin: initialData.kraPin || '',
        industry: initialData.industry || '',
        contactPerson: initialData.contactPerson || '',
        contactPosition: initialData.contactPosition || '',
        notes: initialData.notes || '',
      });
    }
  }, [isEdit, initialData]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!clientData.name) {
        throw new Error('Client name is required');
      }
      
      // Prepare data
      const formData = { ...clientData };
      
      // Submit form
      let response;
      if (isEdit && initialData?.id) {
        // Update existing client
        response = await fetch(`/api/clients/${initialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new client
        response = await fetch('/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save client');
      }
      
      // Redirect to client detail page
      router.push(`/admin/clients/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="mr-2" size={20} />
          {isEdit ? 'Edit Client' : 'Add New Client'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Client Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.email}
              onChange={handleChange}
            />
          </div>
          
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.phone}
              onChange={handleChange}
            />
          </div>
          
          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.address}
              onChange={handleChange}
            />
          </div>
          
          {/* KRA PIN */}
          <div>
            <label htmlFor="kraPin" className="block text-sm font-medium text-gray-700 mb-1">
              KRA PIN
            </label>
            <input
              type="text"
              id="kraPin"
              name="kraPin"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.kraPin}
              onChange={handleChange}
            />
          </div>
          
          {/* Industry */}
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.industry}
              onChange={handleChange}
            >
              <option value="">Select Industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          
          {/* Contact Person */}
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.contactPerson}
              onChange={handleChange}
            />
          </div>
          
          {/* Contact Position */}
          <div>
            <label htmlFor="contactPosition" className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              id="contactPosition"
              name="contactPosition"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.contactPosition}
              onChange={handleChange}
            />
          </div>
          
          {/* Notes */}
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={clientData.notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save className="mr-2" size={18} />
          {loading ? 'Saving...' : (isEdit ? 'Update Client' : 'Add Client')}
        </button>
      </div>
    </form>
  );
}
