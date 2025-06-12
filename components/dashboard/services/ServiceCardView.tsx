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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
