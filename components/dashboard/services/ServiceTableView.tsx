<<<<<<< HEAD
import React from 'react';
import { Button } from '../../../ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';

// Helper function to format price
const formatPrice = (price) => {
  return `KES ${new Intl.NumberFormat('en-KE').format(price)}`;
};

export default function ServiceTableView({ services }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4">Service Name</th>
              <th scope="col" className="px-6 py-4">Category</th>
              <th scope="col" className="px-6 py-4">Price</th>
              <th scope="col" className="px-6 py-4">Duration</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Last Updated</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{service.name}</td>
                <td className="px-6 py-4">{service.category}</td>
                <td className="px-6 py-4">{formatPrice(service.price)}</td>
                <td className="px-6 py-4">{service.duration}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(service.lastUpdated).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/dashboard/services/catalog/${service.id}`}>
                    <Button variant="outline" size="sm" className="h-8 px-2">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="h-8 px-2 text-red-500 hover:text-red-600">
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
=======
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

type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  isActive: boolean;
  lastUpdated: string;
};

type Props = {
  services: Service[];
};

export default function ServiceTableView({ services }: Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSelectAll = () => {
    if (selectedServices.length === services.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(services.map(service => service.id));
    }
  };

  const toggleSelectService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(serviceId => serviceId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
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

  const sortedServices = [...services].sort((a, b) => {
    let comparison = 0;
    switch (sortColumn) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'lastUpdated':
        comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
        break;
      default:
        comparison = 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environmental':
        return 'bg-green-100 text-green-800';
      case 'Safety':
        return 'bg-red-100 text-red-800';
      case 'Energy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inspection':
        return 'bg-blue-100 text-blue-800';
      case 'Testing':
        return 'bg-purple-100 text-purple-800';
      case 'Training':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteConfirm = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete service "${name}"?`)) {
      // Here we would call an API to delete the service
      toast.success(`Service "${name}" successfully deleted`);
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
                      checked={selectedServices.length === services.length && services.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all services"
                    />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      Service Name
                      {sortColumn === 'name' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('category')}>
                    <div className="flex items-center">
                      Category
                      {sortColumn === 'category' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('price')}>
                    <div className="flex items-center">
                      Price
                      {sortColumn === 'price' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Duration
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('lastUpdated')}>
                    <div className="flex items-center">
                      Last Updated
                      {sortColumn === 'lastUpdated' && (
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
                {sortedServices.map((service) => (
                  <tr key={service.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => toggleSelectService(service.id)}
                        aria-label={`Select service ${service.name}`}
                      />
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{service.description}</div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge className={getCategoryColor(service.category)}>
                        {service.category}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      KES {service.price.toLocaleString()}
                    </td>
                    <td className="p-4 align-middle">{service.duration}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={service.isActive ? 'default' : 'secondary'}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{format(new Date(service.lastUpdated), 'MMM dd, yyyy')}</td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link href={`/dashboard/services/catalog/${service.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/services/catalog/${service.id}/edit`}>
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
                            <DropdownMenuItem onClick={() => {
                              toast.success(`Service "${service.name}" status toggled`);
                            }}>
                              {service.isActive ? 'Mark as Inactive' : 'Mark as Active'}
                            </DropdownMenuItem>
                            <Link href={`/dashboard/services/catalog/${service.id}/pricing`}>
                              <DropdownMenuItem>
                                Edit Pricing
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600" 
                              onClick={() => handleDeleteConfirm(service.id, service.name)}
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

        {selectedServices.length > 0 && (
          <div className="flex items-center justify-between py-4 px-4">
            <p className="text-sm text-muted-foreground">
              {selectedServices.length} of {services.length} row(s) selected
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => {
                toast.success(`${selectedServices.length} services export started`);
                setSelectedServices([]);
              }}>
                Export Selected
              </Button>
              <Button size="sm" variant="destructive" onClick={() => {
                toast.success(`${selectedServices.length} services successfully deleted`);
                setSelectedServices([]);
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
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
