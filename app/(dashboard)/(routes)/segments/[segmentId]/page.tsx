import { Metadata } from 'next';
import SegmentForm from '@/components/segments/segment-form';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Edit Segment | Mvono Consultants',
  description: 'Edit customer segment'
};

export default async function EditSegmentPage({
  params
}: {
  params: { segmentId: string }
}) {
  const segment = await prisma.customerSegment.findUnique({
    where: {
      id: params.segmentId
    },
    include: {
      clients: true
    }
  });

  if (!segment) {
    throw new Error('Segment not found');
  }

  const clients = await prisma.client.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SegmentForm 
          clients={clients} 
          initialData={segment} 
        />
      </div>
    </div>
  );
}
