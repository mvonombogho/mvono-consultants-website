"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  BarChart3, 
  PieChart, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Pause, 
  CalendarDays,
  TrendingUp,
  DollarSign,
  Users,
  Target
} from 'lucide-react';
import { 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';

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

type ProjectMetricsProps = {
  project: Project;
};

export default function ProjectMetrics({ project }: ProjectMetricsProps) {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [priorityData, setPriorityData] = useState<any[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [assigneeData, setAssigneeData] = useState<any[]>([]);
  
  // Calculate metrics data on component mount
  useEffect(() => {
    // Calculate task status distribution
    const statusCounts = {
      pending: 0,
      'in-progress': 0,
      completed: 0,
      blocked: 0
    };
    
    project.tasks.forEach(task => {
      if (statusCounts[task.status] !== undefined) {
        statusCounts[task.status]++;
      }
    });
    
    setStatusData([
      { name: 'Pending', value: statusCounts.pending, color: '#FBBF24' },
      { name: 'In Progress', value: statusCounts['in-progress'], color: '#3B82F6' },
      { name: 'Completed', value: statusCounts.completed, color: '#10B981' },
      { name: 'Blocked', value: statusCounts.blocked, color: '#EF4444' }
    ]);
    
    // Calculate task priority distribution
    const priorityCounts = {
      urgent: 0,
      high: 0,
      medium: 0,
      low: 0
    };
    
    project.tasks.forEach(task => {
      priorityCounts[task.priority]++;
    });
    
    setPriorityData([
      { name: 'Urgent', value: priorityCounts.urgent, color: '#DC2626' },
      { name: 'High', value: priorityCounts.high, color: '#F97316' },
      { name: 'Medium', value: priorityCounts.medium, color: '#3B82F6' },
      { name: 'Low', value: priorityCounts.low, color: '#10B981' }
    ]);
    
    // Calculate completion timeline (simplified example with mock data)
    // In a real app, you would use actual progress tracking data over time
    const projectStart = new Date(project.startDate);
    const projectedEnd = project.endDate ? new Date(project.endDate) : new Date();
    
    // Create weekly data points between start and end dates
    const timeline = [];
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const totalWeeks = Math.max(1, Math.ceil((projectedEnd.getTime() - projectStart.getTime()) / msPerWeek));
    
    // Generate completion percentage over time
    for (let i = 0; i <= totalWeeks; i++) {
      const date = new Date(projectStart.getTime() + (i * msPerWeek));
      const week = `Week ${i + 1}`;
      
      // Model the completion with a simple growth function
      // In a real app, this would be actual historical data
      let actualPercentage = Math.min(100, project.completionPercentage * (i / totalWeeks) * 1.1);
      let plannedPercentage = Math.min(100, (i / totalWeeks) * 100);
      
      // After the current date, use projections
      const currentDate = new Date();
      if (date > currentDate) {
        actualPercentage = null; // No actual data for future dates
      }
      
      timeline.push({
        name: week,
        date: date.toISOString().split('T')[0],
        actual: actualPercentage,
        planned: plannedPercentage
      });
    }
    
    setTimelineData(timeline);
    
    // Calculate tasks by assignee
    const assigneeCounts = {};
    
    project.tasks.forEach(task => {
      if (!assigneeCounts[task.assignee]) {
        assigneeCounts[task.assignee] = {
          name: task.assignee,
          total: 0,
          completed: 0,
          pending: 0,
          'in-progress': 0,
          blocked: 0
        };
      }
      
      assigneeCounts[task.assignee].total++;
      assigneeCounts[task.assignee][task.status]++;
    });
    
    setAssigneeData(Object.values(assigneeCounts));
  }, [project]);
  
  // Apply GSAP animations
  useEffect(() => {
    if (metricsRef.current) {
      // Animate charts sequentially
      const charts = metricsRef.current.querySelectorAll('.chart-container');
      
      gsap.fromTo(
        charts,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 0.6, 
          ease: "power2.out" 
        }
      );
      
      // Animate metrics cards
      const cards = metricsRef.current.querySelectorAll('.metric-card');
      
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          stagger: 0.1, 
          duration: 0.5, 
          delay: 0.3,
          ease: "back.out(1.2)" 
        }
      );
    }
  }, [statusData, priorityData, timelineData, assigneeData]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Calculate days remaining
  const calculateDaysRemaining = (): number | null => {
    if (!project.endDate) return null;
    
    const endDate = new Date(project.endDate);
    const today = new Date();
    
    // If project is already completed/past due date
    if (today > endDate) return 0;
    
    // Calculate days difference
    const diffTime = Math.abs(endDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Calculate days elapsed since project start
  const calculateDaysElapsed = (): number => {
    const startDate = new Date(project.startDate);
    const today = new Date();
    
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Calculate completion rate (percentage completed per day)
  const calculateCompletionRate = (): number => {
    const daysElapsed = calculateDaysElapsed();
    return daysElapsed > 0 ? (project.completionPercentage / daysElapsed) : 0;
  };
  
  // Format percentage
  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };
  
  // Custom tooltip for timeline chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded-md">
          <p className="text-gray-900 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value !== null ? `${entry.value.toFixed(1)}%` : 'N/A'}`}
            </p>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  const daysRemaining = calculateDaysRemaining();
  const daysElapsed = calculateDaysElapsed();
  const completionRate = calculateCompletionRate();
  
  return (
    <div ref={metricsRef} className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completion Percentage */}
        <div className="bg-white rounded-lg shadow p-4 metric-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion</p>
              <p className="text-2xl font-bold text-gray-900">{project.completionPercentage}%</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${project.completionPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Project Cost/Value */}
        <div className="bg-white rounded-lg shadow p-4 metric-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Project Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(project.totalValue)}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Cost per task: {formatCurrency(project.totalValue / Math.max(1, project.tasks.length))}
          </p>
        </div>
        
        {/* Timeline */}
        <div className="bg-white rounded-lg shadow p-4 metric-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Timeline</p>
              <p className="text-2xl font-bold text-gray-900">
                {daysRemaining !== null ? `${daysRemaining} days left` : 'Ongoing'}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <CalendarDays className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {daysElapsed} days elapsed
          </p>
        </div>
        
        {/* Completion Rate */}
        <div className="bg-white rounded-lg shadow p-4 metric-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{formatPercentage(completionRate)}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Per day
          </p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6 chart-container">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Task Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {statusData.map((status, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: status.color }}
                ></div>
                <span className="text-sm text-gray-600">{status.name}: {status.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Priority Distribution */}
        <div className="bg-white rounded-lg shadow p-6 chart-container">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Task Priority Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={priorityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Tasks">
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Completion Timeline */}
        <div className="bg-white rounded-lg shadow p-6 chart-container">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Project Completion Timeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#9333EA" 
                  strokeWidth={2}
                  name="Planned" 
                  dot={{ r: 4 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Actual" 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Tasks by Assignee */}
        <div className="bg-white rounded-lg shadow p-6 chart-container">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Tasks by Assignee</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={assigneeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" name="Completed" fill="#10B981" />
                <Bar dataKey="in-progress" stackId="a" name="In Progress" fill="#3B82F6" />
                <Bar dataKey="pending" stackId="a" name="Pending" fill="#FBBF24" />
                <Bar dataKey="blocked" stackId="a" name="Blocked" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Task Breakdown Summary */}
      {project.tasks.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 chart-container">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visualization
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statusData.map((status, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${status.color}20` }}>
                          {status.name === 'Pending' && <Clock className="h-5 w-5" style={{ color: status.color }} />}
                          {status.name === 'In Progress' && <Clock className="h-5 w-5" style={{ color: status.color }} />}
                          {status.name === 'Completed' && <CheckCircle className="h-5 w-5" style={{ color: status.color }} />}
                          {status.name === 'Blocked' && <Pause className="h-5 w-5" style={{ color: status.color }} />}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{status.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {status.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(status.value / project.tasks.length * 100).toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${(status.value / project.tasks.length * 100)}%`,
                            backgroundColor: status.color 
                          }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
