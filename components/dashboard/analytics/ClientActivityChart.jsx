'use client';

import { useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-slate-200">
        <p className="font-medium text-slate-800">{label}</p>
        <div className="mt-2 space-y-1">
          <p className="flex items-center text-sm">
            <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
            <span className="text-slate-600">New Clients:</span>
            <span className="ml-1 font-medium">{payload[0].value}</span>
          </p>
          <p className="flex items-center text-sm">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            <span className="text-slate-600">Renewals:</span>
            <span className="ml-1 font-medium">{payload[1].value}</span>
          </p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default function ClientActivityChart({ data }) {
  const chartRef = useRef(null);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Client Activity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
            <span className="text-sm text-slate-600">New Clients</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            <span className="text-sm text-slate-600">Renewals</span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow" ref={chartRef}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              bottom: 5,
              left: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="newClients" fill="#10B981" radius={[4, 4, 0, 0]} barSize={12} />
            <Bar dataKey="renewals" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-2 bg-emerald-50 rounded-lg">
            <p className="text-sm text-slate-600">Total New Clients</p>
            <p className="text-xl font-bold text-emerald-600">
              {data.reduce((sum, item) => sum + item.newClients, 0)}
            </p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <p className="text-sm text-slate-600">Total Renewals</p>
            <p className="text-xl font-bold text-blue-600">
              {data.reduce((sum, item) => sum + item.renewals, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
