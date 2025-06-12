import { Metadata } from 'next';
import { getCrossSellOpportunityById } from '@/app/actions/getCrossSellOpportunities';
import CrossSellForm from '@/components/marketing/cross-sell-form';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Edit Cross-Sell Opportunity | Mvono Consultants',
  description: 'Edit cross-sell opportunity'
};

export default async function EditCrossSellPage({
  params
}: {
  params: { id: string }
}) {
  const opportunity = await getCrossSellOpportunityById(params.id);

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
        <CrossSellForm 
          segments={segments} 
          services={services}
          initialData={opportunity} 
        />
      </div>
    </div>
  );
}
