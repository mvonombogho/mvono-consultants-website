import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/clients/[id] - Get a specific client by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Get client with related invoices and projects
    const client = await db.client.findUnique({
      where: { id },
      include: {
        invoices: {
          orderBy: { issueDate: "desc" },
          take: 5,
        },
        projects: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Get client statistics
    const stats = {
      totalInvoices: await db.invoice.count({ where: { clientId: id } }),
      totalProjects: await db.project.count({ where: { clientId: id } }),
      totalRevenue: await db.invoice.aggregate({
        where: { clientId: id, status: "paid" },
        _sum: { totalAmount: true },
      }),
      pendingPayments: await db.invoice.aggregate({
        where: {
          clientId: id,
          status: { in: ["sent", "overdue"] },
        },
        _sum: { totalAmount: true },
      }),
    };

    return NextResponse.json({
      ...client,
      stats: {
        totalInvoices: stats.totalInvoices,
        totalProjects: stats.totalProjects,
        totalRevenue: stats.totalRevenue._sum.totalAmount || 0,
        pendingPayments: stats.pendingPayments._sum.totalAmount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { error: "Error fetching client" },
      { status: 500 }
    );
  }
}

// PUT /api/clients/[id] - Update a specific client
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const data = await req.json();

    // Check if client exists
    const existingClient = await db.client.findUnique({ where: { id } });
    if (!existingClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Update client
    const updatedClient = await db.client.update({
      where: { id },
      data: {
        name: data.name !== undefined ? data.name : existingClient.name,
        email: data.email !== undefined ? data.email : existingClient.email,
        phone: data.phone !== undefined ? data.phone : existingClient.phone,
        address: data.address !== undefined ? data.address : existingClient.address,
        kraPin: data.kraPin !== undefined ? data.kraPin : existingClient.kraPin,
        industry: data.industry !== undefined ? data.industry : existingClient.industry,
        contactPerson: data.contactPerson !== undefined ? data.contactPerson : existingClient.contactPerson,
        contactPosition: data.contactPosition !== undefined ? data.contactPosition : existingClient.contactPosition,
        notes: data.notes !== undefined ? data.notes : existingClient.notes,
      },
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Error updating client" },
      { status: 500 }
    );
  }
}

// DELETE /api/clients/[id] - Delete a specific client
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Check if client exists
    const existingClient = await db.client.findUnique({ where: { id } });
    if (!existingClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Check if client has associated invoices or projects
    const invoiceCount = await db.invoice.count({ where: { clientId: id } });
    const projectCount = await db.project.count({ where: { clientId: id } });

    if (invoiceCount > 0 || projectCount > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete client with associated invoices or projects",
          invoiceCount,
          projectCount,
        },
        { status: 400 }
      );
    }

    // Delete client
    await db.client.delete({ where: { id } });

    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Error deleting client" },
      { status: 500 }
    );
  }
}
