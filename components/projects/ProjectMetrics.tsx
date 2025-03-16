'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

// Mock data for project metrics - would be fetched from API in production
const TASK_STATUS_DATA = [
  { name: 'Completed', value: 16, color: '#4ade80' },  // green
  { name: 'In Progress', value: 24, color: '#60a5fa' }, // blue
  { name: 'Pending', value: 12, color: '#facc15' },    // yellow
  { name: 'Blocked', value: 4, color: '#f87171' }      // red
];

const TASK_PRIORITY_DATA = [
  { name: 'High', value: 20, color: '#f87171' },  // red
  { name: 'Medium', value: 28, color: '#facc15' }, // yellow
  { name: 'Low', value: 8, color: '#60a5fa' }     // blue
];

const WEEKLY_PROGRESS_DATA = [
  { week: 'Week 1', completed: 4, added: 8 },
  { week: 'Week 2', completed: 6, added: 5 },
  { week: 'Week 3', completed: 10, added: 6 },
  { week: 'Week 4', completed: 8, added: 3 },
  { week: 'Week 5', completed: 12, added: 2 },
  { week: 'Week 6', completed: 6, added: 0 }
];

const ASSIGNEE_WORKLOAD = [
  { name: 'Donald Mbogho', total: 14, completed: 8, inProgress: 4, pending: 2, blocked: 0 },
  { name: 'Jane Muthoni', total: 10, completed: 4, inProgress: 2, pending: 3, blocked: 1 },
  { name: 'James Odhiambo', total: 12, completed: 2, inProgress: 3, pending: 5, blocked: 2 },
  { name: 'Paul Otieno', total: 8, completed: 2, inProgress: 1, pending: 4, blocked: 1 },
  { name: 'Sarah Wanjiru', total: 6, completed: 0, inProgress: 2, pending: 4, blocked: 0 }
];

const RISK_FACTORS = [
  { name: 'Schedule Delay', risk: 65 },
  { name: 'Resource Constraint', risk: 40 },
  { name: 'Client Response', risk: 30 },
  { name: 'Technical Issues', risk: 55 },
  { name: 'Documentation', risk: 25 }
];

