'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type RevenueDataPoint = {
  name: string;
  revenue: number;
  previousPeriod: number;
};

interface RevenueChartProps {
  timeRange: string;
  viewFormat: string;
}

export function RevenueChart({ timeRange, viewFormat }: RevenueChartProps) {
  const [data, setData] = useState<RevenueDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    // In a real application, this would be an API call
    // Here we're generating mock data based on the timeRange
    const generateMockData = () => {
      let mockData: RevenueDataPoint[] = [];
      const periods = {
        day: 24,
        week: 7,
        month: 30,
        quarter: 12,
        year: 12
      };
      
      const periodLabels = {
        day: (i: number) => `${i}:00`,
        week: (i: number) => `Day ${i + 1}`,
        month: (i: number) => `Day ${i + 1}`,
        quarter: (i: number) => `Week ${i + 1}`,
        year: (i: number) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]
      };
      
      const range = periods[timeRange as keyof typeof periods] || 12;
      const getLabel = periodLabels[timeRange as keyof typeof periodLabels] || ((i: number) => `Period ${i}`);
      
      for (let i = 0; i < range; i++) {
        const revenue = Math.floor(Math.random() * 500000) + 500000;
        const previousPeriod = Math.floor(Math.random() * 450000) + 450000;
        
        mockData.push({
          name: getLabel(i),
          revenue,
          previousPeriod
        });
      }
      
      return mockData;
    };
    
    // Simulate API delay
    setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
    }, 500);
  }, [timeRange]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center">Loading revenue data...</div>;
  }

  if (viewFormat === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Current {timeRange}</TableHead>
            <TableHead className="text-right">Previous {timeRange}</TableHead>
            <TableHead className="text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const change = ((item.revenue - item.previousPeriod) / item.previousPeriod) * 100;
            const isPositive = change >= 0;
            
            return (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.revenue)}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.previousPeriod)}</TableCell>
                <TableCell className={`text-right ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{change.toFixed(2)}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          tickFormatter={(value) => `KES ${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip 
          formatter={(value: number) => [formatCurrency(value), 'Revenue']}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="previousPeriod"
          stackId="1"
          stroke="#94a3b8"
          fill="#f1f5f9"
          name="Previous Period"
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stackId="2"
          stroke="#0ea5e9"
          fill="#bae6fd"
          name="Current Period"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
