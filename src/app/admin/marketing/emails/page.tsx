'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaEnvelope, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaClone } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/toast'
import EmptyState from '@/components/ui/EmptyState'

// Mock data for email templates
const mockTemplates = [
  {
    id: '1',
    name: 'Safety Audit Follow-up',
    subject: 'Your Safety Audit Results from Mvono Consultants',
    templateType: 'report',
    isActive: true,
    createdAt: '2025-01-10T09:30:00Z',
    updatedAt: '2025-02-01T14:20:00Z',
  },
  {
    id: '2',
    name: 'Service Renewal Reminder',
    subject: 'Your [Service] Certification Is Due for Renewal',
    templateType: 'reminder',
    isActive: true,
    createdAt: '2025-01-15T11:45:00Z',
    updatedAt: '2025-01-15T11:45:00Z',
  },
  {
    id: '3',
    name: 'New Service Announcement',
    subject: 'Introducing Our New [Service] - Special Launch Offer',
    templateType: 'marketing',
    isActive: true,
    createdAt: '2025-01-20T08:15:00Z',
    updatedAt: '2025-01-20T08:15:00Z',
  },
  {
    id: '4',
    name: 'Invoice Payment Reminder',
    subject: 'Reminder: Invoice #[InvoiceNumber] Payment Due',
    templateType: 'invoice',
    isActive: true,
    createdAt: '2025-01-25T16:30:00Z',
    updatedAt: '2025-01-25T16:30:00Z',
  },
  {
    id: '5',
    name: 'Monthly Newsletter',
    subject: 'Mvono Consultants Monthly Update - [Month] [Year]',
    templateType: 'newsletter',
    isActive: true,
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-02-15T14:30:00Z',
  },
  {
    id: '6',
    name: 'Training Confirmation',
    subject: 'Confirmation: Your Upcoming Training Session',
    templateType: 'confirmation',
    isActive: true,
    createdAt: '2025-02-10T13:20:00Z',
    updatedAt: '2025-02-10T13:20:00Z',
  },
]

// Template type colors
const templateTypeColors = {
  report: 'bg-blue-100 text-blue-800',
  reminder: 'bg-yellow-100 text-yellow-800',
  marketing: 'bg-green-100 text-green-800',
  invoice: 'bg-purple-100 text-purple-800',
  newsletter: 'bg-indigo-100 text-indigo-800',
  confirmation: 'bg-teal-100 text-teal-800',
  default: 'bg-gray-100 text-gray-800',
}

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState(mockTemplates)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Fetch templates (would replace mock in production)
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true)
        // In production, this would fetch from API
        // const response = await fetch('/api/email-templates')
        // const data = await response.json()
        // setTemplates(data)
        
        // Using mock data for now
        setTimeout(() => {
          setTemplates(mockTemplates)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error('Error fetching email templates:', error)
        toast({
          title: 'Error',
          description: 'Failed to load email templates',
          variant: 'destructive',
        })
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [toast])

  // Filter templates based on search term
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.templateType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setSelectedTemplateId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedTemplateId) return
    
    try {
      // In production, this would call API
      // await fetch(`/api/email-templates/${selectedTemplateId}`, {
      //   method: 'DELETE',
      // })
      
      // For now, just update the local state
      setTemplates(prev => prev.filter(template => template.id !== selectedTemplateId))
      
      toast({
        title: 'Success',
        description: 'Email template deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting email template:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete email template',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialogOpen(false)
      setSelectedTemplateId(null)
    }
  }

  // Handle template duplication
  const handleDuplicate = async (template: any) => {
    try {
      const duplicatedTemplate = {
        ...template,
        id: Date.now().toString(), // Generate a temporary ID
        name: `${template.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      // In production, this would call API
      // const response = await fetch('/api/email-templates', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(duplicatedTemplate),
      // })
      // const data = await response.json()
      
      // For now, just update the local state
      setTemplates(prev => [...prev, duplicatedTemplate])
      
      toast({
        title: 'Success',
        description: 'Email template duplicated successfully',
      })
    } catch (error) {
      console.error('Error duplicating template:', error)
      toast({
        title: 'Error',
        description: 'Failed to duplicate template',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Email Templates</h1>
          <p className="text-muted-foreground">
            Create and manage reusable email templates for various purposes
          </p>
        </div>
        <Button 
          onClick={() => router.push('/admin/marketing/emails/new')}
          className="sm:w-auto w-full"
        >
          <FaPlus className="mr-2" /> New Template
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className="hover:shadow-md transition-shadow border"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge 
                    className={`${templateTypeColors[template.templateType as keyof typeof templateTypeColors] || templateTypeColors.default} capitalize`}
                  >
                    {template.templateType}
                  </Badge>
                  <Badge variant="outline" className={template.isActive ? 'text-green-600' : 'text-gray-600'}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-2">{template.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {template.subject}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground mb-4">
                  Last updated: {new Date(template.updatedAt).toLocaleDateString()}
                </div>
                
                <div className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/marketing/emails/${template.id}`)}
                    className="flex-1"
                  >
                    <FaEye size={14} className="mr-1" /> View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/marketing/emails/${template.id}/edit`)}
                    className="flex-1"
                  >
                    <FaEdit size={14} className="mr-1" /> Edit
                  </Button>
                </div>
                
                <div className="flex justify-between gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(template)}
                    className="flex-1"
                  >
                    <FaClone size={14} className="mr-1" /> Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(template.id)}
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    <FaTrash size={14} className="mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FaEnvelope size={48} />}
          title="No email templates found"
          description={searchTerm ? "No templates match your search criteria" : "Create your first email template"}
          action={
            <Button onClick={() => router.push('/admin/marketing/emails/new')}>
              <FaPlus className="mr-2" /> New Template
            </Button>
          }
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this email template. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
