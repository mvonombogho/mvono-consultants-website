'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Campaign {
  id: string;
  name: string;
  description: string;
  objective: string;
  campaignType: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  actualSpent: number;
  ROI: number;
  targetSegmentId?: string;
}

interface CustomerSegment {
  id: string;
  name: string;
}

interface CampaignModalProps {
  campaign?: Campaign | null;
  segments: CustomerSegment[];
  onClose: () => void;
  onSubmit: (campaignData: any) => void;
}

export const CampaignModal = ({ campaign, segments, onClose, onSubmit }: CampaignModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    objective: '',
    campaignType: 'email',
    status: 'draft',
    startDate: '',
    endDate: '',
    budget: '',
    targetSegmentId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Initialize form data if editing an existing campaign
  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name || '',
        description: campaign.description || '',
        objective: campaign.objective || '',
        campaignType: campaign.campaignType || 'email',
        status: campaign.status || 'draft',
        startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
        endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
        budget: campaign.budget ? campaign.budget.toString() : '',
        targetSegmentId: campaign.targetSegmentId || '',
      });
    }
  }, [campaign]);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Campaign name is required';
      }
      if (!formData.campaignType) {
        newErrors.campaignType = 'Campaign type is required';
      }
      if (!formData.status) {
        newErrors.status = 'Status is required';
      }
    } else if (currentStep === 2) {
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required';
      }
      if (!formData.endDate) {
        newErrors.endDate = 'End date is required';
      }
      if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      // Convert budget to number
      const processedData = {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : 0,
      };
      onSubmit(processedData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold text-gray-800">
            {campaign ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step > index + 1 
                            ? 'bg-blue-600 text-white' 
                            : step === index + 1 
                              ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                              : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {step > index + 1 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="text-xs mt-1 text-gray-500">
                        {index === 0 ? 'Basics' : index === 1 ? 'Schedule' : 'Targeting'}
                      </span>
                    </div>
                    {index < totalSteps - 1 && (
                      <div 
                        className={`flex-1 h-1 mx-2 ${
                          step > index + 1 ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter campaign name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter campaign description"
                  />
                </div>

                <div>
                  <label htmlFor="objective" className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Objective
                  </label>
                  <input
                    type="text"
                    id="objective"
                    name="objective"
                    value={formData.objective}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="E.g., Increase awareness, generate leads"
                  />
                </div>

                <div>
                  <label htmlFor="campaignType" className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Type*
                  </label>
                  <select
                    id="campaignType"
                    name="campaignType"
                    value={formData.campaignType}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.campaignType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="email">Email</option>
                    <option value="social">Social Media</option>
                    <option value="content">Content Marketing</option>
                    <option value="event">Event</option>
                    <option value="print">Print</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.campaignType && <p className="text-red-500 text-xs mt-1">{errors.campaignType}</p>}
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status*
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.status ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Schedule */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.startDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date*
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.endDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget (KES)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter campaign budget"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Targeting */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="targetSegmentId" className="block text-sm font-medium text-gray-700 mb-1">
                    Target Segment
                  </label>
                  <select
                    id="targetSegmentId"
                    name="targetSegmentId"
                    value={formData.targetSegmentId}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Clients</option>
                    {segments.map((segment) => (
                      <option key={segment.id} value={segment.id}>
                        {segment.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800">Campaign Summary</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {formData.name}</p>
                    <p><span className="font-medium">Type:</span> {formData.campaignType}</p>
                    <p><span className="font-medium">Status:</span> {formData.status}</p>
                    <p><span className="font-medium">Duration:</span> {formData.startDate} to {formData.endDate}</p>
                    <p><span className="font-medium">Budget:</span> {formData.budget ? `KES ${parseFloat(formData.budget).toLocaleString()}` : 'Not specified'}</p>
                    <p><span className="font-medium">Target:</span> {formData.targetSegmentId ? segments.find(s => s.id === formData.targetSegmentId)?.name : 'All Clients'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between p-4 border-t border-gray-200">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            )}

            {step < totalSteps ? (
              <Button
                type="button"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {campaign ? 'Update Campaign' : 'Create Campaign'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
