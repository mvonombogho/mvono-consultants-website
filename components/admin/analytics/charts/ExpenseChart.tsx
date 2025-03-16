'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type ExpenseCategory = {
  name: string;
  value: number;
  color: string;
};

interface ExpenseChartProps {
  timeRange: string;
  viewFormat: string;
}

export function ExpenseChart({ timeRange, viewFormat }: ExpenseChartProps) {
  const [data, setData] = useState<ExpenseCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    // In a real implementation, this would be fetched from an API
    // Here we're generating mock data
    
    const generateMockData = () => {
      const categories = [
        { name: 'Staff Salaries', color: '#0ea5e9' },
        { name: 'Equipment', color: '#f97316' },
        { name: 'Transportation', color: '#8b5cf6' },
        { name: 'Office Rent', color: '#22c55e' },
        { name: 'Subcontractors', color: '#ef4444' },
        { name: 'Utilities', color: '#f59e0b' },
        { name: 'Training', color: '#3b82f6' },
        { name: 'Marketing', color: '#ec4899' }
      ];
      
      const mockData = categories.map(category => ({
        name: category.name,
        value: Math.floor(Math.random() * 250000) + 50000,
        color: category.color
      }));
      
      const totalExpenses = mockData.reduce((sum, item) => sum + item.value, 0);
      setTotal(totalExpenses);
      
      // Sort data by value in descending order for better visualization
      return mockData.sort((a, b) => b.value - a.value);
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
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center">Loading expense data...</div>;
  }

  if (viewFormat === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Percentage</TableHead>
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
              <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
              <TableCell className="text-right">{renderPercentage(item.value)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-bold">Total</TableCell>
            <TableCell className="text-right font-bold">{formatCurrency(total)}</TableCell>
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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Amount']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" 
              tickFormatter={(value) => `KES ${(value / 1000).toFixed(0)}k`}
            />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Amount']}
            />
            <Bar dataKey="value" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
