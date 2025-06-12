"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Pause,
  Calendar, 
  Plus,
  ChevronDown,
  Search,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  User
} from 'lucide-react';

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

type TaskListProps = {
  tasks: Task[];
  projectId: string;
};

export default function TaskList({ tasks, projectId }: TaskListProps) {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const taskListRef = useRef<HTMLDivElement>(null);
  
  // Filter and sort tasks when any filter changes
  useEffect(() => {
    let result = [...tasks];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // Sort tasks
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'priority':
          const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'status':
          const statusOrder = { 'blocked': 0, 'pending': 1, 'in-progress': 2, 'completed': 3 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredTasks(result);
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortBy, sortDirection]);
  
  // Animate task list when tasks change
  useEffect(() => {
    if (taskListRef.current) {
      const taskItems = taskListRef.current.querySelectorAll('.task-item');
      
      gsap.fromTo(
        taskItems,
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, 
          duration: 0.4, 
          ease: "power2.out" 
        }
      );
    }
  }, [filteredTasks]);
  
  // Toggle sort direction or change sort field
  const handleSortClick = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Get status badge color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="h-4 w-4 text-yellow-600" />,
          text: 'Pending'
        };
      case 'in-progress':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="h-4 w-4 text-blue-600" />,
          text: 'In Progress'
        };
      case 'completed':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-4 w-4 text-green-600" />,
          text: 'Completed'
        };
      case 'blocked':
        return { 
          color: 'bg-red-100 text-red-800',
          icon: <Pause className="h-4 w-4 text-red-600" />,
          text: 'Blocked'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <AlertCircle className="h-4 w-4 text-gray-600" />,
          text: 'Unknown'
        };
    }
  };
  
  // Get priority badge color
  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { 
          color: 'bg-red-100 text-red-800',
          icon: <ArrowUp className="h-4 w-4 text-red-600" />,
          text: 'Urgent'
        };
      case 'high':
        return { 
          color: 'bg-orange-100 text-orange-800',
          icon: <ArrowUp className="h-4 w-4 text-orange-600" />,
          text: 'High'
        };
      case 'medium':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <ArrowDown className="h-4 w-4 text-blue-600" />,
          text: 'Medium'
        };
      case 'low':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <ArrowDown className="h-4 w-4 text-green-600" />,
          text: 'Low'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <ArrowDown className="h-4 w-4 text-gray-600" />,
          text: 'Unknown'
        };
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          
          {/* Priority Filter */}
          <div>
            <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={() => setIsNewTaskModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1 w-full md:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>
      
      {/* Task List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-4">
              {tasks.length === 0 
                ? "This project doesn't have any tasks yet." 
                : "No tasks match your current filters."}
            </p>
            <button
              onClick={() => {
                setIsNewTaskModalOpen(true);
                setSearchTerm('');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Create New Task</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('title')}
                  >
                    <div className="flex items-center">
                      <span>Task</span>
                      {sortBy === 'title' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('status')}
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      {sortBy === 'status' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('priority')}
                  >
                    <div className="flex items-center">
                      <span>Priority</span>
                      {sortBy === 'priority' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('dueDate')}
                  >
                    <div className="flex items-center">
                      <span>Due Date</span>
                      {sortBy === 'dueDate' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody ref={taskListRef} className="bg-white divide-y divide-gray-200">
                {filteredTasks.map(task => {
                  const statusInfo = getStatusInfo(task.status);
                  const priorityInfo = getPriorityInfo(task.priority);
                  const isDueSoon = new Date(task.dueDate).getTime() - new Date().getTime() < 86400000 * 3; // 3 days
                  const isPastDue = new Date(task.dueDate).getTime() < new Date().getTime();
                  
                  return (
                    <tr key={task.id} className="task-item hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-1">{statusInfo.text}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityInfo.color}`}>
                          {priorityInfo.icon}
                          <span className="ml-1">{priorityInfo.text}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${isPastDue ? 'text-red-600 font-medium' : isDueSoon ? 'text-orange-600' : 'text-gray-900'}`}>
                          {formatDate(task.dueDate)}
                          {isPastDue && <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Overdue</span>}
                          {isDueSoon && !isPastDue && <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">Soon</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{task.assignee}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => setEditingTask(task)}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Task Stats */}
      {tasks.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pending Tasks */}
            <div className="bg-yellow-50 rounded-lg p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'pending').length}</p>
              </div>
            </div>
            
            {/* In Progress Tasks */}
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'in-progress').length}</p>
              </div>
            </div>
            
            {/* Completed Tasks */}
            <div className="bg-green-50 rounded-lg p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'completed').length}</p>
              </div>
            </div>
            
            {/* Blocked Tasks */}
            <div className="bg-red-50 rounded-lg p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Pause className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Blocked</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'blocked').length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Task Modals would go here (skipped for brevity) */}
    </div>
  );
}
