"use client";

import { useEffect, useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Eye, FileEdit, Trash2, Users } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import ConfirmDialog from '@/components/common/ConfirmDialog';

export default function SegmentList() {
  const [segments, setSegments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [segmentToDelete, setSegmentToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await fetch('/api/marketing/segments');
        if (!response.ok) {
          throw new Error('Failed to fetch segments');
        }
        const data = await response.json();
        setSegments(data);
      } catch (err) {
        setError('Could not load segments. Please try again.');
        console.error('Error fetching segments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSegments();
  }, []);

  const confirmDelete = (segmentId: string) => {
    setSegmentToDelete(segmentId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!segmentToDelete) return;

    try {
      const response = await fetch(`/api/marketing/segments/${segmentToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete segment');
      }

      // Remove segment from state
      setSegments((prev) => prev.filter((segment) => segment.id !== segmentToDelete));
    } catch (error) {
      console.error('Error deleting segment:', error);
      setError('Failed to delete segment. Please try again.');
    } finally {
      setIsDeleteDialogOpen(false);
      setSegmentToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full max-w-md" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center py-10">
            <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Error Loading Segments</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (segments.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center py-10">
            <Users className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Segments Found</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first customer segment.</p>
            <Link href="/admin/marketing/segments/new">
              <Button>Create Segment</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segment Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {segments.map((segment) => (
                  <TableRow key={segment.id}>
                    <TableCell className="font-medium">{segment.name}</TableCell>
                    <TableCell>{segment.segmentSize || 0} clients</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={segment.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {segment.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(segment.updatedAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">Open menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/admin/marketing/segments/${segment.id}`}>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/admin/marketing/segments/${segment.id}/edit`}>
                            <DropdownMenuItem>
                              <FileEdit className="h-4 w-4 mr-2" /> Edit Segment
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => confirmDelete(segment.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete Segment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Segment"
        description="Are you sure you want to delete this segment? This action cannot be undone and will remove this segment from any associated campaigns."
        confirmLabel="Delete"
        confirmVariant="destructive"
      />
    </>
  );
}
