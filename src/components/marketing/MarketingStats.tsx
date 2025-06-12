'use client'

import { FaEnvelope, FaCalendarCheck, FaUserPlus, FaTrophy } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Mock data for the area chart
const campaignPerformanceData = [
  { month: 'Jan', emails: 120, clicks: 48, leads: 16 },
  { month: 'Feb', emails: 180, clicks: 72, leads: 23 },
  { month: 'Mar', emails: 250, clicks: 100, leads: 32 },
  { month: 'Apr', emails: 310, clicks: 136, leads: 41 },
  { month: 'May', emails: 420, clicks: 178, leads: 53 },
  { month: 'Jun', emails: 380, clicks: 161, leads: 49 },
]

// Mock data for campaign types
const campaignTypeData = [
  { name: 'Email', value: 65, color: '#4f46e5' },
  { name: 'Social Media', value: 20, color: '#0ea5e9' },
  { name: 'Event', value: 10, color: '#10b981' },
  { name: 'Print', value: 5, color: '#f59e0b' },
]

// Mock data for stat cards
const marketingStats = [
  {
    title: 'Total Campaigns',
    value: '12',
    description: '+2 from last month',
    trend: 'positive',
    icon: <FaCalendarCheck size={20} className="text-purple-500" />
  },
  {
    title: 'Email Opens',
    value: '3,245',
    description: '32.4% open rate',
    trend: 'positive',
    icon: <FaEnvelope size={20} className="text-blue-500" />
  },
  {
    title: 'New Leads',
    value: '186',
    description: '+8% conversion rate',
    trend: 'positive',
    icon: <FaUserPlus size={20} className="text-green-500" />
  },
  {
    title: 'Campaign ROI',
    value: '216%',
    description: '12% increase',
    trend: 'positive',
    icon: <FaTrophy size={20} className="text-yellow-500" />
  }
]

export default function MarketingStats() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketingStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Campaign Performance Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Email opens, clicks, and leads generated over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={campaignPerformanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="emails"
                    stroke="#4f46e5"
                    fillOpacity={1}
                    fill="url(#colorEmails)"
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorClicks)"
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#f59e0b"
                    fillOpacity={1}
                    fill="url(#colorLeads)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Types Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Campaign Distribution</CardTitle>
            <CardDescription>
              Breakdown of campaign types and their relative proportion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={campaignTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {campaignTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
