import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface EmailStats {
  sent: number;
  opened: number;
  clicked: number;
  totalRate: number;
}

interface EmailStatsWidgetProps {
  stats: EmailStats;
  loading: boolean;
}

export const EmailStatsWidget = ({ stats, loading }: EmailStatsWidgetProps) => {
  const prepareChartData = () => {
    // Calculate unopened and non-clicked counts
    const unopened = stats.sent - stats.opened;
    const opened = stats.opened;
    const clicked = stats.clicked;
    
    // Prepare data for the pie charts
    const openRateData = [
      { name: 'Opened', value: opened > 0 ? opened : 0 },
      { name: 'Unopened', value: unopened > 0 ? unopened : 0 }
    ];
    
    const clickRateData = [
      { name: 'Clicked', value: clicked > 0 ? clicked : 0 },
      { name: 'Not Clicked', value: (opened - clicked) > 0 ? (opened - clicked) : 0 }
    ];
    
    return { openRateData, clickRateData };
  };
  
  const { openRateData, clickRateData } = prepareChartData();
  
  // Colors for the pie charts
  const openRateColors = ['#3B82F6', '#E5E7EB']; // Blue for opened, gray for unopened
  const clickRateColors = ['#10B981', '#E5E7EB']; // Green for clicked, gray for not clicked
  
  // Calculate percentages
  const openRate = stats.sent > 0 ? Math.round((stats.opened / stats.sent) * 100) : 0;
  const clickRate = stats.opened > 0 ? Math.round((stats.clicked / stats.opened) * 100) : 0;
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm text-xs">
          <p className="font-medium text-gray-700">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-gray-600">{`${Math.round((payload[0].value / (openRateData[0].value + openRateData[1].value)) * 100)}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading email stats...</p>
        </div>
      ) : stats.sent === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-500 mb-2">No email data available</p>
          <p className="text-sm text-gray-400 max-w-md">
            Start sending emails to see performance metrics
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700 font-medium">Open Rate</p>
              <p className="text-2xl font-bold text-blue-800">{openRate}%</p>
              <p className="text-xs text-blue-600 mt-1">{stats.opened} of {stats.sent} emails</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium">Click Rate</p>
              <p className="text-2xl font-bold text-green-800">{clickRate}%</p>
              <p className="text-xs text-green-600 mt-1">{stats.clicked} of {stats.opened} emails</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 text-center">Open Performance</p>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={openRateData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {openRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={openRateColors[index % openRateColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span>Opened</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 rounded-full mr-1"></div>
                  <span>Unopened</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 text-center">Click Performance</p>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clickRateData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {clickRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={clickRateColors[index % clickRateColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span>Clicked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 rounded-full mr-1"></div>
                  <span>Not Clicked</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-xs text-gray-500 pb-1 border-b border-gray-200">
              <span>Latest Emails</span>
              <span>Status</span>
            </div>
            
            {/* Placeholder for latest email entries */}
            <div className="text-center text-xs text-gray-400 mt-4">
              Connect an email service provider to view recent campaigns
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
