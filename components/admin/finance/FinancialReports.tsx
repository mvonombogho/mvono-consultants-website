"use client";

import { useState, useEffect } from 'react';
import { Download, Calendar, Filter, BarChart3, ArrowDown, FileText, PieChart, LineChart, Layers } from 'lucide-react';
import {
  LineChart as ReLineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Mock data
const monthlyData = [
  { month: 'Jan', revenue: 250000, expenses: 145000, profit: 105000 },
  { month: 'Feb', revenue: 320000, expenses: 165000, profit: 155000 },
  { month: 'Mar', revenue: 280000, expenses: 150000, profit: 130000 },
  { month: 'Apr', revenue: 360000, expenses: 170000, profit: 190000 },
  { month: 'May', revenue: 400000, expenses: 180000, profit: 220000 },
  { month: 'Jun', revenue: 450000, expenses: 190000, profit: 260000 },
];

const revenueByService = [
  { name: 'Environmental Assessment', value: 850000 },
  { name: 'Occupational Safety', value: 720000 },
  { name: 'Fire Safety Audit', value: 1200000 },
  { name: 'Energy Audit', value: 950000 },
  { name: 'Statutory Inspection', value: 580000 },
];

const revenueByClient = [
  { name: 'Unga Group', value: 580000 },
  { name: 'Dormans Coffee', value: 450000 },
  { name: 'Radisson Blu', value: 720000 },
  { name: 'Tata Chemicals', value: 390000 },
  { name: 'KTDA', value: 830000 },
  { name: 'Others', value: 1230000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#6C757D'];

export default function FinancialReports() {
  const [isLoading, setIsLoading] = useState(true);
  const [reportType, setReportType] = useState('profit_loss');
  const [timeframe, setTimeframe] = useState('monthly');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  
  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [reportType, timeframe, year, month]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Get report title based on selected type
  const getReportTitle = () => {
    switch (reportType) {
      case 'profit_loss':
        return 'Profit & Loss Statement';
      case 'revenue_by_service':
        return 'Revenue by Service';
      case 'revenue_by_client':
        return 'Revenue by Client';
      case 'expense_breakdown':
        return 'Expense Breakdown';
      default:
        return 'Financial Report';
    }
  };
  
  // Get report icon based on selected type
  const getReportIcon = () => {
    switch (reportType) {
      case 'profit_loss':
        return <LineChart className="h-6 w-6 text-blue-600" />;
      case 'revenue_by_service':
        return <PieChart className="h-6 w-6 text-green-600" />;
      case 'revenue_by_client':
        return <BarChart3 className="h-6 w-6 text-purple-600" />;
      case 'expense_breakdown':
        return <Layers className="h-6 w-6 text-orange-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };
  
  // Generate years for dropdown (last 5 years)
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  };
  
  // Generate report content based on type
  const renderReportContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    switch (reportType) {
      case 'profit_loss':
        return (
          <div className="space-y-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('en-KE', {
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'KES',
                      }).format(value)
                    } 
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value as number)} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#4F46E5" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#F97316" />
                  <Line type="monotone" dataKey="profit" name="Profit" stroke="#10B981" />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(monthlyData.reduce((sum, item) => sum + item.revenue, 0))}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Expenses</h3>
                <p className="text-3xl font-bold text-orange-600">
                  {formatCurrency(monthlyData.reduce((sum, item) => sum + item.expenses, 0))}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Net Profit</h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(monthlyData.reduce((sum, item) => sum + item.profit, 0))}
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'revenue_by_service':
        return (
          <div className="space-y-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={revenueByService}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => `${entry.name.split(' ')[0]}: ${((entry.value / revenueByService.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%`}
                  >
                    {revenueByService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {revenueByService.map((service, index) => {
                    const totalRevenue = revenueByService.reduce((sum, item) => sum + item.value, 0);
                    const percentage = ((service.value / totalRevenue) * 100).toFixed(1);
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(service.value)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {percentage}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'revenue_by_client':
        return (
          <div className="space-y-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={revenueByClient} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('en-KE', {
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'KES',
                      }).format(value)
                    } 
                  />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="value" name="Revenue" fill="#8884d8">
                    {revenueByClient.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {revenueByClient.map((client, index) => {
                    const totalRevenue = revenueByClient.reduce((sum, item) => sum + item.value, 0);
                    const percentage = ((client.value / totalRevenue) * 100).toFixed(1);
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(client.value)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {percentage}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'expense_breakdown':
        // Mock expense data
        const expenseData = [
          { name: 'Salaries', value: 480000 },
          { name: 'Office Rent', value: 180000 },
          { name: 'Equipment', value: 120000 },
          { name: 'Transportation', value: 150000 },
          { name: 'Utilities', value: 70000 },
          { name: 'Miscellaneous', value: 100000 },
        ];
        
        return (
          <div className="space-y-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => `${entry.name}: ${((entry.value / expenseData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%`}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenseData.map((expense, index) => {
                    const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
                    const percentage = ((expense.value / totalExpenses) * 100).toFixed(1);
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <div className="text-sm font-medium text-gray-900">{expense.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(expense.value)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {percentage}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      default:
        return <div>Select a report type to view</div>;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Financial Reports</h1>
          <p className="text-gray-500 mt-1">Analyze financial performance and generate reports</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={() => alert('Generating PDF report')}
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
      
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="profit_loss">Profit & Loss</option>
              <option value="revenue_by_service">Revenue by Service</option>
              <option value="revenue_by_client">Revenue by Client</option>
              <option value="expense_breakdown">Expense Breakdown</option>
            </select>
          </div>
          
          {/* Timeframe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Date Range</option>
            </select>
          </div>
          
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {generateYears().map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          
          {/* Month - Only show if timeframe is monthly */}
          {timeframe === 'monthly' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          )}
        </div>
      </div>
      
      {/* Report Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            {getReportIcon()}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{getReportTitle()}</h2>
        </div>
        
        {renderReportContent()}
      </div>
    </div>
  );
}
