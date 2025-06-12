'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FaPlus, 
  FaSearch, 
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaClipboardCheck,
  FaFileInvoice
} from 'react-icons/fa'

// Mock project data
const mockProjects = [
  {
    id: '1',
    title: 'Fire Safety Audit',
    client: 'Lafarge',
    startDate: '2025-02-10',
    endDate: '2025-03-15',
    status: 'in-progress',
    lead: 'James Kariuki',
    value: 120000,
    completion: 65,
  },
  {
    id: '2',
    title: 'Occupational Safety Risk Assessment',
    client: 'KTDA',
    startDate: '2025-01-20',
    endDate: '2025-02-28',
    status: 'completed',
    lead: 'Alice Wambui',
    value: 85000,
    completion: 100,
  },
  {
    id: '3',
    title: 'Environmental Impact Assessment',
    client: 'Dormans Coffee',
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    status: 'planned',
    lead: 'James Kariuki',
    value: 220000,
    completion: 0,
  },
  {
    id: '4',
    title: 'Energy Audit',
    client: 'Radisson Blu',
    startDate: '2025-02-15',
    endDate: '2025-03-20',
    status: 'in-progress',
    lead: 'Susan Kamau',
    value: 150000,
    completion: 40,
  },
  {
    id: '5',
    title: 'Pressure Vessel Inspection',
    client: 'National Cement',
    startDate: '2025-02-05',
    endDate: '2025-02-15',
    status: 'completed',
    lead: 'Kevin Maina',
    value: 65000,
    completion: 100,
  },
]

// Project leads
const projectLeads = [
  'All Leads',
  'James Kariuki',
  'Alice Wambui',
  'Susan Kamau',
  'Kevin Maina'
]

export default function ProjectsPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [leadFilter, setLeadFilter] = useState('All Leads')
  
  // Filter projects
  const filteredProjects = mockProjects.filter(project => {
    // Search filter
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Status filter
    const matchesStatus = !statusFilter || project.status === statusFilter
    
    // Lead filter
    const matchesLead = leadFilter === 'All Leads' || project.lead === leadFilter
    
    return matchesSearch && matchesStatus && matchesLead
  })
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  
  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'planned':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  // Format status text
  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <Link 
          href="/admin/projects/new"
          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <FaPlus className="mr-2" />
          New Project
        </Link>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
          </div>
          
          {/* Lead Filter */}
          <div className="relative">
            <select
              value={leadFilter}
              onChange={(e) => setLeadFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none"
            >
              {projectLeads.map((lead, index) => (
                <option key={index} value={lead}>{lead}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">{project.title}</h2>
                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(project.status)}`}>
                  {formatStatus(project.status)}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{project.client}</p>
            </div>
            
            <div className="px-6 py-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Start</span>
                <span className="text-sm text-gray-500">End</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium text-gray-900">{formatDate(project.startDate)}</span>
                <span className="text-sm font-medium text-gray-900">{formatDate(project.endDate)}</span>
              </div>
              
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-gray-500">Completion</span>
                <span className="text-sm font-medium text-gray-900">{project.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className={`${project.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'} h-2.5 rounded-full`}
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between mb-4">
                <div>
                  <span className="text-sm text-gray-500 block">Project Lead</span>
                  <span className="text-sm font-medium text-gray-900">{project.lead}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 block">Value</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(project.value)}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
              <Link 
                href={`/admin/projects/${project.id}`}
                className="text-primary-600 hover:text-primary-800 transition-colors"
                title="View Details"
              >
                <FaEye />
              </Link>
              <Link 
                href={`/admin/projects/${project.id}/edit`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit Project"
              >
                <FaEdit />
              </Link>
              <Link 
                href={`/admin/projects/${project.id}/tasks`}
                className="text-yellow-600 hover:text-yellow-800 transition-colors"
                title="Manage Tasks"
              >
                <FaClipboardCheck />
              </Link>
              <Link 
                href={`/admin/projects/${project.id}/invoices`}
                className="text-green-600 hover:text-green-800 transition-colors"
                title="View Invoices"
              >
                <FaFileInvoice />
              </Link>
              <button 
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete Project"
                onClick={() => window.confirm('Are you sure you want to delete this project?')}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">No projects found matching your search criteria.</p>
          <button 
            onClick={() => {
              setSearchQuery('')
              setStatusFilter('')
              setLeadFilter('All Leads')
            }}
            className="text-primary-600 hover:text-primary-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
