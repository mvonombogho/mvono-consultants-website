export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

// GET handler to fetch a specific competitor
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
    
    // Query the specific competitor with notes and deal opportunities
    const competitor = await prisma.competitor.findUnique({
      where: { id },
      include: {
        notes: {
          include: {
            createdBy: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        dealOpportunities: {
          select: {
            id: true,
            title: true,
            status: true,
            value: true,
            winProbability: true,
            closingDate: true,
            client: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    
    if (!competitor) {
      return NextResponse.json(
        { success: false, message: "Competitor not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, competitor });
  } catch (error) {
    console.error("Error fetching competitor:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch competitor" },
      { status: 500 }
    );
  }
}

// PUT handler to update a specific competitor
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
    if (!body.name) {
      return NextResponse.json(
        { success: false, message: "Competitor name is required" },
        { status: 400 }
      );
    }
    
    // Check if the competitor exists
    const existingCompetitor = await prisma.competitor.findUnique({
      where: { id },
    });
    
    if (!existingCompetitor) {
      return NextResponse.json(
        { success: false, message: "Competitor not found" },
        { status: 404 }
      );
    }
    
    // Update the competitor
    const updatedCompetitor = await prisma.competitor.update({
      where: { id },
      data: {
        name: body.name,
        website: body.website || '',
        industry: body.industry || '',
        description: body.description || '',
        strengths: body.strengths || '',
        weaknesses: body.weaknesses || '',
        services: body.services || '',
        marketShare: body.marketShare || null,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });
    
    // If a new note is provided, create it
    if (body.newNote) {
      await prisma.competitorNote.create({
        data: {
          competitorId: updatedCompetitor.id,
          title: body.newNoteTitle || 'Update Note',
          content: body.newNote,
          createdById: session.user.id,
        },
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Competitor updated successfully",
      competitor: updatedCompetitor
    });
  } catch (error) {
    console.error("Error updating competitor:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update competitor" },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a specific competitor
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
    
    // Check if the competitor exists
    const existingCompetitor = await prisma.competitor.findUnique({
      where: { id },
    });
    
    if (!existingCompetitor) {
      return NextResponse.json(
        { success: false, message: "Competitor not found" },
        { status: 404 }
      );
    }
    
    // Delete associated notes first
    await prisma.competitorNote.deleteMany({
      where: { competitorId: id },
    });
    
    // Then delete the competitor
    await prisma.competitor.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Competitor deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting competitor:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete competitor" },
      { status: 500 }
    );
  }
}
