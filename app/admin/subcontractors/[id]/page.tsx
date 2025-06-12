import { Metadata } from 'next';
import SubcontractorDetail from '@/components/admin/subcontractors/SubcontractorDetail';

export const metadata: Metadata = {
  title: 'Subcontractor Details | Mvono Consultants Admin',
  description: 'View and manage details for a specific subcontractor',
};

interface SubcontractorPageProps {
  params: {
    id: string;
  };
}

export default function SubcontractorPage({ params }: SubcontractorPageProps) {
  return <SubcontractorDetail id={params.id} />;
}