'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaUsers, FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

// Mock data for segments
const mockSegments = [
  {
    id: '1',
    name: 'Manufacturing Clients',
    description: 'All clients in the manufacturing industry',
    criteria: JSON.stringify({ industry: 'manufacturing' }),
    segmentSize: 42,
    isActive: true,
    createdAt: '2025-01-15T08:30:00Z',
    updatedAt: '2025-01-15T08:30:00Z',
  },
  {
    id: '2',
    name: 'High-Value Clients',
    description: 'Clients with total invoice value over KES 500,000',
    criteria: JSON.stringify({ invoiceTotal: { gt: 500000 } }),
    segmentSize: 18,
    isActive: true,
    createdAt: '2025-01-20T10:15:00Z',
    updatedAt: '2025-02-05T14:30:00Z',
  },
  {
    id: '3',
    name: 'Hospitality Sector',
    description: 'All hotels, restaurants, and tourism businesses',
    criteria: JSON.stringify({ industry: ['hospitality', 'tourism', 'restaurant'] }),
    segmentSize: 27,
    isActive: true,
    createdAt: '2025-02-01T09:45:00Z',
    updatedAt: '2025-02-01T09:45:00Z',
  },
  {
    id: '4',
    name: 'Needs Fire Safety Training',
    description: 'Clients who haven\'t had fire safety training in the last year',
    criteria: JSON.stringify({ lastFireTraining: { lt: 'now-1y' } }),
    segmentSize: 62,
    isActive: true,
    createdAt: '2025-02-10T11:20:00Z',
    updatedAt: '2025-02-10T11:20:00Z',
  },
  {
    id: '5',
    name: 'Certificate Expiring Soon',
    description: 'Clients with certificates expiring in the next 90 days',
    criteria: JSON.stringify({ certificateExpiry: { lt: 'now+90d', gt: 'now' } }),
    segmentSize: 31,
    isActive: true,
    createdAt: '2025-02-15T14:10:00Z',
    updatedAt: '2025-02-15T14:10:00Z',
  },
]

export default function SegmentsPage() {
  const [segments, setSegments] = useState(mockSegments)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Fetch segments (would replace mock in production)
  useEffect(() => {
    const fetchSegments = async () => {
      try {
        setIsLoading(true)
        // In production, this would fetch from API
        // const response = await fetch('/api/segments')
        // const data = await response.json()
        // setSegments(data)
        
        // Using mock data for now
        setTimeout(() => {
          setSegments(mockSegments)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error('Error fetching segments:', error)
        toast({
          title: 'Error',
          description: 'Failed to load segments',
          variant: 'destructive',
        })
        setIsLoading(false)
      }
    }

    fetchSegments()
  }, [toast])

  // Filter segments based on search term
  const filteredSegments = segments.filter(segment => 
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    segment.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setSelectedSegmentId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedSegmentId) return
    
    try {
      // In production, this would call API
      // await fetch(`/api/segments/${selectedSegmentId}`, {
      //   method: 'DELETE',
      // })
      
      // For now, just update the local state
      setSegments(prev => prev.filter(segment => segment.id !== selectedSegmentId))
      
      toast({
        title: 'Success',
        description: 'Segment deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting segment:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete segment',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialogOpen(false)
      setSelectedSegmentId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Segments</h1>
          <p className="text-muted-foreground">
            Create and manage customer segments for targeted marketing campaigns
          </p>
        </div>
        <Button 
          onClick={() => router.push('/admin/marketing/segments/new')}
          className="sm:w-auto w-full"
        >
          <FaPlus className="mr-2" /> New Segment
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search segments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
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
      ) : filteredSegments.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segment Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Size</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSegments.map((segment) => (
                  <TableRow key={segment.id}>
                    <TableCell className="font-medium">{segment.name}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {segment.description}
                    </TableCell>
                    <TableCell className="text-center">{segment.segmentSize}</TableCell>
                    <TableCell className="text-center">
                      {segment.isActive ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/admin/marketing/segments/${segment.id}`)}
                          title="View Segment"
                        >
                          <FaEye size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/admin/marketing/segments/${segment.id}/edit`)}
                          title="Edit Segment"
                        >
                          <FaEdit size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(segment.id)}
                          title="Delete Segment"
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          icon={<FaUsers size={48} />}
          title="No segments found"
          description={searchTerm ? "No segments match your search criteria" : "Create your first customer segment"}
          action={
            <Button onClick={() => router.push('/admin/marketing/segments/new')}>
              <FaPlus className="mr-2" /> Create Segment
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
              This will permanently delete this customer segment. This action cannot be undone.
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
