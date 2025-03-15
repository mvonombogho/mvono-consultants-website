"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Building2, PieChart, TrendingUp, MessageSquare, Users, PlusCircle, Calendar, User, ArrowUpRight } from 'lucide-react';

type CompetitorNote = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: {
    name: string;
  };
};

type DealOpportunity = {
  id: string;
  title: string;
  status: string;
  value: number;
  client: {
    id: string;
    name: string;
  };
};

type Competitor = {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  description?: string;
  strengths?: string;
  weaknesses?: string;
  services?: string;
  marketShare?: number;
  isActive: boolean;
  notes?: CompetitorNote[];
  dealOpportunities?: DealOpportunity[];
};

type CompetitorModalProps = {
  competitor: Competitor | null;
  isOpen: boolean;
  onClose: (refreshData?: boolean) => void;
};

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  industry: z.string().optional(),
  description: z.string().optional(),
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  services: z.string().optional(),
  marketShare: z.number().min(0).max(100).optional().nullable(),
  isActive: z.boolean(),
});

export default function CompetitorModal({ competitor, isOpen, onClose }: CompetitorModalProps) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      website: '',
      industry: '',
      description: '',
      strengths: '',
      weaknesses: '',
      services: '',
      marketShare: null,
      isActive: true,
    },
  });
  
  // Populate form when editing an existing competitor
  useEffect(() => {
    if (competitor) {
      form.reset({
        name: competitor.name,
        website: competitor.website || '',
        industry: competitor.industry || '',
        description: competitor.description || '',
        strengths: competitor.strengths || '',
        weaknesses: competitor.weaknesses || '',
        services: competitor.services || '',
        marketShare: competitor.marketShare !== undefined ? competitor.marketShare : null,
        isActive: competitor.isActive,
      });
    }
  }, [competitor, form]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const url = competitor ? `/api/competitor/${competitor.id}` : '/api/competitor';
      const method = competitor ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        onClose(true);
      } else {
        const error = await response.json();
        console.error('Error submitting form:', error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAddNote = async () => {
    if (!competitor || !noteTitle || !noteContent) return;
    
    setIsSubmittingNote(true);
    
    try {
      const response = await fetch('/api/competitor/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          competitorId: competitor.id,
          title: noteTitle,
          content: noteContent,
        }),
      });
      
      if (response.ok) {
        setNoteTitle('');
        setNoteContent('');
        setIsAddingNote(false);
        onClose(true);
      } else {
        const error = await response.json();
        console.error('Error adding note:', error);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsSubmittingNote(false);
    }
  };
  
  const handleDelete = async () => {
    if (!competitor) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/competitor/${competitor.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onClose(true);
      } else {
        const error = await response.json();
        console.error('Error deleting competitor:', error);
      }
    } catch (error) {
      console.error('Error deleting competitor:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return <Badge className="bg-green-100 text-green-800">Won</Badge>;
      case 'lost':
        return <Badge className="bg-red-100 text-red-800">Lost</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{competitor ? 'Edit Competitor' : 'Add Competitor'}</DialogTitle>
        </DialogHeader>
        
        {!competitor ? (
          // Create new competitor form
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter competitor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter industry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="marketShare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Share (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter market share percentage" 
                          {...field}
                          value={field.value === null ? '' : field.value}
                          onChange={(e) => {
                            const value = e.target.value === '' ? null : parseFloat(e.target.value);
                            field.onChange(value);
                          }}
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter competitor description" {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          // Edit competitor with tabs
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details" className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="deals" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Deal History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter competitor name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter industry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="marketShare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Market Share (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter market share percentage" 
                              {...field}
                              value={field.value === null ? '' : field.value}
                              onChange={(e) => {
                                const value = e.target.value === '' ? null : parseFloat(e.target.value);
                                field.onChange(value);
                              }}
                              min="0"
                              max="100"
                              step="0.1"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="services"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Services</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter services offered (comma-separated)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Is this competitor currently active in the market?
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter competitor description" {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="strengths"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Strengths</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter competitor strengths" {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="weaknesses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weaknesses</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter competitor weaknesses" {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </Button>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => onClose()}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Update'
                        )}
                      </Button>
                    </div>
                  </DialogFooter>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="notes">
              <div className="space-y-4">
                {isAddingNote ? (
                  <div className="space-y-4 border p-4 rounded-md">
                    <h3 className="font-medium">Add New Note</h3>
                    <div className="space-y-2">
                      <FormLabel>Title</FormLabel>
                      <Input 
                        value={noteTitle} 
                        onChange={(e) => setNoteTitle(e.target.value)} 
                        placeholder="Enter note title"
                      />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Content</FormLabel>
                      <Textarea 
                        value={noteContent} 
                        onChange={(e) => setNoteContent(e.target.value)} 
                        placeholder="Enter note content"
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => {
                        setIsAddingNote(false);
                        setNoteTitle('');
                        setNoteContent('');
                      }}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddNote} disabled={isSubmittingNote || !noteTitle || !noteContent}>
                        {isSubmittingNote ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Note'
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingNote(true)}
                    className="flex items-center gap-2 mb-4"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Note
                  </Button>
                )}
                
                {competitor?.notes && competitor.notes.length > 0 ? (
                  <div className="space-y-4">
                    {competitor.notes.map((note) => (
                      <Card key={note.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{note.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm mb-3">{note.content}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <User className="h-3 w-3 mr-1" />
                            {note.createdBy.name}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <p className="text-muted-foreground">No notes yet. Add your first note to track important information about this competitor.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="deals">
              <div className="space-y-4">
                {competitor?.dealOpportunities && competitor.dealOpportunities.length > 0 ? (
                  <div className="space-y-4">
                    {competitor.dealOpportunities.map((deal) => (
                      <Card key={deal.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{deal.title}</h3>
                            {getStatusBadge(deal.status)}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {deal.client.name}
                            </p>
                            <p className="text-sm font-semibold">
                              ${deal.value.toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <p className="text-muted-foreground">No deal opportunities recorded with this competitor.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
