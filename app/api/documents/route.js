import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '../../../lib/db/mongodb';
import Document from '../../../models/Document';
import Client from '../../../models/Client';

// GET handler for listing documents
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Get category filter from query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Build query
    const query = category ? { category } : {};

    // Fetch documents
    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Fetch client names
    const clientIds = documents
      .filter(doc => doc.clientId)
      .map(doc => doc.clientId);

    if (clientIds.length > 0) {
      const clients = await Client.find({ _id: { $in: clientIds } })
        .select('_id name')
        .lean();

      // Create a map of client IDs to names
      const clientMap = clients.reduce((map, client) => {
        map[client._id.toString()] = client.name;
        return map;
      }, {});

      // Add client names to documents
      documents.forEach(doc => {
        if (doc.clientId && clientMap[doc.clientId.toString()]) {
          doc.clientName = clientMap[doc.clientId.toString()];
        }
      });
    }

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
