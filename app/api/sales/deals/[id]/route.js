export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '../../../../../lib/prisma';

// GET /api/sales/deals/[id] - Get a specific deal
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const deal = await prisma.salesDeal.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            contactPerson: true,
            phone: true,
            address: true,
          },
        },
        leads: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            status: true,
            phone: true,
          },
        },
        activities: {
          orderBy: {
            date: 'desc',
          },
          include: {
            performedBy: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        proposals: {
          select: {
            id: true,
            title: true,
            proposalNumber: true,
            status: true,
            version: true,
            sentDate: true,
            validUntil: true,
            totalValue: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    return NextResponse.json(deal);
  } catch (error) {
    console.error('Error fetching deal:', error);
    return NextResponse.json({ error: 'Failed to fetch deal' }, { status: 500 });
  }
}

// PUT /api/sales/deals/[id] - Update a deal
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();

    // Check if deal exists
    const existingDeal = await prisma.salesDeal.findUnique({
      where: { id },
      include: {
        owner: true,
        leads: true,
      },
    });

    if (!existingDeal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    // Check if deal stage is changing
    const isStageChanging = data.stage && existingDeal.stage !== data.stage;
    
    // Prepare update data
    const updateData = {
      title: data.title,
      description: data.description,
      stage: data.stage,
      value: data.value ? parseFloat(data.value) : existingDeal.value,
      probability: data.probability ? parseFloat(data.probability) : existingDeal.probability,
      expectedCloseDate: data.expectedCloseDate ? new Date(data.expectedCloseDate) : existingDeal.expectedCloseDate,
      clientId: data.clientId,
      ownerId: data.ownerId,
      notes: data.notes,
      tags: data.tags,
      leadSource: data.leadSource,
      competitors: data.competitors,
    };
    
    // Special handling for deal closure
    if (data.stage === 'closed-won' && existingDeal.stage !== 'closed-won') {
      updateData.actualCloseDate = new Date();
      updateData.winReason = data.winReason;
    } else if (data.stage === 'closed-lost' && existingDeal.stage !== 'closed-lost') {
      updateData.actualCloseDate = new Date();
      updateData.lossReason = data.lossReason;
    }

    // Update deal
    const updatedDeal = await prisma.salesDeal.update({
      where: { id },
      data: updateData,
    });

    // Handle lead connections/disconnections if provided
    if (data.leadIds) {
      // Get current leads
      const currentLeadIds = existingDeal.leads.map(lead => lead.id);
      
      // Leads to disconnect (in current but not in new)
      const leadsToDisconnect = currentLeadIds.filter(id => !data.leadIds.includes(id));
      
      // Leads to connect (in new but not in current)
      const leadsToConnect = data.leadIds.filter(id => !currentLeadIds.includes(id));
      
      // Disconnect leads
      for (const leadId of leadsToDisconnect) {
        await prisma.lead.update({
          where: { id: leadId },
          data: { dealId: null },
        });
      }
      
      // Connect leads
      for (const leadId of leadsToConnect) {
        await prisma.lead.update({
          where: { id: leadId },
          data: { dealId: id },
        });
      }
    }

    // Create activity if deal stage changed
    if (isStageChanging) {
      await prisma.dealActivity.create({
        data: {
          dealId: id,
          activityType: 'stage',
          description: `Deal stage changed from ${existingDeal.stage} to ${data.stage}`,
          date: new Date(),
          performedById: session.user.id,
        },
      });
    }

    return NextResponse.json(updatedDeal);
  } catch (error) {
    console.error('Error updating deal:', error);
    return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 });
  }
}

// DELETE /api/sales/deals/[id] - Delete a deal
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Check if deal exists
    const deal = await prisma.salesDeal.findUnique({
      where: { id },
      include: {
        leads: true,
      },
    });

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    // Disconnect all leads from this deal
    for (const lead of deal.leads) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: { dealId: null },
      });
    }

    // Delete deal (activities will cascade delete due to relation constraints)
    await prisma.salesDeal.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting deal:', error);
    return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 });
  }
}
