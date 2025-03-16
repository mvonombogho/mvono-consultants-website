import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/quotations - Get all quotations
export async function GET() {
  try {
    const quotations = await prisma.quotation.findMany({
      include: {
        client: true,
        project: true,
        items: true,
      },
      orderBy: { issueDate: 'desc' },
    });
    
    return NextResponse.json(quotations);
  } catch (error) {
    console.error('Error fetching quotations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotations' },
      { status: 500 }
    );
  }
}

// POST /api/quotations - Create a new quotation
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.quotationNumber || !data.clientId || !data.issueDate || !data.validUntil || !data.items || data.items.length === 0) {
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
    
    // Check if the quotation number already exists
    const existingQuotation = await prisma.quotation.findUnique({
      where: { quotationNumber: data.quotationNumber }
    });
    
    if (existingQuotation) {
      return NextResponse.json(
        { error: 'Quotation number already exists' },
        { status: 400 }
      );
    }
    
    // Create the quotation with items
    const quotation = await prisma.quotation.create({
      data: {
        quotationNumber: data.quotationNumber,
        description: data.description || null,
        issueDate: new Date(data.issueDate),
        validUntil: new Date(data.validUntil),
        clientId: data.clientId,
        projectId: data.projectId || null,
        referenceNumber: data.referenceNumber || null,
        subtotal,
        taxAmount,
        totalAmount,
        status: data.status || 'draft',
        notes: data.notes || null,
        terms: data.terms || null,
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
    
    return NextResponse.json(quotation, { status: 201 });
  } catch (error) {
    console.error('Error creating quotation:', error);
    return NextResponse.json(
      { error: 'Failed to create quotation' },
      { status: 500 }
    );
  }
}
