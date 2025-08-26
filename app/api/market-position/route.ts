export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

// GET handler to fetch all market positions
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    // Query all market positions
    const marketPositions = await prisma.marketPosition.findMany({
      orderBy: [
        {
          year: 'desc',
        },
        {
          quarter: 'desc',
        },
      ],
    });
    
    return NextResponse.json({ success: true, marketPositions });
  } catch (error) {
    console.error("Error fetching market positions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch market positions" },
      { status: 500 }
    );
  }
}

// POST handler to create a new market position
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    
    // Validate required fields
    if (!body.year || !body.quarter || !body.industry || body.marketSize === undefined || body.companyShare === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if a market position already exists for this year, quarter, and industry
    const existingPosition = await prisma.marketPosition.findFirst({
      where: {
        year: body.year,
        quarter: body.quarter,
        industry: body.industry,
      },
    });
    
    if (existingPosition) {
      return NextResponse.json(
        { 
          success: false, 
          message: `A market position for ${body.industry} in Q${body.quarter} ${body.year} already exists` 
        },
        { status: 409 }
      );
    }
    
    // Create the market position
    const newMarketPosition = await prisma.marketPosition.create({
      data: {
        year: body.year,
        quarter: body.quarter,
        industry: body.industry,
        marketSize: body.marketSize,
        companyShare: body.companyShare,
        growthRate: body.growthRate || 0,
        topCompetitors: body.topCompetitors || '[]',
        notes: body.notes || '',
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Market position created successfully",
      marketPosition: newMarketPosition 
    });
  } catch (error) {
    console.error("Error creating market position:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create market position" },
      { status: 500 }
    );
  }
}
