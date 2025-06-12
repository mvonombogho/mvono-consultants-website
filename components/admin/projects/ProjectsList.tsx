"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Calendar, Users, Briefcase, ArrowUpRight, Clock, CheckCircle, AlertCircle, XCircle, PauseCircle } from 'lucide-react';

// Types
type Project = {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  startDate: string;
  endDate: string | null;
  status: 'active' | 'completed' | 'cancelled' | 'on-hold';
  totalValue: number;
  completionPercentage: number;
  subcontractors: {
    id: string;
    name: string;
  }[];
};

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Annual Fire Safety Audit',
    clientId: '101',
    clientName: 'Unga Group',
    startDate: '2023-05-15',
    endDate: '2023-06-30',
    status: 'completed',
    totalValue: 250000,
    completionPercentage: 100,
    subcontractors: [
      { id: '201', name: 'FireTech Solutions' },
    ],
  },
  {
    id: '2',
    title: 'Environmental Impact Assessment',
    clientId: '102',
    clientName: 'Tata Chemicals',
    startDate: '2023-06-01',
    endDate: null,
    status: 'active',
    totalValue: 380000,
    completionPercentage: 65,
    subcontractors: [
      { id: '202', name: 'EcoSystems Consultants' },
      { id: '203', name: 'GreenTech Analysis' },
    ],
  },
  {
    id: '3',
    title: 'Energy Efficiency Audit',
    clientId: '103',
    clientName: 'Dormans Coffee',
    startDate: '2023-04-10',
    endDate: null,
    status: 'on-hold',
    totalValue: 320000,
    completionPercentage: 40,
    subcontractors: [],
  },
  {
    id: '4',
    title: 'Occupational Safety Training',
    clientId: '104',
    clientName: 'Radisson Blu',
    startDate: '2023-06-20',
    endDate: null,
    status: 'active',
    totalValue: 180000,
    completionPercentage: 25,
    subcontractors: [
      { id: '204', name: 'SafetyFirst Trainers' },
    ],
  },
  {
    id: '5',
    title: 'Statutory Equipment Inspection',
    clientId: '105',
    clientName: 'KTDA',
    startDate: '2023-05-05',
    endDate: null,
    status: 'cancelled',
    totalValue: 290000,
    completionPercentage: 10,
    subcontractors: [],
  },
];

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Initialize data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter projects based on search and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Get status badge color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <Clock className="h-4 w-4 text-green-600 mr-1" />
        };
      case 'completed':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
        };
      case 'on-hold':
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: <PauseCircle className="h-4 w-4 text-yellow-600 mr-1" />
        };
      case 'cancelled':
        return { 
          color: 'bg-red-100 text-red-800',
          icon: <XCircle className="h-4 w-4 text-red-600 mr-1" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <AlertCircle className="h-4 w-4 text-gray-600 mr-1" />
        };
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-500 mt-1">Manage and track all client projects</p>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/admin/projects/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Link>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects or clients..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex-shrink-0 w-full md:w-48">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          [...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="flex justify-between items-center mb-4">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
            </div>
          ))
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-4">No projects match your current filters or search criteria.</p>
            <Link 
              href="/admin/projects/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Start a New Project</span>
            </Link>
          </div>
        ) : (
          // Project cards
          filteredProjects.map((project) => {
            const { color, icon } = getStatusInfo(project.status);
            
            return (
              <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{project.title}</h3>
                  <Link href={`/admin/clients/${project.clientId}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    {project.clientName}
                  </Link>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
                      {icon}
                      <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(project.totalValue)}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{project.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${project.status === 'active' ? 'bg-blue-600' : project.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}`}
                        style={{ width: `${project.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {formatDate(project.startDate)} {project.endDate ? ` - ${formatDate(project.endDate)}` : ''}
                    </span>
                  </div>
                  
                  {project.subcontractors.length > 0 && (
                    <div className="mt-2 flex items-start text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1 mt-0.5" />
                      <div>
                        <span className="text-xs font-medium">Subcontractors: </span>
                        <span>{project.subcontractors.map(sc => sc.name).join(', ')}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <Link 
                    href={`/admin/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Project Status Summary */}
      {!isLoading && filteredProjects.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Status Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['active', 'completed', 'on-hold', 'cancelled'].map((status) => {
              const count = projects.filter(p => p.status === status).length;
              const { color, icon } = getStatusInfo(status);
              
              return (
                <div key={status} className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color.split(' ')[0]}`}>
                    {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6' })}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{status.charAt(0).toUpperCase() + status.slice(1)}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
