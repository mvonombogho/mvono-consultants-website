import { Metadata } from 'next';
import SubcontractorForm from '@/components/admin/subcontractors/SubcontractorForm';

export const metadata: Metadata = {
  title: 'Edit Subcontractor | Mvono Consultants Admin',
  description: 'Edit details for an existing subcontractor',
};

interface EditSubcontractorPageProps {
  params: {
    id: string;
  };
}

export default function EditSubcontractorPage({ params }: EditSubcontractorPageProps) {
  return <SubcontractorForm id={params.id} />;
}