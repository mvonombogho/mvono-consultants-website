import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/clients/[id] - Get a specific client
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        invoices: true,
        projects: true,
      },
    });
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(client);
  } catch (error) {
    console.error(`Error fetching client ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

// PUT /api/clients/[id] - Update a client
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: 'Client name is required' },
        { status: 400 }
      );
    }
    
    // Check if client exists
    const existingClient = await prisma.client.findUnique({
      where: { id: params.id },
    });
    
    if (!existingClient) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    const updatedClient = await prisma.client.update({
      where: { id: params.id },
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
        kraPin: data.kraPin || null,
        industry: data.industry || null,
        contactPerson: data.contactPerson || null,
        contactPosition: data.contactPosition || null,
        notes: data.notes || null,
      },
    });
    
    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error(`Error updating client ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

// DELETE /api/clients/[id] - Delete a client
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if client exists
    const existingClient = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        invoices: true,
        projects: true,
      },
    });
    
    if (!existingClient) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    // Check for related data
    if (existingClient.invoices.length > 0 || existingClient.projects.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete client with existing invoices or projects' },
        { status: 400 }
      );
    }
    
    // Delete the client
    await prisma.client.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(`Error deleting client ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
