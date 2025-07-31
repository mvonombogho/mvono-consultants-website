import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db/mongodb';
import Document from '@/models/Document';
import { getSignedFileUrl } from '@/lib/s3/s3Service';

export async function GET(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Get document by ID
    const document = await Document.findById(params.id);
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Generate a signed URL for viewing the document (valid for 1 hour)
    const url = await getSignedFileUrl(document.s3Key, 3600);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating document URL:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
