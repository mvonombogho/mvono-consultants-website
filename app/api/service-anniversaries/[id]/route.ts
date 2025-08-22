import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';

// GET handler to fetch a specific service anniversary
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
    
    // Query the specific service anniversary
    const anniversary = await prisma.serviceAnniversary.findUnique({
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
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
          },
        },
      },
    });
    
    if (!anniversary) {
      return NextResponse.json(
        { success: false, message: "Service anniversary not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, anniversary });
  } catch (error) {
    console.error("Error fetching service anniversary:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch service anniversary" },
      { status: 500 }
    );
  }
}

// PUT handler to update a specific service anniversary
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
    if (!body.title || !body.anniversaryDate || !body.clientId || !body.serviceId || !body.yearsOfService) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if the anniversary exists
    const existingAnniversary = await prisma.serviceAnniversary.findUnique({
      where: { id },
    });
    
    if (!existingAnniversary) {
      return NextResponse.json(
        { success: false, message: "Service anniversary not found" },
        { status: 404 }
      );
    }
    
    // Update the service anniversary
    const updatedAnniversary = await prisma.serviceAnniversary.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description || '',
        anniversaryDate: new Date(body.anniversaryDate),
        serviceId: body.serviceId,
        clientId: body.clientId,
        yearsOfService: body.yearsOfService,
        status: body.status || 'upcoming',
        notes: body.notes || '',
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Service anniversary updated successfully",
      anniversary: updatedAnniversary
    });
  } catch (error) {
    console.error("Error updating service anniversary:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update service anniversary" },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a specific service anniversary
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
    
    // Check if the anniversary exists
    const existingAnniversary = await prisma.serviceAnniversary.findUnique({
      where: { id },
    });
    
    if (!existingAnniversary) {
      return NextResponse.json(
        { success: false, message: "Service anniversary not found" },
        { status: 404 }
      );
    }
    
    // Delete the service anniversary
    await prisma.serviceAnniversary.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Service anniversary deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting service anniversary:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete service anniversary" },
      { status: 500 }
    );
  }
}
