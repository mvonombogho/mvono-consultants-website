import { Metadata } from 'next';
import SubcontractorsList from '@/components/admin/subcontractors/SubcontractorsList';

export const metadata: Metadata = {
  title: 'Subcontractors | Mvono Consultants Admin',
  description: 'Manage your subcontractors for various projects and services',
};

export default function SubcontractorsPage() {
  return <SubcontractorsList />;
}