import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { campaignId: string; contentId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.contentId) {
      return new NextResponse('Content ID is required', { status: 400 });
    }

    const body = await request.json();
    const { metricName, metricValue, metricDate } = body;

    if (!metricName || metricValue === undefined || !metricDate) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const contentItem = await prisma.campaignContent.findUnique({
      where: {
        id: params.contentId
      }
    });

    if (!contentItem) {
      return new NextResponse('Content not found', { status: 404 });
    }

    const metric = await prisma.contentMetric.create({
      data: {
        metricName,
        metricValue: parseFloat(metricValue),
        metricDate: new Date(metricDate),
        contentId: params.contentId
      }
    });

    return NextResponse.json(metric);
  } catch (error) {
    console.error('[CONTENT_METRIC_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { campaignId: string; contentId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.contentId) {
      return new NextResponse('Content ID is required', { status: 400 });
    }

    const metrics = await prisma.contentMetric.findMany({
      where: {
        contentId: params.contentId
      },
      orderBy: {
        metricDate: 'desc'
      }
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('[CONTENT_METRICS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
