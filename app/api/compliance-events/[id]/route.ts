export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

// GET handler to fetch a specific compliance event
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
    
    // Query the specific compliance event
    const event = await prisma.complianceEvent.findUnique({
      where: { id },
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
    });
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Compliance event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Error fetching compliance event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch compliance event" },
      { status: 500 }
    );
  }
}

// PUT handler to update a specific compliance event
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
    if (!body.title || !body.dueDate || !body.clientId || !body.complianceType || !body.priority || !body.status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if the event exists
    const existingEvent = await prisma.complianceEvent.findUnique({
      where: { id },
    });
    
    if (!existingEvent) {
      return NextResponse.json(
        { success: false, message: "Compliance event not found" },
        { status: 404 }
      );
    }
    
    // Update the compliance event
    const updatedEvent = await prisma.complianceEvent.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description || '',
        complianceType: body.complianceType,
        dueDate: new Date(body.dueDate),
        status: body.status,
        priority: body.priority,
        clientId: body.clientId,
        notes: body.notes || '',
        completedDate: body.completedDate ? new Date(body.completedDate) : null,
        documentIds: body.documentIds || [],
        reminderSent: body.reminderSent || false,
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Compliance event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error updating compliance event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update compliance event" },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a specific compliance event
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
    
    // Check if the event exists
    const existingEvent = await prisma.complianceEvent.findUnique({
      where: { id },
    });
    
    if (!existingEvent) {
      return NextResponse.json(
        { success: false, message: "Compliance event not found" },
        { status: 404 }
      );
    }
    
    // Delete the compliance event
    await prisma.complianceEvent.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Compliance event deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting compliance event:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete compliance event" },
      { status: 500 }
    );
  }
}
