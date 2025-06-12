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
