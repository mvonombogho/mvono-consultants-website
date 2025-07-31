import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/schedules - Get all schedules with filtering options
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const clientId = searchParams.get('clientId');
    const projectId = searchParams.get('projectId');
    const serviceId = searchParams.get('serviceId');
    const assignedToId = searchParams.get('assignedToId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search');
    
    // Build filter conditions
    const whereConditions: any = {};
    
    if (status) {
      whereConditions.status = status;
    }
    
    if (clientId) {
      whereConditions.clientId = clientId;
    }
    
    if (projectId) {
      whereConditions.projectId = projectId;
    }
    
    if (serviceId) {
      whereConditions.serviceId = serviceId;
    }
    
    if (assignedToId) {
      whereConditions.assignedToId = assignedToId;
    }
    
    // Date range filtering
    if (startDate || endDate) {
      whereConditions.OR = [
        // Events that start within the range
        {
          startDate: {
            ...(startDate && { gte: new Date(startDate) }),
            ...(endDate && { lte: new Date(endDate) }),
          },
        },
        // Events that end within the range
        {
          endDate: {
            ...(startDate && { gte: new Date(startDate) }),
            ...(endDate && { lte: new Date(endDate) }),
          },
        },
        // Events that span the entire range
        {
          ...(startDate && endDate
            ? {
                startDate: { lte: new Date(startDate) },
                endDate: { gte: new Date(endDate) },
              }
            : {}),
        },
      ];
    }
    
    if (search) {
      whereConditions.OR = [
        ...(whereConditions.OR || []),
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const schedules = await prisma.schedule.findMany({
      where: whereConditions,
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
        subcontractor: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });
    
    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
}

// POST /api/schedules - Create a new schedule
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.startDate || !body.endDate || !body.status) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Create new schedule
    const schedule = await prisma.schedule.create({
      data: {
        title: body.title,
        description: body.description || null,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        location: body.location || null,
        status: body.status,
        priority: body.priority || null,
        clientId: body.clientId || null,
        projectId: body.projectId || null,
        serviceId: body.serviceId || null,
        subcontractorId: body.subcontractorId || null,
        notes: body.notes || null,
        createdById: session.user.id || body.createdById, // Use the current user as creator
        assignedToId: body.assignedToId || null,
        reminderSent: body.reminderSent || false,
        isAllDay: body.isAllDay || false,
        recurrence: body.recurrence || null,
        recurrenceEnd: body.recurrenceEnd ? new Date(body.recurrenceEnd) : null,
        color: body.color || null,
      },
    });
    
    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 });
  }
}
