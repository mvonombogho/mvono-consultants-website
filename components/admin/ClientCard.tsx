import { Building, Users, FileText, Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type ClientCardProps = {
  client: {
    id: string;
    name: string;
    industry?: string | null;
    email?: string | null;
    phone?: string | null;
    contactPerson?: string | null;
    stats?: {
      totalInvoices: number;
      totalProjects: number;
      totalRevenue: number;
      pendingPayments: number;
    };
  };
};

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Link 
              href={`/admin/clients/${client.id}`} 
              className="text-lg font-semibold text-blue-900 hover:text-blue-700 transition-colors"
            >
              {client.name}
            </Link>
            {client.industry && (
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Building className="h-4 w-4 mr-1" />
                <span>{client.industry}</span>
              </div>
            )}
          </div>
          
          {/* Industry badge */}
          {client.industry && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {client.industry}
            </span>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          {client.contactPerson && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span>{client.contactPerson}</span>
            </div>
          )}
          
          {client.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-1" />
              <a href={`mailto:${client.email}`} className="hover:text-blue-600 transition-colors">
                {client.email}
              </a>
            </div>
          )}
          
          {client.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              <a href={`tel:${client.phone}`} className="hover:text-blue-600 transition-colors">
                {client.phone}
              </a>
            </div>
          )}
        </div>
        
        {client.stats && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-xs text-gray-500">Projects</div>
              <div className="font-semibold">{client.stats.totalProjects}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-xs text-gray-500">Invoices</div>
              <div className="font-semibold">{client.stats.totalInvoices}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-xs text-gray-500">Revenue</div>
              <div className="font-semibold">
                {client.stats.totalRevenue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-xs text-gray-500">Pending</div>
              <div className="font-semibold">
                {client.stats.pendingPayments.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
        <div className="flex space-x-2">
          <Link 
            href={`/admin/clients/${client.id}/invoices/new`} 
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <FileText className="h-3 w-3 mr-1" />
            New Invoice
          </Link>
        </div>
        
        <Link 
          href={`/admin/clients/${client.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
