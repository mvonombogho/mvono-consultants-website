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
import { Loader2, Building2, PieChart, TrendingUp, MessageSquare, Users, PlusCircle } from 'lucide-react';

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
  notes?: any[];
  dealOpportunities?: any[];
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
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{competitor ? 'Edit Competitor' : 'Add Competitor'}</DialogTitle>
        </DialogHeader>