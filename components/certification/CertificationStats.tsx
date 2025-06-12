"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { File, AlertCircle, CheckCircle, Clock } from 'lucide-react';

type Certification = {
  id: string;
  status: string;
  expiryDate: string;
};

type CertificationStatsProps = {
  certifications: Certification[];
  isLoading: boolean;
};

export default function CertificationStats({ certifications, isLoading }: CertificationStatsProps) {
  // Calculate statistics
  const totalCertifications = certifications.length;
  const activeCertifications = certifications.filter(cert => cert.status === 'active').length;
  const expiredCertifications = certifications.filter(cert => cert.status === 'expired').length;
  const renewalPendingCertifications = certifications.filter(cert => cert.status === 'renewal-pending').length;
  
  // Calculate expiring soon (within 30 days but still active)
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  const expiringSoonCertifications = certifications.filter(cert => {
    const expiryDate = new Date(cert.expiryDate);
    return (
      cert.status === 'active' &&
      expiryDate > today &&
      expiryDate <= thirtyDaysFromNow
    );
  }).length;
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard 
        title="Total Certifications" 
        value={totalCertifications} 
        icon={<File className="h-5 w-5 text-blue-500" />}
        color="blue"
      />
      
      <StatCard 
        title="Active" 
        value={activeCertifications} 
        icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        color="green"
      />
      
      <StatCard 
        title="Expired" 
        value={expiredCertifications} 
        icon={<AlertCircle className="h-5 w-5 text-red-500" />}
        color="red"
      />
      
      <StatCard 
        title="Renewal Pending" 
        value={renewalPendingCertifications} 
        icon={<Clock className="h-5 w-5 text-yellow-500" />}
        color="yellow"
      />
      
      <StatCard 
        title="Expiring Soon" 
        value={expiringSoonCertifications} 
        icon={<AlertCircle className="h-5 w-5 text-orange-500" />}
        color="orange"
      />
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'orange';
};

function StatCard({ title, value, icon, color }: StatCardProps) {
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-100';
      case 'green':
        return 'bg-green-50 border-green-100';
      case 'red':
        return 'bg-red-50 border-red-100';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-100';
      case 'orange':
        return 'bg-orange-50 border-orange-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };
  
  return (
    <Card className={`${getColorClass()} border`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {icon}
        </div>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
