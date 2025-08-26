export const dynamic = 'force-dynamic';
import { auth } from '../../../../../lib/auth';
import prisma from '../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.id) {
      return new NextResponse('Opportunity ID is required', { status: 400 });
    }

    const opportunity = await prisma.crossSellOpportunity.findUnique({
      where: {
        id: params.id
      },
      include: {
        segment: true
      }
    });

    if (!opportunity) {
      return new NextResponse('Opportunity not found', { status: 404 });
    }

    return NextResponse.json(opportunity);
  } catch (error) {
    console.error('[CROSS_SELL_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.id) {
      return new NextResponse('Opportunity ID is required', { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      description,
      sourceServiceId,
      targetServiceId,
      segmentId,
      probability,
      estimatedValue,
      isActive
    } = body;

    const opportunity = await prisma.crossSellOpportunity.update({
      where: {
        id: params.id
      },
      data: {
        title,
        description,
        sourceServiceId,
        targetServiceId,
        segmentId,
        probability: probability ? parseFloat(probability) : null,
        estimatedValue: estimatedValue ? parseFloat(estimatedValue) : null,
        isActive: isActive !== undefined ? isActive : undefined
      }
    });

    return NextResponse.json(opportunity);
  } catch (error) {
    console.error('[CROSS_SELL_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.id) {
      return new NextResponse('Opportunity ID is required', { status: 400 });
    }

    const opportunity = await prisma.crossSellOpportunity.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json(opportunity);
  } catch (error) {
    console.error('[CROSS_SELL_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
