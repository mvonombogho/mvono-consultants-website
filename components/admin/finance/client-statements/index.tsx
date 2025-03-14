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
