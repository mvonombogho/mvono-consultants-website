import Link from 'next/link';

export const metadata = {
  title: 'Dashboard - Mvono Consultants',
  description: 'Administration dashboard for Mvono Consultants',
};

// Mock data for the dashboard
const stats = [
  { label: 'Total Clients', value: '126', change: '+12%', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ) },
  { label: 'Active Projects', value: '24', change: '+5%', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ) },
  { label: 'Monthly Revenue', value: 'KES 1.2M', change: '+18%', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) },
  { label: 'Upcoming Tasks', value: '38', change: '-7%', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ) },
];

const quickLinks = [
  { name: 'Analytics', description: 'View detailed performance metrics', href: '/dashboard/analytics', color: 'bg-blue-500', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ) },
  { name: 'Client Statements', description: 'Manage client statements and invoices', href: '/dashboard/statements', color: 'bg-emerald-500', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ) },
  { name: 'Create Invoice', description: 'Generate a new invoice for a client', href: '/dashboard/invoices/create', color: 'bg-purple-500', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ) },
  { name: 'Add Client', description: 'Register a new client in the system', href: '/dashboard/clients/create', color: 'bg-amber-500', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ) },
];

// Recent activity data
const recentActivity = [
  { 
    id: 1, 
    type: 'invoice',
    title: 'Invoice #INV-2023-119 Generated', 
    description: 'Invoice for Lafarge - Environmental Impact Assessment',
    amount: 'KES 320,000',
    date: 'Today at 9:41 AM' 
  },
  { 
    id: 2, 
    type: 'payment',
    title: 'Payment Received', 
    description: 'Payment from Unga Group for Invoice #INV-2023-112',
    amount: 'KES 245,000',
    date: 'Yesterday at 4:23 PM' 
  },
  { 
    id: 3, 
    type: 'client',
    title: 'New Client Added', 
    description: 'Saint Gobain added as a new client',
    date: 'Yesterday at 11:15 AM' 
  },
  { 
    id: 4, 
    type: 'project',
    title: 'Project Completed', 
    description: 'Fire Safety Audit for Dormans Coffee marked as complete',
    date: 'Mar 12, 2025' 
  },
  { 
    id: 5, 
    type: 'invoice',
    title: 'Invoice #INV-2023-115 Generated', 
    description: 'Invoice for KTDA - Statutory Inspection services',
    amount: 'KES 180,000',
    date: 'Mar 11, 2025' 
  },
];

// Upcoming tasks data
const upcomingTasks = [
  { 
    id: 1, 
    title: 'Complete Energy Audit Report', 
    client: 'Radisson Blu',
    dueDate: 'Mar 16, 2025',
    priority: 'high'
  },
  { 
    id: 2, 
    title: 'Follow up on Unpaid Invoices', 
    client: 'Multiple Clients',
    dueDate: 'Mar 17, 2025',
    priority: 'medium'
  },
  { 
    id: 3, 
    title: 'Schedule Fire Safety Inspection', 
    client: 'Welding Alloys',
    dueDate: 'Mar 18, 2025',
    priority: 'medium'
  },
  { 
    id: 4, 
    title: 'Submit Compliance Documents', 
    client: 'Lafarge',
    dueDate: 'Mar 20, 2025',
    priority: 'high'
  },
];

export default function DashboardHomePage() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back, Donald! Here's what's happening today.</p>
        </div>
        
        <div className="flex space-x-3">
          <Link 
            href="/dashboard/reports/create" 
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Report
          </Link>
          
          <Link 
            href="/dashboard/invoices/create" 
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Invoice
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-slate-100">
                <div className="text-slate-700">
                  {stat.icon}
                </div>
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <Link 
              key={index}
              href={link.href}
              className="group bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                {link.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">{link.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Recent Activity and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
          </div>
          
          <div className="divide-y divide-slate-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-medium text-slate-800">{activity.title}</h3>
                  <span className="text-xs text-slate-500">{activity.date}</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                
                {activity.amount && (
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-full">
                    {activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
            <Link href="/dashboard/activity" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View all activity
            </Link>
          </div>
        </div>
        
        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Upcoming Tasks</h2>
          </div>
          
          <div className="divide-y divide-slate-100">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-grow">
                    <h3 className="text-base font-medium text-slate-800">{task.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{task.client}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-500">Due: {task.dueDate}</span>
                    <span className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
            <Link href="/dashboard/tasks" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View all tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
