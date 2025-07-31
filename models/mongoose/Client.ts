import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for the Client document
export interface IClient extends Document {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  kraPin?: string;
  industry?: string;
  contactPerson?: string;
  contactPosition?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for Client
const ClientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    kraPin: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    contactPerson: {
      type: String,
      trim: true,
    },
    contactPosition: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export the model
// Check if the model already exists to prevent recompilation issues in development
const ClientModel = mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

export default ClientModel;
