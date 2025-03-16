'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface KPIMetric {
  title: string;
  value: string;
  target: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  description: string;
  chartData: number[];
}

interface KPILineChartProps {
  metrics: KPIMetric[];
  timeRange: string;
}

export function KPILineChart({ metrics, timeRange }: KPILineChartProps) {
  // Generate time labels based on timeRange
  const getTimeLabels = () => {
    const labels = {
      day: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      month: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      quarter: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
      year: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
    
    return labels[timeRange as keyof typeof labels] || labels.year;
  };
  
  // Format the chart data
  const formatChartData = () => {
    const timeLabels = getTimeLabels();
    
    // Create an array of data points with the time label and all metric values
    return timeLabels.map((label, index) => {
      const dataPoint: Record<string, any> = {
        name: label,
      };
      
      // Add each metric's value at this time point
      metrics.forEach(metric => {
        const metricName = metric.title.replace(/\s+/g, '');
        const adjustedIndex = Math.min(index, metric.chartData.length - 1);
        dataPoint[metricName] = metric.chartData[adjustedIndex];
      });
      
      return dataPoint;
    });
  };
  
  // Generate a unique color for each metric
  const getMetricColor = (index: number) => {
    const colors = [
      '#0ea5e9',  // blue
      '#f97316',  // orange
      '#8b5cf6',  // purple
      '#22c55e',  // green
      '#ef4444',  // red
      '#f59e0b',  // amber
      '#3b82f6',  // blue
      '#ec4899',  // pink
    ];
    
    return colors[index % colors.length];
  };
  
  // Only show the last 12 data points for better visualization
  const formatYAxisTick = (value: number) => {
    // Check if the value should be displayed as a percentage
    if (metrics.some(m => m.value.includes('%'))) {
      return `${value}%`;
    }
    
    // Check if the value should be displayed as time
    if (metrics.some(m => m.value.includes('days') || m.value.includes('hours'))) {
      if (value >= 24) {
        const days = Math.floor(value / 24);
        return `${days}d`;
      }
      return `${value}h`;
    }
    
    // Check if the value should be displayed as a rating
    if (metrics.some(m => m.value.includes('/'))) {
      return value.toFixed(1);
    }
    
    // Default formatting
    return value;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formatChartData()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          fontSize={12}
          tick={{ fill: '#64748b' }}
        />
        <YAxis 
          tickFormatter={formatYAxisTick}
          fontSize={12}
          tick={{ fill: '#64748b' }}
        />
        <Tooltip />
        <Legend />
        {metrics.map((metric, index) => (
          <Line
            key={metric.title}
            type="monotone"
            dataKey={metric.title.replace(/\s+/g, '')}
            name={metric.title}
            stroke={getMetricColor(index)}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
