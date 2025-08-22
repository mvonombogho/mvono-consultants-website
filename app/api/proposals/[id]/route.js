import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '../../../../lib/prisma';

// GET /api/proposals/[id] - Get a specific proposal
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            contactPerson: true,
            phone: true,
            address: true,
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
            value: true,
          },
        },
        document: {
          select: {
            id: true,
            title: true,
            fileName: true,
            fileUrl: true,
            fileType: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    return NextResponse.json(proposal);
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return NextResponse.json({ error: 'Failed to fetch proposal' }, { status: 500 });
  }
}

// PUT /api/proposals/[id] - Update a proposal
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();

    // Check if proposal exists
    const existingProposal = await prisma.proposal.findUnique({
      where: { id },
    });

    if (!existingProposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    // Check if we need to create a new version
    let version = existingProposal.version;
    if (data.createNewVersion) {
      version += 1;
    }

    // Prepare update data
    const updateData = {
      title: data.title,
      status: data.status,
      version,
      dealId: data.dealId,
      clientId: data.clientId,
      content: data.content,
      sentDate: data.sentDate ? new Date(data.sentDate) : existingProposal.sentDate,
      validUntil: data.validUntil ? new Date(data.validUntil) : existingProposal.validUntil,
      totalValue: data.totalValue ? parseFloat(data.totalValue) : existingProposal.totalValue,
      notes: data.notes,
      feedback: data.feedback,
      documentId: data.documentId,
    };

    // Update proposal
    const updatedProposal = await prisma.proposal.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json({ error: 'Failed to update proposal' }, { status: 500 });
  }
}

// DELETE /api/proposals/[id] - Delete a proposal
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Check if proposal exists
    const proposal = await prisma.proposal.findUnique({
      where: { id },
    });

    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    // Delete proposal
    await prisma.proposal.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Proposal deleted successfully' });
  } catch (error) {
    console.error('Error deleting proposal:', error);
    return NextResponse.json({ error: 'Failed to delete proposal' }, { status: 500 });
  }
}
