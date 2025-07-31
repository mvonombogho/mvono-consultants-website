import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/documents - Get all documents with filtering options
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const clientId = searchParams.get('clientId');
    const projectId = searchParams.get('projectId');
    const search = searchParams.get('search');
    
    // Build filter conditions
    const whereConditions: any = {};
    
    if (category) {
      whereConditions.category = category;
    }
    
    if (clientId) {
      whereConditions.clientId = clientId;
    }
    
    if (projectId) {
      whereConditions.projectId = projectId;
    }
    
    if (search) {
      whereConditions.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { fileName: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const documents = await prisma.document.findMany({
      where: whereConditions,
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}

// POST /api/documents - Create a new document
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.fileName || !body.fileUrl || !body.fileType || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    const document = await prisma.document.create({
      data: {
        title: body.title,
        description: body.description,
        fileName: body.fileName,
        fileUrl: body.fileUrl,
        fileType: body.fileType,
        fileSize: body.fileSize || 0,
        category: body.category,
        clientId: body.clientId || null,
        projectId: body.projectId || null,
        invoiceId: body.invoiceId || null,
        subcontractorId: body.subcontractorId || null,
        expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
        tags: body.tags || null,
        uploadedById: body.uploadedById || 'system',
      },
    });
    
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }
}
