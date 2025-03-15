import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const isActive = searchParams.get('isActive');

    let whereClause: any = {};
    
    if (isActive !== null) {
      whereClause.isActive = isActive === 'true';
    }

    const segments = await prisma.customerSegment.findMany({
      where: whereClause,
      include: {
        clients: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            clients: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Transform the results to include segment size
    const transformedSegments = segments.map(segment => ({
      ...segment,
      segmentSize: segment._count.clients,
      _count: undefined,
    }));

    return NextResponse.json(transformedSegments);
  } catch (error) {
    console.error('Error fetching segments:', error);
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
    if (!data.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Initialize client IDs if provided
    const clientIds = Array.isArray(data.clientIds) ? data.clientIds : [];

    // Create the segment
    const segment = await prisma.customerSegment.create({
      data: {
        name: data.name,
        description: data.description || null,
        criteria: data.criteria || null,
        isActive: data.isActive !== false, // Default to true if not explicitly set to false
        tags: data.tags || null,
        clients: {
          connect: clientIds.map((id: string) => ({ id })),
        },
      },
      include: {
        clients: true,
        _count: {
          select: {
            clients: true,
          },
        },
      },
    });

    // Transform the result to include segment size
    const transformedSegment = {
      ...segment,
      segmentSize: segment._count.clients,
      _count: undefined,
    };

    return NextResponse.json(transformedSegment, { status: 201 });
  } catch (error) {
    console.error('Error creating segment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
