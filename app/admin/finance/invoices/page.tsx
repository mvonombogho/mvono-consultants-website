"use client";

import { useState, useEffect } from 'react';
import InvoiceList from '@/components/admin/finance/InvoiceList';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, FileUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InvoiceForm from '@/components/admin/InvoiceForm';

export default function InvoicesPage() {
  const [isAddingInvoice, setIsAddingInvoice] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
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
    
    gsap.from('.invoice-item', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.invoices-container',
        start: 'top 80%',
      }
    });

    return () => {
      tl.kill();
    };
  }, [filteredInvoices]);

  // Fetch invoices data
  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/invoices');
        if (!response.ok) throw new Error('Failed to fetch invoices');
        const data = await response.json();
        setInvoices(data);
        setFilteredInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Filter invoices based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredInvoices(invoices);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = invoices.filter(invoice => 
      invoice.invoiceNumber?.toLowerCase().includes(query) ||
      invoice.client?.name?.toLowerCase().includes(query) ||
      invoice.status?.toLowerCase().includes(query) ||
      invoice.lpoReference?.toLowerCase().includes(query)
    );

    setFilteredInvoices(filtered);
  }, [searchQuery, invoices]);

  // Handle invoice addition
  const handleInvoiceAdded = (newInvoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
    setIsAddingInvoice(false);
  };

  // Handle invoice deletion
  const handleInvoiceDeleted = (deletedInvoiceId) => {
    setInvoices(prev => prev.filter(invoice => invoice.id !== deletedInvoiceId));
  };

  // Handle invoice update
  const handleInvoiceUpdated = (updatedInvoice) => {
    setInvoices(prev => 
      prev.map(invoice => 
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 page-header">
        <h1 className="text-3xl font-bold text-primary">Invoice Management</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsAddingInvoice(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Invoice
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
            placeholder="Search invoices by number, client, status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="invoices-container">
        <InvoiceList 
          invoices={filteredInvoices} 
          isLoading={isLoading} 
          onInvoiceDeleted={handleInvoiceDeleted}
          onInvoiceUpdated={handleInvoiceUpdated}
        />
      </div>

      {/* Create Invoice Dialog */}
      <Dialog open={isAddingInvoice} onOpenChange={setIsAddingInvoice}>
        <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceForm 
            onInvoiceAdded={handleInvoiceAdded} 
            onCancel={() => setIsAddingInvoice(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
