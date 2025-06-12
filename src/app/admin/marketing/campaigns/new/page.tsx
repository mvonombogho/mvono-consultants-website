'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaSave, FaRegCalendarAlt } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Campaign types
const campaignTypes = [
  { value: 'email', label: 'Email Campaign' },
  { value: 'social', label: 'Social Media' },
  { value: 'event', label: 'Event' },
  { value: 'content', label: 'Content Marketing' },
  { value: 'print', label: 'Print Materials' },
]

// Mock data for selectable segments
const mockSegments = [
  { id: '1', name: 'Manufacturing Clients', size: 42 },
  { id: '2', name: 'High-Value Clients', size: 18 },
  { id: '3', name: 'Hospitality Sector', size: 27 },
  { id: '4', name: 'Needs Fire Safety Training', size: 62 },
  { id: '5', name: 'Certificate Expiring Soon', size: 31 },
]

// Mock data for email templates
const mockTemplates = [
  { id: '1', name: 'Safety Audit Follow-up', subject: 'Your Safety Audit Results' },
  { id: '2', name: 'Service Renewal Reminder', subject: 'Your Certification Is Due for Renewal' },
  { id: '3', name: 'New Service Announcement', subject: 'Introducing Our New Service - Special Launch Offer' },
  { id: '4', name: 'Monthly Newsletter', subject: 'Mvono Consultants Monthly Update' },
]

export default function NewCampaignPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    campaignType: 'email',
    startDate: '',
    endDate: '',
    objective: '',
    budget: '',
    segmentId: '',
    templates: [] as string[],
  })
  
  const router = useRouter()
  const { toast } = useToast()

  // Format dates to ISO string for input
  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const twoWeeksLater = new Date()
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14)
    
    setCampaignData(prev => ({
      ...prev,
      startDate: tomorrow.toISOString().split('T')[0],
      endDate: twoWeeksLater.toISOString().split('T')[0],
    }))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCampaignData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleTemplate = (templateId: string) => {
    setCampaignData(prev => {
      const currentTemplates = [...prev.templates]
      
      if (currentTemplates.includes(templateId)) {
        return {
          ...prev,
          templates: currentTemplates.filter(id => id !== templateId)
        }
      } else {
        return {
          ...prev,
          templates: [...currentTemplates, templateId]
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!campaignData.name || !campaignData.startDate || !campaignData.endDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }
    
    try {
      setIsSubmitting(true)
      
      // In production, this would be an API call
      // const response = await fetch('/api/campaigns', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(campaignData),
      // })
      
      // Mock success response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Success',
        description: 'Campaign created successfully',
      })
      
      router.push('/admin/marketing')
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast({
        title: 'Error',
        description: 'Failed to create campaign',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mr-4"
          >
            <FaArrowLeft className="mr-2" /> Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Create Marketing Campaign</h1>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center"
        >
          <FaSave className="mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Campaign'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="details">Campaign Details</TabsTrigger>
            <TabsTrigger value="targeting">Audience Targeting</TabsTrigger>
            <TabsTrigger value="content">Campaign Content</TabsTrigger>
            <TabsTrigger value="schedule">Schedule & Budget</TabsTrigger>
          </TabsList>

          {/* Campaign Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Provide the essential details about your marketing campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Q1 Safety Promotion"
                    value={campaignData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe the purpose and goals of this campaign"
                    value={campaignData.description}
                    onChange={handleInputChange}
                    className="w-full h-24 p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignType">Campaign Type</Label>
                  <select
                    id="campaignType"
                    name="campaignType"
                    value={campaignData.campaignType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    {campaignTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="objective">Campaign Objective</Label>
                  <Input
                    id="objective"
                    name="objective"
                    placeholder="e.g., Increase safety audit bookings by 20%"
                    value={campaignData.objective}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audience Targeting Tab */}
          <TabsContent value="targeting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
                <CardDescription>
                  Select which customer segments to target with this campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="segmentId">Customer Segment</Label>
                    <select
                      id="segmentId"
                      name="segmentId"
                      value={campaignData.segmentId}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select a segment (or target all clients)</option>
                      {mockSegments.map((segment) => (
                        <option key={segment.id} value={segment.id}>
                          {segment.name} ({segment.size} clients)
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-800 mb-2">Segment Details</h3>
                    {campaignData.segmentId ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Segment:</strong> {mockSegments.find(s => s.id === campaignData.segmentId)?.name}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Total Clients:</strong> {mockSegments.find(s => s.id === campaignData.segmentId)?.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Estimated Reach:</strong> {Math.floor(Number(mockSegments.find(s => s.id === campaignData.segmentId)?.size || 0) * 0.9)} clients
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Select a segment to see details or leave empty to target all clients
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaign Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Content</CardTitle>
                <CardDescription>
                  Select the email templates to use in this campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignData.campaignType === 'email' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockTemplates.map((template) => (
                        <div 
                          key={template.id}
                          className={`border rounded-md p-4 cursor-pointer transition-all ${
                            campaignData.templates.includes(template.id) 
                              ? 'border-primary-600 bg-primary-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => toggleTemplate(template.id)}
                        >
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              checked={campaignData.templates.includes(template.id)}
                              onChange={() => {}}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-sm text-gray-600">{template.subject}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      For {campaignTypes.find(t => t.value === campaignData.campaignType)?.label} campaigns, content will be managed separately.
                    </p>
                  )}
                  
                  {campaignData.campaignType === 'email' && campaignData.templates.length === 0 && (
                    <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-md">
                      <p className="text-sm">
                        <strong>Note:</strong> You haven't selected any email templates. You'll need to select at least one template or create a new one before sending this campaign.
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/admin/marketing/emails/new')}
                    >
                      Create New Email Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule & Budget Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Schedule</CardTitle>
                <CardDescription>
                  Set the timeline for your marketing campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <div className="relative">
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={campaignData.startDate}
                        onChange={handleInputChange}
                        required
                        className="pl-10"
                      />
                      <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <div className="relative">
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={campaignData.endDate}
                        onChange={handleInputChange}
                        required
                        className="pl-10"
                      />
                      <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Label htmlFor="budget">Campaign Budget (KES)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="e.g., 50000"
                    value={campaignData.budget}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the total budget for this campaign. Leave blank if budget is not yet determined.
                  </p>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-gray-800 mb-3">Campaign Schedule Summary</h3>
                  <div className="p-4 bg-gray-50 rounded-md">
                    {campaignData.startDate && campaignData.endDate ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <strong>Duration:</strong> {calculateDuration(campaignData.startDate, campaignData.endDate)} days
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Status on Start:</strong> {
                            new Date(campaignData.startDate).getTime() <= new Date().getTime() ? 
                            'Active immediately' : 
                            'Scheduled'
                          }
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Daily Budget (Est.):</strong> {
                            campaignData.budget ?
                            `KES ${Math.round(Number(campaignData.budget) / calculateDuration(campaignData.startDate, campaignData.endDate)).toLocaleString()}` :
                            'N/A'
                          }
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Set start and end dates to see campaign duration and budget breakdown
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
          </Button>
        </div>
      </form>
    </div>
  )
}

// Helper function to calculate duration between two dates
function calculateDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays + 1 // Include both start and end days
}
