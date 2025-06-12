"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InvoiceDetailsPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the invoice from your API
    // For demo purposes, we'll use mock data
    const mockInvoices = [
      {
        id: '1',
        invoiceNumber: 'INV-2025-0001',
        client: {
          id: '1',
          name: 'Lafarge',
          email: 'accounts@lafarge.co.ke',
          address: 'Nairobi, Kenya',
          contactPerson: 'John Doe',
          phone: '+254 712 345 678',
        },
        issueDate: '2025-05-01',
        dueDate: '2025-05-31',
        poNumber: 'PO-2025-1234',
        items: [
          {
            id: '1',
            description: 'Occupational Safety Audit',
            quantity: 1,
            amount: 75000,
          },
          {
            id: '2',
            description: 'Safety Management System Implementation',
            quantity: 1,
            amount: 50000,
          },
        ],
        subtotal: 125000,
        vat: 20000,
        total: 145000,
        notes: 'This invoice covers the annual safety audit for the main manufacturing facility.',
        terms: 'Payment due within 30 days of invoice date.',
        status: 'paid',
        paymentDate: '2025-05-20',
        paymentMethod: 'Bank Transfer',
        transactionRef: 'TRF-12345',
      },
      {
        id: '2',
        invoiceNumber: 'INV-2025-0002',
        client: {
          id: '2',
          name: 'Alpine Coolers',
          email: 'finance@alpinecoolers.co.ke',
          address: 'Industrial Area, Nairobi, Kenya',
          contactPerson: 'Jane Smith',
          phone: '+254 723 456 789',
        },
        issueDate: '2025-05-05',
        dueDate: '2025-06-04',
        poNumber: 'AC-PO-567',
        items: [
          {
            id: '1',
            description: 'Pressure Vessel Certification',
            quantity: 5,
            amount: 10000,
          },
          {
            id: '2',
            description: 'Non-Destructive Testing',
            quantity: 3,
            amount: 8333.33,
          },
        ],
        subtotal: 75000,
        vat: 12000,
        total: 87000,
        notes: 'Testing and certification as per DOSH requirements.',
        terms: 'Payment due within 30 days of invoice date.',
        status: 'sent',
      },
      {
        id: '3',
        invoiceNumber: 'INV-2025-0003',
        client: {
          id: '3',
          name: 'KTDA',
          email: 'accounts@ktda.co.ke',
          address: 'Kericho, Kenya',
          contactPerson: 'Robert Maina',
          phone: '+254 734 567 890',
        },
        issueDate: '2025-05-10',
        dueDate: '2025-06-09',
        poNumber: 'KTDA-2025-89',
        items: [
          {
            id: '1',
            description: 'Energy Audit - 3 Factories',
            quantity: 3,
            amount: 60000,
          },
          {
            id: '2',
            description: 'Renewable Energy Consulting',
            quantity: 1,
            amount: 50000,
          },
        ],
        subtotal: 230000,
        vat: 36800,
        total: 266800,
        notes: 'This covers the energy audit for Kericho, Litein, and Kapkatet factories.',
        terms: 'Payment due within 30 days of invoice date.',
        status: 'viewed',
      },
      {
        id: '4',
        invoiceNumber: 'INV-2025-0004',
        client: {
          id: '4',
          name: 'Unga Group',
          email: 'finance@ungagroup.com',
          address: 'Industrial Area, Nairobi, Kenya',
          contactPerson: 'Sarah Wanjiku',
          phone: '+254 745 678 901',
        },
        issueDate: '2025-04-15',
        dueDate: '2025-05-15',
        poNumber: 'UG-2025-456',
        items: [
          {
            id: '1',
            description: 'Fire Safety Audit',
            quantity: 1,
            amount: 65000,
          },
          {
            id: '2',
            description: 'First Aid Training (30 staff)',
            quantity: 1,
            amount: 45000,
          },
          {
            id: '3',
            description: 'Fire Safety Training (50 staff)',
            quantity: 1,
            amount: 40000,
          },
        ],
        subtotal: 150000,
        vat: 24000,
        total: 174000,
        notes: 'Comprehensive fire safety audit and staff training as per the annual safety program.',
        terms: 'Payment due within 30 days of invoice date.',
        status: 'overdue',
      },
    ];

    // Find the invoice with the matching ID
    const foundInvoice = mockInvoices.find(inv => inv.id === id);
    
    setTimeout(() => {
      if (foundInvoice) {
        setInvoice(foundInvoice);
      }
      setLoading(false);
    }, 500); // Simulate API delay
  }, [id]);

  // Format currency
  const formatCurrency = (amount) => {
    return `KES ${new Intl.NumberFormat('en-KE').format(amount)}`;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusColors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      viewed: 'bg-purple-100 text-purple-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-orange-100 text-orange-800'
    };

    const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800';
    const label = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        {label}
      </span>
    );
  };

  // Function to handle marking invoice as paid
  const markAsPaid = () => {
    // In a real app, you would call your API to update the invoice status
    setInvoice({
      ...invoice,
      status: 'paid',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'Bank Transfer',
      transactionRef: `TRF-${Math.floor(Math.random() * 100000)}`
    });
    
    alert('Invoice marked as paid successfully!');
  };

  // Function to handle sending invoice reminder
  const sendReminder = () => {
    // In a real app, you would call your API to send a reminder email
    alert('Payment reminder sent to client successfully!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Loading invoice...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="container mx-auto py-12 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invoice Not Found</h1>
          <p className="text-gray-600 mb-6">The invoice you are looking for does not exist or has been deleted.</p>
          <Link href="/dashboard/invoices">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Back to Invoices
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Invoice {invoice.invoiceNumber}
          </h1>
          <p className="text-gray-500">
            Issued on {formatDate(invoice.issueDate)}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/dashboard/invoices">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Back to Invoices
            </button>
          </Link>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.print()}
          >
            Print / Download PDF
          </button>

          {invoice.status === 'overdue' || invoice.status === 'sent' || invoice.status === 'viewed' ? (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={markAsPaid}
            >
              Mark as Paid
            </button>
          ) : null}
          
          {(invoice.status === 'overdue' || invoice.status === 'sent' || invoice.status === 'viewed') ? (
            <button
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
              onClick={sendReminder}
            >
              Send Reminder
            </button>
          ) : null}
        </div>
      </div>

      {/* Invoice PDF-like View */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Invoice Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">Mvono Consultants</h2>
              <p className="text-sm text-gray-600">Nairobi, Kenya</p>
              <p className="text-sm text-gray-600">sales@mvonoconsultants.com</p>
              <p className="text-sm text-gray-600">+254 720 270 694</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">INVOICE</h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Invoice Number:</span> {invoice.invoiceNumber}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Issue Date:</span> {formatDate(invoice.issueDate)}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Due Date:</span> {formatDate(invoice.dueDate)}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Status:</span> {getStatusBadge(invoice.status)}
              </p>
              {invoice.poNumber && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">PO Number:</span> {invoice.poNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="p-6 border-b">
          <h3 className="text-md font-semibold text-gray-800 mb-3">Bill To:</h3>
          <p className="text-md font-bold">{invoice.client.name}</p>
          <p className="text-sm text-gray-600">{invoice.client.address}</p>
          <p className="text-sm text-gray-600">Contact: {invoice.client.contactPerson}</p>
          <p className="text-sm text-gray-600">Email: {invoice.client.email}</p>
          <p className="text-sm text-gray-600">Phone: {invoice.client.phone}</p>
        </div>

        {/* Invoice Items */}
        <div className="p-6 border-b">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(item.quantity * item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary */}
        <div className="p-6 border-b">
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="text-sm text-gray-900">{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">VAT (16%):</span>
                <span className="text-sm text-gray-900">{formatCurrency(invoice.vat)}</span>
              </div>
              <div className="flex justify-between py-2 border-t font-bold">
                <span>Total:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        {invoice.status === 'paid' && (
          <div className="p-6 border-b bg-green-50">
            <h3 className="text-md font-semibold text-green-800 mb-3">Payment Information</h3>
            <p className="text-sm text-green-700 mb-1">
              <span className="font-semibold">Payment Date:</span> {formatDate(invoice.paymentDate)}
            </p>
            <p className="text-sm text-green-700 mb-1">
              <span className="font-semibold">Payment Method:</span> {invoice.paymentMethod}
            </p>
            <p className="text-sm text-green-700 mb-1">
              <span className="font-semibold">Transaction Reference:</span> {invoice.transactionRef}
            </p>
          </div>
        )}

        {/* Notes and Terms */}
        <div className="p-6">
          {invoice.notes && (
            <div className="mb-4">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Notes</h3>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Terms & Conditions</h3>
            <p className="text-sm text-gray-600">{invoice.terms}</p>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">For any inquiries regarding this invoice, please contact us at <span className="text-blue-600">sales@mvonoconsultants.com</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
