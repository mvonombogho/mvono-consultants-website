'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface Campaign {
  id: string;
  name: string;
  campaignType: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  actualSpent: number;
  ROI: number;
}

interface MarketingMetricsChartProps {
  data: Campaign[];
  loading: boolean;
}

export const MarketingMetricsChart = ({ data, loading }: MarketingMetricsChartProps) => {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [metricType, setMetricType] = useState<'budget' | 'roi'>('budget');

  // Process data based on timeframe and create chart data
  const processData = () => {
    if (loading || !data.length) return [];

    // Function to get month period label
    const getMonthLabel = (date: Date) => {
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    };

    // Function to get quarter label
    const getQuarterLabel = (date: Date) => {
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      return `Q${quarter} ${date.getFullYear()}`;
    };

    // Function to get year label
    const getYearLabel = (date: Date) => {
      return date.getFullYear().toString();
    };

    // Sort campaigns by start date
    const sortedCampaigns = [...data].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    // Group campaigns by timeframe
    const groupedData = sortedCampaigns.reduce((acc, campaign) => {
      const startDate = new Date(campaign.startDate);
      let period;

      if (timeframe === 'month') {
        period = getMonthLabel(startDate);
      } else if (timeframe === 'quarter') {
        period = getQuarterLabel(startDate);
      } else {
        period = getYearLabel(startDate);
      }

      if (!acc[period]) {
        acc[period] = {
          period,
          totalBudget: 0,
          totalSpent: 0,
          averageROI: 0,
          campaignCount: 0,
          campaignsWithROI: 0,
        };
      }

      acc[period].totalBudget += campaign.budget || 0;
      acc[period].totalSpent += campaign.actualSpent || 0;
      
      if (campaign.ROI !== null && campaign.ROI !== undefined) {
        acc[period].averageROI += campaign.ROI;
        acc[period].campaignsWithROI += 1;
      }
      
      acc[period].campaignCount += 1;

      return acc;
    }, {} as Record<string, any>);

    // Convert grouped data to array and calculate averages
    return Object.values(groupedData).map((group: any) => {
      return {
        ...group,
        averageROI: group.campaignsWithROI > 0 
          ? group.averageROI / group.campaignsWithROI 
          : 0
      };
    });
  };

  const chartData = processData();

  const getBarColor = (metric: 'budget' | 'spent' | 'roi') => {
    switch (metric) {
      case 'budget':
        return '#3B82F6'; // blue-500
      case 'spent':
        return '#10B981'; // green-500
      case 'roi':
        return '#8B5CF6'; // violet-500
      default:
        return '#3B82F6';
    }
  };

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center text-sm mb-1">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700">
                {entry.name}: {entry.value.toLocaleString(undefined, {
                  style: entry.name.includes('ROI') ? undefined : 'currency',
                  currency: 'KES',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: entry.name.includes('ROI') ? 2 : 0,
                })}
                {entry.name.includes('ROI') && '%'}
              </span>
            </div>
          ))}
          <div className="text-xs text-gray-500 mt-1">
            Campaigns: {payload[0].payload.campaignCount}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <span>Show:</span>
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => setMetricType('budget')}
              className={`px-3 py-1 text-xs ${
                metricType === 'budget'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Budget vs Spend
            </button>
            <button
              onClick={() => setMetricType('roi')}
              className={`px-3 py-1 text-xs ${
                metricType === 'roi'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              ROI
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <span>Group by:</span>
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 text-xs ${
                timeframe === 'month'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeframe('quarter')}
              className={`px-3 py-1 text-xs ${
                timeframe === 'quarter'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Quarter
            </button>
            <button
              onClick={() => setTimeframe('year')}
              className={`px-3 py-1 text-xs ${
                timeframe === 'year'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="text-gray-500 mb-4">No campaign data available for metrics</p>
            <p className="text-sm text-gray-400 max-w-md">
              Start creating marketing campaigns to see performance metrics
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 12, fill: '#4B5563' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#4B5563' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => {
                  if (metricType === 'roi') {
                    return `${value}%`;
                  }
                  return value >= 1000 ? `${value / 1000}K` : value;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', bottom: 0 }} />
              
              {metricType === 'budget' ? (
                <>
                  <Bar
                    name="Budget"
                    dataKey="totalBudget"
                    fill={getBarColor('budget')}
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    name="Actual Spent"
                    dataKey="totalSpent"
                    fill={getBarColor('spent')}
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </>
              ) : (
                <Bar
                  name="Average ROI"
                  dataKey="averageROI"
                  fill={getBarColor('roi')}
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
