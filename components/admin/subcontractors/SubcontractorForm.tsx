"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { 
  Users, 
  Save, 
  X, 
  Plus, 
  Loader2, 
  AlertCircle,
  ChevronLeft 
} from 'lucide-react';

// Types
type SubcontractorFormProps = {
  id?: string; // If provided, we're editing. If not, we're creating.
};

type Subcontractor = {
  id?: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  specialties: string[];
  address?: string;
  notes?: string;
};

type FormErrors = {
  [key: string]: string;
};

export default function SubcontractorForm({ id }: SubcontractorFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [isSaving, setIsSaving] = useState(false);
  const [subcontractor, setSubcontractor] = useState<Subcontractor>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    specialties: [],
    address: '',
    notes: '',
  });
  const [newSpecialty, setNewSpecialty] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Load existing subcontractor data if editing
  useEffect(() => {
    if (id) {
      const loadSubcontractor = async () => {
        try {
          // Simulate API call
          setTimeout(() => {
            // Mock data
            setSubcontractor({
              id,
              name: 'EcoSystems Consultants',
              contactPerson: 'John Kamau',
              email: 'john@ecosystems.co.ke',
              phone: '+254 712 345 678',
              specialties: ['Environmental Assessment', 'Soil Testing'],
              address: '123 Green St, Nairobi, Kenya',
              notes: 'Excellent track record with environmental assessments.',
            });
            setIsLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Error loading subcontractor:', error);
          setIsLoading(false);
        }
      };
      
      loadSubcontractor();
    }
  }, [id]);
  
  // Form animations
  useEffect(() => {
    if (!isLoading && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isLoading]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setSubcontractor(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Add new specialty
  const handleAddSpecialty = () => {
    if (!newSpecialty.trim()) return;
    
    setSubcontractor(prev => ({
      ...prev,
      specialties: [...prev.specialties, newSpecialty.trim()]
    }));
    
    setNewSpecialty('');
    
    // Clear specialty error if it exists
    if (errors.specialties) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.specialties;
        return newErrors;
      });
    }
  };
  
  // Remove specialty
  const handleRemoveSpecialty = (index: number) => {
    setSubcontractor(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!subcontractor.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    
    if (!subcontractor.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }
    
    if (!subcontractor.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(subcontractor.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!subcontractor.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (subcontractor.specialties.length === 0) {
      newErrors.specialties = 'At least one specialty is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to subcontractors list
      router.push('/admin/subcontractors');
    } catch (error) {
      console.error('Error saving subcontractor:', error);
      setSubmitError('Failed to save subcontractor. Please try again later.');
      setIsSaving(false);
    }
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-1/4 ml-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/admin/subcontractors" 
          className="text-gray-500 hover:text-gray-700 transition-colors mr-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Edit Subcontractor' : 'Add Subcontractor'}
        </h1>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Submit error */}
            {submitError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}
            
            {/* Company Information Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Company Information</h2>
              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={subcontractor.name}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                {/* Contact Person */}
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={subcontractor.contactPerson}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.contactPerson ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.contactPerson && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>
                  )}
                </div>
                
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={subcontractor.email}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={subcontractor.phone}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={subcontractor.address || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Specialties Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Specialties</h2>
              <div className="space-y-4">
                {/* Add Specialty */}
                <div>
                  <label htmlFor="newSpecialty" className="block text-sm font-medium text-gray-700 mb-1">
                    Add Specialty <span className="text-red-600">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="newSpecialty"
                      name="newSpecialty"
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Fire Safety Audit"
                    />
                    <button
                      type="button"
                      onClick={handleAddSpecialty}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-700 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {errors.specialties && (
                    <p className="mt-1 text-sm text-red-600">{errors.specialties}</p>
                  )}
                </div>
                
                {/* Specialty Tags */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {subcontractor.specialties.map((specialty, index) => (
                      <div 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        <span>{specialty}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecialty(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notes Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Notes</h2>
              <div>
                <label htmlFor="notes" className="sr-only">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={subcontractor.notes || ''}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Additional notes about the subcontractor..."
                />
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 text-right">
            <div className="flex justify-end gap-3">
              <Link
                href="/admin/subcontractors"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    <span>Save Subcontractor</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}