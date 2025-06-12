'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList,
  PieChart, 
  Pie
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type ClientData = {
  name: string;
  revenue: number;
  projects: number;
  color: string;
};

interface TopClientsChartProps {
  timeRange: string;
  viewFormat: string;
}

export function TopClientsChart({ timeRange, viewFormat }: TopClientsChartProps) {
  const [data, setData] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    
    // In a real implementation, this would be fetched from an API
    // Here we're generating mock data
    const generateMockData = () => {
      // Using clients from the MVONO CONSULTANTS V2 document
      const clientNames = [
        'Lafarge',
        'Alpine Coolers',
        'KTDA',
        'Alloy Castings',
        'Autosterile',
        'Autosprings',
        'Unga Group',
        'Movenpick',
        'Dormans Coffee',
        'Husseini Builders',
        'Iberafrica',
        'Kamili',
        'Tata Chemicals',
        'Melvin Tea',
        'Radisson Blu',
        'Saint Gobain',
        'SICPA',
        'Wire Products',
        'Welding Alloys',
        'National Cement'
      ];
      
      // Generate random colors
      const colors = [
        '#0ea5e9', '#f97316', '#8b5cf6', '#22c55e', '#ef4444', 
        '#f59e0b', '#3b82f6', '#ec4899', '#06b6d4', '#a855f7',
        '#10b981', '#6366f1', '#f43f5e', '#14b8a6', '#8b5cf6',
        '#84cc16', '#64748b', '#d946ef', '#0284c7', '#0f766e'
      ];
      
      // Create data with random revenue values
      const mockData = clientNames.map((name, index) => ({
        name,
        revenue: Math.floor(Math.random() * 2500000) + 500000,
        projects: Math.floor(Math.random() * 8) + 1,
        color: colors[index % colors.length]
      }));
      
      // Sort by revenue in descending order
      mockData.sort((a, b) => b.revenue - a.revenue);
      
      // Take only top 10 for better visualization
      const top10 = mockData.slice(0, 10);
      
      const total = top10.reduce((sum, client) => sum + client.revenue, 0);
      setTotalRevenue(total);
      
      return top10;
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

  const renderPercentage = (value: number) => {
    return `${((value / totalRevenue) * 100).toFixed(1)}%`;
  };

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center">Loading client data...</div>;
  }

  if (viewFormat === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Projects</TableHead>
            <TableHead className="text-right">% of Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </div>
              </TableCell>
              <TableCell className="text-right">{formatCurrency(item.revenue)}</TableCell>
              <TableCell className="text-right">{item.projects}</TableCell>
              <TableCell className="text-right">{renderPercentage(item.revenue)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-bold">Total</TableCell>
            <TableCell className="text-right font-bold">{formatCurrency(totalRevenue)}</TableCell>
            <TableCell className="text-right font-bold">
              {data.reduce((sum, client) => sum + client.projects, 0)}
            </TableCell>
            <TableCell className="text-right font-bold">100%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" 
              tickFormatter={(value) => `KES ${(value / 1000000).toFixed(1)}M`}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'revenue') {
                  return [formatCurrency(value), 'Revenue'];
                }
                return [value, name];
              }}
            />
            <Legend />
            <Bar dataKey="revenue" name="Revenue">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList dataKey="projects" position="right" formatter={(value: number) => `${value} project${value !== 1 ? 's' : ''}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="revenue"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Revenue']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
