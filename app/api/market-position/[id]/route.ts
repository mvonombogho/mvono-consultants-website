import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';

// GET handler to fetch a specific market position
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    const id = params.id;
    
    // Query the specific market position
    const marketPosition = await prisma.marketPosition.findUnique({
      where: { id },
    });
    
    if (!marketPosition) {
      return NextResponse.json(
        { success: false, message: "Market position not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, marketPosition });
  } catch (error) {
    console.error("Error fetching market position:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch market position" },
      { status: 500 }
    );
  }
}

// PUT handler to update a specific market position
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    const id = params.id;
    const body = await req.json();
    
    // Validate required fields
    if (!body.year || !body.quarter || !body.industry || body.marketSize === undefined || body.companyShare === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if the market position exists
    const existingPosition = await prisma.marketPosition.findUnique({
      where: { id },
    });
    
    if (!existingPosition) {
      return NextResponse.json(
        { success: false, message: "Market position not found" },
        { status: 404 }
      );
    }
    
    // Check if updating to a combination that already exists (exclude current record)
    if (existingPosition.year !== body.year || 
        existingPosition.quarter !== body.quarter || 
        existingPosition.industry !== body.industry) {
      
      const duplicatePosition = await prisma.marketPosition.findFirst({
        where: {
          year: body.year,
          quarter: body.quarter,
          industry: body.industry,
          id: { not: id }
        },
      });
      
      if (duplicatePosition) {
        return NextResponse.json(
          { 
            success: false, 
            message: `A market position for ${body.industry} in Q${body.quarter} ${body.year} already exists` 
          },
          { status: 409 }
        );
      }
    }
    
    // Update the market position
    const updatedMarketPosition = await prisma.marketPosition.update({
      where: { id },
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
      message: "Market position updated successfully",
      marketPosition: updatedMarketPosition
    });
  } catch (error) {
    console.error("Error updating market position:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update market position" },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a specific market position
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    const id = params.id;
    
    // Check if the market position exists
    const existingPosition = await prisma.marketPosition.findUnique({
      where: { id },
    });
    
    if (!existingPosition) {
      return NextResponse.json(
        { success: false, message: "Market position not found" },
        { status: 404 }
      );
    }
    
    // Delete the market position
    await prisma.marketPosition.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Market position deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting market position:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete market position" },
      { status: 500 }
    );
  }
}
