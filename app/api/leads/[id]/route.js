export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '../../../../lib/prisma';

// GET /api/leads/[id] - Get a specific lead
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
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
        deal: true,
        dealOpportunity: true,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
}

// PUT /api/leads/[id] - Update a lead
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();

    // Check if lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: true,
      },
    });

    if (!existingLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Check if lead is being assigned to someone new
    const isNewAssignment = 
      data.assignedToId && 
      existingLead.assignedToId !== data.assignedToId;

    // Update lead
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        source: data.source,
        status: data.status,
        priority: data.priority,
        notes: data.notes,
        industry: data.industry,
        estimatedValue: data.estimatedValue ? parseFloat(data.estimatedValue) : null,
        tags: data.tags,
        assignedToId: data.assignedToId,
        lastContact: data.lastContact ? new Date(data.lastContact) : existingLead.lastContact,
        nextContactDate: data.nextContactDate ? new Date(data.nextContactDate) : existingLead.nextContactDate,
        conversionDate: data.conversionDate ? new Date(data.conversionDate) : existingLead.conversionDate,
        dealId: data.dealId || existingLead.dealId,
        dealOpportunityId: data.dealOpportunityId || existingLead.dealOpportunityId,
      },
    });

    // Create activity if lead is assigned to someone new
    if (isNewAssignment) {
      const newAssigneeName = (await prisma.user.findUnique({
        where: { id: data.assignedToId },
        select: { name: true },
      }))?.name || 'New user';

      await prisma.leadActivity.create({
        data: {
          leadId: id,
          activityType: 'assignment',
          description: `Lead assigned to ${newAssigneeName}`,
          date: new Date(),
          performedById: session.user.id,
        },
      });
    }

    // Create activity if lead status changed
    if (data.status && existingLead.status !== data.status) {
      await prisma.leadActivity.create({
        data: {
          leadId: id,
          activityType: 'status',
          description: `Lead status changed from ${existingLead.status} to ${data.status}`,
          date: new Date(),
          performedById: session.user.id,
        },
      });
    }

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

// DELETE /api/leads/[id] - Delete a lead
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Check if lead exists
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Delete lead (activities will cascade delete due to relation constraints)
    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
