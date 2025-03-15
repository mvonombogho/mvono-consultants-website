"use client";

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

// Team members for assignment
const TEAM_MEMBERS = [
  'David Kamau',
  'Grace Njeri',
  'Samuel Omondi',
  'Faith Wanjiku'
];

export default function DealForm({ deal, onSubmit, onCancel, stages }) {
  // Initialize form state with existing deal data or defaults
  const [formData, setFormData] = useState({
    title: deal?.title || '',
    client: deal?.client || '',
    value: deal?.value || '',
    stage: deal?.stage || 'Discovery',
    probability: deal?.probability || 20,
    expectedCloseDate: deal?.expectedCloseDate || '',
    assignedTo: deal?.assignedTo || '',
    description: deal?.description || '',
    nextSteps: deal?.nextSteps || '',
    activities: deal?.activities || []
  });
  
  const [newActivity, setNewActivity] = useState({
    type: 'call',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Deal title is required';
    if (!formData.client.trim()) newErrors.client = 'Client name is required';
    if (!formData.value) {
      newErrors.value = 'Deal value is required';
    } else if (isNaN(formData.value) || formData.value <= 0) {
      newErrors.value = 'Deal value must be a positive number';
    }
    if (!formData.expectedCloseDate) newErrors.expectedCloseDate = 'Expected close date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'stage') {
      // Update probability based on stage
      let probability;
      switch (value) {
        case 'Discovery': probability = 20; break;
        case 'Proposal': probability = 50; break;
        case 'Negotiation': probability = 75; break;
        case 'Closed Won': probability = 100; break;
        case 'Closed Lost': probability = 0; break;
        default: probability = formData.probability;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        probability
      }));
    } else if (name === 'value') {
      // Parse value to number
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleNewActivityChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddActivity = () => {
    if (newActivity.note.trim() === '') return;
    
    const newActivityWithId = {
      ...newActivity,
      id: Date.now(),
      date: newActivity.date || new Date().toISOString().split('T')[0]
    };
    
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivityWithId]
    }));
    
    // Reset form
    setNewActivity({
      type: 'call',
      date: new Date().toISOString().split('T')[0],
      note: ''
    });
  };
  
  const handleRemoveActivity = (activityId) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== activityId)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: deal?.id,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onCancel}></div>
      
      <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {deal ? 'Edit Deal' : 'Add New Deal'}
          </h2>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deal Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title</label>
              <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                placeholder="E.g., Fire Safety Audit for XYZ Company"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <input 
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className={`w-full rounded-lg border ${errors.client ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Enter client name"
              />
              {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value (KSh)</label>
              <input 
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className={`w-full rounded-lg border ${errors.value ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Enter deal value"
              />
              {errors.value && <p className="mt-1 text-sm text-red-600">{errors.value}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                {stages.map(stage => (
                  <option key={stage.id} value={stage.id}>{stage.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
              <input 
                type="number"
                name="probability"
                value={formData.probability}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                min="0"
                max="100"
                step="5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
              <input 
                type="date"
                name="expectedCloseDate"
                value={formData.expectedCloseDate}
                onChange={handleChange}
                className={`w-full rounded-lg border ${errors.expectedCloseDate ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.expectedCloseDate && <p className="mt-1 text-sm text-red-600">{errors.expectedCloseDate}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Team Member</option>
                {TEAM_MEMBERS.map(member => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe the deal..."
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Next Steps</label>
            <textarea
              name="nextSteps"
              value={formData.nextSteps}
              onChange={handleChange}
              rows="2"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="What are the next actions to move this deal forward?"
            ></textarea>
          </div>
          
          {/* Activities Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Activities</label>
            </div>
            
            <div className="space-y-3 mb-4">
              {formData.activities.map((activity) => (
                <div key={activity.id} className="flex items-start bg-gray-50 p-3 rounded-lg">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="capitalize text-sm font-medium text-gray-700">{activity.type}</span>
                      <span className="text-xs text-gray-500">on {activity.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{activity.note}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveActivity(activity.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add New Activity Form */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex flex-col space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <select
                      name="type"
                      value={newActivity.type}
                      onChange={handleNewActivityChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="call">Call</option>
                      <option value="email">Email</option>
                      <option value="meeting">Meeting</option>
                      <option value="note">Note</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="date"
                      name="date"
                      value={newActivity.date}
                      onChange={handleNewActivityChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        name="note"
                        value={newActivity.note}
                        onChange={handleNewActivityChange}
                        placeholder="Add activity note..."
                        className="flex-grow rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddActivity}
                        className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              {deal ? 'Update Deal' : 'Add Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
