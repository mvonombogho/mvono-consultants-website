import mongoose, { Schema, models } from 'mongoose';

const invoiceItemSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    default: 0
  },
  vat: {
    type: Number,
    default: 16, // 16% VAT in Kenya
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
});

const invoiceSchema = new Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  quInvoiceNumber: {
    type: String,
    unique: true,
  },
  date: {
    type: String,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  lpoNumber: {
    type: String,
  },
  items: [invoiceItemSchema],
  subtotal: {
    type: Number,
    required: true,
    default: 0
  },
  vatAmount: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled'],
    default: 'draft'
  },
  notes: {
    type: String,
  },
  customerMessage: {
    type: String,
  },
  datePaid: {
    type: Date,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

export default models.Invoice || mongoose.model('Invoice', invoiceSchema);
