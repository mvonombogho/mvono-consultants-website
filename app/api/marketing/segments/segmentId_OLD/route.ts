import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { segmentId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.segmentId) {
      return new NextResponse('Segment ID is required', { status: 400 });
    }

    const segment = await prisma.customerSegment.findUnique({
      where: {
        id: params.segmentId
      },
      include: {
        clients: true,
        campaigns: true
      }
    });

    if (!segment) {
      return new NextResponse('Segment not found', { status: 404 });
    }

    return NextResponse.json(segment);
  } catch (error) {
    console.error('[SEGMENT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { segmentId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.segmentId) {
      return new NextResponse('Segment ID is required', { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      description,
      criteria,
      clientIds,
      isActive,
      tags
    } = body;

    // First, get the current segment for comparison
    const currentSegment = await prisma.customerSegment.findUnique({
      where: {
        id: params.segmentId
      },
      include: {
        clients: true
      }
    });

    if (!currentSegment) {
      return new NextResponse('Segment not found', { status: 404 });
    }

    // Update the segment
    const updatedSegment = await prisma.customerSegment.update({
      where: {
        id: params.segmentId
      },
      data: {
        name,
        description,
        criteria: criteria || null,
        segmentSize: clientIds?.length || 0,
        isActive: isActive !== undefined ? isActive : currentSegment.isActive,
        tags,
        clients: {
          disconnect: currentSegment.clients.map(client => ({ id: client.id })),
          ...(clientIds && clientIds.length > 0 && {
            connect: clientIds.map((id: string) => ({ id }))
          })
        }
      }
    });

    return NextResponse.json(updatedSegment);
  } catch (error) {
    console.error('[SEGMENT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { segmentId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.segmentId) {
      return new NextResponse('Segment ID is required', { status: 400 });
    }

    // Check if segment is used in any campaigns
    const campaigns = await prisma.marketingCampaign.findMany({
      where: {
        targetSegmentId: params.segmentId
      }
    });

    if (campaigns.length > 0) {
      return new NextResponse('Cannot delete segment used in campaigns', { status: 400 });
    }

    const segment = await prisma.customerSegment.delete({
      where: {
        id: params.segmentId
      }
    });

    return NextResponse.json(segment);
  } catch (error) {
    console.error('[SEGMENT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
