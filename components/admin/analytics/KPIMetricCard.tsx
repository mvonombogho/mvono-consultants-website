'use client';

import React from 'react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

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

interface KPIMetricCardProps {
  metric: KPIMetric;
}

export function KPIMetricCard({ metric }: KPIMetricCardProps) {
  // Calculate percentage towards target
  const calculateProgressPercentage = () => {
    // Parse values
    let currentValue: number;
    let targetValue: number;
    
    if (metric.value.includes('/')) {
      // Handle rating format (e.g., 4.7/5)
      currentValue = parseFloat(metric.value.split('/')[0]);
      targetValue = parseFloat(metric.target.split('/')[0]);
    } else if (metric.value.includes('days') || metric.value.includes('hours')) {
      // Handle time metrics (lower is better)
      currentValue = parseFloat(metric.value.split(' ')[0]);
      targetValue = parseFloat(metric.target.split(' ')[0]);
      
      // Invert the percentage because for time metrics, lower is better
      if (currentValue <= targetValue) {
        return 100; // At or beyond target
      }
      
      // Calculate how far away from target (as a percentage)
      const overage = (currentValue - targetValue) / targetValue;
      return Math.max(0, Math.min(100, 100 - (overage * 100)));
    } else if (metric.value.includes('%')) {
      // Handle percentage metrics
      currentValue = parseFloat(metric.value.replace('%', ''));
      targetValue = parseFloat(metric.target.replace('%', ''));
    } else {
      // Handle numerical metrics
      currentValue = parseFloat(metric.value);
      targetValue = parseFloat(metric.target);
    }
    
    // Calculate percentage of target
    return Math.min(100, (currentValue / targetValue) * 100);
  };
  
  const progressPercentage = calculateProgressPercentage();
  
  // Determine color based on progress and trend
  const getColor = () => {
    if (progressPercentage >= 95) return 'bg-emerald-600';
    if (progressPercentage >= 75) return 'bg-emerald-500';
    if (progressPercentage >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  // Generate sparkline from chart data
  const generateSparkline = () => {
    const max = Math.max(...metric.chartData);
    const min = Math.min(...metric.chartData);
    const range = max - min;
    const height = 30;
    
    // Transform data points to SVG path
    const points = metric.chartData.map((value, index) => {
      const x = (index / (metric.chartData.length - 1)) * 100;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg
        className="w-full h-8 mt-2"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        <polyline
          points={points}
          fill="none"
          stroke={metric.trend === 'up' ? '#10b981' : '#ef4444'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
          <div className="rounded-full bg-muted p-1">
            {metric.icon}
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">{metric.value}</h3>
            <p className="text-xs ml-2 text-muted-foreground">
              Target: {metric.target}
            </p>
          </div>
          
          <div className="mt-1">
            <div className="w-full bg-muted rounded-full h-1.5 mb-1">
              <div 
                className={`h-1.5 rounded-full ${getColor()}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{progressPercentage.toFixed(0)}% of target</p>
          </div>
          
          <div className="mt-4 flex items-center text-sm">
            {metric.trend === 'up' ? (
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span 
              className={metric.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}
            >
              {metric.change}
            </span>
            <span className="text-muted-foreground ml-1">from previous period</span>
          </div>
          
          {generateSparkline()}
        </div>
      </CardContent>
    </Card>
  );
}
