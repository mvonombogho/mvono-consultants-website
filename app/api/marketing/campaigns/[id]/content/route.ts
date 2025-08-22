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
    const { title, contentType, description, content, status, scheduledDate } = body;

    if (!title || !contentType || !status) {
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

    const contentItem = await prisma.campaignContent.create({
      data: {
        title,
        contentType,
        description,
        content,
        status,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        publishedDate: status === 'published' ? new Date() : null,
        campaignId: params.id
      }
    });

    return NextResponse.json(contentItem);
  } catch (error) {
    console.error('[CAMPAIGN_CONTENT_POST]', error);
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

    const contentItems = await prisma.campaignContent.findMany({
      where: {
        campaignId: params.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        metrics: true
      }
    });

    return NextResponse.json(contentItems);
  } catch (error) {
    console.error('[CAMPAIGN_CONTENT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
