export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '../../../../lib/db/mongodb';
import Document from '../../../../models/Document';

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Process the multipart form data
    const formData = await request.formData();
    
    // Get the file
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Get form fields
    const title = formData.get('title') || file.name;
    const description = formData.get('description') || '';
    const category = formData.get('category') || 'general';
    const clientId = formData.get('clientId') || null;
    const projectId = formData.get('projectId') || null;
    const expirationDate = formData.get('expirationDate') || null;
    const tags = formData.get('tags') || '';

    // Get file details
    const fileName = file.name;
    const fileType = fileName.split('.').pop().toLowerCase();
    const fileSize = file.size;
    
    // Convert file to buffer for S3 upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload file to S3
    const folder = 'documents';
    const s3Key = await uploadFile(buffer, fileName, file.type, folder);
    
    // Save document entry in MongoDB
    const document = new Document({
      title,
      description,
      fileName,
      fileUrl: s3Key, // We'll generate the actual URL when fetching the document
      s3Key,
      fileType,
      fileSize,
      category,
      clientId: clientId || undefined,
      projectId: projectId || undefined,
      expirationDate: expirationDate || undefined,
      tags,
      uploadedById: session.user.id, // Assuming user ID is in the session
    });

    await document.save();

    return NextResponse.json({ 
      message: 'Document uploaded successfully',
      document: {
        _id: document._id,
        title: document.title,
        fileName: document.fileName
      }
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
