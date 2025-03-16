'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  TrendingUp,
  Wallet,
  Users,
  BarChart4,
  Printer,
  FileDown
} from 'lucide-react';
import { RevenueChart } from './charts/RevenueChart';
import { ExpenseChart } from './charts/ExpenseChart';
import { ProfitMarginChart } from './charts/ProfitMarginChart';
import { TopClientsChart } from './charts/TopClientsChart';
import { TimeFilter } from './TimeFilter';

export function FinancialDashboard() {
  const [timeRange, setTimeRange] = useState('year');
  const [dataFormat, setDataFormat] = useState('chart');
  
  // Mock statistics data - would be fetched from API in real implementation
  const stats = [
    {
      title: 'Total Revenue',
      value: 'KES 12,345,678',
      change: '+12.5%',
      trend: 'up',
      icon: <TrendingUp className="h-4 w-4 text-emerald-500" />
    },
    {
      title: 'Total Expenses',
      value: 'KES 8,765,432',
      change: '+8.2%',
      trend: 'up',
      icon: <Wallet className="h-4 w-4 text-amber-500" />
    },
    {
      title: 'Net Profit',
      value: 'KES 3,580,246',
      change: '+18.3%',
      trend: 'up',
      icon: <BarChart4 className="h-4 w-4 text-emerald-500" />
    },
    {
      title: 'Active Clients',
      value: '147',
      change: '+5.7%',
      trend: 'up',
      icon: <Users className="h-4 w-4 text-blue-500" />
    }
  ];

  const exportData = () => {
    // In a real implementation, this would generate and download reports
    alert('Exporting financial data...');
  };

  const printReport = () => {
    // In a real implementation, this would format and print the report
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <TimeFilter value={timeRange} onChange={setTimeRange} />
        
        <div className="flex items-center gap-2">
          <Select value={dataFormat} onValueChange={setDataFormat}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="View Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chart">Chart View</SelectItem>
              <SelectItem value="table">Table View</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={exportData} size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={printReport} size="icon">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                </div>
                <div className="rounded-full bg-muted p-2">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from previous {timeRange}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="clients">Top Clients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>
                Analysis of revenue streams over {timeRange === 'year' ? 'the past year' : timeRange === 'quarter' ? 'the past quarter' : 'the past month'}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <RevenueChart timeRange={timeRange} viewFormat={dataFormat} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>
                Distribution of expenses over {timeRange === 'year' ? 'the past year' : timeRange === 'quarter' ? 'the past quarter' : 'the past month'}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ExpenseChart timeRange={timeRange} viewFormat={dataFormat} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profitability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit Margin Analysis</CardTitle>
              <CardDescription>
                Profit margin by service type over {timeRange === 'year' ? 'the past year' : timeRange === 'quarter' ? 'the past quarter' : 'the past month'}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ProfitMarginChart timeRange={timeRange} viewFormat={dataFormat} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Revenue Generating Clients</CardTitle>
              <CardDescription>
                Highest revenue generating clients over {timeRange === 'year' ? 'the past year' : timeRange === 'quarter' ? 'the past quarter' : 'the past month'}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <TopClientsChart timeRange={timeRange} viewFormat={dataFormat} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-4">
        <Button onClick={exportData} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </Button>
      </div>
    </div>
  );
}
