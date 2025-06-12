import mongoose, { Schema, models } from 'mongoose';

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'completed', 'cancelled', 'on-hold'],
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  subcontractors: [{
    type: Schema.Types.ObjectId,
    ref: 'Subcontractor',
  }],
  totalValue: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default models.Project || mongoose.model('Project', projectSchema);
