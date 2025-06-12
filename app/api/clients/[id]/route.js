import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db/mongodb';
import Client from '../../../../models/Client';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await dbConnect();
    
    const client = await Client.findById(id);
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    await dbConnect();
    
    const client = await Client.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(client);
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await dbConnect();
    
    const client = await Client.findByIdAndDelete(id);
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
