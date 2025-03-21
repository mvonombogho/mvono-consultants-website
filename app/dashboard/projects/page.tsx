'use client';

import React from 'react';
import ProjectManagement from '@/components/projects/ProjectManagement';

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <p className="text-gray-600 mt-2">Track and manage all your projects in one place.</p>
      </div>
      
      <ProjectManagement />
    </div>
  );
};

export default ProjectsPage;
