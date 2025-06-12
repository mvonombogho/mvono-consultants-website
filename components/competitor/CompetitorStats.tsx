"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Database, Globe, Trophy, AlertTriangle, CheckCircle } from 'lucide-react';

type CompetitorType = {
  id: string;
  name: string;
  industry?: string;
  marketShare?: number;
  strengths?: string;
  weaknesses?: string;
  isActive: boolean;
};

type CompetitorStatsProps = {
  competitors: CompetitorType[];
  isLoading: boolean;
};

export default function CompetitorStats({ competitors, isLoading }: CompetitorStatsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate statistics
  const totalCompetitors = competitors.length;
  const activeCompetitors = competitors.filter(c => c.isActive).length;
  const inactiveCompetitors = totalCompetitors - activeCompetitors;
  
  // Prepare data for market share chart
  const marketShareData = competitors
    .filter(c => c.marketShare !== undefined && c.marketShare !== null)
    .sort((a, b) => (b.marketShare || 0) - (a.marketShare || 0))
    .map(c => ({
      name: c.name,
      marketShare: c.marketShare
    }));
  
  // Prepare data for industry breakdown
  const industryMap = {};
  competitors.forEach(c => {
    if (c.industry) {
      industryMap[c.industry] = (industryMap[c.industry] || 0) + 1;
    }
  });
  
  const industryData = Object.entries(industryMap).map(([name, count]) => ({
    name,
    count
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">Loading competitor stats...</p>
      </div>
    );
  }

  if (totalCompetitors === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 border rounded-lg">
        <Database className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No competitor data available</p>
        <p className="text-sm text-muted-foreground mt-1">Add competitors to see analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Competitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{totalCompetitors}</p>
              <Database className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Competitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{activeCompetitors}</p>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Competitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{inactiveCompetitors}</p>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Industries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{Object.keys(industryMap).length}</p>
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="overview">Market Share</TabsTrigger>
          <TabsTrigger value="industries">Industries</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Share by Competitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {marketShareData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={marketShareData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={80} 
                        interval={0}
                      />
                      <YAxis label={{ value: 'Market Share %', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                      <Bar dataKey="marketShare" name="Market Share (%)" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Trophy className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No market share data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industries" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Industry Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {industryData.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={industryData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={80} 
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" name="Number of Competitors" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-80">
                  <Globe className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No industry data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
