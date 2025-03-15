"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Search, Filter, Building2, Globe, PieChart } from 'lucide-react';

type Competitor = {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  marketShare?: number;
  strengths?: string;
  weaknesses?: string;
  isActive: boolean;
};

type CompetitorListProps = {
  competitors: Competitor[];
  isLoading: boolean;
  onCompetitorClick: (competitor: Competitor) => void;
};

export default function CompetitorList({ competitors, isLoading, onCompetitorClick }: CompetitorListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<boolean[]>([]);
  
  // Extract unique values for filters
  const allIndustries = [...new Set(competitors.map(competitor => competitor.industry).filter(Boolean))] as string[];
  
  // Apply filters
  const filteredCompetitors = competitors.filter(competitor => {
    const matchesSearch = (
      competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (competitor.website && competitor.website.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (competitor.industry && competitor.industry.toLowerCase().includes(searchTerm.toLowerCase())) ||
      false
    );
    
    const matchesIndustry = industryFilter.length === 0 || (competitor.industry && industryFilter.includes(competitor.industry));
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(competitor.isActive);
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });
  
  // Format market share
  const formatMarketShare = (share?: number) => {
    return share !== undefined && share !== null ? `${share.toFixed(1)}%` : 'N/A';
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setIndustryFilter([]);
    setStatusFilter([]);
  };
  
  if (isLoading) {
    return <div className="space-y-4">
      {[1, 2, 3, 4].map(i => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search competitors..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Industry
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {allIndustries.map(industry => (
                <DropdownMenuCheckboxItem
                  key={industry}
                  checked={industryFilter.includes(industry)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setIndustryFilter([...industryFilter, industry]);
                    } else {
                      setIndustryFilter(industryFilter.filter(i => i !== industry));
                    }
                  }}
                >
                  {industry}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes(true)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, true]);
                  } else {
                    setStatusFilter(statusFilter.filter(s => s !== true));
                  }
                }}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes(false)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilter([...statusFilter, false]);
                  } else {
                    setStatusFilter(statusFilter.filter(s => s !== false));
                  }
                }}
              >
                Inactive
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(searchTerm || industryFilter.length > 0 || statusFilter.length > 0) && (
            <Button variant="ghost" onClick={resetFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {filteredCompetitors.length > 0 ? (
        <div className="space-y-3">
          {filteredCompetitors.map(competitor => (
            <Card key={competitor.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => onCompetitorClick(competitor)}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="h-4 w-4 text-blue-500" />
                      <h3 className="font-medium">{competitor.name}</h3>
                      {!competitor.isActive && (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
                      )}
                    </div>
                    {competitor.website && (
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <a href={competitor.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" onClick={(e) => e.stopPropagation()}>
                          {competitor.website.replace(/(^https?:\/\/|\/$)/g, '')}
                        </a>
                      </p>
                    )}
                    {competitor.industry && (
                      <p className="text-sm text-gray-500">
                        Industry: {competitor.industry}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Market Share</p>
                    <div className="flex items-center gap-1">
                      <PieChart className="h-3 w-3 text-gray-500" />
                      <p className="text-sm text-gray-600">{formatMarketShare(competitor.marketShare)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Strengths</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {competitor.strengths || 'Not specified'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Weaknesses</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {competitor.weaknesses || 'Not specified'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-md bg-gray-50">
          <p className="text-gray-500">No competitors found matching your filters.</p>
          {(searchTerm || industryFilter.length > 0 || statusFilter.length > 0) && (
            <Button variant="link" onClick={resetFilters} className="mt-2">
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
