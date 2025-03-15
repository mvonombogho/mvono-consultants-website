import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Retrieve a specific market position entry
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    const marketPosition = await prisma.marketPosition.findUnique({
      where: { id },
    });
    
    if (!marketPosition) {
      return NextResponse.json({ error: 'Market position not found' }, { status: 404 });
    }
    
    return NextResponse.json(marketPosition);
  } catch (error) {
    console.error('Error fetching market position:', error);
    return NextResponse.json({ error: 'Failed to fetch market position' }, { status: 500 });
  }
}

// PUT: Update a market position entry
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    const data = await req.json();
    
    // Check if market position exists
    const existingPosition = await prisma.marketPosition.findUnique({
      where: { id },
    });
    
    if (!existingPosition) {
      return NextResponse.json({ error: 'Market position not found' }, { status: 404 });
    }
    
    // Update market position
    const updatedPosition = await prisma.marketPosition.update({
      where: { id },
      data: {
        year: data.year,
        quarter: data.quarter,
        industry: data.industry,
        marketSize: data.marketSize,
        companyShare: data.companyShare,
        topCompetitors: data.topCompetitors,
        growthRate: data.growthRate,
        notes: data.notes,
      },
    });
    
    return NextResponse.json(updatedPosition);
  } catch (error) {
    console.error('Error updating market position:', error);
    return NextResponse.json({ error: 'Failed to update market position' }, { status: 500 });
  }
}

// DELETE: Remove a market position entry
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    // Check if market position exists
    const existingPosition = await prisma.marketPosition.findUnique({
      where: { id },
    });
    
    if (!existingPosition) {
      return NextResponse.json({ error: 'Market position not found' }, { status: 404 });
    }
    
    // Delete market position
    await prisma.marketPosition.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Market position deleted successfully' });
  } catch (error) {
    console.error('Error deleting market position:', error);
    return NextResponse.json({ error: 'Failed to delete market position' }, { status: 500 });
  }
}
