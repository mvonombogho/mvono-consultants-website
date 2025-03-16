'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { FiPlus, FiFilter, FiCheck, FiClock, FiAlertCircle, FiXCircle, FiFlag, FiCalendar, FiUser } from 'react-icons/fi';

// Mock data for tasks - would be fetched from API in production
const TASKS = [
  {
    id: 1,
    title: 'Initial client consultation',
    description: 'Conduct initial meeting with client to understand requirements and expectations.',
    status: 'completed',
    priority: 'high',
    dueDate: '2025-03-10',
    assignee: 'Donald Mbogho',
    projectId: 1
  },
  {
    id: 2,
    title: 'Site assessment planning',
    description: 'Prepare logistics and team allocation for on-site safety assessment.',
    status: 'completed',
    priority: 'high',
    dueDate: '2025-03-12',
    assignee: 'Jane Muthoni',
    projectId: 1
  },
  {
    id: 3,
    title: 'On-site safety inspection',
    description: 'Conduct comprehensive safety inspection at client location.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-03-18',
    assignee: 'Donald Mbogho',
    projectId: 1
  },
  {
    id: 4,
    title: 'Preliminary report drafting',
    description: 'Begin compilation of findings from site inspection.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-03-22',
    assignee: 'James Odhiambo',
    projectId: 1
  },
  {
    id: 5,
    title: 'Equipment calibration verification',
    description: 'Verify calibration certificates for all safety equipment.',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-03-25',
    assignee: 'Jane Muthoni',
    projectId: 1
  },
  {
    id: 6,
    title: 'Worker interviews',
    description: 'Conduct interviews with key personnel about safety practices.',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-03-26',
    assignee: 'Donald Mbogho',
    projectId: 1
  },
  {
    id: 7,
    title: 'Documentation review',
    description: 'Review all safety documentation and previous audit records.',
    status: 'blocked',
    priority: 'high',
    dueDate: '2025-03-20',
    assignee: 'James Odhiambo',
    projectId: 1,
    blockReason: 'Awaiting document access from client'
  },
  {
    id: 8,
    title: 'Final report preparation',
    description: 'Compile comprehensive safety assessment report with recommendations.',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-03-30',
    assignee: 'Donald Mbogho',
    projectId: 1
  }
];

const TaskList = ({ project }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    // Fetch tasks from API in production
    // For now, using mock data filtered by project ID
    const projectTasks = TASKS.filter(task => task.projectId === project.id);
    setTasks(projectTasks);
    setFilteredTasks(projectTasks);
    
    // Animation for task list
    gsap.from('.task-item', {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    });
  }, [project]);

  useEffect(() => {
    // Apply filters
    let result = tasks;
    
    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(term) || 
        task.description.toLowerCase().includes(term) ||
        task.assignee.toLowerCase().includes(term)
      );
    }
    
    setFilteredTasks(result);
    
    // Animation for filtered tasks
    gsap.from('.task-item', {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    });
  }, [tasks, statusFilter, priorityFilter, searchTerm]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheck className="text-green-500" />;
      case 'in-progress':
        return <FiClock className="text-blue-500" />;
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      case 'blocked':
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const getPriorityFlag = (priority) => {
    switch (priority) {
      case 'high':
        return <FiFlag className="text-red-500" />;
      case 'medium':
        return <FiFlag className="text-yellow-500" />;
      case 'low':
        return <FiFlag className="text-blue-500" />;
      default:
        return <FiFlag className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getTaskMetrics = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    
    const completionPercentage = total ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, inProgress, pending, blocked, completionPercentage };
  };

  const metrics = getTaskMetrics();

  return (
    <div className="task-list">
      {/* Task metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{metrics.total}</span>
          <span className="text-sm text-gray-500">Total Tasks</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-green-600">{metrics.completed}</span>
          <span className="text-sm text-green-500">Completed</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">{metrics.inProgress}</span>
          <span className="text-sm text-blue-500">In Progress</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-yellow-600">{metrics.pending}</span>
          <span className="text-sm text-yellow-500">Pending</span>
        </div>
        <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-red-600">{metrics.blocked}</span>
          <span className="text-sm text-red-500">Blocked</span>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
          <select
            className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 flex items-center gap-2 transition-colors"
            onClick={() => setShowAddTask(true)}
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <FiAlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-gray-500">No tasks found</h3>
            <p className="text-gray-400 mt-1">
              {tasks.length ? "Try adjusting your filters" : "Start by adding your first task"}
            </p>
            {!tasks.length && (
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 mx-auto transition-colors"
                onClick={() => setShowAddTask(true)}
              >
                <FiPlus className="w-4 h-4" />
                <span>Add First Task</span>
              </button>
            )}
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="task-item bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityFlag(task.priority)}
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">{task.priority}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{task.description}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiUser className="w-3 h-3" />
                  <span>{task.assignee}</span>
                </div>
                {task.blockReason && (
                  <div className="flex items-center gap-1 text-red-500">
                    <FiAlertCircle className="w-3 h-3" />
                    <span>{task.blockReason}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add task modal would go here */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => setShowAddTask(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            {/* Add task form would go here */}
            <p className="text-gray-600 mb-4">Task creation form would be implemented here with fields for title, description, assignee, status, priority, etc.</p>
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setShowAddTask(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
