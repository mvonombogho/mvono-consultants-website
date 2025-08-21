import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth-options";
import prisma from "../../../lib/prisma";

// GET handler to fetch all certifications
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    // Query all certifications with client and document information
    const certifications = await prisma.certification.findMany({
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
      orderBy: {
        expiryDate: 'asc',
      },
    });
    
    return NextResponse.json({ success: true, certifications });
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch certifications" },
      { status: 500 }
    );
  }
}

// POST handler to create a new certification
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
    if (!body.title || !body.issueDate || !body.expiryDate || !body.clientId || !body.certType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create the certification
    const newCertification = await prisma.certification.create({
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
      message: "Certification created successfully",
      certification: newCertification 
    });
  } catch (error) {
    console.error("Error creating certification:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create certification" },
      { status: 500 }
    );
  }
}
