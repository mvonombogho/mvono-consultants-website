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
