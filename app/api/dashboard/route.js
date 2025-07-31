import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db/mongodb';
import Client from '@/models/Client';
import Project from '@/models/Project';
import Invoice from '@/models/Invoice';

// Helper function to calculate monthly revenue
const calculateMonthlyRevenue = async () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);

  const invoices = await Invoice.find({
    dateIssued: {
      $gte: firstDayOfMonth,
      $lte: lastDayOfMonth
    },
    status: 'paid'
  });

  return invoices.reduce((total, invoice) => total + invoice.totalAmount, 0);
};

// Helper function to get recent activity
const getRecentActivity = async (limit = 5) => {
  // Get recent invoices
  const recentInvoices = await Invoice.find()
    .sort({ dateIssued: -1 })
    .limit(limit)
    .populate('client', 'name');

  // Get recent projects
  const recentProjects = await Project.find()
    .sort({ updatedAt: -1 })
    .limit(limit)
    .populate('client', 'name');

  // Get recent clients
  const recentClients = await Client.find()
    .sort({ createdAt: -1 })
    .limit(limit);

  // Combine and transform the data
  const invoiceActivities = recentInvoices.map(invoice => ({
    _id: `invoice-${invoice._id}`,
    type: 'invoice',
    title: `Invoice #${invoice.invoiceNumber} Generated`,
    description: `Invoice for ${invoice.client ? invoice.client.name : 'Unknown'} - ${invoice.description || 'Services'}`,
    amount: invoice.totalAmount,
    date: invoice.dateIssued
  }));

  const projectActivities = recentProjects.map(project => ({
    _id: `project-${project._id}`,
    type: 'project',
    title: project.status === 'completed' ? 'Project Completed' : 'Project Updated',
    description: `${project.name} for ${project.client ? project.client.name : 'Unknown'}`,
    date: project.updatedAt
  }));

  const clientActivities = recentClients.map(client => ({
    _id: `client-${client._id}`,
    type: 'client',
    title: 'New Client Added',
    description: `${client.name} added as a new client`,
    date: client.createdAt
  }));

  // Combine all activities and sort by date
  return [...invoiceActivities, ...projectActivities, ...clientActivities]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

// Helper function to get upcoming tasks
const getUpcomingTasks = async (limit = 4) => {
  const currentDate = new Date();
  
  // Get projects with upcoming deadlines
  const upcomingProjects = await Project.find({
    status: { $ne: 'completed' },
    dueDate: { $gt: currentDate }
  })
    .sort({ dueDate: 1 })
    .limit(limit)
    .populate('client', 'name');

  return upcomingProjects.map(project => ({
    _id: project._id,
    title: project.name,
    description: project.description,
    client: project.client,
    dueDate: project.dueDate,
    priority: project.priority || 'medium'
  }));
};

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Get dashboard statistics
    const totalClients = await Client.countDocuments();
    const activeProjects = await Project.countDocuments({ status: { $ne: 'completed' } });
    const monthlyRevenue = await calculateMonthlyRevenue();
    const upcomingTasksCount = await Project.countDocuments({
      status: { $ne: 'completed' },
      dueDate: { $gt: new Date() }
    });

    // Get recent activity
    const recentActivity = await getRecentActivity();

    // Get upcoming tasks
    const upcomingTasks = await getUpcomingTasks();

    return NextResponse.json({
      stats: {
        totalClients,
        activeProjects,
        monthlyRevenue,
        upcomingTasks: upcomingTasksCount
      },
      recentActivity,
      upcomingTasks
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
