'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TaskList from './TaskList';
import ProjectTimeline from './ProjectTimeline';
import ProjectMetrics from './ProjectMetrics';
import { FiGrid, FiCalendar, FiBarChart2, FiEdit, FiFilter, FiPlus, FiChevronDown } from 'react-icons/fi';

// Mock data - would be fetched from API in production
const PROJECTS = [
  { id: 1, name: "KTDA Safety Assessment", status: "active", progress: 65, tasks: 24, completedTasks: 16 },
  { id: 2, name: "Lafarge Energy Audit", status: "active", progress: 40, tasks: 18, completedTasks: 7 },
  { id: 3, name: "Autosprings Fire Safety", status: "completed", progress: 100, tasks: 15, completedTasks: 15 },
  { id: 4, name: "Radisson Blu Inspection", status: "pending", progress: 0, tasks: 12, completedTasks: 0 },
  { id: 5, name: "Unga Group Plant Inspection", status: "active", progress: 75, tasks: 30, completedTasks: 22 },
];

const ProjectManagement = () => {
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);
  const [viewMode, setViewMode] = useState('tasks'); // 'tasks', 'timeline', 'metrics'
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const containerRef = useRef(null);
  const projectSelectorRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    tl.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    });

    // Components staggered entrance
    tl.from('.project-card, .view-controls, .content-area', {
      opacity: 0,
      y: 15,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");

    // Handle click outside project selector
    const handleClickOutside = (event) => {
      if (projectSelectorRef.current && !projectSelectorRef.current.contains(event.target)) {
        setShowProjectSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animate view transitions
  useEffect(() => {
    gsap.from('.content-area > div', {
      opacity: 0,
      scale: 0.97,
      duration: 0.5,
      ease: "power3.out"
    });
  }, [viewMode, selectedProject]);

  const renderViewContent = () => {
    switch (viewMode) {
      case 'tasks':
        return <TaskList project={selectedProject} />;
      case 'timeline':
        return <ProjectTimeline project={selectedProject} />;
      case 'metrics':
        return <ProjectMetrics project={selectedProject} />;
      default:
        return <TaskList project={selectedProject} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div ref={containerRef} className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="project-card relative" ref={projectSelectorRef}>
          <div 
            onClick={() => setShowProjectSelector(!showProjectSelector)}
            className="flex items-center gap-3 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-all duration-300"
          >
            <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedProject.status)}`}></div>
            <div>
              <h3 className="font-semibold text-lg">{selectedProject.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="capitalize">{selectedProject.status}</span>
                <span>•</span>
                <span>{selectedProject.progress}% complete</span>
                <span>•</span>
                <span>{selectedProject.completedTasks}/{selectedProject.tasks} tasks</span>
              </div>
            </div>
            <FiChevronDown className="ml-2 text-gray-400" />
          </div>
          
          {showProjectSelector && (
            <div className="absolute top-full left-0 mt-2 w-full z-10 bg-white rounded-lg shadow-lg p-2 border border-gray-200 transition-all duration-300">
              <div className="mb-2 px-2">
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="max-h-72 overflow-y-auto">
                {PROJECTS.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project);
                      setShowProjectSelector(false);
                    }}
                    className={`p-2 cursor-pointer rounded hover:bg-gray-100 transition-colors ${project.id === selectedProject.id ? 'bg-gray-100' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                      <span className="font-medium">{project.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 ml-4 mt-1">
                      {project.progress}% complete • {project.completedTasks}/{project.tasks} tasks
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <button className="w-full p-2 text-blue-500 hover:bg-blue-50 rounded flex items-center justify-center gap-2 transition-colors">
                  <FiPlus className="w-4 h-4" />
                  <span>Create New Project</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="view-controls flex items-center bg-gray-100 rounded-lg p-1 self-start">
          <button 
            onClick={() => setViewMode('tasks')}
            className={`flex items-center gap-1 px-3 py-2 rounded ${viewMode === 'tasks' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
          >
            <FiGrid className="w-4 h-4" />
            <span>Tasks</span>
          </button>
          <button 
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1 px-3 py-2 rounded ${viewMode === 'timeline' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
          >
            <FiCalendar className="w-4 h-4" />
            <span>Timeline</span>
          </button>
          <button 
            onClick={() => setViewMode('metrics')}
            className={`flex items-center gap-1 px-3 py-2 rounded ${viewMode === 'metrics' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
          >
            <FiBarChart2 className="w-4 h-4" />
            <span>Metrics</span>
          </button>
        </div>
      </div>
      
      <div className="content-area">
        {renderViewContent()}
      </div>
    </div>
  );
};

export default ProjectManagement;
