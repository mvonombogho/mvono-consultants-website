// Client statement types

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
};

export type ClientStatement = {
  id: string;
  client: Client;
  generatedDate: string;
  statementPeriod: { from: string; to: string };
  invoices: Invoice[];
  openingBalance: number;
  closingBalance: number;
  totalDue: number;
  currency: string;
  status: 'sent' | 'draft';
};
