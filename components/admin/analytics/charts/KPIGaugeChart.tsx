'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  RadialBarChart,
  RadialBar
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

interface KPIGaugeChartProps {
  metrics: KPIMetric[];
}

export function KPIGaugeChart({ metrics }: KPIGaugeChartProps) {
  // Calculate percentage towards target for each metric
  const calculateProgressData = () => {
    return metrics.map(metric => {
      let progress: number;
      
      // Parse values
      if (metric.value.includes('/')) {
        // Handle rating format (e.g., 4.7/5)
        const currentValue = parseFloat(metric.value.split('/')[0]);
        const targetValue = parseFloat(metric.target.split('/')[0]);
        progress = (currentValue / targetValue) * 100;
      } else if (metric.value.includes('days') || metric.value.includes('hours')) {
        // Handle time metrics (lower is better)
        const currentValue = parseFloat(metric.value.split(' ')[0]);
        const targetValue = parseFloat(metric.target.split(' ')[0]);
        
        // Invert the percentage because for time metrics, lower is better
        if (currentValue <= targetValue) {
          progress = 100; // At or beyond target
        } else {
          // Calculate how far away from target (as a percentage)
          const overage = (currentValue - targetValue) / targetValue;
          progress = Math.max(0, Math.min(100, 100 - (overage * 100)));
        }
      } else if (metric.value.includes('%')) {
        // Handle percentage metrics
        const currentValue = parseFloat(metric.value.replace('%', ''));
        const targetValue = parseFloat(metric.target.replace('%', ''));
        progress = (currentValue / targetValue) * 100;
      } else {
        // Handle numerical metrics
        const currentValue = parseFloat(metric.value);
        const targetValue = parseFloat(metric.target);
        progress = (currentValue / targetValue) * 100;
      }
      
      return {
        name: metric.title,
        value: Math.min(100, progress),
        fill: getColorForProgress(progress)
      };
    });
  };
  
  // Get color based on progress percentage
  const getColorForProgress = (progress: number) => {
    if (progress >= 95) return '#22c55e'; // green
    if (progress >= 75) return '#16a34a'; // emerald
    if (progress >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };
  
  // Format the tooltip value
  const formatTooltipValue = (value: number) => {
    return `${value.toFixed(1)}% of target`;
  };
  
  // Sort data for better visualization
  const sortedData = calculateProgressData().sort((a, b) => b.value - a.value);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        innerRadius="20%"
        outerRadius="85%"
        data={sortedData}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          background={{ fill: '#f1f5f9' }}
          dataKey="value"
          label={{
            position: 'insideStart',
            fill: '#fff',
            formatter: (value: number) => `${value.toFixed(0)}%`
          }}
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value: number) => [formatTooltipValue(value), 'Progress']}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
