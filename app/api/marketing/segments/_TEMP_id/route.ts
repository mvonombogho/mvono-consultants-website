import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';

const prisma = new PrismaClient();

// GET /api/marketing/segments/[id] - Get a single segment
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    const segment = await prisma.customerSegment.findUnique({
      where: { id },
      include: {
        clients: true,
        campaigns: {
          select: {
            id: true,
            name: true,
            campaignType: true,
            status: true,
            startDate: true,
            endDate: true
          }
        }
      }
    });
    
    if (!segment) {
      return NextResponse.json(
        { error: 'Segment not found' },
        { status: 404 }
      );
    }
    
    // Add segment size
    const segmentWithSize = {
      ...segment,
      segmentSize: segment.clients.length
    };
    
    return NextResponse.json(segmentWithSize);
  } catch (error) {
    console.error('Error fetching segment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch segment' },
      { status: 500 }
    );
  }
}

// PUT /api/marketing/segments/[id] - Update a segment
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    const data = await req.json();
    
    // Check if segment exists
    const existingSegment = await prisma.customerSegment.findUnique({
      where: { id },
      include: {
        clients: {
          select: { id: true }
        }
      }
    });
    
    if (!existingSegment) {
      return NextResponse.json(
        { error: 'Segment not found' },
        { status: 404 }
      );
    }
    
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
    
    // Get current client IDs
    const currentClientIds = existingSegment.clients.map(client => client.id);
    
    // Get new client IDs
    const newClientIds = matchingClients.map(client => client.id);
    
    // Determine clients to disconnect (in current but not in new)
    const clientsToDisconnect = currentClientIds.filter(id => !newClientIds.includes(id))
      .map(id => ({ id }));
    
    // Determine clients to connect (in new but not in current)
    const clientsToConnect = newClientIds.filter(id => !currentClientIds.includes(id))
      .map(id => ({ id }));
    
    // Update segment with new data and client connections
    const updatedSegment = await prisma.customerSegment.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || '',
        criteria: data.criteria,
        isActive: data.isActive,
        tags: data.tags || '',
        updatedAt: new Date(),
        clients: {
          disconnect: clientsToDisconnect,
          connect: clientsToConnect
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
      ...updatedSegment,
      segmentSize: updatedSegment._count.clients,
      _count: undefined
    });
  } catch (error) {
    console.error('Error updating segment:', error);
    return NextResponse.json(
      { error: 'Failed to update segment' },
      { status: 500 }
    );
  }
}

// DELETE /api/marketing/segments/[id] - Delete a segment
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    // Check if segment exists
    const existingSegment = await prisma.customerSegment.findUnique({
      where: { id },
      include: {
        campaigns: true
      }
    });
    
    if (!existingSegment) {
      return NextResponse.json(
        { error: 'Segment not found' },
        { status: 404 }
      );
    }
    
    // Check if segment is used in any campaigns
    if (existingSegment.campaigns.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete segment that is used in campaigns',
          campaigns: existingSegment.campaigns
        },
        { status: 400 }
      );
    }
    
    // Delete the segment
    await prisma.customerSegment.delete({
      where: { id }
    });
    
    return NextResponse.json(
      { message: 'Segment deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting segment:', error);
    return NextResponse.json(
      { error: 'Failed to delete segment' },
      { status: 500 }
    );
  }
}
