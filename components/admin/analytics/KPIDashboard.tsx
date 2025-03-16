'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BarChart3,
  TrendingUp,
  Clock,
  Users,
  FileCheck,
  Award,
  CircleDollarSign
} from 'lucide-react';
import { TimeFilter } from './TimeFilter';
import { KPIMetricCard } from './KPIMetricCard';
import { KPILineChart } from './charts/KPILineChart';
import { KPIGaugeChart } from './charts/KPIGaugeChart';

// Mock KPI data for different categories 
const kpiData = {
  financial: [
    {
      title: 'Revenue Growth',
      value: '15.8%',
      target: '12%',
      change: '+3.2%',
      trend: 'up',
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      description: 'Year over year revenue growth',
      chartData: [34, 45, 31, 43, 26, 41, 39, 45, 49, 52, 56, 58]
    },
    {
      title: 'Profit Margin',
      value: '32.5%',
      target: '30%',
      change: '+1.8%',
      trend: 'up',
      icon: <CircleDollarSign className="h-5 w-5 text-emerald-500" />,
      description: 'Net profit as percentage of revenue',
      chartData: [28, 29, 28, 30, 31, 30, 29, 31, 32, 32, 33, 32.5]
    },
    {
      title: 'Cost Reduction',
      value: '8.2%',
      target: '10%',
      change: '-1.8%',
      trend: 'down',
      icon: <BarChart3 className="h-5 w-5 text-amber-500" />,
      description: 'Year over year operational cost reduction',
      chartData: [3, 4, 5, 4, 5, 6, 7, 8, 8.5, 8, 8.5, 8.2]
    },
    {
      title: 'Invoice Processing',
      value: '4.2 days',
      target: '3 days',
      change: '-0.3 days',
      trend: 'up',
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      description: 'Average time to process and send invoices',
      chartData: [6, 5.5, 5, 5.2, 5, 4.8, 4.5, 4.8, 4.5, 4.3, 4.5, 4.2]
    }
  ],
  operational: [
    {
      title: 'Project Completion',
      value: '91.2%',
      target: '95%',
      change: '+2.3%',
      trend: 'up',
      icon: <FileCheck className="h-5 w-5 text-emerald-500" />,
      description: 'Projects completed on schedule',
      chartData: [84, 85, 87, 86, 88, 87, 89, 88, 90, 89, 90, 91.2]
    },
    {
      title: 'Resource Utilization',
      value: '86.4%',
      target: '85%',
      change: '+1.2%',
      trend: 'up',
      icon: <Zap className="h-5 w-5 text-emerald-500" />,
      description: 'Percentage of billable hours',
      chartData: [80, 82, 83, 82, 84, 83, 85, 84, 85, 86, 85, 86.4]
    },
    {
      title: 'Audit Compliance',
      value: '97.8%',
      target: '99%',
      change: '-0.2%',
      trend: 'down',
      icon: <Award className="h-5 w-5 text-amber-500" />,
      description: 'Compliance with industry standards',
      chartData: [96, 97, 98, 98.5, 98, 98.2, 98, 98, 97.5, 98, 97.8, 97.8]
    },
    {
      title: 'Response Time',
      value: '3.2 hours',
      target: '4 hours',
      change: '-0.4 hours',
      trend: 'up',
      icon: <Clock className="h-5 w-5 text-emerald-500" />,
      description: 'Average client query response time',
      chartData: [5, 4.8, 4.5, 4.2, 4, 3.8, 3.6, 3.5, 3.4, 3.3, 3.3, 3.2]
    }
  ],
  customer: [
    {
      title: 'Customer Satisfaction',
      value: '4.7/5',
      target: '4.5/5',
      change: '+0.2',
      trend: 'up',
      icon: <Award className="h-5 w-5 text-emerald-500" />,
      description: 'Average customer satisfaction rating',
      chartData: [4.2, 4.3, 4.3, 4.4, 4.5, 4.5, 4.6, 4.5, 4.6, 4.6, 4.7, 4.7]
    },
    {
      title: 'Client Retention',
      value: '94.5%',
      target: '90%',
      change: '+1.2%',
      trend: 'up',
      icon: <Users className="h-5 w-5 text-emerald-500" />,
      description: 'Percentage of recurring clients',
      chartData: [88, 89, 90, 91, 90, 91, 92, 93, 93, 94, 94, 94.5]
    },
    {
      title: 'Net Promoter Score',
      value: '68',
      target: '65',
      change: '+3',
      trend: 'up',
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      description: 'Client willingness to recommend our services',
      chartData: [58, 60, 62, 61, 63, 64, 63, 65, 66, 67, 68, 68]
    },
    {
      title: 'Cross-Selling Rate',
      value: '28.4%',
      target: '30%',
      change: '+2.1%',
      trend: 'up',
      icon: <BarChart3 className="h-5 w-5 text-emerald-500" />,
      description: 'Clients using multiple services',
      chartData: [22, 23, 24, 23, 24, 25, 26, 25, 26, 27, 28, 28.4]
    }
  ]
};

export function KPIDashboard() {
  const [timeRange, setTimeRange] = useState('year');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <TimeFilter value={timeRange} onChange={setTimeRange} />
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            Set Targets
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="financial">Financial KPIs</TabsTrigger>
          <TabsTrigger value="operational">Operational KPIs</TabsTrigger>
          <TabsTrigger value="customer">Customer KPIs</TabsTrigger>
        </TabsList>
        
        {Object.entries(kpiData).map(([category, metrics]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <KPIMetricCard key={index} metric={metric} />
              ))}
            </div>
            
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{category.charAt(0).toUpperCase() + category.slice(1)} KPI Trends</CardTitle>
                  <CardDescription>
                    Performance over the past {timeRange === 'year' ? '12 months' : timeRange === 'quarter' ? '3 months' : '30 days'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <KPILineChart 
                    metrics={metrics} 
                    timeRange={timeRange}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Target Achievement</CardTitle>
                  <CardDescription>
                    Current performance against targets
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <KPIGaugeChart 
                    metrics={metrics}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>
                  Key insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category === 'financial' && (
                    <>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-green-50">Strength</Badge>
                        <p>Revenue growth is exceeding targets by 3.2%, suggesting successful business development and service expansion.</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-amber-50">Opportunity</Badge>
                        <p>Cost reduction is currently below target by 1.8%. Consider reviewing operational expenses and implementing efficiency measures.</p>
                      </div>
                    </>
                  )}
                  
                  {category === 'operational' && (
                    <>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-green-50">Strength</Badge>
                        <p>Resource utilization is above target, indicating effective allocation and scheduling of personnel.</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-amber-50">Opportunity</Badge>
                        <p>Project completion rate is improving but still below target. Consider reviewing project management processes.</p>
                      </div>
                    </>
                  )}
                  
                  {category === 'customer' && (
                    <>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-green-50">Strength</Badge>
                        <p>Client retention and satisfaction metrics are exceeding targets, indicating strong service quality and client relationships.</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-amber-50">Opportunity</Badge>
                        <p>Cross-selling rate is improving but still below target. Consider implementing targeted cross-selling strategies.</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Detailed Analysis</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
