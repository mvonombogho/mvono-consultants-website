'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'
import dynamic from 'next/dynamic'

// Dynamically import the editor to avoid SSR issues
const EmailEditor = dynamic(() => import('@/components/marketing/EmailEditor'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-100 animate-pulse rounded-md"></div>
})

const templateTypes = [
  { value: 'marketing', label: 'Marketing Campaign' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'report', label: 'Report' },
  { value: 'confirmation', label: 'Confirmation' },
]

export default function NewEmailTemplatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [templateSubject, setTemplateSubject] = useState('')
  const [templateType, setTemplateType] = useState('marketing')
  const [bodyContent, setBodyContent] = useState(`
<p>Dear [Client Name],</p>
<p>Thank you for your continued partnership with Mvono Consultants.</p>
<p>We are pleased to inform you about [Main Message Here].</p>
<p>If you have any questions, please don't hesitate to contact us.</p>
<p>Best regards,</p>
<p>Mvono Consultants Team</p>
<p>Phone: +254 720 270 694</p>
<p>Email: sales@mvonoconsultants.com</p>
  `)
  
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!templateName || !templateSubject || !bodyContent) {
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
      // const response = await fetch('/api/email-templates', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: templateName,
      //     subject: templateSubject,
      //     templateType,
      //     body: bodyContent,
      //     isActive: true,
      //   }),
      // })
      
      // Mock success response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Success',
        description: 'Email template created successfully',
      })
      
      router.push('/admin/marketing/emails')
    } catch (error) {
      console.error('Error creating template:', error)
      toast({
        title: 'Error',
        description: 'Failed to create email template',
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
          <h1 className="text-2xl font-bold tracking-tight">Create Email Template</h1>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center"
        >
          <FaSave className="mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Template'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Template Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name *</Label>
                <Input
                  id="templateName"
                  placeholder="e.g., Monthly Newsletter"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="templateType">Template Type</Label>
                <select
                  id="templateType"
                  value={templateType}
                  onChange={(e) => setTemplateType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  {templateTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="templateSubject">Email Subject Line *</Label>
              <Input
                id="templateSubject"
                placeholder="e.g., Your Monthly Safety Update from Mvono Consultants"
                value={templateSubject}
                onChange={(e) => setTemplateSubject(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Subject line will appear in recipient's inbox. Make it clear and engaging.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Design your email using the editor below. You can use placeholders like [Client Name] that will be replaced with actual values when sending.
              </p>
              
              <div className="border rounded-md overflow-hidden">
                <EmailEditor
                  initialValue={bodyContent}
                  onChange={setBodyContent}
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Available Placeholders:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><code>[Client Name]</code> - Client's full name</li>
                  <li><code>[Contact Person]</code> - Client contact person's name</li>
                  <li><code>[Company Name]</code> - Client company name</li>
                  <li><code>[Service Type]</code> - Type of service</li>
                  <li><code>[Invoice Number]</code> - Invoice reference number</li>
                  <li><code>[Amount Due]</code> - Outstanding amount</li>
                  <li><code>[Due Date]</code> - Payment due date</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
