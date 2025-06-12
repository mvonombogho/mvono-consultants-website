"use client";

import Link from "next/link";

export default function Dashboard() {
  // Mock data for financial summary
  const financialSummary = {
    totalInvoiced: 579000,
    totalPaid: 145000,
    totalOverdue: 174000,
    totalOutstanding: 260000,
  };

  // Recent invoices
  const recentInvoices = [
    {
      id: '1',
      invoiceNumber: 'INV-2025-0001',
      client: 'Lafarge',
      date: '2025-05-01',
      amount: 145000,
      status: 'paid'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-0002',
      client: 'Alpine Coolers',
      date: '2025-05-05',
      amount: 87000,
      status: 'sent'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-0003',
      client: 'KTDA',
      date: '2025-05-10',
      amount: 266800,
      status: 'viewed'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2025-0004',
      client: 'Unga Group',
      date: '2025-04-15',
      amount: 174000,
      status: 'overdue'
    },
  ];

  // Upcoming projects
  const upcomingProjects = [
    {
      id: '1',
      name: 'Lafarge Annual Safety Audit',
      client: 'Lafarge',
      startDate: '2025-06-15',
      endDate: '2025-06-30',
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'KTDA Energy Efficiency Implementation',
      client: 'KTDA',
      startDate: '2025-07-01',
      endDate: '2025-08-15',
      status: 'scheduled'
    },
    {
      id: '3',
      name: 'Alpine Coolers Equipment Certification',
      client: 'Alpine Coolers',
      startDate: '2025-05-25',
      endDate: '2025-05-26',
      status: 'upcoming'
    },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return `KES ${new Intl.NumberFormat('en-KE').format(amount)}`;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusColors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      viewed: 'bg-purple-100 text-purple-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-orange-100 text-orange-800',
      scheduled: 'bg-cyan-100 text-cyan-800',
      upcoming: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-emerald-100 text-emerald-800',
    };

    const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800';
    const label = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Financial summary */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">Financial Summary</h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total invoiced */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <span className="text-green-600 text-2xl">💰</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Invoiced
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {formatCurrency(financialSummary.totalInvoiced)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Total paid */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <span className="text-blue-600 text-2xl">✓</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Paid
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {formatCurrency(financialSummary.totalPaid)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Outstanding */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <span className="text-yellow-600 text-2xl">⏳</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Outstanding
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {formatCurrency(financialSummary.totalOutstanding)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Overdue */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                    <span className="text-red-600 text-2xl">⚠️</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Overdue
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {formatCurrency(financialSummary.totalOverdue)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Invoices</h2>
            <Link href="/dashboard/invoices">
              <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </span>
            </Link>
          </div>
          <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {recentInvoices.map((invoice) => (
                <li key={invoice.id}>
                  <Link href={`/dashboard/invoices/${invoice.id}`}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-blue-600 truncate">
                              {invoice.invoiceNumber}
                            </p>
                            <p className="ml-2 text-sm text-gray-500">
                              - {invoice.client}
                            </p>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            {getStatusBadge(invoice.status)}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <span>
                                Issued on {formatDate(invoice.date)}
                              </span>
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p className="font-medium text-gray-900">
                              {formatCurrency(invoice.amount)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming Projects */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Projects</h2>
            <Link href="/dashboard/projects">
              <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </span>
            </Link>
          </div>
          <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {upcomingProjects.map((project) => (
                <li key={project.id}>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-blue-600 truncate">
                              {project.name}
                            </p>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            {getStatusBadge(project.status)}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <span>
                                Client: {project.client}
                              </span>
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              {formatDate(project.startDate)} - {formatDate(project.endDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/invoices/create">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <span className="text-blue-600 text-2xl">📄</span>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">Create Invoice</h3>
                      <p className="text-sm text-gray-500">Create a new invoice for a client</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/clients/create">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <span className="text-green-600 text-2xl">👥</span>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">Add Client</h3>
                      <p className="text-sm text-gray-500">Register a new client</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/projects/create">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <span className="text-purple-600 text-2xl">📋</span>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">New Project</h3>
                      <p className="text-sm text-gray-500">Start a new project or service</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
