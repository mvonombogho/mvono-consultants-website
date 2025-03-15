"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  PauseCircle,
  Plus,
  Filter,
  ChevronDown,
  Briefcase,
  BarChart3,
  List,
  Calendar as CalendarIcon,
  Search
} from 'lucide-react';
import Link from 'next/link';
import TaskList from './TaskList';
import ProjectTimeline from './ProjectTimeline';
import ProjectMetrics from './ProjectMetrics';

// Types
type Task = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  projectId: string;
};

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
  description: string;
  tasks: Task[];
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
    description: 'Comprehensive annual fire safety audit for Unga Group facilities in Nairobi.',
    tasks: [
      {
        id: '1-1',
        title: 'Initial facility inspection',
        description: 'Conduct a thorough inspection of all fire safety equipment',
        status: 'completed',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2023-05-20',
        projectId: '1'
      },
      {
        id: '1-2',
        title: 'Fire safety training for employees',
        description: 'Conduct fire safety training sessions for all employees',
        status: 'completed',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2023-06-15',
        projectId: '1'
      },
      {
        id: '1-3',
        title: 'Final report preparation',
        description: 'Compile all findings and prepare the final audit report',
        status: 'completed',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2023-06-25',
        projectId: '1'
      }
    ]
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
    description: 'Environmental impact assessment for proposed factory expansion in Mombasa.',
    tasks: [
      {
        id: '2-1',
        title: 'Site survey and baseline data collection',
        description: 'Conduct site survey and collect baseline environmental data',
        status: 'completed',
        priority: 'high',
        assignee: 'Emily Wong',
        dueDate: '2023-06-15',
        projectId: '2'
      },
      {
        id: '2-2',
        title: 'Community stakeholder meetings',
        description: 'Organize and conduct community stakeholder consultation meetings',
        status: 'completed',
        priority: 'medium',
        assignee: 'James Omondi',
        dueDate: '2023-07-05',
        projectId: '2'
      },
      {
        id: '2-3',
        title: 'Environmental modeling and analysis',
        description: 'Perform environmental impact modeling and analysis based on collected data',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Emily Wong',
        dueDate: '2023-07-25',
        projectId: '2'
      },
      {
        id: '2-4',
        title: 'Draft EIA report preparation',
        description: 'Prepare draft EIA report for client review',
        status: 'pending',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2023-08-10',
        projectId: '2'
      },
      {
        id: '2-5',
        title: 'Final submission to NEMA',
        description: 'Finalize report and submit to NEMA for approval',
        status: 'pending',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2023-08-30',
        projectId: '2'
      }
    ]
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
    description: 'Comprehensive energy efficiency audit for manufacturing facility.',
    tasks: [
      {
        id: '3-1',
        title: 'Energy consumption data collection',
        description: 'Collect historical energy consumption data from all facilities',
        status: 'completed',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2023-04-20',
        projectId: '3'
      },
      {
        id: '3-2',
        title: 'Equipment assessment',
        description: 'Assess all energy-consuming equipment and systems',
        status: 'completed',
        priority: 'high',
        assignee: 'Daniel Kimani',
        dueDate: '2023-05-05',
        projectId: '3'
      },
      {
        id: '3-3',
        title: 'Efficiency analysis and recommendations',
        description: 'Analyze data and develop energy efficiency recommendations',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Daniel Kimani',
        dueDate: '2023-05-20',
        projectId: '3'
      },
      {
        id: '3-4',
        title: 'Financial impact assessment',
        description: 'Calculate ROI and financial implications of recommended measures',
        status: 'blocked',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2023-06-05',
        projectId: '3'
      }
    ]
  }
];

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'list' | 'timeline' | 'metrics'>('list');
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Initialize data
  useEffect(() => {
    // Simulate API call
    const timeout = setTimeout(() => {
      setProjects(mockProjects);
      setSelectedProject(mockProjects[0]);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // GSAP animations
  useEffect(() => {
    if (!isLoading && headerRef.current && contentRef.current) {
      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      
      // Animate content
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [isLoading, view, selectedProject]);
  
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
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div 
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold">Project Management</h1>
          <p className="text-gray-500 mt-1">Track and manage project tasks, timelines, and deliverables</p>
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
      
      {/* Project Selection and View Options */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-64">
            <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Project
            </label>
            <div className="relative">
              <select
                id="project-select"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedProject?.id || ''}
                onChange={(e) => {
                  const selected = projects.find(p => p.id === e.target.value);
                  if (selected) setSelectedProject(selected);
                }}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1 ${
                view === 'list' 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <List className="h-4 w-4" />
              <span>Tasks</span>
            </button>
            <button
              onClick={() => setView('timeline')}
              className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1 ${
                view === 'timeline' 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Timeline</span>
            </button>
            <button
              onClick={() => setView('metrics')}
              className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1 ${
                view === 'metrics' 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Metrics</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Project Details */}
      {selectedProject && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedProject.title}</h2>
                <div className="mt-1">
                  <Link href={`/admin/clients/${selectedProject.clientId}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                    {selectedProject.clientName}
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm text-gray-500">Total Value</div>
                  <div className="text-lg font-medium">{formatCurrency(selectedProject.totalValue)}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusInfo(selectedProject.status).color}`}>
                    {getStatusInfo(selectedProject.status).icon}
                    <span>{selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Progress</div>
                  <div className="text-lg font-medium">{selectedProject.completionPercentage}%</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-1">Timeline</div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                <span>
                  {formatDate(selectedProject.startDate)} {selectedProject.endDate ? ` - ${formatDate(selectedProject.endDate)}` : ' - Ongoing'}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-1">Description</div>
              <p className="text-gray-700">{selectedProject.description}</p>
            </div>
          </div>
          
          {/* Project Content View */}
          <div ref={contentRef} className="p-6">
            {view === 'list' && (
              <TaskList tasks={selectedProject.tasks} projectId={selectedProject.id} />
            )}
            
            {view === 'timeline' && (
              <ProjectTimeline project={selectedProject} />
            )}
            
            {view === 'metrics' && (
              <ProjectMetrics project={selectedProject} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
