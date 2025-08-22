import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

// GET handler to fetch all compliance events
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    // Query all compliance events with client information
    const events = await prisma.complianceEvent.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
    
    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching compliance events:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch compliance events" },
      { status: 500 }
    );
  }
}

// POST handler to create a new compliance event
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
    if (!body.title || !body.dueDate || !body.clientId || !body.complianceType || !body.priority || !body.status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create the compliance event
    const newEvent = await prisma.complianceEvent.create({
      data: {
        title: body.title,
        description: body.description || '',
        complianceType: body.complianceType,
        dueDate: new Date(body.dueDate),
        status: body.status,
        priority: body.priority,
        clientId: body.clientId,
        createdById: session.user.id,
        notes: body.notes || '',
        completedDate: body.completedDate ? new Date(body.completedDate) : null,
        documentIds: body.documentIds || [],
        reminderSent: body.reminderSent || false,
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Compliance event created successfully",
      event: newEvent 
    });
  } catch (error) {
    console.error("Error creating compliance event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create compliance event" },
      { status: 500 }
    );
  }
}
