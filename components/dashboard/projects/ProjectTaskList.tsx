"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, Eye, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from 'sonner';

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

export default function ProjectTaskList({ tasks }: Props) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const toggleSelectTask = (id: string) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter(taskId => taskId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;
    switch (sortColumn) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'projectName':
        comparison = a.projectName.localeCompare(b.projectName);
        break;
      case 'assignee':
        comparison = a.assignee.localeCompare(b.assignee);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'priority':
        comparison = a.priority.localeCompare(b.priority);
        break;
      case 'dueDate':
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'completion':
        comparison = a.completionPercentage - b.completionPercentage;
        break;
      default:
        comparison = 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  const handleDeleteConfirm = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete task "${title}"?`)) {
      // Here we would call an API to delete the task
      toast.success(`Task "${title}" successfully deleted`);
      // In a real app, we would update the list after successful deletion
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors bg-muted/50">
                  <th className="h-12 px-4">
                    <Checkbox
                      checked={selectedTasks.length === tasks.length && tasks.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all tasks"
                    />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('title')}>
                    <div className="flex items-center">
                      Task
                      {sortColumn === 'title' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('projectName')}>
                    <div className="flex items-center">
                      Project
                      {sortColumn === 'projectName' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('assignee')}>
                    <div className="flex items-center">
                      Assignee
                      {sortColumn === 'assignee' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('status')}>
                    <div className="flex items-center">
                      Status
                      {sortColumn === 'status' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('priority')}>
                    <div className="flex items-center">
                      Priority
                      {sortColumn === 'priority' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('dueDate')}>
                    <div className="flex items-center">
                      Due Date
                      {sortColumn === 'dueDate' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('completion')}>
                    <div className="flex items-center">
                      Completion
                      {sortColumn === 'completion' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => (
                  <tr key={task.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={() => toggleSelectTask(task.id)}
                        aria-label={`Select task ${task.title}`}
                      />
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{task.description}</div>
                    </td>
                    <td className="p-4 align-middle">{task.projectName}</td>
                    <td className="p-4 align-middle">{task.assignee}</td>
                    <td className="p-4 align-middle">
                      <Badge className={getStatusColor(task.status)}>
                        {formatStatus(task.status)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{format(new Date(task.dueDate), 'MMM dd, yyyy')}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center">
                        <div className="w-full max-w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${task.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{task.completionPercentage}%</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link href={`/dashboard/projects/tasks/${task.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/projects/tasks/${task.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600" 
                              onClick={() => handleDeleteConfirm(task.id, task.title)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedTasks.length > 0 && (
          <div className="flex items-center justify-between py-4 px-4">
            <p className="text-sm text-muted-foreground">
              {selectedTasks.length} of {tasks.length} row(s) selected
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => {
                toast.success(`${selectedTasks.length} tasks marked as completed`);
                setSelectedTasks([]);
              }}>
                Mark as Completed
              </Button>
              <Button size="sm" variant="destructive" onClick={() => {
                toast.success(`${selectedTasks.length} tasks successfully deleted`);
                setSelectedTasks([]);
              }}>
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}