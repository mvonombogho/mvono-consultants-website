import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]/route';
import prisma from '../../../../../../lib/prisma';

// GET /api/sales/deals/[id]/activities - Get all activities for a deal
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Check if deal exists
    const deal = await prisma.salesDeal.findUnique({
      where: { id },
    });

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    const activities = await prisma.dealActivity.findMany({
      where: { dealId: id },
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
    console.error('Error fetching deal activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deal activities' },
      { status: 500 }
    );
  }
}

// POST /api/sales/deals/[id]/activities - Create a new activity for a deal
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();

    // Check if deal exists
    const deal = await prisma.salesDeal.findUnique({
      where: { id },
    });

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    // Validate required fields
    if (!data.activityType || !data.description) {
      return NextResponse.json(
        { error: 'Activity type and description are required' },
        { status: 400 }
      );
    }

    // Create activity
    const activity = await prisma.dealActivity.create({
      data: {
        dealId: id,
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

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error('Error creating deal activity:', error);
    return NextResponse.json(
      { error: 'Failed to create deal activity' },
      { status: 500 }
    );
  }
}
