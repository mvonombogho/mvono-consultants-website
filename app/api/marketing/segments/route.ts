import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/marketing/segments - Get all segments
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const segments = await prisma.customerSegment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { clients: true }
        },
        clients: {
          select: { id: true }
        }
      }
    });
    
    // Transform data to include segmentSize
    const transformedSegments = segments.map(segment => ({
      ...segment,
      segmentSize: segment._count.clients,
      clients: undefined,
      _count: undefined
    }));
    
    return NextResponse.json(transformedSegments);
  } catch (error) {
    console.error('Error fetching segments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch segments' },
      { status: 500 }
    );
  }
}

// POST /api/marketing/segments - Create a new segment
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await req.json();
    
    // Parse criteria to find clients that match the criteria
    const criteriaObj = JSON.parse(data.criteria);
    
    // Build queries for client filtering based on criteria
    let clientWhere: any = {};
    
    // Process each criteria field
    Object.entries(criteriaObj).forEach(([key, value]) => {
      // Simple equals for now, could be expanded with operators
      clientWhere[key] = value;
    });
    
    // Find matching clients
    const matchingClients = await prisma.client.findMany({
      where: clientWhere,
      select: { id: true }
    });
    
    // Extract client IDs
    const clientIds = matchingClients.map(client => ({ id: client.id }));
    
    // Create segment with connected clients
    const segment = await prisma.customerSegment.create({
      data: {
        name: data.name,
        description: data.description || '',
        criteria: data.criteria,
        isActive: data.isActive,
        tags: data.tags || '',
        clients: {
          connect: clientIds
        }
      },
      include: {
        _count: {
          select: { clients: true }
        }
      }
    });
    
    // Return segment with count of connected clients
    return NextResponse.json({
      ...segment,
      segmentSize: segment._count.clients,
      _count: undefined
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating segment:', error);
    return NextResponse.json(
      { error: 'Failed to create segment' },
      { status: 500 }
    );
  }
}
