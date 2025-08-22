import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '../../../../../lib/prisma';

// GET /api/leads/[id]/activities - Get all activities for a lead
export async function GET(request, { params }) {
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

    const activities = await prisma.leadActivity.findMany({
      where: { leadId: id },
      include: {
        performedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching lead activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead activities' },
      { status: 500 }
    );
  }
}

// POST /api/leads/[id]/activities - Create a new activity for a lead
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();

    // Check if lead exists
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Validate required fields
    if (!data.activityType || !data.description) {
      return NextResponse.json(
        { error: 'Activity type and description are required' },
        { status: 400 }
      );
    }

    // Create activity
    const activity = await prisma.leadActivity.create({
      data: {
        leadId: id,
        activityType: data.activityType,
        description: data.description,
        date: data.date ? new Date(data.date) : new Date(),
        performedById: session.user.id,
        outcome: data.outcome,
        notes: data.notes,
        followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
      },
      include: {
        performedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Update lead's lastContact date if it's a contact-related activity
    if (['call', 'email', 'meeting'].includes(data.activityType)) {
      await prisma.lead.update({
        where: { id },
        data: {
          lastContact: new Date(),
          // If there's a follow-up date in the activity, update the lead's nextContactDate
          ...(data.followUpDate
            ? { nextContactDate: new Date(data.followUpDate) }
            : {}),
        },
      });
    }

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error('Error creating lead activity:', error);
    return NextResponse.json(
      { error: 'Failed to create lead activity' },
      { status: 500 }
    );
  }
}
