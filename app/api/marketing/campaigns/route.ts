export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';

const prisma = new PrismaClient();

// GET /api/marketing/campaigns - Get all campaigns
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const campaigns = await prisma.marketingCampaign.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        targetSegment: {
          select: { id: true, name: true }
        },
        createdBy: {
          select: { id: true, name: true }
        },
        targetClients: {
          select: { id: true, name: true }
        }
      }
    });
    
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

// POST /api/marketing/campaigns - Create a new campaign
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    // Prepare campaign data with creator
    const campaignData = {
      ...data,
      createdById: userId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      // Handle target segment if provided
      ...(data.targetSegmentId ? {
        targetSegment: {
          connect: { id: data.targetSegmentId }
        }
      } : {})
    };
    
    // Remove targetSegmentId to avoid Prisma errors
    delete campaignData.targetSegmentId;
    
    const campaign = await prisma.marketingCampaign.create({
      data: campaignData,
      include: {
        targetSegment: {
          select: { id: true, name: true }
        },
        createdBy: {
          select: { id: true, name: true }
        }
      }
    });
    
    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
