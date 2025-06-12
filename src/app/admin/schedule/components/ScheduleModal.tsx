'use client';

import { useState, useEffect } from 'react';
import { useSchedule } from '@/contexts/ScheduleContext';
import { 
  Schedule, 
  ScheduleFormData, 
  SCHEDULE_STATUSES, 
  SCHEDULE_PRIORITIES, 
  SCHEDULE_RECURRENCES, 
  SCHEDULE_COLORS,
  formatDateToInputDateTime 
} from '@/types/schedule';
import { 
  FaTimes, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUser, 
  FaBuilding, 
  FaClipboardList,
  FaInfoCircle,
  FaTools,
  FaUserTie
} from 'react-icons/fa';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewOnly?: boolean;
  initialDate?: Date | null;
}

export default function ScheduleModal({ 
  isOpen, 
  onClose, 
  viewOnly = false, 
  initialDate = null 
}: ScheduleModalProps) {
  const { selectedSchedule, createSchedule, updateSchedule } = useSchedule();
  
  // Form state
  const [formData, setFormData] = useState<ScheduleFormData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    status: 'scheduled',
    priority: 'medium',
    clientId: null,
    projectId: null,
    serviceId: null,
    subcontractorId: null,
    notes: '',
    assignedToId: null,
    isAllDay: false,
    recurrence: 'none',
    recurrenceEnd: null,
    color: null,
  });

  // Options for dropdowns
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [subcontractors, setSubcontractors] = useState<{ id: string; name: string }[]>([]);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Set initial form data when modal opens
  useEffect(() => {
    if (isOpen) {
      // If editing an existing schedule
      if (selectedSchedule) {
        setFormData({
          title: selectedSchedule.title,
          description: selectedSchedule.description || '',
          startDate: formatDateToInputDateTime(selectedSchedule.startDate),
          endDate: formatDateToInputDateTime(selectedSchedule.endDate),
          location: selectedSchedule.location || '',
          status: selectedSchedule.status,
          priority: selectedSchedule.priority || 'medium',
          clientId: selectedSchedule.clientId,
          projectId: selectedSchedule.projectId,
          serviceId: selectedSchedule.serviceId,
          subcontractorId: selectedSchedule.subcontractorId,
          notes: selectedSchedule.notes || '',
          assignedToId: selectedSchedule.assignedToId,
          isAllDay: selectedSchedule.isAllDay,
          recurrence: selectedSchedule.recurrence || 'none',
          recurrenceEnd: selectedSchedule.recurrenceEnd 
            ? formatDateToInputDateTime(selectedSchedule.recurrenceEnd) 
            : null,
          color: selectedSchedule.color,
        });
      } else if (initialDate) {
        // If creating a new schedule with an initial date
        const startDate = new Date(initialDate);
        const endDate = new Date(initialDate);
        endDate.setHours(endDate.getHours() + 1);
        
        setFormData({
          ...formData,
          startDate: formatDateToInputDateTime(startDate),
          endDate: formatDateToInputDateTime(endDate),
        });
      } else {
        // Reset form for a new schedule
        const now = new Date();
        const oneHourLater = new Date(now);
        oneHourLater.setHours(oneHourLater.getHours() + 1);
        
        setFormData({
          title: '',
          description: '',
          startDate: formatDateToInputDateTime(now),
          endDate: formatDateToInputDateTime(oneHourLater),
          location: '',
          status: 'scheduled',
          priority: 'medium',
          clientId: null,
          projectId: null,
          serviceId: null,
          subcontractorId: null,
          notes: '',
          assignedToId: null,
          isAllDay: false,
          recurrence: 'none',
          recurrenceEnd: null,
          color: null,
        });
      }
      
      // Fetch dropdown options
      fetchClients();
      fetchProjects();
      fetchServices();
      fetchUsers();
      fetchSubcontractors();
    }
  }, [isOpen, selectedSchedule, initialDate]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Fetch options for dropdowns
  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSubcontractors = async () => {
    try {
      const response = await fetch('/api/subcontractors');
      if (response.ok) {
        const data = await response.json();
        setSubcontractors(data);
      }
    } catch (error) {
      console.error('Error fetching subcontractors:', error);
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
      errors.endDate = 'End date must be after start date';
    }
    
    if (formData.recurrence !== 'none' && !formData.recurrenceEnd) {
      errors.recurrenceEnd = 'End date is required for recurring schedules';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      if (selectedSchedule) {
        // Update existing schedule
        await updateSchedule(selectedSchedule.id, formData);
      } else {
        // Create new schedule
        await createSchedule(formData);
      }
      
      onClose();
    } catch (error) {
      setError('Failed to save schedule. Please try again.');
      console.error('Error saving schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {viewOnly 
              ? 'Schedule Details' 
              : selectedSchedule 
              ? 'Edit Schedule' 
              : 'Create Schedule'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes size={18} />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={viewOnly}
                className={`w-full border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} ${
                  formErrors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.title && (
                <p className="mt-1 text-xs text-red-500">{formErrors.title}</p>
              )}
            </div>
            
            {/* Date and Time */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} ${
                    formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {formErrors.startDate && (
                <p className="mt-1 text-xs text-red-500">{formErrors.startDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} ${
                    formErrors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {formErrors.endDate && (
                <p className="mt-1 text-xs text-red-500">{formErrors.endDate}</p>
              )}
            </div>
            
            {/* All Day and Recurrence */}
            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="isAllDay"
                  name="isAllDay"
                  checked={formData.isAllDay}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded mr-2"
                />
                <label htmlFor="isAllDay" className="text-sm font-medium text-gray-700">
                  All Day Event
                </label>
              </div>
              
              <label htmlFor="recurrence" className="block text-sm font-medium text-gray-700 mb-1">
                Recurrence
              </label>
              <select
                id="recurrence"
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                disabled={viewOnly}
                className={`w-full border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
              >
                {SCHEDULE_RECURRENCES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              {formData.recurrence !== 'none' && (
                <>
                  <label htmlFor="recurrenceEnd" className="block text-sm font-medium text-gray-700 mb-1">
                    Recurrence End Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="recurrenceEnd"
                      name="recurrenceEnd"
                      value={formData.recurrenceEnd || ''}
                      onChange={handleChange}
                      disabled={viewOnly}
                      className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} ${
                        formErrors.recurrenceEnd ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {formErrors.recurrenceEnd && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.recurrenceEnd}</p>
                  )}
                </>
              )}
            </div>
            
            {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
                />
              </div>
            </div>
            
            {/* Status and Priority */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={viewOnly}
                className={`w-full border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
              >
                {SCHEDULE_STATUSES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={viewOnly}
                className={`w-full border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
              >
                {SCHEDULE_PRIORITIES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Client and Project */}
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                Client
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <select
                  id="clientId"
                  name="clientId"
                  value={formData.clientId || ''}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
                Project
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaClipboardList className="text-gray-400" />
                </div>
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId || ''}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Service and Assigned To */}
            <div>
              <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTools className="text-gray-400" />
                </div>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId || ''}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="assignedToId" className="block text-sm font-medium text-gray-700 mb-1">
                Assigned To
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <select
                  id="assignedToId"
                  name="assignedToId"
                  value={formData.assignedToId || ''}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subcontractor */}
            <div>
              <label htmlFor="subcontractorId" className="block text-sm font-medium text-gray-700 mb-1">
                Subcontractor
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserTie className="text-gray-400" />
                </div>
                <select
                  id="subcontractorId"
                  name="subcontractorId"
                  value={formData.subcontractorId || ''}
                  onChange={handleChange}
                  disabled={viewOnly}
                  className={`w-full pl-10 border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
                >
                  <option value="">None</option>
                  {subcontractors.map((subcontractor) => (
                    <option key={subcontractor.id} value={subcontractor.id}>
                      {subcontractor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <select
                id="color"
                name="color"
                value={formData.color || ''}
                onChange={handleChange}
                disabled={viewOnly}
                className={`w-full border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
              >
                <option value="">Default</option>
                {SCHEDULE_COLORS.map((color) => (
                  <option 
                    key={color.value} 
                    value={color.value}
                    style={{ backgroundColor: color.value + '22' }}
                  >
                    {color.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                disabled={viewOnly}
                className={`w-full border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
              ></textarea>
            </div>
            
            {/* Notes */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                disabled={viewOnly}
                className={`w-full border rounded-md py-2 px-3 ${viewOnly ? 'bg-gray-100' : ''} border-gray-300`}
              ></textarea>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              {viewOnly ? 'Close' : 'Cancel'}
            </button>
            
            {!viewOnly && (
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : selectedSchedule ? 'Update Schedule' : 'Create Schedule'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
