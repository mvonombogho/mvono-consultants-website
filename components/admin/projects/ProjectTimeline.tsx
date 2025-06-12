"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Pause,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  User,
  ZoomIn,
  ZoomOut
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

type TimelineProps = {
  project: Project;
};

// Helper function to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper function to format date as Month Day
const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString('en-KE', {
    month: 'short',
    day: 'numeric'
  });
};

export default function ProjectTimeline({ project }: TimelineProps) {
  const [visibleDateRange, setVisibleDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [taskGroups, setTaskGroups] = useState<Record<string, Task[]>>({});
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Initialize visible date range
  useEffect(() => {
    const startDate = project.startDate ? new Date(project.startDate) : new Date();
    const endDate = project.endDate 
      ? new Date(project.endDate) 
      : addDays(startDate, 60); // Default to 60 days from start if no end date
    
    // Ensure the range covers at least 2 weeks
    const minEndDate = addDays(startDate, 14);
    const actualEndDate = endDate > minEndDate ? endDate : minEndDate;
    
    setVisibleDateRange([startDate, actualEndDate]);
    
    // Group tasks by status
    const groups: Record<string, Task[]> = {
      'pending': [],
      'in-progress': [],
      'completed': [],
      'blocked': []
    };
    
    project.tasks.forEach(task => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });
    
    setTaskGroups(groups);
  }, [project]);
  
  // Apply GSAP animations when timeline renders
  useEffect(() => {
    if (timelineRef.current) {
      // Animate timeline header
      gsap.fromTo(
        timelineRef.current.querySelector('.timeline-header'),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      
      // Animate timeline grid
      gsap.fromTo(
        timelineRef.current.querySelector('.timeline-grid'),
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
      
      // Animate timeline items
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      gsap.fromTo(
        timelineItems,
        { opacity: 0, y: 10, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          stagger: 0.05, 
          duration: 0.5, 
          delay: 0.3,
          ease: "back.out(1.2)" 
        }
      );
    }
  }, [visibleDateRange, taskGroups]);
  
  // Calculate the days in the visible range
  const getDaysInRange = (): Date[] => {
    const [start, end] = visibleDateRange;
    const days: Date[] = [];
    
    // Maximum 30 days to show at once
    const maxDays = 30;
    let currentDate = new Date(start);
    let daysToShow = Math.min(
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
      maxDays
    );
    
    for (let i = 0; i < daysToShow; i++) {
      days.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
    
    return days;
  };
  
  // Move the timeline backward
  const moveTimelineBackward = () => {
    const [start, end] = visibleDateRange;
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const newStart = addDays(start, -Math.floor(daysDiff / 2));
    const newEnd = addDays(end, -Math.floor(daysDiff / 2));
    setVisibleDateRange([newStart, newEnd]);
  };
  
  // Move the timeline forward
  const moveTimelineForward = () => {
    const [start, end] = visibleDateRange;
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const newStart = addDays(start, Math.floor(daysDiff / 2));
    const newEnd = addDays(end, Math.floor(daysDiff / 2));
    setVisibleDateRange([newStart, newEnd]);
  };
  
  // Expand the visible range
  const expandTimelineRange = () => {
    const [start, end] = visibleDateRange;
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Don't expand beyond 30 days
    if (daysDiff >= 30) return;
    
    const newStart = addDays(start, -Math.floor(daysDiff / 4));
    const newEnd = addDays(end, Math.floor(daysDiff / 4));
    setVisibleDateRange([newStart, newEnd]);
  };
  
  // Contract the visible range
  const contractTimelineRange = () => {
    const [start, end] = visibleDateRange;
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Don't contract below 7 days
    if (daysDiff <= 7) return;
    
    const newStart = addDays(start, Math.floor(daysDiff / 6));
    const newEnd = addDays(end, -Math.floor(daysDiff / 6));
    setVisibleDateRange([newStart, newEnd]);
  };
  
  // Check if a task falls within the visible date range
  const isTaskInVisibleRange = (task: Task): boolean => {
    const [start, end] = visibleDateRange;
    const taskDate = new Date(task.dueDate);
    return taskDate >= start && taskDate <= end;
  };
  
  // Calculate position for a task in the timeline
  const calculateTaskPosition = (task: Task): number => {
    const [start] = visibleDateRange;
    const days = getDaysInRange();
    const taskDate = new Date(task.dueDate);
    
    // Find index in days array
    for (let i = 0; i < days.length; i++) {
      if (days[i].getDate() === taskDate.getDate() && 
          days[i].getMonth() === taskDate.getMonth() && 
          days[i].getFullYear() === taskDate.getFullYear()) {
        return i;
      }
    }
    
    // Fallback to calculating based on time difference
    const daysSinceStart = Math.floor((taskDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(0, daysSinceStart), days.length - 1);
  };
  
  // Get styling for task based on status and priority
  const getTaskStyle = (task: Task) => {
    // Base styling
    const baseStyle = "px-2 py-1 rounded-md text-xs font-medium timeline-item";
    
    // Status-specific styling
    switch (task.status) {
      case 'pending':
        return `${baseStyle} bg-yellow-100 border border-yellow-300 text-yellow-800`;
      case 'in-progress':
        return `${baseStyle} bg-blue-100 border border-blue-300 text-blue-800`;
      case 'completed':
        return `${baseStyle} bg-green-100 border border-green-300 text-green-800`;
      case 'blocked':
        return `${baseStyle} bg-red-100 border border-red-300 text-red-800`;
      default:
        return `${baseStyle} bg-gray-100 border border-gray-300 text-gray-800`;
    }
  };
  
  // Get icon for task based on status
  const getTaskIcon = (task: Task) => {
    switch (task.status) {
      case 'pending':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'in-progress':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'completed':
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'blocked':
        return <Pause className="h-3 w-3 mr-1" />;
      default:
        return <AlertCircle className="h-3 w-3 mr-1" />;
    }
  };
  
  // Get days with tasks color-coded
  const getDayClass = (date: Date) => {
    let hasTask = false;
    let isToday = false;
    
    // Check if date is today
    const today = new Date();
    isToday = date.getDate() === today.getDate() && 
              date.getMonth() === today.getMonth() && 
              date.getFullYear() === today.getFullYear();
    
    // Check if any tasks are due on this date
    project.tasks.forEach(task => {
      const taskDate = new Date(task.dueDate);
      if (taskDate.getDate() === date.getDate() && 
          taskDate.getMonth() === date.getMonth() && 
          taskDate.getFullYear() === date.getFullYear()) {
        hasTask = true;
      }
    });
    
    // Build class string
    let className = "p-2 text-center ";
    
    // Add weekend styling
    if (date.getDay() === 0 || date.getDay() === 6) {
      className += "bg-gray-50 ";
    }
    
    // Add today styling
    if (isToday) {
      className += "bg-blue-50 font-bold border-b-2 border-blue-500 ";
    }
    
    // Add task indicator
    if (hasTask) {
      className += "font-medium ";
    }
    
    return className;
  };
  
  const days = getDaysInRange();
  
  return (
    <div ref={timelineRef} className="space-y-4">
      <div className="timeline-header flex justify-between items-center">
        <div className="flex items-center">
          <CalendarDays className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Project Timeline</h3>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={contractTimelineRange}
            className="p-1 rounded-md hover:bg-gray-100"
            title="Zoom in"
          >
            <ZoomIn className="h-5 w-5 text-gray-500" />
          </button>
          <button 
            onClick={expandTimelineRange}
            className="p-1 rounded-md hover:bg-gray-100"
            title="Zoom out"
          >
            <ZoomOut className="h-5 w-5 text-gray-500" />
          </button>
          <button 
            onClick={moveTimelineBackward}
            className="p-1 rounded-md hover:bg-gray-100"
            title="Move backward"
          >
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
          <button 
            onClick={moveTimelineForward}
            className="p-1 rounded-md hover:bg-gray-100"
            title="Move forward"
          >
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="timeline-grid overflow-x-auto pb-4">
        <div className="min-w-max">
          {/* Timeline Header - Days */}
          <div className="grid grid-flow-col auto-cols-fr gap-px bg-white border-b border-gray-200">
            {days.map((day, index) => (
              <div key={index} className={getDayClass(day)}>
                {formatDateShort(day)}
              </div>
            ))}
          </div>
          
          {/* Timeline Content - Status Rows */}
          <div className="space-y-8 mt-6">
            {/* Pending Tasks Row */}
            <div className="space-y-2">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Pending</h4>
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                  {taskGroups.pending?.length || 0}
                </span>
              </div>
              
              <div className="relative h-10">
                <div className="absolute inset-0 grid grid-flow-col auto-cols-fr gap-px">
                  {days.map((day, index) => (
                    <div key={index} className="border-r border-gray-100"></div>
                  ))}
                </div>
                
                <div className="absolute inset-0">
                  {taskGroups.pending?.filter(isTaskInVisibleRange).map(task => (
                    <div 
                      key={task.id}
                      className={getTaskStyle(task)}
                      style={{ 
                        position: 'absolute',
                        left: `${(calculateTaskPosition(task) / days.length) * 100}%`,
                        transform: 'translateX(-50%)',
                        maxWidth: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        zIndex: 10
                      }}
                      title={`${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                    >
                      <div className="flex items-center">
                        {getTaskIcon(task)}
                        <span>{task.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* In Progress Tasks Row */}
            <div className="space-y-2">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 text-blue-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">In Progress</h4>
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {taskGroups['in-progress']?.length || 0}
                </span>
              </div>
              
              <div className="relative h-10">
                <div className="absolute inset-0 grid grid-flow-col auto-cols-fr gap-px">
                  {days.map((day, index) => (
                    <div key={index} className="border-r border-gray-100"></div>
                  ))}
                </div>
                
                <div className="absolute inset-0">
                  {taskGroups['in-progress']?.filter(isTaskInVisibleRange).map(task => (
                    <div 
                      key={task.id}
                      className={getTaskStyle(task)}
                      style={{ 
                        position: 'absolute',
                        left: `${(calculateTaskPosition(task) / days.length) * 100}%`,
                        transform: 'translateX(-50%)',
                        maxWidth: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        zIndex: 10
                      }}
                      title={`${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                    >
                      <div className="flex items-center">
                        {getTaskIcon(task)}
                        <span>{task.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Completed Tasks Row */}
            <div className="space-y-2">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Completed</h4>
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  {taskGroups.completed?.length || 0}
                </span>
              </div>
              
              <div className="relative h-10">
                <div className="absolute inset-0 grid grid-flow-col auto-cols-fr gap-px">
                  {days.map((day, index) => (
                    <div key={index} className="border-r border-gray-100"></div>
                  ))}
                </div>
                
                <div className="absolute inset-0">
                  {taskGroups.completed?.filter(isTaskInVisibleRange).map(task => (
                    <div 
                      key={task.id}
                      className={getTaskStyle(task)}
                      style={{ 
                        position: 'absolute',
                        left: `${(calculateTaskPosition(task) / days.length) * 100}%`,
                        transform: 'translateX(-50%)',
                        maxWidth: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        zIndex: 10
                      }}
                      title={`${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                    >
                      <div className="flex items-center">
                        {getTaskIcon(task)}
                        <span>{task.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Blocked Tasks Row */}
            <div className="space-y-2">
              <div className="flex items-center mb-2">
                <Pause className="h-4 w-4 text-red-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Blocked</h4>
                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  {taskGroups.blocked?.length || 0}
                </span>
              </div>
              
              <div className="relative h-10">
                <div className="absolute inset-0 grid grid-flow-col auto-cols-fr gap-px">
                  {days.map((day, index) => (
                    <div key={index} className="border-r border-gray-100"></div>
                  ))}
                </div>
                
                <div className="absolute inset-0">
                  {taskGroups.blocked?.filter(isTaskInVisibleRange).map(task => (
                    <div 
                      key={task.id}
                      className={getTaskStyle(task)}
                      style={{ 
                        position: 'absolute',
                        left: `${(calculateTaskPosition(task) / days.length) * 100}%`,
                        transform: 'translateX(-50%)',
                        maxWidth: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        zIndex: 10
                      }}
                      title={`${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                    >
                      <div className="flex items-center">
                        {getTaskIcon(task)}
                        <span>{task.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Progress Bar */}
      <div className="mt-8 space-y-2">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Project Progress</span>
          <span>{project.completionPercentage}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${project.completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
