import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import ClientModel from '@/models/mongoose/Client';

// GET - Fetch all clients from MongoDB
export async function GET() {
  try {
    await connectMongoDB();
    const clients = await ClientModel.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: clients,
      count: clients.length
    });
  } catch (error) {
    console.error('MongoDB GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST - Create a new client in MongoDB
export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const body = await request.json();
    
    const client = await ClientModel.create(body);
    
    return NextResponse.json({
      success: true,
      data: client
    }, { status: 201 });
  } catch (error) {
    console.error('MongoDB POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create client' },
      { status: 500 }
    );
  }
}
