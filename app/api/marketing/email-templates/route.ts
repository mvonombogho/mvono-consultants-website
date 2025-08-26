export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');
    const isActive = searchParams.get('isActive');

    let whereClause: any = {};
    
    if (type) {
      // Handle comma-separated type values
      if (type.includes(',')) {
        whereClause.templateType = { in: type.split(',') };
      } else {
        whereClause.templateType = type;
      }
    }

    if (isActive !== null) {
      whereClause.isActive = isActive === 'true';
    }

    const templates = await prisma.emailTemplate.findMany({
      where: whereClause,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching email templates:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.subject || !data.body || !data.templateType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the email template
    const template = await prisma.emailTemplate.create({
      data: {
        name: data.name,
        subject: data.subject,
        body: data.body,
        templateType: data.templateType,
        isActive: data.isActive !== false, // Default to true if not explicitly set to false
      },
    });

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error('Error creating email template:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
