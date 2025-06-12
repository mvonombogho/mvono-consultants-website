import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db/mongodb';
import Invoice from '@/models/Invoice';
import { ObjectId } from 'mongodb';

// GET - Fetch a specific invoice
export async function GET(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Fetch invoice
    const invoice = await Invoice.findById(params.id)
      .populate('clientId', 'name address pin')
      .lean();

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Transform for client
    const transformedInvoice = {
      id: invoice._id.toString(),
      invoiceNumber: invoice.invoiceNumber,
      quInvoiceNumber: invoice.quInvoiceNumber,
      clientName: invoice.clientId ? invoice.clientId.name : 'Unknown Client',
      clientId: invoice.clientId ? invoice.clientId._id.toString() : null,
      clientAddress: invoice.clientId ? invoice.clientId.address : '',
      clientPin: invoice.clientId ? invoice.clientId.pin : '',
      date: invoice.issueDate,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      lpoNumber: invoice.lpoNumber || '',
      items: invoice.items.map(item => ({
        id: item._id.toString(),
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        amount: item.amount,
        vat: item.vat || 16,
      })),
      customerMessage: invoice.notes || '',
      subtotal: invoice.subtotal,
      vatAmount: invoice.vatAmount,
      total: invoice.total,
      status: invoice.status,
      datePaid: invoice.datePaid,
    };

    return NextResponse.json({ invoice: transformedInvoice });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT - Update an invoice
export async function PUT(request, { params }) {
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
    
    // Validate that the invoice exists
    const existingInvoice = await Invoice.findById(params.id);
    if (!existingInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // If status is being changed to paid, set datePaid
    if (data.status === 'paid' && existingInvoice.status !== 'paid') {
      data.datePaid = new Date();
    }

    // Update invoice
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      params.id,
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        }
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ 
      message: 'Invoice updated successfully',
      invoiceId: updatedInvoice._id
    });
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE - Delete an invoice
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Validate that the invoice exists
    const existingInvoice = await Invoice.findById(params.id);
    if (!existingInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Delete invoice
    await Invoice.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
