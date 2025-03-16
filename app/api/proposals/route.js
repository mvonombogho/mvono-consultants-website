import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// Helper function to generate a unique proposal number
async function generateUniqueProposalNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  // Get the count of proposals this month to use as a sequence
  const proposalCount = await prisma.proposal.count({
    where: {
      createdAt: {
        gte: new Date(date.getFullYear(), date.getMonth(), 1),
        lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      },
    },
  });

  // Format: PROP-YY-MM-XXXX where XXXX is a 4-digit sequence number
  const sequence = (proposalCount + 1).toString().padStart(4, '0');
  return `PROP-${year}-${month}-${sequence}`;
}

// GET /api/proposals - Get all proposals
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const clientId = searchParams.get('clientId');
    const dealId = searchParams.get('dealId');
    const search = searchParams.get('search') || '';

    const filters = {};

    if (status) filters.status = status;
    if (clientId) filters.clientId = clientId;
    if (dealId) filters.dealId = dealId;

    const proposals = await prisma.proposal.findMany({
      where: {
        ...filters,
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { proposalNumber: { contains: search, mode: 'insensitive' } },
        ],
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            contactPerson: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        deal: {
          select: {
            id: true,
            title: true,
            stage: true,
          },
        },
        document: {
          select: {
            id: true,
            title: true,
            fileName: true,
            fileUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json({ error: 'Failed to fetch proposals' }, { status: 500 });
  }
}

// POST /api/proposals - Create a new proposal
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.status || !data.totalValue) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate a unique proposal number
    const proposalNumber = await generateUniqueProposalNumber();

    const proposal = await prisma.proposal.create({
      data: {
        title: data.title,
        proposalNumber,
        status: data.status,
        version: 1, // Initial version
        dealId: data.dealId,
        clientId: data.clientId,
        createdById: session.user.id,
        content: data.content,
        sentDate: data.sentDate ? new Date(data.sentDate) : null,
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
        totalValue: parseFloat(data.totalValue),
        notes: data.notes,
        documentId: data.documentId,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        deal: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 500 });
  }
}
