import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/sales/deals - Get all deals
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');
    const ownerId = searchParams.get('ownerId');
    const search = searchParams.get('search') || '';
    const clientId = searchParams.get('clientId');

    const filters = {};

    if (stage) filters.stage = stage;
    if (ownerId) filters.ownerId = ownerId;
    if (clientId) filters.clientId = clientId;

    const deals = await prisma.salesDeal.findMany({
      where: {
        ...filters,
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
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
          },
        },
        leads: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            status: true,
          },
        },
        _count: {
          select: {
            activities: true,
            proposals: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

// POST /api/sales/deals - Create a new deal
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.stage || !data.value || !data.expectedCloseDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const deal = await prisma.salesDeal.create({
      data: {
        title: data.title,
        description: data.description,
        stage: data.stage,
        value: parseFloat(data.value),
        probability: parseFloat(data.probability || 0),
        expectedCloseDate: new Date(data.expectedCloseDate),
        actualCloseDate: data.actualCloseDate ? new Date(data.actualCloseDate) : null,
        clientId: data.clientId,
        ownerId: data.ownerId || session.user.id,
        notes: data.notes,
        tags: data.tags,
        leadSource: data.leadSource,
        competitors: data.competitors,
        winReason: data.winReason,
        lossReason: data.lossReason,
      },
    });

    // Connect leads to the deal if provided
    if (data.leadIds && data.leadIds.length > 0) {
      for (const leadId of data.leadIds) {
        await prisma.lead.update({
          where: { id: leadId },
          data: { dealId: deal.id },
        });
      }
    }

    // Create initial activity
    await prisma.dealActivity.create({
      data: {
        dealId: deal.id,
        activityType: 'note',
        description: 'Deal created',
        date: new Date(),
        performedById: session.user.id,
      },
    });

    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error('Error creating deal:', error);
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
  }
}
