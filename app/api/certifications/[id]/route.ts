import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET handler to fetch a specific certification
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
    
    // Query the specific certification
    const certification = await prisma.certification.findUnique({
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
        document: {
          select: {
            id: true,
            title: true,
            fileName: true,
            fileUrl: true,
            fileType: true,
          },
        },
      },
    });
    
    if (!certification) {
      return NextResponse.json(
        { success: false, message: "Certification not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, certification });
  } catch (error) {
    console.error("Error fetching certification:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch certification" },
      { status: 500 }
    );
  }
}

// PUT handler to update a specific certification
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
    if (!body.title || !body.issueDate || !body.expiryDate || !body.clientId || !body.certType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if the certification exists
    const existingCertification = await prisma.certification.findUnique({
      where: { id },
    });
    
    if (!existingCertification) {
      return NextResponse.json(
        { success: false, message: "Certification not found" },
        { status: 404 }
      );
    }
    
    // Update the certification
    const updatedCertification = await prisma.certification.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description || '',
        certType: body.certType,
        issueDate: new Date(body.issueDate),
        expiryDate: new Date(body.expiryDate),
        status: body.status || 'active',
        clientId: body.clientId,
        documentId: body.documentId || null,
        reminderSent: body.reminderSent || false,
        notes: body.notes || '',
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Certification updated successfully",
      certification: updatedCertification
    });
  } catch (error) {
    console.error("Error updating certification:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update certification" },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a specific certification
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
    
    // Check if the certification exists
    const existingCertification = await prisma.certification.findUnique({
      where: { id },
    });
    
    if (!existingCertification) {
      return NextResponse.json(
        { success: false, message: "Certification not found" },
        { status: 404 }
      );
    }
    
    // Delete the certification
    await prisma.certification.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Certification deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete certification" },
      { status: 500 }
    );
  }
}
