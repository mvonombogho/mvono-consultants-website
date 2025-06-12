'use client';

import React from 'react';
<<<<<<< HEAD
import ProjectManagement from '../../components/projects/ProjectManagement';
=======
import ProjectManagement from '@/components/projects/ProjectManagement';
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa

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
