import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

type RouteParams = {
  params: {
    id: string;
  };
};

// GET /api/schedules/:id - Get a specific schedule by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    
    const schedule = await prisma.schedule.findUnique({
      where: { id },
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
    });
    
    if (!schedule) {
      return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    }
    
    return NextResponse.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json({ error: 'Failed to fetch schedule' }, { status: 500 });
  }
}

// PATCH /api/schedules/:id - Update a schedule
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    const body = await request.json();
    
    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id },
    });
    
    if (!existingSchedule) {
      return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    }
    
    // Update schedule
    const updatedSchedule = await prisma.schedule.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        description: body.description !== undefined ? body.description : undefined,
        startDate: body.startDate !== undefined ? new Date(body.startDate) : undefined,
        endDate: body.endDate !== undefined ? new Date(body.endDate) : undefined,
        location: body.location !== undefined ? body.location : undefined,
        status: body.status !== undefined ? body.status : undefined,
        priority: body.priority !== undefined ? body.priority : undefined,
        clientId: body.clientId !== undefined ? body.clientId : undefined,
        projectId: body.projectId !== undefined ? body.projectId : undefined,
        serviceId: body.serviceId !== undefined ? body.serviceId : undefined,
        subcontractorId: body.subcontractorId !== undefined ? body.subcontractorId : undefined,
        notes: body.notes !== undefined ? body.notes : undefined,
        assignedToId: body.assignedToId !== undefined ? body.assignedToId : undefined,
        reminderSent: body.reminderSent !== undefined ? body.reminderSent : undefined,
        isAllDay: body.isAllDay !== undefined ? body.isAllDay : undefined,
        recurrence: body.recurrence !== undefined ? body.recurrence : undefined,
        recurrenceEnd: body.recurrenceEnd !== undefined 
          ? body.recurrenceEnd ? new Date(body.recurrenceEnd) : null 
          : undefined,
        color: body.color !== undefined ? body.color : undefined,
      },
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
    });
    
    return NextResponse.json(updatedSchedule);
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}

// DELETE /api/schedules/:id - Delete a schedule
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    
    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id },
    });
    
    if (!existingSchedule) {
      return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    }
    
    // Delete schedule
    await prisma.schedule.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return NextResponse.json({ error: 'Failed to delete schedule' }, { status: 500 });
  }
}
