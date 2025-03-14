import { ClientStatement } from './types';

export const fetchMockStatements = (): Promise<ClientStatement[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockStatements: ClientStatement[] = [
        {
          id: '1',
          client: {
            id: 'c1',
            name: 'Unga Group',
            email: 'accounts@ungagroup.co.ke',
            phone: '+254 20 3954000',
            address: 'P.O. Box 30386-00100, Nairobi',
            contactPerson: 'Sarah Mwangi',
          },
          generatedDate: '2024-02-15T08:30:00Z',
          statementPeriod: {
            from: '2024-01-01T00:00:00Z',
            to: '2024-01-31T23:59:59Z',
          },
          invoices: [
            {
              id: 'i1',
              invoiceNumber: 'INV-2024-001',
              date: '2024-01-05T10:00:00Z',
              dueDate: '2024-02-04T23:59:59Z',
              amount: 120000,
              paid: 120000,
              status: 'paid',
            },
            {
              id: 'i2',
              invoiceNumber: 'INV-2024-010',
              date: '2024-01-18T10:00:00Z',
              dueDate: '2024-02-17T23:59:59Z',
              amount: 85000,
              paid: 0,
              status: 'pending',
            },
          ],
          openingBalance: 45000,
          closingBalance: 130000,
          totalDue: 85000,
          currency: 'KES',
          status: 'sent',
        },
        {
          id: '2',
          client: {
            id: 'c2',
            name: 'Dormans Coffee',
            email: 'finance@dormans.co.ke',
            phone: '+254 20 5023000',
            address: 'P.O. Box 41000-00100, Nairobi',
            contactPerson: 'James Omondi',
          },
          generatedDate: '2024-02-15T09:15:00Z',
          statementPeriod: {
            from: '2024-01-01T00:00:00Z',
            to: '2024-01-31T23:59:59Z',
          },
          invoices: [
            {
              id: 'i3',
              invoiceNumber: 'INV-2024-004',
              date: '2024-01-08T10:00:00Z',
              dueDate: '2024-02-07T23:59:59Z',
              amount: 96000,
              paid: 50000,
              status: 'partial',
            },
          ],
          openingBalance: 0,
          closingBalance: 96000,
          totalDue: 46000,
          currency: 'KES',
          status: 'draft',
        },
        {
          id: '3',
          client: {
            id: 'c3',
            name: 'Alloy Castings',
            email: 'accounts@alloycast.co.ke',
            phone: '+254 20 6789000',
            address: 'P.O. Box 50200-00100, Nairobi',
            contactPerson: 'David Waweru',
          },
          generatedDate: '2024-02-14T14:30:00Z',
          statementPeriod: {
            from: '2024-01-01T00:00:00Z',
            to: '2024-01-31T23:59:59Z',
          },
          invoices: [
            {
              id: 'i4',
              invoiceNumber: 'INV-2023-095',
              date: '2023-12-10T10:00:00Z',
              dueDate: '2024-01-09T23:59:59Z',
              amount: 145000,
              paid: 0,
              status: 'overdue',
            },
            {
              id: 'i5',
              invoiceNumber: 'INV-2024-008',
              date: '2024-01-15T10:00:00Z',
              dueDate: '2024-02-14T23:59:59Z',
              amount: 72000,
              paid: 0,
              status: 'pending',
            },
          ],
          openingBalance: 145000,
          closingBalance: 217000,
          totalDue: 217000,
          currency: 'KES',
          status: 'sent',
        },
        {
          id: '4',
          client: {
            id: 'c4',
            name: 'Radisson Blu',
            email: 'finance@radissonblu.co.ke',
            phone: '+254 20 9876000',
            address: 'P.O. Box 60000-00100, Nairobi',
            contactPerson: 'Elisabeth Njeri',
          },
          generatedDate: '2024-02-12T11:20:00Z',
          statementPeriod: {
            from: '2024-01-01T00:00:00Z',
            to: '2024-01-31T23:59:59Z',
          },
          invoices: [
            {
              id: 'i6',
              invoiceNumber: 'INV-2024-002',
              date: '2024-01-05T12:00:00Z',
              dueDate: '2024-02-04T23:59:59Z',
              amount: 185000,
              paid: 185000,
              status: 'paid',
            },
          ],
          openingBalance: 0,
          closingBalance: 0,
          totalDue: 0,
          currency: 'KES',
          status: 'sent',
        },
      ];

      resolve(mockStatements);
    }, 1500);
  });
};
