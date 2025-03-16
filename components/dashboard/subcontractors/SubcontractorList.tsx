"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, Eye, Edit, MoreHorizontal, FileText, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { toast } from 'sonner';

type Subcontractor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  address: string;
  status: 'active' | 'inactive';
  projectsCount: number;
};

type Props = {
  subcontractors: Subcontractor[];
};

export default function SubcontractorList({ subcontractors }: Props) {
  const [selectedSubcontractors, setSelectedSubcontractors] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSelectAll = () => {
    if (selectedSubcontractors.length === subcontractors.length) {
      setSelectedSubcontractors([]);
    } else {
      setSelectedSubcontractors(subcontractors.map(sc => sc.id));
    }
  };

  const toggleSelectSubcontractor = (id: string) => {
    if (selectedSubcontractors.includes(id)) {
      setSelectedSubcontractors(selectedSubcontractors.filter(scId => scId !== id));
    } else {
      setSelectedSubcontractors([...selectedSubcontractors, id]);
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

  const sortedSubcontractors = [...subcontractors].sort((a, b) => {
    let comparison = 0;
    switch (sortColumn) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'specialty':
        comparison = a.specialty.localeCompare(b.specialty);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'projectsCount':
        comparison = a.projectsCount - b.projectsCount;
        break;
      default:
        comparison = 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleDeleteConfirm = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      // Here we would call an API to delete the subcontractor
      toast.success(`Subcontractor ${name} successfully deleted`);
      // In a real app, we would update the list after successful deletion
    }
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
                      checked={selectedSubcontractors.length === subcontractors.length && subcontractors.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all subcontractors"
                    />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      Name
                      {sortColumn === 'name' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('specialty')}>
                    <div className="flex items-center">
                      Specialty
                      {sortColumn === 'specialty' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Contact Info
                  </th>
                  <th className="h-12 px-4 text-center align-middle font-medium cursor-pointer" onClick={() => handleSort('projectsCount')}>
                    <div className="flex items-center justify-center">
                      Projects
                      {sortColumn === 'projectsCount' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-center align-middle font-medium cursor-pointer" onClick={() => handleSort('status')}>
                    <div className="flex items-center justify-center">
                      Status
                      {sortColumn === 'status' && (
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
                {sortedSubcontractors.map((subcontractor) => (
                  <tr key={subcontractor.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedSubcontractors.includes(subcontractor.id)}
                        onCheckedChange={() => toggleSelectSubcontractor(subcontractor.id)}
                        aria-label={`Select ${subcontractor.name}`}
                      />
                    </td>
                    <td className="p-4 align-middle font-medium">{subcontractor.name}</td>
                    <td className="p-4 align-middle">{subcontractor.specialty}</td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="text-sm">{subcontractor.email}</span>
                        <span className="text-sm text-muted-foreground">{subcontractor.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-center">
                      <Link href={`/dashboard/subcontractors/${subcontractor.id}/projects`} className="underline hover:text-blue-600">
                        {subcontractor.projectsCount}
                      </Link>
                    </td>
                    <td className="p-4 align-middle text-center">
                      <Badge variant={subcontractor.status === 'active' ? 'default' : 'secondary'}>
                        {subcontractor.status.charAt(0).toUpperCase() + subcontractor.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link href={`/dashboard/subcontractors/${subcontractor.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/subcontractors/${subcontractor.id}/edit`}>
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
                            <Link href={`/dashboard/subcontractors/${subcontractor.id}/contracts`}>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Contracts
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600" 
                              onClick={() => handleDeleteConfirm(subcontractor.id, subcontractor.name)}
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

        {selectedSubcontractors.length > 0 && (
          <div className="flex items-center justify-between py-4 px-4">
            <p className="text-sm text-muted-foreground">
              {selectedSubcontractors.length} of {subcontractors.length} row(s) selected
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                Export Selected
              </Button>
              <Button size="sm" variant="destructive" onClick={() => {
                toast.success(`${selectedSubcontractors.length} subcontractors successfully deleted`);
                setSelectedSubcontractors([]);
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