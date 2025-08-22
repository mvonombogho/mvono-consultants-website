import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '../../../lib/db/mongodb';
import Client from '../../../models/Client';

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Get search parameter
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    // Build query
    let query = {};
    if (search) {
      query = { 
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { pin: { $regex: search, $options: 'i' } }
        ] 
      };
    }
    
    // Fetch clients
    const clients = await Client.find(query)
      .sort({ name: 1 })
      .select('_id name email address pin')
      .lean();

    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
