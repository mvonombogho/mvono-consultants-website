import { Metadata } from 'next';
import SegmentForm from '@/components/segments/segment-form';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Create Segment | Mvono Consultants',
  description: 'Create a new customer segment'
};

export default async function NewSegmentPage() {
  const clients = await prisma.client.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SegmentForm clients={clients} />
      </div>
    </div>
  );
}
