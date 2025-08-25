'use client'

import { useState, useEffect } from 'react'
import { Plus, Download, Eye } from 'lucide-react'

export default function FinancialManagement() {
  const [invoices, setInvoices] = useState([])
  const [expenses, setExpenses] = useState([])
  const [clients, setClients] = useState([])
  const [activeTab, setActiveTab] = useState('invoices')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [newInvoice, setNewInvoice] = useState({
    clientId: '',
    invoiceNumber: '',
    lpoReference: '',
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    tax: 16,
    notes: ''
  })

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0]
  })

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    pendingPayments: 0,
    netProfit: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Mock data for now - replace with real API calls
      setInvoices([
        { _id: '1', invoiceNumber: 'INV-001', clientId: '1', total: 50000, status: 'pending', createdAt: new Date() }
      ])
      setExpenses([
        { _id: '1', description: 'Office Supplies', amount: 5000, category: 'Office', date: new Date() }
      ])
      setClients([
        { _id: '1', name: 'Sample Client', email: 'client@example.com' }
      ])
      setStats({
        totalRevenue: 250000,
        totalExpenses: 50000,
        pendingPayments: 75000,
        netProfit: 200000
      })
    } catch (error) {
      console.error('Error fetching financial data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Financial Management
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Track invoices, expenses, and financial performance
            </p>
          </div>
        </div>

        {/* Financial Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">KSh {stats.totalRevenue?.toLocaleString() || 0}</dd>
                  </dl>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                    <dd className="text-lg font-medium text-gray-900">KSh {stats.totalExpenses?.toLocaleString() || 0}</dd>
                  </dl>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
                    <dd className="text-lg font-medium text-gray-900">KSh {stats.pendingPayments?.toLocaleString() || 0}</dd>
                  </dl>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Net Profit</dt>
                    <dd className={`text-lg font-medium ${stats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      KSh {stats.netProfit?.toLocaleString() || 0}
                    </dd>
                  </dl>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${stats.netProfit >= 0 ? 'bg-blue-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                    <div className={`w-4 h-4 ${stats.netProfit >= 0 ? 'bg-blue-500' : 'bg-red-500'} rounded-full`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Management System</h3>
          <p className="text-gray-600">
            This is the foundation of your financial management system. Features will be implemented in phases:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
            <li>Invoice generation and tracking</li>
            <li>Expense management</li>
            <li>Client payment tracking</li>
            <li>Financial reporting and analytics</li>
            <li>Tax calculations and reporting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
