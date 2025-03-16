'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type ServiceProfitData = {
  name: string;
  revenue: number;
  cost: number;
  margin: number;
  marginPercentage: number;
};

interface ProfitMarginChartProps {
  timeRange: string;
  viewFormat: string;
}

export function ProfitMarginChart({ timeRange, viewFormat }: ProfitMarginChartProps) {
  const [data, setData] = useState<ServiceProfitData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    
    // In a real implementation, this would be fetched from an API
    // Here we're generating mock data for different service types
    const generateMockData = () => {
      const services = [
        'Environmental Impact Assessment',
        'Occupational Safety',
        'Fire Safety Audit',
        'Energy Audit',
        'Statutory Inspection',
        'Non-Destructive Testing',
        'Fire Safety Training',
        'First Aider Training'
      ];
      
      return services.map(service => {
        const revenue = Math.floor(Math.random() * 900000) + 100000;
        const costPercentage = Math.random() * 0.3 + 0.4; // Cost is between 40% and 70% of revenue
        const cost = Math.floor(revenue * costPercentage);
        const margin = revenue - cost;
        const marginPercentage = (margin / revenue) * 100;
        
        return {
          name: service,
          revenue,
          cost,
          margin,
          marginPercentage
        };
      }).sort((a, b) => b.marginPercentage - a.marginPercentage); // Sort by margin percentage
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

  const getBarColor = (marginPercentage: number) => {
    if (marginPercentage >= 50) return '#22c55e'; // high margin - green
    if (marginPercentage >= 30) return '#f59e0b'; // medium margin - amber
    return '#ef4444'; // low margin - red
  };

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center">Loading profit margin data...</div>;
  }

  if (viewFormat === 'table') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Cost</TableHead>
            <TableHead className="text-right">Margin</TableHead>
            <TableHead className="text-right">Margin %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.revenue)}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.cost)}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.margin)}</TableCell>
              <TableCell className="text-right">
                <span 
                  className={`
                    px-2 py-1 rounded-full text-white
                    ${item.marginPercentage >= 50 ? 'bg-emerald-500' : 
                      item.marginPercentage >= 30 ? 'bg-amber-500' : 'bg-red-500'}
                  `}
                >
                  {item.marginPercentage.toFixed(1)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={70}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          yAxisId="left"
          orientation="left"
          tickFormatter={(value) => `KES ${(value / 1000).toFixed(0)}k`}
          label={{ value: 'Amount (KES)', angle: -90, position: 'insideLeft' }}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) => `${value}%`}
          domain={[0, 100]}
          label={{ value: 'Margin %', angle: 90, position: 'insideRight' }}
        />
        <Tooltip 
          formatter={(value: number, name: string) => {
            if (name === 'revenue' || name === 'cost' || name === 'margin') {
              return [formatCurrency(value), name.charAt(0).toUpperCase() + name.slice(1)];
            }
            return [`${value.toFixed(1)}%`, 'Margin Percentage'];
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#0ea5e9" />
        <Bar yAxisId="left" dataKey="cost" name="Cost" fill="#f97316" />
        <Bar yAxisId="left" dataKey="margin" name="Margin" barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.marginPercentage)} />
          ))}
        </Bar>
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="marginPercentage"
          name="Margin %"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
