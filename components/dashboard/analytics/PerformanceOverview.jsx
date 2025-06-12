'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PerformanceOverview({ data, timeframe }) {
  const projectsRef = useRef(null);
  const retentionRef = useRef(null);
  const certificationsRef = useRef(null);
  const completionRef = useRef(null);
  
  // Animate progress rings
  useEffect(() => {
    // Animate project completion ring
    const totalProjects = data.projects.completed + data.projects.ongoing + data.projects.upcoming;
    const completionPercentage = (data.projects.completed / totalProjects) * 100;
    const ongoingPercentage = (data.projects.ongoing / totalProjects) * 100;
    
    // Reset animations when timeframe changes
    gsap.set([projectsRef.current, retentionRef.current, certificationsRef.current, completionRef.current], {
      clearProps: 'all'
    });
    
    // Animate the project stats
    gsap.to(projectsRef.current.querySelector('.project-completed'), {
      strokeDasharray: `${completionPercentage} 100`,
      duration: 1.5,
      ease: 'power2.out'
    });
    
    gsap.to(projectsRef.current.querySelector('.project-ongoing'), {
      strokeDasharray: `${ongoingPercentage} 100`,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.2
    });
    
    // Animate client retention ring
    gsap.to(retentionRef.current.querySelector('.ring-progress'), {
      strokeDasharray: `${data.clientRetention} 100`,
      duration: 1.5,
      ease: 'power2.out'
    });
    
    // Animate certifications issued
    gsap.fromTo(certificationsRef.current.querySelector('.cert-count'),
      { innerText: 0 },
      {
        innerText: data.certificationsIssued,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 }
      }
    );
    
    // Animate avg completion time
    gsap.fromTo(completionRef.current.querySelector('.completion-time'),
      { innerText: 0 },
      {
        innerText: data.avgCompletionTime,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 }
      }
    );
  }, [data, timeframe]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Performance Overview</h3>
        <span className="text-sm text-slate-500 capitalize">{timeframe} Report</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Project Status */}
        <div ref={projectsRef} className="flex flex-col items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                fill="none"
                stroke="#EEF2F6"
                strokeWidth="3"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="project-ongoing"
                fill="none"
                stroke="#FFA500"
                strokeWidth="3"
                strokeDasharray="0 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="project-completed"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="0 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="block text-2xl font-bold text-slate-800">{data.projects.completed}</span>
              <span className="block text-xs text-slate-500">Completed</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h4 className="text-sm font-semibold text-slate-800">Project Status</h4>
            <div className="flex items-center justify-center mt-2 space-x-4 text-xs">
              <div className="flex items-center">
                <span className="w-3 h-3 mr-1 rounded-full bg-emerald-500"></span>
                <span>{data.projects.completed} Completed</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 mr-1 rounded-full bg-amber-500"></span>
                <span>{data.projects.ongoing} Ongoing</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Client Retention Rate */}
        <div ref={retentionRef} className="flex flex-col items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                fill="none"
                stroke="#EEF2F6"
                strokeWidth="3"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="ring-progress"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="0 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="block text-2xl font-bold text-slate-800">{data.clientRetention}%</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h4 className="text-sm font-semibold text-slate-800">Client Retention</h4>
            <p className="text-xs text-slate-500 mt-2">Maintaining consistent client relationships</p>
          </div>
        </div>
        
        {/* Certifications Issued */}
        <div ref={certificationsRef} className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-3">
            <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="cert-count text-3xl font-bold text-indigo-600">0</span>
          <h4 className="text-sm font-medium text-indigo-800 mt-2">Certifications Issued</h4>
        </div>
        
        {/* Average Completion Time */}
        <div ref={completionRef} className="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-lg">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-3">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="completion-time text-3xl font-bold text-emerald-600">0</span>
            <span className="text-emerald-600 ml-1">days</span>
          </div>
          <h4 className="text-sm font-medium text-emerald-800 mt-2 text-center">Avg Completion Time</h4>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 flex items-center justify-between">
          <span>Data last updated: Today at 09:41 AM</span>
          <button className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium">
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
