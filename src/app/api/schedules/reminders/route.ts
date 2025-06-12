import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/schedules/reminders - Get upcoming schedules for reminders
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const daysAhead = parseInt(searchParams.get('daysAhead') || '3', 10);
    
    // Calculate the date range for upcoming schedules
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + daysAhead);
    
    // Find upcoming scheduled events that haven't had reminders sent
    const upcomingSchedules = await prisma.schedule.findMany({
      where: {
        status: 'scheduled',
        startDate: {
          gte: today,
          lte: endDate,
        },
        reminderSent: false,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        service: {
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
    
    return NextResponse.json(upcomingSchedules);
  } catch (error) {
    console.error('Error fetching reminder schedules:', error);
    return NextResponse.json({ error: 'Failed to fetch reminder schedules' }, { status: 500 });
  }
}

// POST /api/schedules/reminders - Send reminders for upcoming schedules
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { scheduleIds } = body;
    
    if (!scheduleIds || !Array.isArray(scheduleIds) || scheduleIds.length === 0) {
      return NextResponse.json(
        { error: 'No schedule IDs provided' }, 
        { status: 400 }
      );
    }
    
    // In a real application, you would send emails here
    // For now, we'll just mark them as sent
    
    const updatedSchedules = await prisma.schedule.updateMany({
      where: {
        id: {
          in: scheduleIds,
        },
      },
      data: {
        reminderSent: true,
      },
    });
    
    return NextResponse.json({ 
      message: `Reminders sent for ${updatedSchedules.count} schedules`,
      count: updatedSchedules.count
    });
  } catch (error) {
    console.error('Error sending reminders:', error);
    return NextResponse.json({ error: 'Failed to send reminders' }, { status: 500 });
  }
}
