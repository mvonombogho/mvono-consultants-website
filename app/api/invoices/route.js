import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db/mongodb';
import Invoice from '@/models/Invoice';

// GET - Fetch all invoices
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const clientId = searchParams.get('clientId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build query
    const query = {};
    
    // Add filters if provided
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (clientId) {
      query.clientId = clientId;
    }
    
    // Date range filtering
    if (startDate || endDate) {
      query.issueDate = {};
      
      if (startDate) {
        query.issueDate.$gte = new Date(startDate);
      }
      
      if (endDate) {
        query.issueDate.$lte = new Date(endDate);
      }
    }

    // Fetch invoices
    const invoices = await Invoice.find(query)
      .sort({ issueDate: -1 }) // newest first
      .populate('clientId', 'name')
      .lean();

    // Transform results for client
    const transformedInvoices = invoices.map(invoice => ({
      id: invoice._id.toString(),
      invoiceNumber: invoice.invoiceNumber,
      quInvoiceNumber: invoice.quInvoiceNumber,
      client: invoice.clientId ? invoice.clientId.name : 'Unknown Client',
      clientId: invoice.clientId ? invoice.clientId._id.toString() : null,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      amount: invoice.total,
      status: invoice.status,
      items: invoice.items,
      subtotal: invoice.subtotal,
      vatAmount: invoice.vatAmount,
      total: invoice.total,
      notes: invoice.notes,
      lpoNumber: invoice.lpoNumber,
      datePaid: invoice.datePaid,
    }));

    return NextResponse.json({ invoices: transformedInvoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST - Create a new invoice
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Get invoice data from request
    const data = await request.json();
    
    // Validate required fields
    if (!data.invoiceNumber || !data.clientId || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: invoiceNumber, clientId, items' },
        { status: 400 }
      );
    }

    // Create invoice
    const invoice = new Invoice({
      ...data,
      createdBy: session.user.id, // Assuming user ID is in session
    });

    // Save to database
    await invoice.save();

    return NextResponse.json({ 
      message: 'Invoice created successfully',
      invoiceId: invoice._id
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
