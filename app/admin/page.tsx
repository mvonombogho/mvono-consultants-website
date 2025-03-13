"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, FileText, CreditCard, BarChart, Buildings, Calendar, Settings, Briefcase } from 'lucide-react';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClients: 0,
    activeProjects: 0,
    pendingInvoices: 0,
    revenueThisMonth: 0
  });
  
  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would be replaced with actual API calls in production
      setStats({
        totalClients: 48,
        activeProjects: 12,
        pendingInvoices: 15,
        revenueThisMonth: 450000
      });
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-blue-900 text-white w-64 min-h-screen flex flex-col fixed">
          <div className="p-5 border-b border-blue-800">
            <h2 className="text-xl font-bold">Mvono Admin</h2>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/admin" className="flex items-center px-4 py-3 bg-blue-800 rounded-lg">
                  <BarChart className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/clients" className="flex items-center px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
                  <Users className="mr-3 h-5 w-5" />
                  Clients
                </Link>
              </li>
              <li>
                <Link href="/admin/projects" className="flex items-center px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
                  <Briefcase className="mr-3 h-5 w-5" />
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/admin/invoices" className="flex items-center px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
                  <FileText className="mr-3 h-5 w-5" />
                  Invoices
                </Link>
              </li>
              <li>
                <Link href="/admin/finance" className="flex items-center px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
                  <CreditCard className="mr-3 h-5 w-5" />
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/admin/subcontractors" className="flex items-center px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
                  <Buildings className="mr-3 h-5 w-5" />
                  Subcontractors
                </Link>
              </li>
              <li>
                <Link href="/admin/calendar" className="flex items-center px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
                  <Calendar className="mr-3 h-5 w-5" />
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" className="flex items-center px-4 py-3 hover:bg-blue-800 rounded-lg transition-colors">
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-blue-800">
            <p className="text-sm">Logged in as Admin</p>
            <button className="mt-2 text-blue-300 hover:text-white transition-colors">
              Sign Out
            </button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="ml-64 flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Clients */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Clients</p>
                  {isLoading ? (
                    <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-2xl font-bold">{stats.totalClients}</h3>
                  )}
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admin/clients" className="text-sm text-blue-600 hover:text-blue-800">
                  View all clients →
                </Link>
              </div>
            </div>
            
            {/* Active Projects */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Projects</p>
                  {isLoading ? (
                    <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-2xl font-bold">{stats.activeProjects}</h3>
                  )}
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admin/projects" className="text-sm text-blue-600 hover:text-blue-800">
                  View all projects →
                </Link>
              </div>
            </div>
            
            {/* Pending Invoices */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Invoices</p>
                  {isLoading ? (
                    <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-2xl font-bold">{stats.pendingInvoices}</h3>
                  )}
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admin/invoices" className="text-sm text-blue-600 hover:text-blue-800">
                  View all invoices →
                </Link>
              </div>
            </div>
            
            {/* Revenue This Month */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Revenue This Month</p>
                  {isLoading ? (
                    <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-2xl font-bold">KSh {stats.revenueThisMonth.toLocaleString()}</h3>
                  )}
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admin/finance" className="text-sm text-blue-600 hover:text-blue-800">
                  View financials →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 divide-y">
                  <div className="pb-3">
                    <p className="font-medium">New invoice created</p>
                    <p className="text-sm text-gray-500">Invoice #INV-2023-042 for Unga Group - 15 minutes ago</p>
                  </div>
                  <div className="py-3">
                    <p className="font-medium">Project status updated</p>
                    <p className="text-sm text-gray-500">Fire Safety Audit for Dormans Coffee - 1 hour ago</p>
                  </div>
                  <div className="py-3">
                    <p className="font-medium">Payment received</p>
                    <p className="text-sm text-gray-500">KSh 150,000 from Radisson Blu - 3 hours ago</p>
                  </div>
                  <div className="py-3">
                    <p className="font-medium">New client added</p>
                    <p className="text-sm text-gray-500">Line Plast added to client database - 1 day ago</p>
                  </div>
                  <div className="pt-3">
                    <p className="font-medium">Project completed</p>
                    <p className="text-sm text-gray-500">Energy Audit for Tata Chemicals - 2 days ago</p>
                  </div>
                </div>
              )}
              <div className="mt-4">
                <Link href="/admin/activity" className="text-sm text-blue-600 hover:text-blue-800">
                  View all activity →
                </Link>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/clients/new" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="font-medium">Add New Client</p>
                </Link>
                <Link href="/admin/invoices/new" className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg transition-colors">
                  <FileText className="h-6 w-6 text-yellow-600 mb-2" />
                  <p className="font-medium">Create Invoice</p>
                </Link>
                <Link href="/admin/projects/new" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors">
                  <Briefcase className="h-6 w-6 text-green-600 mb-2" />
                  <p className="font-medium">Start Project</p>
                </Link>
                <Link href="/admin/reports" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg transition-colors">
                  <BarChart className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="font-medium">Generate Report</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
