import { Metadata } from 'next';
import CrossSellForm from '@/components/marketing/cross-sell-form';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Create Cross-Sell Opportunity | Mvono Consultants',
  description: 'Create a new cross-sell opportunity'
};

export default async function NewCrossSellPage() {
  const segments = await prisma.customerSegment.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  const services = await prisma.service.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CrossSellForm segments={segments} services={services} />
      </div>
    </div>
  );
}
