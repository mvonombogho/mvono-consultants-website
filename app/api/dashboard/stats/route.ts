import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/dashboard/stats - Get dashboard statistics
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current month date range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Count total clients
    const totalClients = await db.client.count();

    // Count active projects
    const activeProjects = await db.project.count({
      where: {
        status: "active",
      },
    });

    // Count pending invoices
    const pendingInvoices = await db.invoice.count({
      where: {
        status: { in: ["sent", "overdue"] },
      },
    });

    // Calculate revenue this month
    const revenueThisMonth = await db.invoice.aggregate({
      where: {
        status: "paid",
        issueDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    // Calculate total revenue
    const totalRevenue = await db.invoice.aggregate({
      where: {
        status: "paid",
      },
      _sum: {
        totalAmount: true,
      },
    });

    return NextResponse.json({
      totalClients,
      activeProjects,
      pendingInvoices,
      revenueThisMonth: revenueThisMonth._sum.totalAmount || 0,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Error fetching dashboard stats" },
      { status: 500 }
    );
  }
}
