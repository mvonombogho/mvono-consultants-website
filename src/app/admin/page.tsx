'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FaUsers, 
  FaFileInvoiceDollar, 
  FaBusinessTime, 
  FaClipboardList,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa'

// Dashboard stats cards (mock data)
const statsCards = [
  {
    title: 'Total Clients',
    value: 45,
    icon: <FaUsers size={24} className="text-blue-600" />,
    change: '+12%',
    trend: 'up',
    link: '/admin/clients',
  },
  {
    title: 'Active Projects',
    value: 23,
    icon: <FaClipboardList size={24} className="text-green-600" />,
    change: '+8%',
    trend: 'up',
    link: '/admin/projects',
  },
  {
    title: 'Monthly Revenue',
    value: 'KSh 850,000',
    icon: <FaFileInvoiceDollar size={24} className="text-yellow-600" />,
    change: '-3%',
    trend: 'down',
    link: '/admin/finance',
  },
  {
    title: 'Completed Services',
    value: 108,
    icon: <FaBusinessTime size={24} className="text-purple-600" />,
    change: '+15%',
    trend: 'up',
    link: '/admin/projects',
  },
]

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

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Mvono Consultants admin dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statsCards.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className="p-2 rounded-full bg-gray-50">
                {card.icon}
              </div>
            </div>
            <div className="flex items-center">
              <span 
                className={`text-sm font-medium mr-2 ${
                  card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {card.change}
              </span>
              {card.trend === 'up' ? (
                <FaArrowUp size={12} className="text-green-600" />
              ) : (
                <FaArrowDown size={12} className="text-red-600" />
              )}
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
            <div className="mt-4">
              <Link 
                href={card.link}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Tasks</h2>
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
    </div>
  )
}
