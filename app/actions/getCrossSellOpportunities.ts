import prisma from '../../lib/prisma';

export async function getCrossSellOpportunities() {
  try {
    const opportunities = await prisma.crossSellOpportunity.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        segment: true
      }
    });

    return opportunities;
  } catch (error) {
    console.error('Error fetching cross-sell opportunities:', error);
    return [];
  }
}

export async function getCrossSellOpportunityById(opportunityId: string) {
  if (!opportunityId) {
    throw new Error('Opportunity ID is required');
  }

  try {
    const opportunity = await prisma.crossSellOpportunity.findUnique({
      where: {
        id: opportunityId
      },
      include: {
        segment: true
      }
    });

    if (!opportunity) {
      throw new Error('Opportunity not found');
    }

    return opportunity;
  } catch (error) {
    console.error('Error fetching cross-sell opportunity:', error);
    throw error;
  }
}
