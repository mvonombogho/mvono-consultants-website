import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db/mongodb';
import Project from '@/models/Project';

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Get search and client query parameters
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');
    const clientId = searchParams.get('clientId');
    
    // Build query
    let query = {};
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: 'i' };
    }
    if (clientId) {
      query.clientId = clientId;
    }

    // Fetch projects
    const projects = await Project.find(query)
      .sort({ name: 1 })
      .select('_id name clientId')
      .populate('clientId', 'name')
      .lean();

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
