export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET /api/invoices/[id] - Get a specific invoice
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        project: true,
        items: true,
        payments: true,
      },
    });
    
    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(invoice);
  } catch (error) {
    console.error(`Error fetching invoice ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

// PUT /api/invoices/[id] - Update an invoice
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.invoiceNumber || !data.clientId || !data.issueDate || !data.dueDate || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: { items: true },
    });
    
    if (!existingInvoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }
    
    // Check if the invoice number already exists (and belongs to a different invoice)
    if (data.invoiceNumber !== existingInvoice.invoiceNumber) {
      const duplicateInvoice = await prisma.invoice.findUnique({
        where: { invoiceNumber: data.invoiceNumber }
      });
      
      if (duplicateInvoice) {
        return NextResponse.json(
          { error: 'Invoice number already exists' },
          { status: 400 }
        );
      }
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
        id: item.id, // For existing items
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate || 0,
        amount: itemAmount,
      };
    });
    
    const totalAmount = subtotal + taxAmount;
    
    // Update the invoice
    const updatedInvoice = await prisma.$transaction(async (prisma) => {
      // Delete existing items
      await prisma.invoiceItem.deleteMany({
        where: { invoiceId: params.id },
      });
      
      // Update invoice and create new items
      return prisma.invoice.update({
        where: { id: params.id },
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
          status: data.status || existingInvoice.status,
          notes: data.notes || null,
          items: {
            create: itemsData.map(item => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              taxRate: item.taxRate,
              amount: item.amount,
            })),
          },
        },
        include: {
          client: true,
          project: true,
          items: true,
        },
      });
    });
    
    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error(`Error updating invoice ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

// DELETE /api/invoices/[id] - Delete an invoice
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        payments: true,
      },
    });
    
    if (!existingInvoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }
    
    // Check if there are payments associated with the invoice
    if (existingInvoice.payments.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete invoice with existing payments' },
        { status: 400 }
      );
    }
    
    // Delete the invoice (cascade will delete items)
    await prisma.invoice.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error(`Error deleting invoice ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete invoice' },
      { status: 500 }
    );
  }
}
