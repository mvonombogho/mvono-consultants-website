import mongoose, { Schema, models } from 'mongoose';

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    default: 'Other',
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  website: {
    type: String,
  },
  kraPin: {
    type: String,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  lastService: {
    type: String,
    default: 'New Client',
  },
  lastServiceDate: {
    type: Date,
  },
  contactPosition: String,
}, { timestamps: true });

export default models.Client || mongoose.model('Client', clientSchema);
