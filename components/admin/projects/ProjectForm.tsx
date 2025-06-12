"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, Save, X, Users, Plus, Trash2, FileText } from 'lucide-react';

// Types
type Client = {
  id: string;
  name: string;
};

type Subcontractor = {
  id: string;
  name: string;
};

type ProjectFormData = {
  title: string;
  description: string;
  clientId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled' | 'on-hold';
  totalValue: string;
  completionPercentage: number;
  subcontractorIds: string[];
  notes: string;
};

// Props for the component
type ProjectFormProps = {
  projectId?: string;
};

// Mock data for clients and subcontractors
const mockClients: Client[] = [
  { id: '101', name: 'Unga Group' },
  { id: '102', name: 'Tata Chemicals' },
  { id: '103', name: 'Dormans Coffee' },
  { id: '104', name: 'Radisson Blu' },
  { id: '105', name: 'KTDA' },
  { id: '106', name: 'Lafarge' },
];

const mockSubcontractors: Subcontractor[] = [
  { id: '201', name: 'FireTech Solutions' },
  { id: '202', name: 'EcoSystems Consultants' },
  { id: '203', name: 'GreenTech Analysis' },
  { id: '204', name: 'SafetyFirst Trainers' },
  { id: '205', name: 'Energy Audit Specialists' },
];

// Default form values
const defaultFormData: ProjectFormData = {
  title: '',
  description: '',
  clientId: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  status: 'active',
  totalValue: '',
  completionPercentage: 0,
  subcontractorIds: [],
  notes: '',
};

export default function ProjectForm({ projectId }: ProjectFormProps = {}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const isEditMode = !!projectId;
  
  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      // Simulate API calls
      setTimeout(() => {
        setClients(mockClients);
        setSubcontractors(mockSubcontractors);
        
        // If editing, load project data
        if (isEditMode) {
          // Mock project data for editing
          setFormData({
            title: 'Environmental Impact Assessment',
            description: 'Comprehensive assessment of environmental impact for the new manufacturing facility.',
            clientId: '102',
            startDate: '2023-06-01',
            endDate: '',
            status: 'active',
            totalValue: '380000',
            completionPercentage: 65,
            subcontractorIds: ['202', '203'],
            notes: 'Client requested additional soil testing.',
          });
        }
        
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, [isEditMode, projectId]);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle subcontractor selection
  const handleSubcontractorChange = (subcontractorId: string) => {
    setFormData(prev => {
      const newSubcontractorIds = prev.subcontractorIds.includes(subcontractorId)
        ? prev.subcontractorIds.filter(id => id !== subcontractorId)
        : [...prev.subcontractorIds, subcontractorId];
      
      return { ...prev, subcontractorIds: newSubcontractorIds };
    });
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!formData.clientId) {
      newErrors.clientId = 'Client is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (formData.totalValue && isNaN(Number(formData.totalValue))) {
      newErrors.totalValue = 'Total value must be a number';
    }
    
    if (formData.completionPercentage < 0 || formData.completionPercentage > 100) {
      newErrors.completionPercentage = 'Completion percentage must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to projects list
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      setIsSaving(false);
    }
  };
  
  // Cancel form
  const handleCancel = () => {
    router.push('/admin/projects');
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditMode ? 'Edit Project' : 'Create New Project'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Project Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Title */}
          <div className="col-span-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Project Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder="Enter project title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          {/* Client */}
          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
              Client<span className="text-red-500">*</span>
            </label>
            <select
              id="clientId"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.clientId ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientId && <p className="mt-1 text-sm text-red-500">{errors.clientId}</p>}
          </div>
          
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`block w-full rounded-md border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} pl-10 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>
            {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
          </div>
          
          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 pl-10 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Total Value */}
          <div>
            <label htmlFor="totalValue" className="block text-sm font-medium text-gray-700 mb-1">
              Total Value (KES)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="totalValue"
                name="totalValue"
                value={formData.totalValue}
                onChange={handleChange}
                className={`block w-full rounded-md border ${errors.totalValue ? 'border-red-500' : 'border-gray-300'} pl-10 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="e.g., 250000"
              />
            </div>
            {errors.totalValue && <p className="mt-1 text-sm text-red-500">{errors.totalValue}</p>}
          </div>
          
          {/* Completion Percentage */}
          <div>
            <label htmlFor="completionPercentage" className="block text-sm font-medium text-gray-700 mb-1">
              Completion Percentage: {formData.completionPercentage}%
            </label>
            <input
              type="range"
              id="completionPercentage"
              name="completionPercentage"
              value={formData.completionPercentage}
              onChange={handleChange}
              min="0"
              max="100"
              step="5"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            {errors.completionPercentage && <p className="mt-1 text-sm text-red-500">{errors.completionPercentage}</p>}
          </div>
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Describe the project scope and objectives"
          />
        </div>
        
        {/* Subcontractors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcontractors
          </label>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {subcontractors.map((subcontractor) => (
                <div 
                  key={subcontractor.id} 
                  className={`flex items-center space-x-2 p-3 rounded-md border ${formData.subcontractorIds.includes(subcontractor.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} cursor-pointer transition-colors`}
                  onClick={() => handleSubcontractorChange(subcontractor.id)}
                >
                  <input
                    type="checkbox"
                    checked={formData.subcontractorIds.includes(subcontractor.id)}
                    onChange={() => {}} // Handled by onClick on the div
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span>{subcontractor.name}</span>
                </div>
              ))}
            </div>
            {subcontractors.length === 0 && (
              <p className="text-gray-500 text-sm">No subcontractors available</p>
            )}
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Any additional notes or special requirements"
          />
        </div>
        
        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                <span>{isEditMode ? 'Update Project' : 'Create Project'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}