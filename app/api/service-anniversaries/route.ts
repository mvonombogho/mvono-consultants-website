export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

// GET handler to fetch all service anniversaries
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }
    
    // Query all service anniversaries with client and service information
    const anniversaries = await prisma.serviceAnniversary.findMany({
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
      orderBy: {
        anniversaryDate: 'asc',
      },
    });
    
    return NextResponse.json({ success: true, anniversaries });
  } catch (error) {
    console.error("Error fetching service anniversaries:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch service anniversaries" },
      { status: 500 }
    );
  }
}

// POST handler to create a new service anniversary
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
    if (!body.title || !body.anniversaryDate || !body.clientId || !body.serviceId || !body.yearsOfService) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create the service anniversary
    const newAnniversary = await prisma.serviceAnniversary.create({
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
      message: "Service anniversary created successfully",
      anniversary: newAnniversary 
    });
  } catch (error) {
    console.error("Error creating service anniversary:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create service anniversary" },
      { status: 500 }
    );
  }
}
