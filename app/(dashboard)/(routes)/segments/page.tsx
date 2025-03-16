import { Metadata } from 'next';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import SegmentList from '@/components/segments/segment-list';

export const metadata: Metadata = {
  title: 'Customer Segments | Mvono Consultants',
  description: 'Manage your customer segments for targeted marketing'
};

export default async function SegmentsPage() {
  const segments = await prisma.customerSegment.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      clients: {
        select: {
          _count: true
        }
      },
      campaigns: {
        select: {
          _count: true
        }
      }
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Customer Segments (${segments.length})`}
            description="Manage your customer segments for targeted marketing"
          />
          <Link href="/segments/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Segment
            </Button>
          </Link>
        </div>
        <Separator />
        <SegmentList data={segments} />
      </div>
    </div>
  );
}
