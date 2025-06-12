<<<<<<< HEAD
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/breadcrumb';
import { Button } from '../../../ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';

// Helper function to format price
const formatPrice = (price) => {
  return `KES ${new Intl.NumberFormat('en-KE').format(price)}`;
};

export default function ServiceCardView({ services }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Card key={service.id} className="flex flex-col h-full">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <div>
              <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {service.category}
                </Badge>
                {service.isActive ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">
                    Inactive
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="text-sm text-gray-500 min-h-[60px]">
              {service.description}
            </CardDescription>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price:</span>
                <span className="font-medium">{formatPrice(service.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration:</span>
                <span className="font-medium">{service.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Updated:</span>
                <span className="font-medium">{new Date(service.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t flex justify-between">
            <Link href={`/dashboard/services/catalog/${service.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
=======
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, MoreHorizontal, Trash2, Clock, DollarSign, Tag } from 'lucide-react';
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

export default function ServiceCardView({ services }: Props) {
  const handleDeleteConfirm = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete service "${name}"?`)) {
      // Here we would call an API to delete the service
      toast.success(`Service "${name}" successfully deleted`);
      // In a real app, we would update the list after successful deletion
    }
  };

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl line-clamp-2">{service.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`/dashboard/services/catalog/${service.id}`}>
                    <DropdownMenuItem>
                      View Details
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/dashboard/services/catalog/${service.id}/edit`}>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Service
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
            <Badge className={getCategoryColor(service.category)}>
              {service.category}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {service.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm font-medium">KES {service.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm font-medium">{service.duration}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t flex justify-between pt-4 bg-muted/30">
            <div className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Updated {format(new Date(service.lastUpdated), 'MMM dd, yyyy')}
            </div>
            <Badge variant={service.isActive ? 'default' : 'secondary'}>
              {service.isActive ? 'Active' : 'Inactive'}
            </Badge>
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
          </CardFooter>
        </Card>
      ))}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
