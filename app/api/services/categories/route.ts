import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/services/categories - Get service categories with counts
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all services
    const services = await prisma.service.findMany();
    
    // Group by category and count
    const categoryMap = new Map<string, number>();
    
    services.forEach(service => {
      const category = service.category;
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
    
    // Convert to array format for the response
    const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
    
    // Sort by name
    categories.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching service categories:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching service categories' },
      { status: 500 }
    );
  }
}
