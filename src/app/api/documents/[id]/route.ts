import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

type RouteParams = {
  params: {
    id: string;
  };
};

// GET /api/documents/:id - Get a specific document by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    
    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
          },
        },
        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
          },
        },
        subcontractor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    
    return NextResponse.json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
  }
}

// PATCH /api/documents/:id - Update a document
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    const body = await request.json();
    
    // Check if document exists
    const existingDocument = await prisma.document.findUnique({
      where: { id },
    });
    
    if (!existingDocument) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    
    // Update document
    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        description: body.description !== undefined ? body.description : undefined,
        fileName: body.fileName !== undefined ? body.fileName : undefined,
        fileUrl: body.fileUrl !== undefined ? body.fileUrl : undefined,
        fileType: body.fileType !== undefined ? body.fileType : undefined,
        fileSize: body.fileSize !== undefined ? body.fileSize : undefined,
        category: body.category !== undefined ? body.category : undefined,
        clientId: body.clientId !== undefined ? body.clientId : undefined,
        projectId: body.projectId !== undefined ? body.projectId : undefined,
        invoiceId: body.invoiceId !== undefined ? body.invoiceId : undefined,
        subcontractorId: body.subcontractorId !== undefined ? body.subcontractorId : undefined,
        expirationDate: body.expirationDate !== undefined 
          ? body.expirationDate ? new Date(body.expirationDate) : null 
          : undefined,
        tags: body.tags !== undefined ? body.tags : undefined,
      },
    });
    
    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  }
}

// DELETE /api/documents/:id - Delete a document
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    
    // Check if document exists
    const existingDocument = await prisma.document.findUnique({
      where: { id },
    });
    
    if (!existingDocument) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    
    // Delete document
    await prisma.document.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
