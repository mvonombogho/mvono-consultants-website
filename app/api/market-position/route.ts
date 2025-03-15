import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Retrieve market position data
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const year = url.searchParams.get('year');
    const quarter = url.searchParams.get('quarter');
    const industry = url.searchParams.get('industry');
    
    let whereClause: any = {};
    
    if (year) {
      whereClause.year = parseInt(year);
    }
    
    if (quarter) {
      whereClause.quarter = parseInt(quarter);
    }
    
    if (industry) {
      whereClause.industry = industry;
    }
    
    const marketPositions = await prisma.marketPosition.findMany({
      where: whereClause,
      orderBy: [
        { year: 'desc' },
        { quarter: 'desc' },
      ],
    });
    
    return NextResponse.json(marketPositions);
  } catch (error) {
    console.error('Error fetching market positions:', error);
    return NextResponse.json({ error: 'Failed to fetch market positions' }, { status: 500 });
  }
}

// POST: Create a new market position entry
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await req.json();
    
    // Validate required fields
    if (typeof data.year !== 'number' || typeof data.quarter !== 'number' || !data.industry || typeof data.marketSize !== 'number' || typeof data.companyShare !== 'number') {
      return NextResponse.json(
        { error: 'Missing or invalid required fields: year, quarter, industry, marketSize, and companyShare are required' },
        { status: 400 }
      );
    }
    
    // Check if entry already exists for this year/quarter/industry
    const existingEntry = await prisma.marketPosition.findFirst({
      where: {
        year: data.year,
        quarter: data.quarter,
        industry: data.industry,
      },
    });
    
    if (existingEntry) {
      return NextResponse.json(
        { error: 'A market position entry already exists for this year, quarter, and industry' },
        { status: 409 } // Conflict
      );
    }
    
    // Create new market position entry
    const newMarketPosition = await prisma.marketPosition.create({
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
    
    return NextResponse.json(newMarketPosition, { status: 201 });
  } catch (error) {
    console.error('Error creating market position:', error);
    return NextResponse.json({ error: 'Failed to create market position' }, { status: 500 });
  }
}