const ProjectMetrics = ({ project }) => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // Animation for page load
    gsap.from('.metrics-section', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    });
  }, []);

  // Animation for switching sections
  useEffect(() => {
    gsap.from('.metrics-container', {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      ease: "power2.out"
    });
  }, [activeSection]);

  // Calculate project duration in days
  const calculateProjectDuration = () => {
    const startDate = new Date('2025-03-08');
    const endDate = new Date('2025-03-30');
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const endDate = new Date('2025-03-30');
    const today = new Date();
    const diffTime = Math.abs(endDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate project completion percentage
  const calculateCompletionPercentage = () => {
    const totalTasks = TASK_STATUS_DATA.reduce((acc, item) => acc + item.value, 0);
    const completedTasks = TASK_STATUS_DATA.find(item => item.name === 'Completed')?.value || 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  // Format number with commas for thousands
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const renderTaskStatusChart = () => {
    return (
      <div className="metrics-section bg-white rounded-lg shadow-sm p-5 mb-5">
        <h3 className="text-lg font-semibold mb-4">Task Status Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={TASK_STATUS_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {TASK_STATUS_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, name]} 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {TASK_STATUS_DATA.map((status, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 mr-2 rounded" style={{ backgroundColor: status.color }}></div>
              <div>
                <div className="text-xs text-gray-500">{status.name}</div>
                <div className="font-medium">{status.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTaskPriorityChart = () => {
    return (
      <div className="metrics-section bg-white rounded-lg shadow-sm p-5 mb-5">
        <h3 className="text-lg font-semibold mb-4">Task Priority Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={TASK_PRIORITY_DATA}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip 
                formatter={(value, name, props) => [value, 'Tasks']} 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} 
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {TASK_PRIORITY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderWeeklyProgressChart = () => {
    return (
      <div className="metrics-section bg-white rounded-lg shadow-sm p-5 mb-5">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={WEEKLY_PROGRESS_DATA}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} 
              />
              <Legend />
              <Area type="monotone" dataKey="completed" stackId="1" stroke="#4ade80" fill="#4ade80" />
              <Area type="monotone" dataKey="added" stackId="2" stroke="#60a5fa" fill="#60a5fa" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderAssigneeWorkloadChart = () => {
    return (
      <div className="metrics-section bg-white rounded-lg shadow-sm p-5 mb-5">
        <h3 className="text-lg font-semibold mb-4">Assignee Workload</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ASSIGNEE_WORKLOAD}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} 
              />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#4ade80" name="Completed" />
              <Bar dataKey="inProgress" stackId="a" fill="#60a5fa" name="In Progress" />
              <Bar dataKey="pending" stackId="a" fill="#facc15" name="Pending" />
              <Bar dataKey="blocked" stackId="a" fill="#f87171" name="Blocked" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderRiskFactorsChart = () => {
    return (
      <div className="metrics-section bg-white rounded-lg shadow-sm p-5 mb-5">
        <h3 className="text-lg font-semibold mb-4">Risk Factors</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={RISK_FACTORS}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Risk Level (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Risk Level']} 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} 
              />
              <Bar dataKey="risk" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderSummaryCards = () => {
    const completionPercentage = calculateCompletionPercentage();
    const daysRemaining = calculateDaysRemaining();
    const projectDuration = calculateProjectDuration();
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="metrics-section bg-white rounded-lg shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Project Completion</h3>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold">{completionPercentage}%</div>
            <div className="text-sm text-gray-500 mb-1">complete</div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="metrics-section bg-white rounded-lg shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Time Remaining</h3>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold">{daysRemaining}</div>
            <div className="text-sm text-gray-500 mb-1">days left</div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${100 - ((daysRemaining / projectDuration) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="metrics-section bg-white rounded-lg shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Tasks</h3>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold">56</div>
            <div className="text-sm text-gray-500 mb-1">tasks</div>
          </div>
          <div className="mt-2 flex gap-1 text-xs">
            <div className="bg-green-500 text-white px-2 py-1 rounded">
              16 completed
            </div>
            <div className="bg-blue-500 text-white px-2 py-1 rounded">
              24 in progress
            </div>
            <div className="bg-yellow-500 text-white px-2 py-1 rounded">
              12 pending
            </div>
            <div className="bg-red-500 text-white px-2 py-1 rounded">
              4 blocked
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMetricsNav = () => {
    const navItems = [
      { id: 'overview', label: 'Overview' },
      { id: 'tasks', label: 'Tasks' },
      { id: 'resources', label: 'Resources' },
      { id: 'risks', label: 'Risks' }
    ];
    
    return (
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`py-3 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeSection === item.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderMetricsNav()}
      
      <div className="metrics-container">
        {activeSection === 'overview' && (
          <>
            {renderSummaryCards()}
            {renderTaskStatusChart()}
            {renderWeeklyProgressChart()}
          </>
        )}
        
        {activeSection === 'tasks' && (
          <>
            {renderTaskStatusChart()}
            {renderTaskPriorityChart()}
            {renderWeeklyProgressChart()}
          </>
        )}
        
        {activeSection === 'resources' && (
          <>
            {renderAssigneeWorkloadChart()}
            <div className="metrics-section bg-white rounded-lg shadow-sm p-5 mb-5">
              <h3 className="text-lg font-semibold mb-4">Resource Allocation</h3>
              <p className="text-gray-500 mb-4">Detailed resource allocation data would be shown here including team members, equipment, and other resources utilized in the project.</p>
              <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
                Resource allocation details would be implemented here based on actual project data.
              </div>
            </div>
          </>
        )}
        
        {activeSection === 'risks' && (
          <>
            {renderRiskFactorsChart()}
            <div className="metrics-section bg-white rounded-lg shadow-sm p-5 mb-5">
              <h3 className="text-lg font-semibold mb-4">Risk Management Plan</h3>
              <p className="text-gray-500 mb-4">Detailed risk management strategies and mitigation plans would be shown here for each identified risk factor.</p>
              <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
                Risk management plan details would be implemented here based on actual project data.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectMetrics;
