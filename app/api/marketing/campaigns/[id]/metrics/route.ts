import { auth } from '../../../../../../lib/auth';
import prisma from '../../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.id) {
      return new NextResponse('Campaign ID is required', { status: 400 });
    }

    const body = await request.json();
    const { metricName, metricValue, metricDate } = body;

    if (!metricName || metricValue === undefined || !metricDate) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const campaign = await prisma.marketingCampaign.findUnique({
      where: {
        id: params.id
      }
    });

    if (!campaign) {
      return new NextResponse('Campaign not found', { status: 404 });
    }

    const metric = await prisma.campaignMetric.create({
      data: {
        metricName,
        metricValue: parseFloat(metricValue),
        metricDate: new Date(metricDate),
        campaignId: params.id
      }
    });

    return NextResponse.json(metric);
  } catch (error) {
    console.error('[CAMPAIGN_METRIC_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

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
      return new NextResponse('Campaign ID is required', { status: 400 });
    }

    const metrics = await prisma.campaignMetric.findMany({
      where: {
        campaignId: params.id
      },
      orderBy: {
        metricDate: 'desc'
      }
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('[CAMPAIGN_METRICS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
