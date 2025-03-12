'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FaUsers, 
  FaFileInvoiceDollar, 
  FaBusinessTime, 
  FaClipboardList,
  FaArrowUp,
  FaArrowDown,
  FaSpinner
} from 'react-icons/fa'

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    type: 'invoice',
    title: 'Invoice #INV-2025-011 Created',
    client: 'Lafarge',
    amount: 'KSh 120,000',
    date: '12 Mar 2025',
  },
  {
    id: 2,
    type: 'project',
    title: 'Fire Safety Audit Completed',
    client: 'Dormans Coffee',
    amount: 'KSh 85,000',
    date: '10 Mar 2025',
  },
  {
    id: 3,
    type: 'client',
    title: 'New Client Added',
    client: 'National Cement',
    amount: '',
    date: '08 Mar 2025',
  },
  {
    id: 4,
    type: 'payment',
    title: 'Payment Received',
    client: 'KTDA',
    amount: 'KSh 230,000',
    date: '05 Mar 2025',
  },
  {
    id: 5,
    type: 'project',
    title: 'Energy Audit Scheduled',
    client: 'Unga Group',
    amount: 'KSh 155,000',
    date: '03 Mar 2025',
  },
]

// Mock upcoming tasks
const upcomingTasks = [
  {
    id: 1,
    title: 'Complete Fire Safety Audit Report',
    client: 'Tata Chemicals',
    dueDate: '15 Mar 2025',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Follow-up: Energy Audit Proposal',
    client: 'Radisson Blu',
    dueDate: '16 Mar 2025',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Statutory Inspection: Pressure Vessels',
    client: 'Autosprings',
    dueDate: '18 Mar 2025',
    priority: 'high',
  },
  {
    id: 4,
    title: 'Client Meeting: Safety Implementation',
    client: 'Alpine Coolers',
    dueDate: '20 Mar 2025',
    priority: 'medium',
  },
]

// Dashboard stats type
interface DashboardStats {
  totalClients: number
  clientsByIndustry: {
    industry: string
    _count: number
  }[]
  newClients: number
  growthRate: number
}

export default function AdminDashboard() {
  const [clientStats, setClientStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`
  }
  
  // Load client statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/clients/stats')
        if (!response.ok) {
          throw new Error(`Failed to fetch client stats: ${response.statusText}`)
        }
        
        const data = await response.json()
        setClientStats(data)
      } catch (error) {
        console.error('Error fetching client stats:', error)
        setError('Failed to load dashboard statistics')
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])
  
  // Mock financial data
  const financialStats = {
    revenueGrowth: 15.2,
    averageInvoiceValue: 145000,
    activeProjects: 23,
    completedServices: 108
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Mvono Consultants admin dashboard</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-primary-600 text-4xl" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-primary-600 hover:text-primary-800 transition-colors"
          >
            Reload Dashboard
          </button>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Total Clients */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {clientStats?.totalClients || 0}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-gray-50">
                  <FaUsers size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2 text-green-600">
                  +{clientStats?.newClients || 0} new
                </span>
                <FaArrowUp size={12} className="text-green-600" />
                <span className="text-sm text-gray-500 ml-2">in last 30 days</span>
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin/clients"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View All Clients
                </Link>
              </div>
            </div>
            
            {/* Active Projects */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{financialStats.activeProjects}</p>
                </div>
                <div className="p-2 rounded-full bg-gray-50">
                  <FaClipboardList size={24} className="text-green-600" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2 text-green-600">+8%</span>
                <FaArrowUp size={12} className="text-green-600" />
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin/projects"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View Projects
                </Link>
              </div>
            </div>
            
            {/* Monthly Revenue */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">KSh 850,000</p>
                </div>
                <div className="p-2 rounded-full bg-gray-50">
                  <FaFileInvoiceDollar size={24} className="text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2 text-red-600">-3%</span>
                <FaArrowDown size={12} className="text-red-600" />
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin/finance"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View Finances
                </Link>
              </div>
            </div>
            
            {/* Completed Services */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Completed Services</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{financialStats.completedServices}</p>
                </div>
                <div className="p-2 rounded-full bg-gray-50">
                  <FaBusinessTime size={24} className="text-purple-600" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2 text-green-600">+15%</span>
                <FaArrowUp size={12} className="text-green-600" />
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin/projects?status=completed"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-4">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <span className="text-sm text-gray-500">{activity.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{activity.client}</span>
                      {activity.amount && (
                        <span className="text-sm font-medium text-gray-700">{activity.amount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link 
                  href="/admin/activities"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View All Activities
                </Link>
              </div>
            </div>
            
            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h2>
              <div className="divide-y">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="py-4">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium text-gray-800">{task.title}</h4>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{task.client}</span>
                      <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link 
                  href="/admin/tasks"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  View All Tasks
                </Link>
              </div>
            </div>
          </div>
          
          {/* Client Industry Breakdown */}
          {clientStats?.clientsByIndustry && clientStats.clientsByIndustry.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Client Industry Breakdown</h2>
              
              <div className="space-y-4">
                {clientStats.clientsByIndustry.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">{item.industry || 'Unknown'}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round((item._count / clientStats.totalClients) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(item._count / clientStats.totalClients) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
