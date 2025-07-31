import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/quotations/last-number - Get the last quotation number
export async function GET() {
  try {
    const lastQuotation = await prisma.quotation.findFirst({
      orderBy: {
        quotationNumber: 'desc',
      },
      select: {
        quotationNumber: true,
      },
    });
    
    return NextResponse.json({ lastNumber: lastQuotation?.quotationNumber || null });
  } catch (error) {
    console.error('Error fetching last quotation number:', error);
    return NextResponse.json(
      { error: 'Failed to fetch last quotation number' },
      { status: 500 }
    );
  }
}
