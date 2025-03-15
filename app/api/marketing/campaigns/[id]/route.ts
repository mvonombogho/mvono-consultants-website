import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const campaign = await prisma.marketingCampaign.findUnique({
      where: { id: params.id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        targetClients: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            industry: true,
          },
        },
        targetSegment: true,
        metrics: {
          orderBy: {
            metricDate: 'desc',
          },
        },
        contentItems: {
          include: {
            metrics: true,
          },
        },
        emailMessages: {
          select: {
            id: true,
            subject: true,
            status: true,
            sentDate: true,
            opened: true,
            clicked: true,
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.startDate || !data.endDate || !data.campaignType || !data.status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get current campaign to check for disconnecting clients
    const currentCampaign = await prisma.marketingCampaign.findUnique({
      where: { id: params.id },
      include: {
        targetClients: { select: { id: true } },
      },
    });

    if (!currentCampaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Initialize arrays if not provided
    const targetClientIds = Array.isArray(data.targetClientIds) ? data.targetClientIds : [];
    
    // Identify clients to disconnect
    const currentClientIds = currentCampaign.targetClients.map((client) => client.id);
    const clientsToDisconnect = currentClientIds.filter((id) => !targetClientIds.includes(id));

    // Update the campaign
    const campaign = await prisma.marketingCampaign.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description || null,
        objective: data.objective || null,
        campaignType: data.campaignType,
        status: data.status,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        budget: data.budget ? parseFloat(data.budget) : null,
        actualSpent: data.actualSpent ? parseFloat(data.actualSpent) : null,
        ROI: data.ROI ? parseFloat(data.ROI) : null,
        tags: data.tags || null,
        targetClients: {
          connect: targetClientIds.map((id: string) => ({ id })),
          disconnect: clientsToDisconnect.map((id) => ({ id })),
        },
        targetSegment: data.targetSegmentId
          ? { connect: { id: data.targetSegmentId } }
          : data.targetSegmentId === null
          ? { disconnect: true }
          : undefined,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First, delete related content items and metrics
    await prisma.campaignContent.deleteMany({
      where: { campaignId: params.id },
    });

    await prisma.campaignMetric.deleteMany({
      where: { campaignId: params.id },
    });

    // Delete the campaign
    await prisma.marketingCampaign.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
