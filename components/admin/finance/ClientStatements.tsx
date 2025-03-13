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
