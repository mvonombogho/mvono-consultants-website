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

    const segment = await prisma.customerSegment.findUnique({
      where: { id: params.id },
      include: {
        clients: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            industry: true,
            createdAt: true,
          },
        },
        campaigns: {
          select: {
            id: true,
            name: true,
            campaignType: true,
            status: true,
          },
        },
        _count: {
          select: {
            clients: true,
            campaigns: true,
          },
        },
      },
    });

    if (!segment) {
      return NextResponse.json({ error: 'Segment not found' }, { status: 404 });
    }

    // Transform the result to include counts
    const transformedSegment = {
      ...segment,
      segmentSize: segment._count.clients,
      campaignCount: segment._count.campaigns,
      _count: undefined,
    };

    return NextResponse.json(transformedSegment);
  } catch (error) {
    console.error('Error fetching segment:', error);
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
    if (!data.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get current segment to check for client changes
    const currentSegment = await prisma.customerSegment.findUnique({
      where: { id: params.id },
      include: {
        clients: { select: { id: true } },
      },
    });

    if (!currentSegment) {
      return NextResponse.json({ error: 'Segment not found' }, { status: 404 });
    }

    // Initialize client IDs if provided
    const clientIds = Array.isArray(data.clientIds) ? data.clientIds : [];
    
    // Identify clients to disconnect
    const currentClientIds = currentSegment.clients.map((client) => client.id);
    const clientsToDisconnect = currentClientIds.filter((id) => !clientIds.includes(id));

    // Update the segment
    const segment = await prisma.customerSegment.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description || null,
        criteria: data.criteria || null,
        isActive: data.isActive !== undefined ? data.isActive : currentSegment.isActive,
        tags: data.tags || null,
        clients: {
          connect: clientIds.map((id: string) => ({ id })),
          disconnect: clientsToDisconnect.map((id) => ({ id })),
        },
      },
      include: {
        clients: true,
        _count: {
          select: {
            clients: true,
          },
        },
      },
    });

    // Transform the result to include segment size
    const transformedSegment = {
      ...segment,
      segmentSize: segment._count.clients,
      _count: undefined,
    };

    return NextResponse.json(transformedSegment);
  } catch (error) {
    console.error('Error updating segment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if segment is used in any campaigns
    const campaignsUsingSegment = await prisma.marketingCampaign.findMany({
      where: {
        targetSegmentId: params.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (campaignsUsingSegment.length > 0) {
      return NextResponse.json({
        error: 'Cannot delete segment that is being used in campaigns',
        campaigns: campaignsUsingSegment,
      }, { status: 400 });
    }

    // Delete the segment
    await prisma.customerSegment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting segment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
