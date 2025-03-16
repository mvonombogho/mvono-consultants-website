"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, CheckCircle2, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type Task = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assignee: string;
  assigneeId: string;
  status: string;
  priority: string;
  dueDate: string;
  completionPercentage: number;
};

type Props = {
  tasks: Task[];
};

export default function ProjectTaskBoard({ tasks }: Props) {
  // We'll group tasks by status
  const taskGroups = {
    'not-started': tasks.filter(task => task.status === 'not-started'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    'on-hold': tasks.filter(task => task.status === 'on-hold'),
    'completed': tasks.filter(task => task.status === 'completed'),
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // This would be handled by a proper drag and drop library in a real implementation
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    // In a real implementation, this would update the task status via API
    console.log(`Move task ${taskId} to status: ${targetStatus}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div 
        className="space-y-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'not-started')}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Not Started</h3>
          <Badge variant="outline" className="bg-gray-100">
            {taskGroups['not-started'].length}
          </Badge>
        </div>
        {taskGroups['not-started'].map(task => (
          <Link key={task.id} href={`/dashboard/projects/tasks/${task.id}`}>
            <div 
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium line-clamp-2">{task.title}</h4>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <UserCircle2 className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
              <div className="mt-2 text-xs">
                <span className="text-muted-foreground">{task.projectName}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div 
        className="space-y-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'in-progress')}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium">In Progress</h3>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            {taskGroups['in-progress'].length}
          </Badge>
        </div>
        {taskGroups['in-progress'].map(task => (
          <Link key={task.id} href={`/dashboard/projects/tasks/${task.id}`}>
            <div 
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium line-clamp-2">{task.title}</h4>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <UserCircle2 className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
              <div className="mt-2 text-xs">
                <span className="text-muted-foreground">{task.projectName}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${task.completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div 
        className="space-y-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'on-hold')}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium">On Hold</h3>
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            {taskGroups['on-hold'].length}
          </Badge>
        </div>
        {taskGroups['on-hold'].map(task => (
          <Link key={task.id} href={`/dashboard/projects/tasks/${task.id}`}>
            <div 
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium line-clamp-2">{task.title}</h4>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                <span>On Hold</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <UserCircle2 className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
              <div className="mt-2 text-xs">
                <span className="text-muted-foreground">{task.projectName}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-yellow-500 h-1.5 rounded-full" 
                  style={{ width: `${task.completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div 
        className="space-y-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'completed')}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Completed</h3>
          <Badge variant="outline" className="bg-green-100 text-green-800">
            {taskGroups['completed'].length}
          </Badge>
        </div>
        {taskGroups['completed'].map(task => (
          <Link key={task.id} href={`/dashboard/projects/tasks/${task.id}`}>
            <div 
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium line-clamp-2">{task.title}</h4>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
              <div className="flex items-center gap-2 text-xs text-green-500">
                <CheckCircle2 className="h-3 w-3" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <UserCircle2 className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
              <div className="mt-2 text-xs">
                <span className="text-muted-foreground">{task.projectName}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}