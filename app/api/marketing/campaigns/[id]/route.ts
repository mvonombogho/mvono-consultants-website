import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/marketing/campaigns/[id] - Get a single campaign
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    const campaign = await prisma.marketingCampaign.findUnique({
      where: { id },
      include: {
        targetSegment: {
          select: { id: true, name: true }
        },
        createdBy: {
          select: { id: true, name: true }
        },
        targetClients: {
          select: { id: true, name: true }
        },
        emailMessages: {
          select: { id: true, subject: true, status: true, sentDate: true }
        },
        contentItems: true,
        metrics: true
      }
    });
    
    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaign' },
      { status: 500 }
    );
  }
}

// PUT /api/marketing/campaigns/[id] - Update a campaign
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    const data = await req.json();
    
    // Check if campaign exists
    const existingCampaign = await prisma.marketingCampaign.findUnique({
      where: { id }
    });
    
    if (!existingCampaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }
    
    // Prepare campaign data with date conversions
    const campaignData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      updatedAt: new Date()
    };
    
    // Handle target segment update if provided
    if (data.targetSegmentId) {
      campaignData.targetSegment = {
        connect: { id: data.targetSegmentId }
      };
      
      // Remove targetSegmentId to avoid Prisma errors
      delete campaignData.targetSegmentId;
    } else if (data.targetSegmentId === '') {
      // If empty string, disconnect the segment
      campaignData.targetSegment = { disconnect: true };
      delete campaignData.targetSegmentId;
    }
    
    const updatedCampaign = await prisma.marketingCampaign.update({
      where: { id },
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
    
    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to update campaign' },
      { status: 500 }
    );
  }
}

// DELETE /api/marketing/campaigns/[id] - Delete a campaign
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    // Check if campaign exists
    const existingCampaign = await prisma.marketingCampaign.findUnique({
      where: { id }
    });
    
    if (!existingCampaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }
    
    // Delete the campaign
    await prisma.marketingCampaign.delete({
      where: { id }
    });
    
    return NextResponse.json(
      { message: 'Campaign deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json(
      { error: 'Failed to delete campaign' },
      { status: 500 }
    );
  }
}
