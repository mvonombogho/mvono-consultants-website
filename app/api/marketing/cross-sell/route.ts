import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
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
    } = body;

    if (!title) {
      return new NextResponse('Title is required', { status: 400 });
    }

    const opportunity = await prisma.crossSellOpportunity.create({
      data: {
        title,
        description,
        sourceServiceId,
        targetServiceId,
        segmentId,
        probability: probability ? parseFloat(probability) : null,
        estimatedValue: estimatedValue ? parseFloat(estimatedValue) : null,
        isActive: true,
      }
    });

    return NextResponse.json(opportunity);
  } catch (error) {
    console.error('[CROSS_SELL_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const opportunities = await prisma.crossSellOpportunity.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        segment: true
      }
    });

    return NextResponse.json(opportunities);
  } catch (error) {
    console.error('[CROSS_SELL_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
