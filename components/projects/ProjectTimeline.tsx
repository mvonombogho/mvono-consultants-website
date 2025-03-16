'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut, FiCalendar } from 'react-icons/fi';

// Reusing the mock task data from TaskList component
const TASKS = [
  {
    id: 1,
    title: 'Initial client consultation',
    description: 'Conduct initial meeting with client to understand requirements and expectations.',
    status: 'completed',
    priority: 'high',
    startDate: '2025-03-08',
    dueDate: '2025-03-10',
    assignee: 'Donald Mbogho',
    projectId: 1,
    color: '#4ade80' // green for completed
  },
  {
    id: 2,
    title: 'Site assessment planning',
    description: 'Prepare logistics and team allocation for on-site safety assessment.',
    status: 'completed',
    priority: 'high',
    startDate: '2025-03-10',
    dueDate: '2025-03-12',
    assignee: 'Jane Muthoni',
    projectId: 1,
    color: '#4ade80' // green for completed
  },
  {
    id: 3,
    title: 'On-site safety inspection',
    description: 'Conduct comprehensive safety inspection at client location.',
    status: 'in-progress',
    priority: 'high',
    startDate: '2025-03-15',
    dueDate: '2025-03-18',
    assignee: 'Donald Mbogho',
    projectId: 1,
    color: '#60a5fa' // blue for in-progress
  },
  {
    id: 4,
    title: 'Preliminary report drafting',
    description: 'Begin compilation of findings from site inspection.',
    status: 'in-progress',
    priority: 'medium',
    startDate: '2025-03-19',
    dueDate: '2025-03-22',
    assignee: 'James Odhiambo',
    projectId: 1,
    color: '#60a5fa' // blue for in-progress
  },
  {
    id: 5,
    title: 'Equipment calibration verification',
    description: 'Verify calibration certificates for all safety equipment.',
    status: 'pending',
    priority: 'medium',
    startDate: '2025-03-23',
    dueDate: '2025-03-25',
    assignee: 'Jane Muthoni',
    projectId: 1,
    color: '#facc15' // yellow for pending
  },
  {
    id: 6,
    title: 'Worker interviews',
    description: 'Conduct interviews with key personnel about safety practices.',
    status: 'pending',
    priority: 'medium',
    startDate: '2025-03-23',
    dueDate: '2025-03-26',
    assignee: 'Donald Mbogho',
    projectId: 1,
    color: '#facc15' // yellow for pending
  },
  {
    id: 7,
    title: 'Documentation review',
    description: 'Review all safety documentation and previous audit records.',
    status: 'blocked',
    priority: 'high',
    startDate: '2025-03-18',
    dueDate: '2025-03-20',
    assignee: 'James Odhiambo',
    projectId: 1,
    color: '#f87171', // red for blocked
    blockReason: 'Awaiting document access from client'
  },
  {
    id: 8,
    title: 'Final report preparation',
    description: 'Compile comprehensive safety assessment report with recommendations.',
    status: 'pending',
    priority: 'high',
    startDate: '2025-03-28',
    dueDate: '2025-03-30',
    assignee: 'Donald Mbogho',
    projectId: 1,
    color: '#facc15' // yellow for pending
  }
];

