import { Metadata } from 'next';
import SubcontractorForm from '@/components/admin/subcontractors/SubcontractorForm';

export const metadata: Metadata = {
  title: 'Add Subcontractor | Mvono Consultants Admin',
  description: 'Add a new subcontractor to your system',
};

export default function NewSubcontractorPage() {
  return <SubcontractorForm />;
}