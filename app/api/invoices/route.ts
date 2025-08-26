export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/invoices - Get all invoices
export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: true,
        project: true,
        items: true,
      },
      orderBy: { issueDate: 'desc' },
    });
    
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

// POST /api/invoices - Create a new invoice
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.invoiceNumber || !data.clientId || !data.issueDate || !data.dueDate || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Calculate totals
    let subtotal = 0;
    let taxAmount = 0;
    
    const itemsData = data.items.map(item => {
      const itemAmount = item.quantity * item.unitPrice;
      const itemTax = itemAmount * (item.taxRate / 100);
      
      subtotal += itemAmount;
      taxAmount += itemTax;
      
      return {
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate || 0,
        amount: itemAmount,
      };
    });
    
    const totalAmount = subtotal + taxAmount;
    
    // Check if the invoice number already exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { invoiceNumber: data.invoiceNumber }
    });
    
    if (existingInvoice) {
      return NextResponse.json(
        { error: 'Invoice number already exists' },
        { status: 400 }
      );
    }
    
    // Create the invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: data.invoiceNumber,
        description: data.description || null,
        issueDate: new Date(data.issueDate),
        dueDate: new Date(data.dueDate),
        clientId: data.clientId,
        projectId: data.projectId || null,
        lpoReference: data.lpoReference || null,
        subtotal,
        taxAmount,
        totalAmount,
        status: data.status || 'draft',
        notes: data.notes || null,
        items: {
          create: itemsData,
        },
      },
      include: {
        client: true,
        project: true,
        items: true,
      },
    });
    
    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
