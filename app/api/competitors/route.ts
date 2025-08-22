import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

// GET handler to fetch all competitors
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    // Query all competitors with related notes and deal opportunities
    const competitors = await prisma.competitor.findMany({
      include: {
        notes: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5, // Include only the 5 most recent notes
        },
        dealOpportunities: {
          select: {
            id: true,
            title: true,
            status: true,
            value: true,
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
          take: 10, // Include only the 10 most recent deal opportunities
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json({ success: true, competitors });
  } catch (error) {
    console.error("Error fetching competitors:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch competitors" },
      { status: 500 }
    );
  }
}

// POST handler to create a new competitor
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
    if (!body.name) {
      return NextResponse.json(
        { success: false, message: "Competitor name is required" },
        { status: 400 }
      );
    }
    
    // Create the competitor
    const newCompetitor = await prisma.competitor.create({
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
    
    // If initial note is provided, create it
    if (body.initialNote) {
      await prisma.competitorNote.create({
        data: {
          competitorId: newCompetitor.id,
          title: 'Initial Note',
          content: body.initialNote,
          createdById: session.user.id,
        },
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Competitor created successfully",
      competitor: newCompetitor 
    });
  } catch (error) {
    console.error("Error creating competitor:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create competitor" },
      { status: 500 }
    );
  }
}
