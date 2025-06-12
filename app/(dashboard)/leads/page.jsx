'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PlusCircle, Filter, Search, ArrowUpDown, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PageTitle } from '@/components/page-title';
import { EmptyState } from '@/components/empty-state';
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

// Lead priority badge component
const LeadPriorityBadge = ({ priority }) => {
  if (!priority) return null;
  
  const getVariant = () => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return <Badge variant={getVariant()}>{priority}</Badge>;
};

// Create Lead Dialog component
const CreateLeadDialog = ({ users, onLeadCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'website',
    status: 'new',
    priority: 'medium',
    notes: '',
    assignedToId: '',
    estimatedValue: '',
    industry: '',
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
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create lead');
      }

      const lead = await response.json();
      toast.success('Lead created successfully');
      setIsOpen(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        source: 'website',
        status: 'new',
        priority: 'medium',
        notes: '',
        assignedToId: '',
        estimatedValue: '',
        industry: '',
      });
      onLeadCreated(lead);
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
          Create Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Lead</DialogTitle>
          <DialogDescription>
            Add a new lead to your pipeline. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name" className="text-right">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="source">
                  Source <span className="text-destructive">*</span>
                </Label>
                <Select
                  defaultValue={formData.source}
                  onValueChange={(value) => handleSelectChange('source', value)}
                  required
                >
                  <SelectTrigger id="source">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="cold-call">Cold Call</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">
                  Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  defaultValue={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                  required
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="closed-lost">Closed (Lost)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  defaultValue={formData.priority}
                  onValueChange={(value) => handleSelectChange('priority', value)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="estimatedValue">Estimated Value (KES)</Label>
                <Input
                  id="estimatedValue"
                  name="estimatedValue"
                  type="number"
                  value={formData.estimatedValue}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="assignedTo">Assign To</Label>
                <Select
                  value={formData.assignedToId}
                  onValueChange={(value) => handleSelectChange('assignedToId', value)}
                >
                  <SelectTrigger id="assignedTo">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              Create Lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Leads Page Component
export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Fetch leads and users data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch leads
        const leadsResponse = await fetch('/api/leads');
        if (!leadsResponse.ok) throw new Error('Failed to fetch leads');
        const leadsData = await leadsResponse.json();
        setLeads(leadsData);
        setFilteredLeads(leadsData);

        // Fetch users
        const usersResponse = await fetch('/api/users');
        if (!usersResponse.ok) throw new Error('Failed to fetch users');
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...leads];

    // Tab filtering
    if (activeTab !== 'all') {
      if (activeTab === 'new') {
        result = result.filter((lead) => lead.status === 'new');
      } else if (activeTab === 'contacted') {
        result = result.filter((lead) => lead.status === 'contacted');
      } else if (activeTab === 'qualified') {
        result = result.filter((lead) => lead.status === 'qualified');
      } else if (activeTab === 'converted') {
        result = result.filter((lead) => lead.status === 'converted');
      } else if (activeTab === 'lost') {
        result = result.filter((lead) => lead.status === 'closed-lost');
      }
    }

    // Status filter
    if (statusFilter) {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Source filter
    if (sourceFilter) {
      result = result.filter((lead) => lead.source === sourceFilter);
    }

    // Assignee filter
    if (assigneeFilter) {
      if (assigneeFilter === 'unassigned') {
        result = result.filter((lead) => !lead.assignedToId);
      } else {
        result = result.filter((lead) => lead.assignedToId === assigneeFilter);
      }
    }

    // Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          (lead.company && lead.company.toLowerCase().includes(term)) ||
          (lead.email && lead.email.toLowerCase().includes(term))
      );
    }

    setFilteredLeads(result);
  }, [leads, statusFilter, sourceFilter, assigneeFilter, searchTerm, activeTab]);

  const handleLeadCreated = (newLead) => {
    setLeads((prevLeads) => [newLead, ...prevLeads]);
  };

  const handleViewLead = (id) => {
    router.push(`/leads/${id}`);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    // Reset other filters when changing tabs
    setStatusFilter('');
    setSourceFilter('');
    setAssigneeFilter('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle 
          title="Lead Management" 
          subtitle="Track and manage your sales leads" 
        />
        <CreateLeadDialog users={users} onLeadCreated={handleLeadCreated} />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Leads</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
            <TabsTrigger value="qualified">Qualified</TabsTrigger>
            <TabsTrigger value="converted">Converted</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leads..."
                className="w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2">
                  <div className="mb-2">
                    <Label htmlFor="statusFilter">Status</Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger id="statusFilter">
                        <SelectValue placeholder="Any status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any status</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="closed-lost">Closed (Lost)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-2">
                    <Label htmlFor="sourceFilter">Source</Label>
                    <Select
                      value={sourceFilter}
                      onValueChange={setSourceFilter}
                    >
                      <SelectTrigger id="sourceFilter">
                        <SelectValue placeholder="Any source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any source</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="cold-call">Cold Call</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="assigneeFilter">Assignee</Label>
                    <Select
                      value={assigneeFilter}
                      onValueChange={setAssigneeFilter}
                    >
                      <SelectTrigger id="assigneeFilter">
                        <SelectValue placeholder="Any assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any assignee</SelectItem>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center p-6">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredLeads.length === 0 ? (
                <EmptyState
                  title="No leads found"
                  description="Create a new lead or adjust your filters to see results."
                  icon={<Search className="h-10 w-10" />}
                />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Last Contact</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Est. Value</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              {lead.name}
                              {lead.email && (
                                <span className="text-xs text-muted-foreground">
                                  {lead.email}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{lead.company || '-'}</TableCell>
                          <TableCell>
                            <LeadStatusBadge status={lead.status} />
                          </TableCell>
                          <TableCell>{lead.source}</TableCell>
                          <TableCell>
                            {lead.assignedTo ? lead.assignedTo.name : '-'}
                          </TableCell>
                          <TableCell>
                            {lead.lastContact
                              ? formatDate(lead.lastContact)
                              : 'Never'}
                          </TableCell>
                          <TableCell>
                            <LeadPriorityBadge priority={lead.priority} />
                          </TableCell>
                          <TableCell>
                            {lead.estimatedValue
                              ? formatCurrency(lead.estimatedValue)
                              : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewLead(lead.id)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
