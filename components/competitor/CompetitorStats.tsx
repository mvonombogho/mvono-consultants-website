"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, PieChart, TrendingUp } from 'lucide-react';

type Competitor = {
  id: string;
  marketShare?: number;
  isActive: boolean;
  dealOpportunities?: any[];
};

type CompetitorStatsProps = {
  competitors: Competitor[];
  isLoading: boolean;
};

export default function CompetitorStats({ competitors, isLoading }: CompetitorStatsProps) {
  // Calculate statistics
  const totalCompetitors = competitors.length;
  const activeCompetitors = competitors.filter(comp => comp.isActive).length;
  const inactiveCompetitors = totalCompetitors - activeCompetitors;
  
  // Calculate total market share tracked
  const totalMarketShare = competitors.reduce((sum, comp) => {
    return sum + (comp.marketShare || 0);
  }, 0);
  
  // Count deals with competitors
  const dealsWithCompetitors = competitors.reduce((sum, comp) => {
    return sum + (comp.dealOpportunities?.length || 0);
  }, 0);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Competitors" 
        value={totalCompetitors} 
        icon={<Building2 className="h-5 w-5 text-blue-500" />}
        color="blue"
        suffix=""
      />
      
      <StatCard 
        title="Active Competitors" 
        value={activeCompetitors} 
        icon={<Building2 className="h-5 w-5 text-green-500" />}
        color="green"
        suffix=""
      />
      
      <StatCard 
        title="Total Market Share" 
        value={totalMarketShare} 
        icon={<PieChart className="h-5 w-5 text-purple-500" />}
        color="purple"
        suffix="%"
        decimals={1}
      />
      
      <StatCard 
        title="Deal Opportunities" 
        value={dealsWithCompetitors} 
        icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
        color="orange"
        suffix=""
      />
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  suffix: string;
  decimals?: number;
};

function StatCard({ title, value, icon, color, suffix, decimals = 0 }: StatCardProps) {
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-100';
      case 'green':
        return 'bg-green-50 border-green-100';
      case 'purple':
        return 'bg-purple-50 border-purple-100';
      case 'orange':
        return 'bg-orange-50 border-orange-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };
  
  const formattedValue = decimals > 0 ? value.toFixed(decimals) : value;
  
  return (
    <Card className={`${getColorClass()} border`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {icon}
        </div>
        <p className="text-2xl font-bold">{formattedValue}{suffix}</p>
      </CardContent>
    </Card>
  );
}
