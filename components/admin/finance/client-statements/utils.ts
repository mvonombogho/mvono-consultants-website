import { Invoice, ClientStatement } from './types';

// Format date
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

// Format currency
export const formatCurrency = (amount: number, currency: string = 'KES') => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

// Calculate aging
export const calculateAging = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = today.getTime() - due.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Get aging bracket
export const getAgingBracket = (invoice: Invoice) => {
  if (invoice.status === 'paid') return '0 days';
  const days = calculateAging(invoice.dueDate);
  if (days <= 0) return 'Current';
  if (days <= 30) return '1-30 days';
  if (days <= 60) return '31-60 days';
  if (days <= 90) return '61-90 days';
  return '90+ days';
};

// Get status color
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'bg-green-100 text-green-800';
    case 'partial': return 'bg-yellow-100 text-yellow-800';
    case 'overdue': return 'bg-red-100 text-red-800';
    case 'pending': return 'bg-blue-100 text-blue-800';
    case 'sent': return 'bg-purple-100 text-purple-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Calculate aging summary
export const calculateAgingSummary = (statement: ClientStatement) => {
  const summary = {
    current: 0,
    '1-30': 0,
    '31-60': 0,
    '61-90': 0,
    '90+': 0,
  };

  statement.invoices.forEach(invoice => {
    if (invoice.status !== 'paid') {
      const dueAmount = invoice.amount - invoice.paid;
      const days = calculateAging(invoice.dueDate);

      if (days <= 0) summary.current += dueAmount;
      else if (days <= 30) summary['1-30'] += dueAmount;
      else if (days <= 60) summary['31-60'] += dueAmount;
      else if (days <= 90) summary['61-90'] += dueAmount;
      else summary['90+'] += dueAmount;
    }
  });

  return summary;
};
