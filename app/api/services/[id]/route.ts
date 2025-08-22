import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/services/[id] - Get a single service
export async function GET(request: Request, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the service
    const service = await prisma.service.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the service' },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update a service
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.category) {
      return NextResponse.json(
        { error: 'Service name and category are required' },
        { status: 400 }
      );
    }

    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingService) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Update service
    const updatedService = await prisma.service.update({
      where: {
        id: params.id,
      },
      data: {
        name: data.name,
        description: data.description || null,
        category: data.category,
        price: typeof data.price === 'number' ? data.price : null,
        isActive: data.isActive !== undefined ? data.isActive : existingService.isActive,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the service' },
      { status: 500 }
    );
  }
}

// PATCH /api/services/[id] - Partial update (e.g., toggle status)
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const data = await request.json();
    
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingService) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Update service with partial data
    const updatedService = await prisma.service.update({
      where: {
        id: params.id,
      },
      data,
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the service' },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete a service
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingService) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Delete service
    await prisma.service.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the service' },
      { status: 500 }
    );
  }
}
