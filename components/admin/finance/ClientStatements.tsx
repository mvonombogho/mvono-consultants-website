"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import {
  Search,
  FileText,
  Download,
  Calendar,
  Filter,
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  Mail,
  ExternalLink,
  AlertTriangle,
  Loader2,
  RefreshCcw,
  Send,
  Printer,
  X,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';

// Types
type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
};

type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
};

type ClientStatement = {
  id: string;
  client: Client;
  generatedDate: string;
  statementPeriod: { from: string; to: string };
  invoices: Invoice[];
  openingBalance: number;
  closingBalance: number;
  totalDue: number;
  currency: string;
  status: 'sent' | 'draft';
};

const ClientStatements = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [statements, setStatements] = useState<ClientStatement[]>([]);
  const [filteredStatements, setFilteredStatements] = useState<ClientStatement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatement, setSelectedStatement] = useState<ClientStatement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Animation refs
  const containerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string = 'KES') => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate aging
  const calculateAging = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get aging bracket
  const getAgingBracket = (invoice: Invoice) => {
    if (invoice.status === 'paid') return '0 days';
    const days = calculateAging(invoice.dueDate);
    if (days <= 0) return 'Current';
    if (days <= 30) return '1-30 days';
    if (days <= 60) return '31-60 days';
    if (days <= 90) return '61-90 days';
    return '90+ days';
  };
  
  // Load statements data
  useEffect(() => {
    const loadStatements = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockStatements: ClientStatement[] = [
            {
              id: '1',
              client: {
                id: 'c1',
                name: 'Unga Group',
                email: 'accounts@ungagroup.co.ke',
                phone: '+254 20 3954000',
                address: 'P.O. Box 30386-00100, Nairobi',
                contactPerson: 'Sarah Mwangi',
              },
              generatedDate: '2024-02-15T08:30:00Z',
              statementPeriod: {
                from: '2024-01-01T00:00:00Z',
                to: '2024-01-31T23:59:59Z',
              },
              invoices: [
                {
                  id: 'i1',
                  invoiceNumber: 'INV-2024-001',
                  date: '2024-01-05T10:00:00Z',
                  dueDate: '2024-02-04T23:59:59Z',
                  amount: 120000,
                  paid: 120000,
                  status: 'paid',
                },
                {
                  id: 'i2',
                  invoiceNumber: 'INV-2024-010',
                  date: '2024-01-18T10:00:00Z',
                  dueDate: '2024-02-17T23:59:59Z',
                  amount: 85000,
                  paid: 0,
                  status: 'pending',
                },
              ],
              openingBalance: 45000,
              closingBalance: 130000,
              totalDue: 85000,
              currency: 'KES',
              status: 'sent',
            },
            {
              id: '2',
              client: {
                id: 'c2',
                name: 'Dormans Coffee',
                email: 'finance@dormans.co.ke',
                phone: '+254 20 5023000',
                address: 'P.O. Box 41000-00100, Nairobi',
                contactPerson: 'James Omondi',
              },
              generatedDate: '2024-02-15T09:15:00Z',
              statementPeriod: {
                from: '2024-01-01T00:00:00Z',
                to: '2024-01-31T23:59:59Z',
              },
              invoices: [
                {
                  id: 'i3',
                  invoiceNumber: 'INV-2024-004',
                  date: '2024-01-08T10:00:00Z',
                  dueDate: '2024-02-07T23:59:59Z',
                  amount: 96000,
                  paid: 50000,
                  status: 'partial',
                },
              ],
              openingBalance: 0,
              closingBalance: 96000,
              totalDue: 46000,
              currency: 'KES',
              status: 'draft',
            },
            {
              id: '3',
              client: {
                id: 'c3',
                name: 'Alloy Castings',
                email: 'accounts@alloycast.co.ke',
                phone: '+254 20 6789000',
                address: 'P.O. Box 50200-00100, Nairobi',
                contactPerson: 'David Waweru',
              },
              generatedDate: '2024-02-14T14:30:00Z',
              statementPeriod: {
                from: '2024-01-01T00:00:00Z',
                to: '2024-01-31T23:59:59Z',
              },
              invoices: [
                {
                  id: 'i4',
                  invoiceNumber: 'INV-2023-095',
                  date: '2023-12-10T10:00:00Z',
                  dueDate: '2024-01-09T23:59:59Z',
                  amount: 145000,
                  paid: 0,
                  status: 'overdue',
                },
                {
                  id: 'i5',
                  invoiceNumber: 'INV-2024-008',
                  date: '2024-01-15T10:00:00Z',
                  dueDate: '2024-02-14T23:59:59Z',
                  amount: 72000,
                  paid: 0,
                  status: 'pending',
                },
              ],
              openingBalance: 145000,
              closingBalance: 217000,
              totalDue: 217000,
              currency: 'KES',
              status: 'sent',
            },
            {
              id: '4',
              client: {
                id: 'c4',
                name: 'Radisson Blu',
                email: 'finance@radissonblu.co.ke',
                phone: '+254 20 9876000',
                address: 'P.O. Box 60000-00100, Nairobi',
                contactPerson: 'Elisabeth Njeri',
              },
              generatedDate: '2024-02-12T11:20:00Z',
              statementPeriod: {
                from: '2024-01-01T00:00:00Z',
                to: '2024-01-31T23:59:59Z',
              },
              invoices: [
                {
                  id: 'i6',
                  invoiceNumber: 'INV-2024-002',
                  date: '2024-01-05T12:00:00Z',
                  dueDate: '2024-02-04T23:59:59Z',
                  amount: 185000,
                  paid: 185000,
                  status: 'paid',
                },
              ],
              openingBalance: 0,
              closingBalance: 0,
              totalDue: 0,
              currency: 'KES',
              status: 'sent',
            },
          ];

          setStatements(mockStatements);
          setFilteredStatements(mockStatements);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error loading statements:', error);
        toast({
          title: 'Error',
          description: 'Failed to load client statements',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    loadStatements();
  }, [toast]);
  
  // Filter statements based on search term, status filter, and period filter
  useEffect(() => {
    const filterStatements = () => {
      let filtered = statements;

      // Apply tab filter
      if (activeTab === 'draft') {
        filtered = filtered.filter(s => s.status === 'draft');
      } else if (activeTab === 'sent') {
        filtered = filtered.filter(s => s.status === 'sent');
      } else if (activeTab === 'overdue') {
        filtered = filtered.filter(s => s.invoices.some(inv => inv.status === 'overdue'));
      }

      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(s =>
          s.client.name.toLowerCase().includes(term) ||
          s.client.email.toLowerCase().includes(term) ||
          s.invoices.some(inv => inv.invoiceNumber.toLowerCase().includes(term))
        );
      }

      // Apply status filter
      if (statusFilter) {
        if (statusFilter === 'allPaid') {
          filtered = filtered.filter(s => s.totalDue === 0);
        } else if (statusFilter === 'partiallyPaid') {
          filtered = filtered.filter(s => s.totalDue > 0 && s.totalDue < s.closingBalance);
        } else if (statusFilter === 'unpaid') {
          filtered = filtered.filter(s => s.totalDue === s.closingBalance && s.totalDue > 0);
        }
      }

      // Apply period filter
      if (periodFilter) {
        if (periodFilter === 'lastMonth') {
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          filtered = filtered.filter(s => {
            const statementMonth = new Date(s.statementPeriod.to).getMonth();
            const statementYear = new Date(s.statementPeriod.to).getFullYear();
            return statementMonth === lastMonth.getMonth() && statementYear === lastMonth.getFullYear();
          });
        } else if (periodFilter === 'lastQuarter') {
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          filtered = filtered.filter(s => new Date(s.statementPeriod.to) >= threeMonthsAgo);
        }
      }

      setFilteredStatements(filtered);
    };

    filterStatements();
  }, [searchTerm, statusFilter, periodFilter, statements, activeTab]);

  // Animation for container
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out"
        }
      );
    }
  }, [isLoading, filteredStatements]);

  // Animation for filters
  useEffect(() => {
    if (filtersRef.current) {
      if (showFilters) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: 'auto', duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(
          filtersRef.current,
          { opacity: 0, height: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [showFilters]);

  // Modal animations
  useEffect(() => {
    if (isModalOpen && modalRef.current && modalBackdropRef.current) {
      // Animate backdrop
      gsap.fromTo(
        modalBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate modal
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
    }
  }, [isModalOpen]);