const ProjectTimeline = ({ project }) => {
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2025-03-01'));
  const [endDate, setEndDate] = useState(new Date('2025-04-01'));
  const [zoomLevel, setZoomLevel] = useState(2); // 1=days, 2=weeks, 3=months
  const [showTaskDetails, setShowTaskDetails] = useState(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Fetch tasks from API in production
    // For now, using mock data filtered by project ID
    const projectTasks = TASKS.filter(task => task.projectId === project.id);
    setTasks(projectTasks);
    
    // Calculate appropriate date range based on tasks
    if (projectTasks.length > 0) {
      const taskStartDates = projectTasks.map(t => new Date(t.startDate));
      const taskEndDates = projectTasks.map(t => new Date(t.dueDate));
      
      const earliestDate = new Date(Math.min(...taskStartDates));
      const latestDate = new Date(Math.max(...taskEndDates));
      
      // Add padding to start and end dates
      earliestDate.setDate(earliestDate.getDate() - 5);
      latestDate.setDate(latestDate.getDate() + 5);
      
      setStartDate(earliestDate);
      setEndDate(latestDate);
    }
    
    // Animation for timeline
    gsap.from('.timeline-container', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    });
  }, [project]);

  // Helper function to generate dates for the timeline
  const generateTimelineDates = () => {
    const dates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      
      // Increment based on zoom level
      if (zoomLevel === 1) { // Days
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (zoomLevel === 2) { // Weeks
        currentDate.setDate(currentDate.getDate() + 7);
      } else { // Months
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }
    
    return dates;
  };

  // Navigate to previous or next time period
  const navigate = (direction) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    
    if (direction === 'prev') {
      if (zoomLevel === 1) { // Days
        newStartDate.setDate(newStartDate.getDate() - 10);
        newEndDate.setDate(newEndDate.getDate() - 10);
      } else if (zoomLevel === 2) { // Weeks
        newStartDate.setDate(newStartDate.getDate() - 28);
        newEndDate.setDate(newEndDate.getDate() - 28);
      } else { // Months
        newStartDate.setMonth(newStartDate.getMonth() - 2);
        newEndDate.setMonth(newEndDate.getMonth() - 2);
      }
    } else {
      if (zoomLevel === 1) { // Days
        newStartDate.setDate(newStartDate.getDate() + 10);
        newEndDate.setDate(newEndDate.getDate() + 10);
      } else if (zoomLevel === 2) { // Weeks
        newStartDate.setDate(newStartDate.getDate() + 28);
        newEndDate.setDate(newEndDate.getDate() + 28);
      } else { // Months
        newStartDate.setMonth(newStartDate.getMonth() + 2);
        newEndDate.setMonth(newEndDate.getMonth() + 2);
      }
    }
    
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    
    // Animation for updating timeline
    gsap.from('.timeline-dates, .timeline-task', {
      opacity: 0.5,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Change zoom level
  const zoom = (level) => {
    if (level < 1) level = 1;
    if (level > 3) level = 3;
    
    setZoomLevel(level);
    
    // Adjust date range based on new zoom level
    const range = calculateDateRange(level);
    setStartDate(range.start);
    setEndDate(range.end);
    
    // Animation for zoom effect
    gsap.fromTo('.timeline-container', 
      { scale: zoomLevel > level ? 1.05 : 0.95, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  };

  // Calculate appropriate date range for zoom level
  const calculateDateRange = (level) => {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);
    
    if (level === 1) { // Days - show 2 weeks
      start.setDate(start.getDate() - 7);
      end.setDate(end.getDate() + 7);
    } else if (level === 2) { // Weeks - show 2 months
      start.setDate(start.getDate() - 30);
      end.setDate(end.getDate() + 30);
    } else { // Months - show 6 months
      start.setMonth(start.getMonth() - 3);
      end.setMonth(end.getMonth() + 3);
    }
    
    return { start, end };
  };

  // Format date for display
  const formatDate = (date, zoomLevel) => {
    if (zoomLevel === 1) { // Days
      return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).format(date);
    } else if (zoomLevel === 2) { // Weeks
      return `Week ${getWeekNumber(date)}`;
    } else { // Months
      return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
    }
  };

  // Get week number
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  // Calculate task position and width in the timeline
  const getTaskPosition = (task) => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.dueDate);
    
    const timelineStart = new Date(startDate);
    const timelineEnd = new Date(endDate);
    
    const totalDays = (timelineEnd - timelineStart) / (1000 * 60 * 60 * 24);
    
    // Calculate task start position (% from left)
    let leftPos = ((taskStart - timelineStart) / (1000 * 60 * 60 * 24)) / totalDays * 100;
    if (leftPos < 0) leftPos = 0;
    if (leftPos > 100) leftPos = 100;
    
    // Calculate task width (% of total width)
    let taskDays = (taskEnd - taskStart) / (1000 * 60 * 60 * 24) + 1; // +1 to include end date
    let widthPercentage = (taskDays / totalDays) * 100;
    
    // Ensure the task has a minimum visible width
    if (widthPercentage < 2) widthPercentage = 2;
    
    // Ensure task doesn't exceed timeline
    if (leftPos + widthPercentage > 100) {
      widthPercentage = 100 - leftPos;
    }
    
    return {
      left: `${leftPos}%`,
      width: `${widthPercentage}%`
    };
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const timelineDates = generateTimelineDates();

  return (
    <div className="timeline-wrapper bg-white rounded-lg">
      {/* Timeline controls */}
      <div className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded-lg">
        <div className="flex gap-2">
          <button
            onClick={() => navigate('prev')}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Previous period"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Next period"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-sm font-medium text-gray-700">
          {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(startDate)}
          {' — '}
          {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(endDate)}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => zoom(zoomLevel - 1)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Zoom out"
            disabled={zoomLevel <= 1}
          >
            <FiZoomOut className={`w-5 h-5 ${zoomLevel <= 1 ? 'text-gray-400' : ''}`} />
          </button>
          <button
            onClick={() => zoom(zoomLevel + 1)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Zoom in"
            disabled={zoomLevel >= 3}
          >
            <FiZoomIn className={`w-5 h-5 ${zoomLevel >= 3 ? 'text-gray-400' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Timeline container */}
      <div className="timeline-container overflow-x-auto">
        <div className="min-w-full" ref={timelineRef}>
          {/* Timeline header with dates */}
          <div className="timeline-dates flex border-b border-gray-200 pb-2 relative">
            {timelineDates.map((date, index) => (
              <div 
                key={index}
                className={`text-center flex-1 text-xs ${isToday(date) ? 'font-bold text-blue-600' : 'text-gray-500'}`}
              >
                {formatDate(date, zoomLevel)}
              </div>
            ))}
            
            {/* Today indicator line */}
            <div 
              className="absolute top-0 bottom-0 w-px bg-blue-500"
              style={{
                left: (() => {
                  const today = new Date();
                  const timelineStart = new Date(startDate);
                  const timelineEnd = new Date(endDate);
                  
                  if (today < timelineStart || today > timelineEnd) return '-9999px';
                  
                  const totalDays = (timelineEnd - timelineStart) / (1000 * 60 * 60 * 24);
                  const daysPassed = (today - timelineStart) / (1000 * 60 * 60 * 24);
                  
                  return `${(daysPassed / totalDays) * 100}%`;
                })()
              }}
            />
          </div>
          
          {/* Timeline grid */}
          <div className="relative bg-gray-50 rounded-b-lg pb-2 pt-2" style={{ height: '400px' }}>
            {/* Background grid lines */}
            <div className="absolute top-0 bottom-0 left-0 right-0 flex">
              {timelineDates.map((_, index) => (
                <div key={index} className="flex-1 border-r border-gray-200 h-full" />
              ))}
            </div>
            
            {/* Status-based swimlanes */}
            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col h-full">
              {['completed', 'in-progress', 'pending', 'blocked'].map((status, idx) => (
                <div 
                  key={status} 
                  className={`flex-1 border-b border-gray-200 ${idx === 0 ? 'border-t' : ''}`}
                >
                  <div className="pl-2 py-1 text-xs font-medium capitalize sticky left-0 bg-gray-50">
                    {status}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tasks */}
            {tasks.map((task) => {
              const position = getTaskPosition(task);
              const swimlaneIndex = ['completed', 'in-progress', 'pending', 'blocked'].indexOf(task.status);
              const swimlaneHeight = 400 / 4; // Four status swimlanes
              const topPosition = swimlaneIndex * swimlaneHeight + swimlaneHeight / 2 - 12; // Center in swimlane
              
              return (
                <div
                  key={task.id}
                  className="timeline-task absolute cursor-pointer rounded-md z-10 flex items-center pl-2 pr-2 h-6 whitespace-nowrap overflow-hidden text-xs font-medium shadow-sm hover:shadow transition-shadow"
                  style={{
                    left: position.left,
                    width: position.width,
                    top: topPosition + 'px',
                    backgroundColor: task.color,
                    color: task.status === 'completed' || task.status === 'blocked' ? 'white' : 'rgba(0,0,0,0.7)'
                  }}
                  onClick={() => setShowTaskDetails(task)}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -2,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      duration: 0.2
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      duration: 0.2
                    });
                  }}
                >
                  {task.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Task details popup */}
      {showTaskDetails && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={() => setShowTaskDetails(null)}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-full h-1 rounded-t-lg mb-4`} style={{ backgroundColor: showTaskDetails.color }} />
            <h3 className="text-xl font-bold mb-2">{showTaskDetails.title}</h3>
            <p className="text-gray-600 mb-4">{showTaskDetails.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Status:</span>
                <span className="ml-2 font-medium capitalize">{showTaskDetails.status}</span>
              </div>
              <div>
                <span className="text-gray-500">Priority:</span>
                <span className="ml-2 font-medium capitalize">{showTaskDetails.priority}</span>
              </div>
              <div>
                <span className="text-gray-500">Start Date:</span>
                <span className="ml-2 font-medium">{new Date(showTaskDetails.startDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Due Date:</span>
                <span className="ml-2 font-medium">{new Date(showTaskDetails.dueDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Assignee:</span>
                <span className="ml-2 font-medium">{showTaskDetails.assignee}</span>
              </div>
            </div>
            
            {showTaskDetails.blockReason && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                <span className="text-red-700 font-medium">Blocked: </span>
                <span className="text-red-600">{showTaskDetails.blockReason}</span>
              </div>
            )}
            
            <div className="flex justify-end">
              <button 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                onClick={() => setShowTaskDetails(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTimeline;
