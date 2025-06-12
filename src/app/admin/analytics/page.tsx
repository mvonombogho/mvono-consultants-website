'use client'

import { useState } from 'react'
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaFileDownload,
  FaCalendarAlt,
  FaFilter
} from 'react-icons/fa'

// Mock revenue data by month
const revenueByMonth = [
  { month: 'Jan', amount: 580000 },
  { month: 'Feb', amount: 620000 },
  { month: 'Mar', amount: 650000 },
  { month: 'Apr', amount: 720000 },
  { month: 'May', amount: 700000 },
  { month: 'Jun', amount: 750000 },
  { month: 'Jul', amount: 790000 },
  { month: 'Aug', amount: 820000 },
  { month: 'Sep', amount: 780000 },
  { month: 'Oct', amount: 800000 },
  { month: 'Nov', amount: 850000 },
  { month: 'Dec', amount: 900000 },
]

// Mock service category data
const serviceCategories = [
  { name: 'Environmental Impact Assessment', value: 25 },
  { name: 'Occupational Safety', value: 20 },
  { name: 'Fire Safety Audit', value: 15 },
  { name: 'Energy Audit', value: 15 },
  { name: 'Statutory Inspection', value: 10 },
  { name: 'Non-Destructive Testing', value: 10 },
  { name: 'Fire Safety Training', value: 3 },
  { name: 'First Aider Training', value: 2 },
]

// Mock client acquisition
const clientAcquisition = [
  { name: 'Referrals', value: 45 },
  { name: 'Website', value: 25 },
  { name: 'LinkedIn', value: 15 },
  { name: 'Events', value: 10 },
  { name: 'Other', value: 5 },
]

// Mock client industry breakdown
const clientIndustries = [
  { name: 'Manufacturing', value: 35 },
  { name: 'Food Processing', value: 20 },
  { name: 'Hospitality', value: 15 },
  { name: 'Healthcare', value: 10 },
  { name: 'Education', value: 5 },
  { name: 'Others', value: 15 },
]

// Mock key metrics
const keyMetrics = {
  revenueGrowth: 15.2,
  averageInvoiceValue: 145000,
  repeatClientRate: 78,
  clientSatisfaction: 92,
  projectCompletionRate: 98,
  averageProjectDuration: 17, // days
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('year')
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400" />
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <FaFileDownload title="Download Report" />
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FaChartLine className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Growth</h3>
              <p className="text-gray-500">Year over year</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-gray-900">{keyMetrics.revenueGrowth}%</p>
            <div className="text-sm text-green-600 flex items-center">
              <FaChartLine className="mr-1" />
              <span>+2.3% from last year</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FaChartBar className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Avg. Invoice Value</h3>
              <p className="text-gray-500">Current year</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(keyMetrics.averageInvoiceValue)}</p>
            <div className="text-sm text-blue-600 flex items-center">
              <FaChartLine className="mr-1" />
              <span>+5.8% from last year</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <FaChartPie className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Repeat Client Rate</h3>
              <p className="text-gray-500">Client retention</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-gray-900">{keyMetrics.repeatClientRate}%</p>
            <div className="text-sm text-purple-600 flex items-center">
              <FaChartLine className="mr-1" />
              <span>+3.2% from last year</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full">
          {/* Revenue Chart Placeholder */}
          <div className="h-full w-full bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Revenue Chart</p>
              <p className="text-xs text-gray-400">
                (In production, this would be an actual Chart.js or Recharts component)
              </p>
              
              <div className="mt-4 flex justify-center space-x-1">
                {revenueByMonth.map((item, index) => {
                  // Calculate height based on revenue amount
                  const maxAmount = Math.max(...revenueByMonth.map(i => i.amount))
                  const height = (item.amount / maxAmount) * 100
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-primary-500 rounded-t"
                        style={{ height: `${height}px` }}
                      ></div>
                      <div className="text-xs mt-1">{item.month}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services and Client Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Service Breakdown</h2>
          
          <div className="space-y-4">
            {serviceCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">{category.name}</span>
                  <span className="text-sm font-medium text-gray-900">{category.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${category.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Client Industry Breakdown</h2>
          
          <div className="h-64 w-full">
            {/* Pie Chart Placeholder */}
            <div className="h-full w-full bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Client Industry Breakdown</p>
                <p className="text-xs text-gray-400">
                  (In production, this would be an actual pie chart component)
                </p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {clientIndustries.map((industry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ 
                          backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                        }}
                      ></div>
                      <span className="text-xs text-gray-700">{industry.name}: {industry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <span className="block text-sm text-gray-500">Client Satisfaction</span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-900">{keyMetrics.clientSatisfaction}%</span>
            <span className="text-sm text-yellow-600">+1.5%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <span className="block text-sm text-gray-500">Project Completion Rate</span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-900">{keyMetrics.projectCompletionRate}%</span>
            <span className="text-sm text-green-600">+0.5%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <span className="block text-sm text-gray-500">Avg. Project Duration</span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-900">{keyMetrics.averageProjectDuration} days</span>
            <span className="text-sm text-blue-600">-2.0 days</span>
          </div>
        </div>
      </div>
      
      {/* Client Acquisition Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Client Acquisition Channels</h2>
        
        <div className="flex flex-wrap gap-4">
          {clientAcquisition.map((channel, index) => (
            <div 
              key={index} 
              className="flex-1 min-w-[120px] bg-gray-50 p-4 rounded-lg border border-gray-200 text-center"
            >
              <div 
                className="mx-auto w-16 h-16 rounded-full mb-3 flex items-center justify-center"
                style={{ backgroundColor: `hsl(${index * 45}, 70%, 90%)` }}
              >
                <div 
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: `hsl(${index * 45}, 70%, 60%)` }}
                ></div>
              </div>
              <p className="font-medium text-gray-800">{channel.name}</p>
              <p className="text-lg font-bold text-gray-900">{channel.value}%</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommendations Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Recommendations</h2>
        <p className="text-gray-500 mb-6">Based on your data, here are some recommendations to improve your business</p>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
            <h3 className="font-medium text-blue-800">Increase Focus on Manufacturing Clients</h3>
            <p className="text-blue-700 mt-1">Manufacturing clients make up 35% of your client base but generate 45% of revenue. Consider targeted marketing to this sector.</p>
          </div>
          
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
            <h3 className="font-medium text-green-800">Optimize Pricing for Energy Audits</h3>
            <p className="text-green-700 mt-1">Energy audit services have the highest profit margin. Consider a modest price increase or bundling with other services.</p>
          </div>
          
          <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r">
            <h3 className="font-medium text-purple-800">Improve Website Lead Generation</h3>
            <p className="text-purple-700 mt-1">Website leads have increased 25% but conversion is only at 12%. Consider optimizing your contact forms and follow-up process.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
