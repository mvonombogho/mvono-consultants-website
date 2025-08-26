export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '../../../lib/prisma';

// GET /api/leads - Get all leads
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const assignedToId = searchParams.get('assignedToId');
    const priority = searchParams.get('priority');
    const source = searchParams.get('source');
    const search = searchParams.get('search') || '';

    const filters = {};

    if (status) filters.status = status;
    if (assignedToId) filters.assignedToId = assignedToId;
    if (priority) filters.priority = priority;
    if (source) filters.source = source;

    const leads = await prisma.lead.findMany({
      where: {
        ...filters,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
        ],
      },
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
          take: 1,
          include: {
            performedBy: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// POST /api/leads - Create a new lead
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.source || !data.status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
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
      },
    });

    // Create initial activity if lead is assigned to someone
    if (data.assignedToId) {
      await prisma.leadActivity.create({
        data: {
          leadId: lead.id,
          activityType: 'note',
          description: 'Lead created and assigned',
          date: new Date(),
          performedById: session.user.id,
        },
      });
    }

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
