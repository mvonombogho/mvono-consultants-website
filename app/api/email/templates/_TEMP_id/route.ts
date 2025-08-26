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
      return new NextResponse('Template ID is required', { status: 400 });
    }

    const template = await prisma.emailTemplate.findUnique({
      where: {
        id: params.id
      }
    });

    if (!template) {
      return new NextResponse('Template not found', { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('[EMAIL_TEMPLATE_GET]', error);
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
      return new NextResponse('Template ID is required', { status: 400 });
    }

    const body = await request.json();
    const { name, subject, body: templateBody, templateType, isActive } = body;

    const template = await prisma.emailTemplate.update({
      where: {
        id: params.id
      },
      data: {
        name,
        subject,
        body: templateBody,
        templateType,
        isActive
      }
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('[EMAIL_TEMPLATE_UPDATE]', error);
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
      return new NextResponse('Template ID is required', { status: 400 });
    }

    const template = await prisma.emailTemplate.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('[EMAIL_TEMPLATE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
