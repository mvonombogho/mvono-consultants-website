export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

// GET /api/services - Get all services
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all services
    const services = await prisma.service.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: Request) {
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

    // Create new service
    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description || null,
        category: data.category,
        price: typeof data.price === 'number' ? data.price : null,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the service' },
      { status: 500 }
    );
  }
}
