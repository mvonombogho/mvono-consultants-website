import mongoose, { Schema, models } from 'mongoose';

const documentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  s3Key: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,  // pdf, docx, xlsx, png, etc.
    required: true,
  },
  fileSize: {
    type: Number,  // in bytes
    required: true,
  },
  category: {
    type: String,  // contract, invoice, certificate, report, etc.
    required: true,
  },
  // References to other models
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
  },
  subcontractorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcontractor',
  },
  expirationDate: {
    type: Date,  // For documents that expire (certificates, licenses)
  },
  tags: {
    type: String,  // Comma-separated tags for searching
  },
  uploadedById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default models.Document || mongoose.model('Document', documentSchema);
