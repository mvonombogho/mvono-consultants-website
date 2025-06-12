"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, CalendarClock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type Project = {
  id: string;
  title: string;
  clientName: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  startDate: string;
  endDate?: string;
  role: string;
};

type Props = {
  subcontractorId: string;
  subcontractorName: string;
};

export default function SubcontractorProjects({ subcontractorId, subcontractorName }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real implementation, fetch from API
    const fetchProjects = async () => {
      try {
        // Mock data
        const mockProjects = [
          {
            id: 'project-1',
            title: 'Industrial Safety Audit - Lafarge',
            clientName: 'Lafarge',
            status: 'active',
            startDate: '2025-01-15',
            endDate: '2025-04-15',
            role: 'Safety Inspector'
          },
          {
            id: 'project-2',
            title: 'Annual Equipment Certification - Unga Group',
            clientName: 'Unga Group',
            status: 'completed',
            startDate: '2024-11-10',
            endDate: '2025-01-05',
            role: 'Equipment Certifier'
          },
          {
            id: 'project-3',
            title: 'Safety Compliance Training - Dormans Coffee',
            clientName: 'Dormans Coffee',
            status: 'completed',
            startDate: '2024-10-18',
            endDate: '2024-10-22',
            role: 'Training Facilitator'
          },
          {
            id: 'project-4',
            title: 'Facility Risk Assessment - KTDA',
            clientName: 'KTDA',
            status: 'on-hold',
            startDate: '2024-12-01',
            role: 'Risk Assessor'
          },
          {
            id: 'project-5',
            title: 'Pressure Vessel Inspection - Iberafrica',
            clientName: 'Iberafrica',
            status: 'active',
            startDate: '2025-02-01',
            endDate: '2025-03-15',
            role: 'Technical Inspector'
          }
        ];
        
        setProjects(mockProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [subcontractorId]);

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Project History</CardTitle>
        <Link href={`/dashboard/projects/add?subcontractor=${subcontractorId}`}>
          <Button size="sm">Assign to Project</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredProjects.length > 0 ? (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="rounded-lg border p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <Link href={`/dashboard/projects/${project.id}`} className="font-medium hover:underline">
                    {project.title}
                  </Link>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-1">
                  <p>Client: {project.clientName}</p>
                  <p>Role: {project.role}</p>
                </div>
                <div className="flex flex-wrap text-sm text-muted-foreground mt-2 gap-x-4 gap-y-1">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Start: {format(new Date(project.startDate), 'MMM dd, yyyy')}</span>
                  </div>
                  {project.endDate && (
                    <div className="flex items-center">
                      <CalendarClock className="mr-1 h-4 w-4" />
                      <span>End: {format(new Date(project.endDate), 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground mt-1">
              {searchTerm
                ? `No projects match your search "${searchTerm}"`
                : `${subcontractorName} has not been assigned to any projects yet.`}
            </p>
            {!searchTerm && (
              <Link href={`/dashboard/projects/add?subcontractor=${subcontractorId}`} className="mt-4 inline-block">
                <Button>Assign to Project</Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}