'use client';

import { useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Custom colors for the pie chart segments
const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

export default function RevenueByService({ data }) {
  const chartRef = useRef(null);
  
  // Format the data for the pie chart
  const formattedData = data.map((item, index) => ({
    name: item.name,
    value: item.value,
    color: COLORS[index % COLORS.length]
  }));
  
  // Custom formatted tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-slate-200">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">KES {data.value.toLocaleString()}</p>
          <p className="text-xs text-slate-500">
            {((data.value / formattedData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Custom formatted legend
  const renderCustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-1 gap-2 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center text-sm">
            <div 
              className="w-3 h-3 rounded-sm mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex justify-between w-full">
              <span className="truncate">{entry.value}</span>
              <span className="font-medium">
                {((entry.payload.value / formattedData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Revenue by Service</h3>
      
      <div className="flex-grow" ref={chartRef}>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={1} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderCustomLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 pt-4 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Total Revenue:</span>
          <span className="font-semibold text-slate-800">
            KES {formattedData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
