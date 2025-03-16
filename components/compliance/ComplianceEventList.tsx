'use client';

import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, Clock, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ComplianceEventListProps {
  events: any[];
  onEventSelect: (event: any) => void;
  isLoading: boolean;
}

const ComplianceEventList = ({ events, onEventSelect, isLoading }: ComplianceEventListProps) => {
  const priorityClasses = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-amber-100 text-amber-800 border-amber-300',
    low: 'bg-green-100 text-green-800 border-green-300',
  };

  const statusClasses = {
    pending: 'bg-gray-100 text-gray-800 border-gray-300',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
    overdue: 'bg-red-100 text-red-800 border-red-300',
  };
  
  const statusIcons = {
    pending: <Clock className="h-4 w-4 mr-1" />,
    'in-progress': <FileText className="h-4 w-4 mr-1" />,
    completed: <CheckCircle2 className="h-4 w-4 mr-1" />,
    overdue: <AlertTriangle className="h-4 w-4 mr-1" />,
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No compliance events found. Create your first event to get started.</p>
      </div>
    );
  }

  // Check for overdue events
  const today = new Date();
  const eventsWithOverdueStatus = events.map(event => {
    const dueDate = new Date(event.dueDate);
    if (event.status !== 'completed' && dueDate < today) {
      return { ...event, status: 'overdue' };
    }
    return event;
  });

  return (
    <div className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventsWithOverdueStatus.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{event.client?.name || 'N/A'}</TableCell>
              <TableCell className="capitalize">{event.complianceType}</TableCell>
              <TableCell>{format(new Date(event.dueDate), 'MMM dd, yyyy')}</TableCell>
              <TableCell>
                <Badge variant="outline" className={priorityClasses[event.priority] || priorityClasses.medium}>
                  {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusClasses[event.status] || statusClasses.pending}>
                  <span className="flex items-center">
                    {statusIcons[event.status]}
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('-', ' ')}
                  </span>
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onEventSelect(event)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onEventSelect(event)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComplianceEventList;
