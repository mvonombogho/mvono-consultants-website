export const dynamic = 'force-dynamic';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

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

    const contentItem = await prisma.campaignContent.findUnique({
      where: {
        id: params.contentId
      },
      include: {
        metrics: true
      }
    });

    if (!contentItem) {
      return new NextResponse('Content not found', { status: 404 });
    }

    return NextResponse.json(contentItem);
  } catch (error) {
    console.error('[CAMPAIGN_CONTENT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
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
    const { title, contentType, description, content, status, scheduledDate } = body;

    const contentItem = await prisma.campaignContent.findUnique({
      where: {
        id: params.contentId
      }
    });

    if (!contentItem) {
      return new NextResponse('Content not found', { status: 404 });
    }

    // Check if status is changing to 'published'
    const isPublishing = contentItem.status !== 'published' && status === 'published';

    const updatedContent = await prisma.campaignContent.update({
      where: {
        id: params.contentId
      },
      data: {
        title,
        contentType,
        description,
        content,
        status,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        // Update published date if status changes to published
        publishedDate: isPublishing ? new Date() : contentItem.publishedDate
      }
    });

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('[CAMPAIGN_CONTENT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
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

    // Delete related metrics first
    await prisma.contentMetric.deleteMany({
      where: {
        contentId: params.contentId
      }
    });

    // Then delete the content
    const contentItem = await prisma.campaignContent.delete({
      where: {
        id: params.contentId
      }
    });

    return NextResponse.json(contentItem);
  } catch (error) {
    console.error('[CAMPAIGN_CONTENT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
