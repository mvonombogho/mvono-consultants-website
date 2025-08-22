import { auth } from '../../../../../../../lib/auth';
import prisma from '../../../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; metricId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.metricId) {
      return new NextResponse('Metric ID is required', { status: 400 });
    }

    const metric = await prisma.campaignMetric.delete({
      where: {
        id: params.metricId
      }
    });

    return NextResponse.json(metric);
  } catch (error) {
    console.error('[CAMPAIGN_METRIC_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; metricId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.metricId) {
      return new NextResponse('Metric ID is required', { status: 400 });
    }

    const body = await request.json();
    const { metricName, metricValue, metricDate } = body;

    if (!metricName || metricValue === undefined || !metricDate) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const metric = await prisma.campaignMetric.update({
      where: {
        id: params.metricId
      },
      data: {
        metricName,
        metricValue: parseFloat(metricValue),
        metricDate: new Date(metricDate)
      }
    });

    return NextResponse.json(metric);
  } catch (error) {
    console.error('[CAMPAIGN_METRIC_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
