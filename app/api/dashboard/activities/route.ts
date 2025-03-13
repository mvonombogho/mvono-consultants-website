import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/dashboard/activities - Get recent activities
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // For now, we're creating dummy activities
    // In a real implementation, you would have an Activity model in your database
    
    // Example of how to build real activities from different events:
    
    // Get recent invoices
    const recentInvoices = await db.invoice.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { client: true },
    });

    // Get recent payments
    const recentPayments = await db.payment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { invoice: { include: { client: true } } },
    });

    // Get recent clients
    const recentClients = await db.client.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    // Get recently completed projects
    const completedProjects = await db.project.findMany({
      where: { status: "completed" },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { client: true },
    });

    // Check for overdue invoices
    const overdueInvoices = await db.invoice.findMany({
      where: {
        status: { in: ["sent", "partial"] },
        dueDate: { lt: new Date() },
      },
      take: 5,
      orderBy: { dueDate: "asc" },
      include: { client: true },
    });

    // Combine and format activities
    const activities = [
      ...recentInvoices.map((invoice) => ({
        id: `invoice-${invoice.id}`,
        type: "invoice_created",
        description: "New invoice created",
        details: `Invoice #${invoice.invoiceNumber} for ${invoice.client.name} - ${invoice.totalAmount.toLocaleString(
          "en-KE",
          { style: "currency", currency: "KES" }
        )}`,
        timestamp: invoice.createdAt.toISOString(),
        relatedId: invoice.id,
        relatedType: "invoice",
      })),
      ...recentPayments.map((payment) => ({
        id: `payment-${payment.id}`,
        type: "payment_received",
        description: "Payment received",
        details: `${payment.amount.toLocaleString("en-KE", {
          style: "currency",
          currency: "KES",
        })} from ${payment.invoice.client.name} for invoice #${payment.invoice.invoiceNumber}`,
        timestamp: payment.createdAt.toISOString(),
        relatedId: payment.invoiceId,
        relatedType: "invoice",
      })),
      ...recentClients.map((client) => ({
        id: `client-${client.id}`,
        type: "client_added",
        description: "New client added",
        details: `${client.name} added to client database`,
        timestamp: client.createdAt.toISOString(),
        relatedId: client.id,
        relatedType: "client",
      })),
      ...completedProjects.map((project) => ({
        id: `project-${project.id}`,
        type: "project_completed",
        description: "Project completed",
        details: `${project.title} for ${project.client.name}`,
        timestamp: project.updatedAt.toISOString(),
        relatedId: project.id,
        relatedType: "project",
      })),
      ...overdueInvoices.map((invoice) => ({
        id: `overdue-${invoice.id}`,
        type: "invoice_overdue",
        description: "Invoice overdue",
        details: `Invoice #${invoice.invoiceNumber} for ${invoice.client.name} is ${Math.floor(
          (new Date().getTime() - new Date(invoice.dueDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )} days overdue`,
        timestamp: invoice.dueDate.toISOString(),
        relatedId: invoice.id,
        relatedType: "invoice",
      })),
    ];

    // Sort by timestamp (most recent first) and limit
    const sortedActivities = activities
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, limit);

    return NextResponse.json({
      activities: sortedActivities,
    });
  } catch (error) {
    console.error("Error fetching dashboard activities:", error);
    return NextResponse.json(
      { error: "Error fetching dashboard activities" },
      { status: 500 }
    );
  }
}
