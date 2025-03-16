"use client";

import { useState, useEffect } from 'react';
import QuotationList from '@/components/admin/finance/QuotationList';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, FileUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QuotationForm from '@/components/admin/finance/QuotationForm';

export default function QuotationsPage() {
  const [isAddingQuotation, setIsAddingQuotation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quotations, setQuotations] = useState([]);
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animation for page elements
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from('.page-header', {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    tl.from('.search-controls', {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4');
    
    gsap.from('.quotation-item', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.quotations-container',
        start: 'top 80%',
      }
    });

    return () => {
      tl.kill();
    };
  }, [filteredQuotations]);

  // Fetch quotations data
  useEffect(() => {
    const fetchQuotations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/quotations');
        if (!response.ok) throw new Error('Failed to fetch quotations');
        const data = await response.json();
        setQuotations(data);
        setFilteredQuotations(data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotations();
  }, []);

  // Filter quotations based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredQuotations(quotations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = quotations.filter(quotation => 
      quotation.quotationNumber?.toLowerCase().includes(query) ||
      quotation.client?.name?.toLowerCase().includes(query) ||
      quotation.status?.toLowerCase().includes(query) ||
      quotation.referenceNumber?.toLowerCase().includes(query)
    );

    setFilteredQuotations(filtered);
  }, [searchQuery, quotations]);

  // Handle quotation addition
  const handleQuotationAdded = (newQuotation) => {
    setQuotations(prev => [newQuotation, ...prev]);
    setIsAddingQuotation(false);
  };

  // Handle quotation deletion
  const handleQuotationDeleted = (deletedQuotationId) => {
    setQuotations(prev => prev.filter(quotation => quotation.id !== deletedQuotationId));
  };

  // Handle quotation update
  const handleQuotationUpdated = (updatedQuotation) => {
    setQuotations(prev => 
      prev.map(quotation => 
        quotation.id === updatedQuotation.id ? updatedQuotation : quotation
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 page-header">
        <h1 className="text-3xl font-bold text-primary">Quotation Management</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsAddingQuotation(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Quotation
          </Button>
          
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10"
          >
            <FileUp className="mr-2 h-5 w-5" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-6 search-controls">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search quotations by number, client, status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="quotations-container">
        <QuotationList 
          quotations={filteredQuotations} 
          isLoading={isLoading} 
          onQuotationDeleted={handleQuotationDeleted}
          onQuotationUpdated={handleQuotationUpdated}
        />
      </div>

      {/* Create Quotation Dialog */}
      <Dialog open={isAddingQuotation} onOpenChange={setIsAddingQuotation}>
        <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Create New Quotation</DialogTitle>
          </DialogHeader>
          <QuotationForm 
            onQuotationAdded={handleQuotationAdded} 
            onCancel={() => setIsAddingQuotation(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
