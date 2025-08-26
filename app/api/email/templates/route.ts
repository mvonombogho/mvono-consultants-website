export const dynamic = 'force-dynamic';
import { auth } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, subject, body: templateBody, templateType } = body;

    if (!name || !subject || !templateBody || !templateType) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const template = await prisma.emailTemplate.create({
      data: {
        name,
        subject,
        body: templateBody,
        templateType,
        isActive: true
      }
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('[EMAIL_TEMPLATE_CREATE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const searchParams = new URL(request.url).searchParams;
    const type = searchParams.get('type');

    const where = type ? { templateType: type, isActive: true } : { isActive: true };

    const templates = await prisma.emailTemplate.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('[EMAIL_TEMPLATES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
