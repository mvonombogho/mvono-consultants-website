"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, FileText, CreditCard, BarChart, Briefcase } from 'lucide-react';
import InvoiceCard from './InvoiceCard';
import ClientCard from './ClientCard';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClients: 0,
    activeProjects: 0,
    pendingInvoices: 0,
    revenueThisMonth: 0,
    totalRevenue: 0,
  });
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);
  const [recentClients, setRecentClients] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard stats
        const statsResponse = await fetch('/api/dashboard/stats');
        const statsData = await statsResponse.json();
        setStats(statsData);
        
        // Fetch recent invoices
        const invoicesResponse = await fetch('/api/invoices?limit=5');
        const invoicesData = await invoicesResponse.json();
        setRecentInvoices(invoicesData.invoices || []);
        
        // Fetch recent clients
        const clientsResponse = await fetch('/api/clients?limit=4');
        const clientsData = await clientsResponse.json();
        setRecentClients(clientsData.clients || []);
        
        // Fetch recent activities
        const activitiesResponse = await fetch('/api/dashboard/activities');
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData.activities || []);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setIsLoading(false);
      }
    };
    
    // Simulate API calls for now
    setTimeout(() => {
      setStats({
        totalClients: 48,
        activeProjects: 12,
        pendingInvoices: 15,
        revenueThisMonth: 450000,
        totalRevenue: 3250000,
      });
      
      setRecentInvoices([
        {
          id: '1',
          invoiceNumber: 'INV-202303-001',
          issueDate: '2023-03-15',
          dueDate: '2023-04-15',
          totalAmount: 125000,
          status: 'paid',
          client: { id: '1', name: 'Unga Group' },
          project: { id: '1', title: 'Fire Safety Audit' },
        },
        {
          id: '2',
          invoiceNumber: 'INV-202303-002',
          issueDate: '2023-03-20',
          dueDate: '2023-04-20',
          totalAmount: 85000,
          status: 'sent',
          client: { id: '2', name: 'Dormans Coffee' },
          project: null,
        },
        {
          id: '3',
          invoiceNumber: 'INV-202304-001',
          issueDate: '2023-04-05',
          dueDate: '2023-05-05',
          totalAmount: 150000,
          status: 'overdue',
          client: { id: '3', name: 'Radisson Blu' },
          project: { id: '3', title: 'Energy Audit' },
        },
      ]);
      
      setRecentClients([
        {
          id: '4',
          name: 'Line Plast',
          industry: 'Manufacturing',
          email: 'info@lineplast.com',
          phone: '+254712345678',
          contactPerson: 'John Doe',
          stats: {
            totalInvoices: 3,
            totalProjects: 2,
            totalRevenue: 250000,
            pendingPayments: 85000,
          },
        },
        {
          id: '5',
          name: 'Tata Chemicals',
          industry: 'Chemical',
          email: 'contact@tatachemicals.co.ke',
          phone: '+254723456789',
          contactPerson: 'Jane Smith',
          stats: {
            totalInvoices: 5,
            totalProjects: 3,
            totalRevenue: 450000,
            pendingPayments: 0,
          },
        },
      ]);
      
      setActivities([
        {
          id: '1',
          type: 'invoice_created',
          description: 'New invoice created',
          details: 'Invoice #INV-2023042-001 for Unga Group - KSh 125,000',
          timestamp: '2023-04-12T10:30:00Z',
        },
        {
          id: '2',
          type: 'payment_received',
          description: 'Payment received',
          details: 'KSh 150,000 from Radisson Blu for invoice #INV-202303-003',
          timestamp: '2023-04-11T14:45:00Z',
        },
        {
          id: '3',
          type: 'client_added',
          description: 'New client added',
          details: 'Line Plast added to client database',
          timestamp: '2023-04-10T09:15:00Z',
        },
        {
          id: '4',
          type: 'project_completed',
          description: 'Project completed',
          details: 'Energy Audit for Tata Chemicals',
          timestamp: '2023-04-08T16:30:00Z',
        },
        {
          id: '5',
          type: 'invoice_overdue',
          description: 'Invoice overdue',
          details: 'Invoice #INV-202302-005 for KTDA is 7 days overdue',
          timestamp: '2023-04-07T08:00:00Z',
        },
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Format activity timestamp
  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Activity icon mapping
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'invoice_created':
      case 'invoice_overdue':
        return <FileText className="text-blue-500" size={16} />;
      case 'payment_received':
        return <CreditCard className="text-green-500" size={16} />;
      case 'client_added':
        return <Users className="text-purple-500" size={16} />;
      case 'project_completed':
      case 'project_started':
        return <Briefcase className="text-yellow-500" size={16} />;
      default:
        return <BarChart className="text-gray-500" size={16} />;
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h3 className="text-2xl font-bold">
                  {stats.revenueThisMonth.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </h3>
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
      
      {/* Recent Activity & Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 divide-y">
              {activities.map((activity) => (
                <div key={activity.id} className="pt-4 first:pt-0 pb-4 last:pb-0">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-full mr-3 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatActivityTime(activity.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link href="/admin/activity" className="text-sm text-blue-600 hover:text-blue-800">
              View all activity →
            </Link>
          </div>
        </div>
        
        {/* Recent Clients & Invoices */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Clients */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Clients</h2>
              <Link href="/admin/clients/new" className="text-sm text-blue-600 hover:text-blue-800">
                + Add New
              </Link>
            </div>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {recentClients.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            )}
            <div className="mt-4 pt-2">
              <Link href="/admin/clients" className="text-sm text-blue-600 hover:text-blue-800">
                View all clients →
              </Link>
            </div>
          </div>
          
          {/* Recent Invoices */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Invoices</h2>
              <Link href="/admin/invoices/new" className="text-sm text-blue-600 hover:text-blue-800">
                + Create Invoice
              </Link>
            </div>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentInvoices.map((invoice) => (
                  <InvoiceCard key={invoice.id} invoice={invoice} />
                ))}
              </div>
            )}
            <div className="mt-4 pt-2">
              <Link href="/admin/invoices" className="text-sm text-blue-600 hover:text-blue-800">
                View all invoices →
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/admin/clients/new" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="font-medium">Add New Client</p>
          </Link>
          <Link href="/admin/invoices/new" className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg transition-colors text-center">
            <FileText className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <p className="font-medium">Create Invoice</p>
          </Link>
          <Link href="/admin/projects/new" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors text-center">
            <Briefcase className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="font-medium">Start Project</p>
          </Link>
          <Link href="/admin/reports" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg transition-colors text-center">
            <BarChart className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="font-medium">Generate Report</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
