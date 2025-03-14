import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import {
  Search,
  FileText,
  Filter,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

import { ClientStatement } from './types';
import { StatementCard } from './StatementCard';
import { StatementModal } from './StatementModal';
import { StatementFilters } from './StatementFilters';
import { fetchMockStatements } from './mockData';

export const ClientStatements = () => {
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

  // Load statements data
  useEffect(() => {
    const loadStatements = async () => {
      try {
        const mockStatements = await fetchMockStatements();
        setStatements(mockStatements);
        setFilteredStatements(mockStatements);
        setIsLoading(false);
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
  
  // Filter statements
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
