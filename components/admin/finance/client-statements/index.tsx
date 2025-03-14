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

  // View statement details
  const viewStatement = (statement: ClientStatement) => {
    setSelectedStatement(statement);
    setIsModalOpen(true);
  };

  // Send statement
  const sendStatement = async () => {
    if (!selectedStatement) return;

    setIsSending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Statement Sent',
        description: `Statement has been sent to ${selectedStatement.client.name}`,
      });

      // Update statement status
      const updatedStatements = statements.map(s =>
        s.id === selectedStatement.id ? { ...s, status: 'sent' as const } : s
      );

      setStatements(updatedStatements);
      setIsModalOpen(false);
      setSelectedStatement(null);
    } catch (error) {
      console.error('Error sending statement:', error);
      toast({
        title: 'Error',
        description: 'Failed to send statement',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  // Generate PDF statement
  const generatePdf = () => {
    if (!selectedStatement) return;

    toast({
      title: 'PDF Generated',
      description: 'Statement PDF has been generated and is ready for download',
    });

    // In a real app, this would trigger a download
    console.log('Generating PDF for statement', selectedStatement.id);
  };

  // Render UI
  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Statements</h1>
          <p className="text-muted-foreground mt-1">
            Manage and generate statements for your clients
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/admin/finance/create-statement')}
            className="bg-primary hover:bg-primary/90 text-white transition-all"
          >
            <FileText className="mr-2 h-4 w-4" />
            New Statement
          </Button>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="space-y-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <TabsList className="bg-muted/60">
              <TabsTrigger value="all" className="relative overflow-hidden transition-all group">
                <span className="relative z-10">All Statements</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger value="draft" className="relative overflow-hidden transition-all group">
                <span className="relative z-10">Drafts</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger value="sent" className="relative overflow-hidden transition-all group">
                <span className="relative z-10">Sent</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger value="overdue" className="relative overflow-hidden transition-all group">
                <span className="relative z-10">With Overdue</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search statements..."
                  className="pl-8 bg-background pr-4 focus-visible:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="border-muted-foreground/20"
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <StatementFilters 
            showFilters={showFilters}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            periodFilter={periodFilter}
            setPeriodFilter={setPeriodFilter}
          />

          {/* Statements List */}
          <TabsContent value="all" className="mt-0">
            <div ref={containerRef} className="space-y-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                  <p className="text-muted-foreground">Loading statements...</p>
                </div>
              ) : filteredStatements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-muted/30 rounded-lg border border-dashed">
                  <FileText className="h-10 w-10 text-muted-foreground/60 mb-3" />
                  <h3 className="text-lg font-medium mb-1">No statements found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    {searchTerm || statusFilter || periodFilter
                      ? "No statements match your current filters. Try adjusting your search criteria."
                      : "You haven't created any client statements yet."}
                  </p>
                  {!searchTerm && !statusFilter && !periodFilter && (
                    <Button
                      onClick={() => router.push('/admin/finance/create-statement')}
                      className="bg-primary/90 hover:bg-primary text-white transition-all"
                    >
                      <FileText className="mr-2 h-4 w-4" /> Create Your First Statement
                    </Button>
                  )}
                </div>
              ) : (
                filteredStatements.map((statement) => (
                  <StatementCard 
                    key={statement.id}
                    statement={statement} 
                    onClick={viewStatement} 
                  />
                ))
              )}
            </div>
          </TabsContent>