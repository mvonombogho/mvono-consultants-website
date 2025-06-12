'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Building2, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  FileText,
  Globe,
  Eye,
  Search
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import CompetitorModal from '@/components/competitors/CompetitorModal';

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState([]);
  const [filteredCompetitors, setFilteredCompetitors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Fetch competitors
  const fetchCompetitors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/competitors');
      const data = await response.json();
      
      if (data.success) {
        setCompetitors(data.competitors);
        setFilteredCompetitors(data.competitors);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch competitors",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching competitors:", error);
      toast({
        title: "Error",
        description: "Failed to fetch competitors",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitors();
  }, []);

  // Filter competitors based on search query and active tab
  useEffect(() => {
    if (!competitors.length) return;
    
    let filtered = [...competitors];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        comp => 
          comp.name.toLowerCase().includes(query) || 
          (comp.industry && comp.industry.toLowerCase().includes(query)) ||
          (comp.services && comp.services.toLowerCase().includes(query))
      );
    }
    
    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'active') {
        filtered = filtered.filter(comp => comp.isActive);
      } else if (activeTab === 'inactive') {
        filtered = filtered.filter(comp => !comp.isActive);
      } else if (activeTab === 'high-threat') {
        // Consider competitors with higher market share or strong in our primary services as high threat
        filtered = filtered.filter(comp => 
          (comp.marketShare && comp.marketShare > 15) || 
          (comp.strengths && comp.strengths.toLowerCase().includes('safety'))
        );
      }
    }
    
    setFilteredCompetitors(filtered);
  }, [searchQuery, activeTab, competitors]);

  const handleCreateCompetitor = () => {
    setSelectedCompetitor(null);
    setIsModalOpen(true);
  };

  const handleSelectCompetitor = (competitor) => {
    setSelectedCompetitor(competitor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompetitor(null);
  };

  const handleSaveCompetitor = async (competitorData) => {
    try {
      const url = competitorData.id 
        ? `/api/competitors/${competitorData.id}` 
        : '/api/competitors';
      
      const method = competitorData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(competitorData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: competitorData.id 
            ? "Competitor updated successfully" 
            : "Competitor created successfully",
        });
        setIsModalOpen(false);
        fetchCompetitors();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to save competitor",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving competitor:", error);
      toast({
        title: "Error",
        description: "Failed to save competitor",
        variant: "destructive",
      });
    }
  };

  // Calculate statistics
  const stats = {
    total: competitors.length,
    active: competitors.filter(comp => comp.isActive).length,
    inactive: competitors.filter(comp => !comp.isActive).length,
    highThreat: competitors.filter(comp => 
      (comp.marketShare && comp.marketShare > 15) || 
      (comp.strengths && comp.strengths.toLowerCase().includes('safety'))
    ).length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Competitor Tracking</h1>
        <Button onClick={handleCreateCompetitor} className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Add Competitor</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Competitors</span>
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Active</span>
                <span className="text-2xl font-bold">{stats.active}</span>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Inactive</span>
                <span className="text-2xl font-bold">{stats.inactive}</span>
              </div>
              <TrendingDown className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">High Threat</span>
                <span className="text-2xl font-bold">{stats.highThreat}</span>
              </div>
              <BarChart3 className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search competitors by name, industry, or services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Building2 size={16} />
            <span>All</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Active</span>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="flex items-center gap-2">
            <TrendingDown size={16} />
            <span>Inactive</span>
          </TabsTrigger>
          <TabsTrigger value="high-threat" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>High Threat</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredCompetitors.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Market Share</TableHead>
                  <TableHead>Key Strengths</TableHead>
                  <TableHead>Key Weaknesses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompetitors.map((competitor) => (
                  <TableRow key={competitor.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{competitor.name}</span>
                        {competitor.website && (
                          <a 
                            href={competitor.website.startsWith('http') ? competitor.website : `https://${competitor.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 flex items-center gap-1 mt-1"
                          >
                            <Globe className="h-3 w-3" />
                            Website
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{competitor.industry || 'N/A'}</TableCell>
                    <TableCell>
                      {competitor.services ? (
                        <div className="flex flex-wrap gap-1">
                          {competitor.services.split(',').map((service, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-100">
                              {service.trim()}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      {competitor.marketShare ? `${competitor.marketShare}%` : 'Unknown'}
                    </TableCell>
                    <TableCell>
                      {competitor.strengths ? (
                        <div className="flex flex-col gap-1">
                          {competitor.strengths.split(',').map((strength, i) => (
                            <span key={i} className="text-sm">• {strength.trim()}</span>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      {competitor.weaknesses ? (
                        <div className="flex flex-col gap-1">
                          {competitor.weaknesses.split(',').map((weakness, i) => (
                            <span key={i} className="text-sm">• {weakness.trim()}</span>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={competitor.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {competitor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleSelectCompetitor(competitor)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                No competitors found. 
                {searchQuery ? ' Try adjusting your search criteria.' : ' Add your first competitor to get started.'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {isModalOpen && (
        <CompetitorModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveCompetitor}
          competitor={selectedCompetitor}
        />
      )}
    </div>
  );
}
