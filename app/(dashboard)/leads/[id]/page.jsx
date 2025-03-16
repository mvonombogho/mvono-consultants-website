'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, Clock, Mail, Phone, Building, 
  Tag, FileText, User, Briefcase, DollarSign, 
  Loader2, PlusCircle, Edit, Trash, ChevronRight, AlertTriangle 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatCurrency } from '@/lib/utils';

// Lead status badge component
const LeadStatusBadge = ({ status }) => {
  const getVariant = () => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'qualified':
        return 'info';
      case 'converted':
        return 'success';
      case 'closed-lost':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
};

// Activity Item component
const ActivityItem = ({ activity }) => {
  const getActivityIcon = () => {
    switch (activity.activityType) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'call':
        return <Phone className="h-4 w-4 text-green-500" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'note':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'task':
        return <Clock className="h-4 w-4 text-red-500" />;
      case 'status':
        return <Tag className="h-4 w-4 text-yellow-500" />;
      case 'assignment':
        return <User className="h-4 w-4 text-indigo-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="bg-muted p-2 rounded-full">
        {getActivityIcon()}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{activity.description}</p>
          <span className="text-xs text-muted-foreground">
            {formatDate(activity.date)}
          </span>
        </div>
        {activity.notes && (
          <p className="text-xs text-muted-foreground">{activity.notes}</p>
        )}
        <div className="flex items-center pt-1 text-xs text-muted-foreground">
          <User className="mr-1 h-3 w-3" />
          <span>{activity.performedBy.name}</span>
          {activity.outcome && (
            <>
              <span className="mx-1">•</span>
              <span>Outcome: {activity.outcome}</span>
            </>
          )}
          {activity.followUpDate && (
            <>
              <span className="mx-1">•</span>
              <span>Follow up: {formatDate(activity.followUpDate)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// New Activity Dialog component
const NewActivityDialog = ({ leadId, onActivityCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    activityType: 'note',
    description: '',
    date: new Date().toISOString().slice(0, 16),
    notes: '',
    outcome: '',
    followUpDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/leads/${leadId}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create activity');
      }

      const activity = await response.json();
      toast.success('Activity added successfully');
      setIsOpen(false);
      setFormData({
        activityType: 'note',
        description: '',
        date: new Date().toISOString().slice(0, 16),
        notes: '',
        outcome: '',
        followUpDate: '',
      });
      onActivityCreated(activity);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogDescription>
            Record a new interaction with this lead.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="activityType">Activity Type</Label>
                <Select
                  value={formData.activityType}
                  onValueChange={(value) => handleSelectChange('activityType', value)}
                  required
                >
                  <SelectTrigger id="activityType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="outcome">Outcome</Label>
                <Select
                  value={formData.outcome}
                  onValueChange={(value) => handleSelectChange('outcome', value)}
                >
                  <SelectTrigger id="outcome">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No outcome</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input
                  id="followUpDate"
                  name="followUpDate"
                  type="datetime-local"
                  value={formData.followUpDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Activity
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
