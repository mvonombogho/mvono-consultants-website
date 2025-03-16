"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Send, Eye, FileText, Calendar, ArrowDownUp, CreditCard, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { toast } from 'sonner';

export default function StatementDetailsPage({ params }: { params: { id: string } }) {
  const [statement, setStatement] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    // Mock data for the client statement
    const mockStatement = {
      id: params.id,
      clientId: 'client-123',
      clientName: 'Acme Corporation',
      clientEmail: 'accounts@acmecorp.com',
      statementNumber: 'STMT-2025-0042',
      generatedDate: new Date(),
      periodStart: new Date(2025, 1, 1), // Feb 1, 2025
      periodEnd: new Date(2025, 1, 28), // Feb 28, 2025
      openingBalance: 5800.00,
      closingBalance: 2300.00,
      totalInvoiced: 4500.00,
      totalPayments: 8000.00,
      transactions: [
        {
          id: 'tr-1',
          date: new Date(2025, 1, 5),
          type: 'invoice',
          description: 'Invoice #INV-2025-0178',
          amount: 2500.00,
          balance: 8300.00,
        },
        {
          id: 'tr-2',
          date: new Date(2025, 1, 12),
          type: 'invoice',
          description: 'Invoice #INV-2025-0192',
          amount: 2000.00,
          balance: 10300.00,
        },
        {
          id: 'tr-3',
          date: new Date(2025, 1, 15),
          type: 'payment',
          description: 'Payment - Bank Transfer',
          amount: -5000.00,
          balance: 5300.00,
        },
        {
          id: 'tr-4',
          date: new Date(2025, 1, 25),
          type: 'payment',
          description: 'Payment - Check #4582',
          amount: -3000.00,
          balance: 2300.00,
        },
      ],
      notes: 'Thank you for your business. All invoices are due within 30 days of issue date.'
    };

    // Simulate API call
    setTimeout(() => {
      setStatement(mockStatement);
      setIsLoading(false);
    }, 800);
  }, [params.id]);

  const handleSendEmail = async () => {
    setSendingEmail(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Statement sent to ${statement.clientEmail}`);
    } catch (error) {
      toast.error('Failed to send statement');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleDownload = () => {
    toast.success('Statement PDF downloaded');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/finances/statements">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Client Statement</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={handleSendEmail} disabled={sendingEmail}>
            <Send className="mr-2 h-4 w-4" />
            {sendingEmail ? 'Sending...' : 'Email Statement'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Statement #{statement.statementNumber}</CardTitle>
                <CardDescription>
                  Generated on {format(new Date(statement.generatedDate), 'MMM dd, yyyy')}
                </CardDescription>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Statement Period</p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="mr-1 h-4 w-4" />
                    {format(new Date(statement.periodStart), 'MMM dd, yyyy')} - {format(new Date(statement.periodEnd), 'MMM dd, yyyy')}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Prepared For</p>
                  <p className="font-semibold">{statement.clientName}</p>
                  <p className="text-sm text-muted-foreground">{statement.clientEmail}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-muted-foreground">Opening Balance</p>
                      <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">KES {statement.openingBalance.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-muted-foreground">Closing Balance</p>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">KES {statement.closingBalance.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-muted-foreground">Total Due</p>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold text-red-500">KES {statement.closingBalance.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Description</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                      <th className="py-3 px-4 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statement.transactions.map((transaction, index) => (
                      <tr key={transaction.id} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                        <td className="py-3 px-4 text-sm">
                          {format(new Date(transaction.date), 'MMM dd, yyyy')}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center">
                            <span className={`flex h-2 w-2 mr-2 rounded-full ${transaction.type === 'invoice' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                            {transaction.description}
                          </div>
                        </td>
                        <td className={`py-3 px-4 text-sm font-medium text-right ${transaction.type === 'invoice' ? 'text-orange-600' : 'text-green-600'}`}>
                          {transaction.type === 'invoice' ? '+' : ''}{transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-right">
                          {transaction.balance.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {statement.notes && (
                <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-1">Notes</p>
                  <p className="text-sm text-muted-foreground">{statement.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Bank Name</p>
                  <p>KCB Bank Kenya</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Account Number</p>
                  <p>1234567890</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Account Name</p>
                  <p>Mvono Consultants Ltd</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Swift Code</p>
                  <p>KCBLKENX</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Accounts Department</p>
                  <p>accounts@mvonoconsultants.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p>+254 720 270 694</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}