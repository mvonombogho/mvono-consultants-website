'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaSave, FaTimes, FaSpinner } from 'react-icons/fa'
import { useClients } from '@/contexts/ClientContext'
import { ClientData } from '@/lib/clients'

// Industry options for dropdown
const industryOptions = [
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

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getClient, updateClient } = useClients()
  
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<ClientData>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    kraPin: '',
    industry: '',
    status: 'active'
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  
  // Load client data
  useEffect(() => {
    const loadClient = async () => {
      try {
        const client = await getClient(params.id)
        if (client) {
          setFormData({
            name: client.name,
            contactPerson: client.contactPerson || '',
            email: client.email || '',
            phone: client.phone || '',
            address: client.address || '',
            kraPin: client.kraPin || '',
            industry: client.industry || '',
            status: client.status || 'active'
          })
        } else {
          setErrors({ general: 'Client not found' })
        }
      } catch (error) {
        console.error('Error loading client:', error)
        setErrors({ general: 'Failed to load client data' })
      } finally {
        setLoading(false)
      }
    }
    
    loadClient()
  }, [getClient, params.id])
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Client name is required'
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (formData.phone && !/^[+\d\s\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (formData.kraPin && !/^[A-Za-z0-9]{8,12}$/.test(formData.kraPin)) {
      newErrors.kraPin = 'Please enter a valid KRA PIN (8-12 alphanumeric characters)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    // Update client
    setSaving(true)
    
    try {
      const updatedClient = await updateClient(params.id, formData)
      if (updatedClient) {
        router.push('/admin/clients')
      } else {
        setErrors({ submit: 'Failed to update client. Please try again.' })
        setSaving(false)
      }
    } catch (error) {
      console.error('Error updating client:', error)
      setErrors({ submit: 'An error occurred while saving. Please try again.' })
      setSaving(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-primary-600 text-4xl" />
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Edit Client</h1>
        <Link 
          href="/admin/clients"
          className="text-gray-600 hover:text-gray-800 flex items-center transition-colors"
        >
          <FaTimes className="mr-2" />
          Cancel
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {errors.general ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{errors.general}</p>
            <Link 
              href="/admin/clients"
              className="mt-2 text-primary-600 hover:text-primary-800 transition-colors inline-block"
            >
              Back to Clients
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Client Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
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
                  value={formData.contactPerson || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                  value={formData.email || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
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
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+254 700 000 000"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              
              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Industry</option>
                  {industryOptions.map((industry, index) => (
                    <option key={index} value={industry}>{industry}</option>
                  ))}
                </select>
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
                  value={formData.kraPin || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.kraPin ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.kraPin && (
                  <p className="mt-1 text-sm text-red-600">{errors.kraPin}</p>
                )}
              </div>
              
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || 'active'}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            {/* Address */}
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/clients"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className={`px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center ${
                  saving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <FaSave className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
