export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';

const prisma = new PrismaClient();

// GET /api/marketing/email-stats - Get email statistics
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get all emails
    const emails = await prisma.emailMessage.findMany({
      select: {
        id: true,
        status: true,
        opened: true,
        clicked: true,
      }
    });
    
    // Calculate stats
    const sent = emails.filter(email => email.status === 'sent').length;
    const opened = emails.filter(email => email.opened).length;
    const clicked = emails.filter(email => email.clicked).length;
    
    // Calculate rates
    const openRate = sent > 0 ? Math.round((opened / sent) * 100) : 0;
    const clickRate = opened > 0 ? Math.round((clicked / opened) * 100) : 0;
    
    // Prepare and return stats
    const stats = {
      sent,
      opened,
      clicked,
      openRate,
      clickRate,
      totalRate: openRate // For backward compatibility with existing code
    };
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching email stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email statistics' },
      { status: 500 }
    );
  }
}

// GET /api/marketing/email-stats/recent - Get recent email statistics
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { timePeriod = 'month' } = await req.json();
    
    // Calculate date range based on time period
    const now = new Date();
    let startDate = new Date();
    
    switch (timePeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1); // Default to month
    }
    
    // Get emails within the time period
    const emails = await prisma.emailMessage.findMany({
      where: {
        sentDate: {
          gte: startDate,
          lte: now
        }
      },
      select: {
        id: true,
        status: true,
        opened: true,
        clicked: true,
        sentDate: true,
        openedDate: true,
        clickedDate: true
      },
      orderBy: {
        sentDate: 'desc'
      }
    });
    
    // Calculate stats
    const sent = emails.filter(email => email.status === 'sent').length;
    const opened = emails.filter(email => email.opened).length;
    const clicked = emails.filter(email => email.clicked).length;
    
    // Calculate rates
    const openRate = sent > 0 ? Math.round((opened / sent) * 100) : 0;
    const clickRate = opened > 0 ? Math.round((clicked / opened) * 100) : 0;
    
    // Group emails by date for trend analysis
    const emailsByDate = emails.reduce((acc, email) => {
      if (!email.sentDate) return acc;
      
      const dateString = email.sentDate.toISOString().split('T')[0];
      
      if (!acc[dateString]) {
        acc[dateString] = {
          date: dateString,
          sent: 0,
          opened: 0,
          clicked: 0
        };
      }
      
      if (email.status === 'sent') acc[dateString].sent += 1;
      if (email.opened) acc[dateString].opened += 1;
      if (email.clicked) acc[dateString].clicked += 1;
      
      return acc;
    }, {} as Record<string, any>);
    
    // Convert to array and sort by date
    const trends = Object.values(emailsByDate).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Prepare and return stats
    const stats = {
      timePeriod,
      sent,
      opened,
      clicked,
      openRate,
      clickRate,
      trends
    };
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching email stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email statistics' },
      { status: 500 }
    );
  }
}
