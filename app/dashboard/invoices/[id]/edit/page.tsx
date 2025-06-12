"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditInvoicePage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    clientId: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    poNumber: "",
    notes: "",
    terms: "Payment due within 30 days of invoice date.",
  });

  const [items, setItems] = useState([]);

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
        },
        clientId: '1',
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
      },
      {
        id: '2',
        invoiceNumber: 'INV-2025-0002',
        client: {
          id: '2',
          name: 'Alpine Coolers',
        },
        clientId: '2',
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
        },
        clientId: '3',
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
        },
        clientId: '4',
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
        // Format the data for the form
        setInvoiceData({
          clientId: foundInvoice.clientId,
          invoiceNumber: foundInvoice.invoiceNumber,
          invoiceDate: foundInvoice.issueDate,
          dueDate: foundInvoice.dueDate,
          poNumber: foundInvoice.poNumber || '',
          notes: foundInvoice.notes || '',
          terms: foundInvoice.terms || 'Payment due within 30 days of invoice date.',
          status: foundInvoice.status,
        });
        
        // Format the items
        setItems(foundInvoice.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          amount: item.amount,
        })));
      }
      setLoading(false);
    }, 500); // Simulate API delay
  }, [id]);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, amount: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === "description" ? value : Number(value),
    };
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce(
      (sum, item) => sum + item.quantity * item.amount,
      0
    );
  };

  const calculateVAT = () => {
    return calculateSubtotal() * 0.16;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Calculate the totals
      const subtotal = calculateSubtotal();
      const vat = calculateVAT();
      const total = calculateTotal();

      // Prepare the data for API submission
      const formData = {
        ...invoiceData,
        items,
        subtotal,
        vat,
        total,
      };

      // In a real app, you would send this data to your API
      console.log("Form data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Invoice updated successfully!");
      router.push(`/dashboard/invoices/${id}`);
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Failed to update invoice. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Mock clients for the demo
  const mockClients = [
    { id: "1", name: "Lafarge" },
    { id: "2", name: "Alpine Coolers" },
    { id: "3", name: "KTDA" },
    { id: "4", name: "Unga Group" },
    { id: "5", name: "Dormans Coffee" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Loading invoice...</p>
      </div>
    );
  }

  if (!invoiceData.invoiceNumber) {
    return (
      <div className="container mx-auto py-12 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invoice Not Found</h1>
          <p className="text-gray-600 mb-6">The invoice you are trying to edit does not exist or has been deleted.</p>
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
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Invoice {invoiceData.invoiceNumber}</h1>
        <div className="flex gap-2">
          <Link href={`/dashboard/invoices/${id}`}>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Cancel
            </button>
          </Link>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Invoice Details Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Invoice Details</h2>
            <p className="text-gray-600">
              Edit the basic information for this invoice
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="client" className="block text-sm font-medium">
                Client
              </label>
              <select
                id="client"
                className="w-full p-2 border rounded"
                value={invoiceData.clientId}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, clientId: e.target.value })
                }
              >
                <option value="">Select a client</option>
                {mockClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="invoiceNumber" className="block text-sm font-medium">
                Invoice Number
              </label>
              <input
                id="invoiceNumber"
                className="w-full p-2 border rounded"
                value={invoiceData.invoiceNumber}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    invoiceNumber: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="invoiceDate" className="block text-sm font-medium">
                Invoice Date
              </label>
              <input
                id="invoiceDate"
                type="date"
                className="w-full p-2 border rounded"
                value={invoiceData.invoiceDate}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    invoiceDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dueDate" className="block text-sm font-medium">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                className="w-full p-2 border rounded"
                value={invoiceData.dueDate}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, dueDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="poNumber" className="block text-sm font-medium">
                PO Number (Optional)
              </label>
              <input
                id="poNumber"
                className="w-full p-2 border rounded"
                value={invoiceData.poNumber}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, poNumber: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                className="w-full p-2 border rounded"
                value={invoiceData.status}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, status: e.target.value })
                }
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="viewed">Viewed</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoice Items Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Invoice Items</h2>
            <p className="text-gray-600">
              Edit the services or products for this invoice
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border py-2 px-4 text-left">Description</th>
                  <th className="border py-2 px-4 text-center">Qty</th>
                  <th className="border py-2 px-4 text-center">Amount (KES)</th>
                  <th className="border py-2 px-4 text-center">Total</th>
                  <th className="border py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="border py-2 px-4">
                      <input
                        className="w-full p-2 border rounded"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(index, "description", e.target.value)
                        }
                        placeholder="Enter item description"
                      />
                    </td>
                    <td className="border py-2 px-4 w-24">
                      <input
                        type="number"
                        min="1"
                        className="w-full p-2 border rounded text-center"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td className="border py-2 px-4 w-36">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full p-2 border rounded text-center"
                        value={item.amount}
                        onChange={(e) =>
                          updateItem(index, "amount", e.target.value)
                        }
                      />
                    </td>
                    <td className="border py-2 px-4 text-center">
                      {(item.quantity * item.amount).toLocaleString("en-KE", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border py-2 px-4 text-center">
                      <button
                        type="button"
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="mt-4 px-4 py-2 border rounded hover:bg-gray-100"
            onClick={addItem}
          >
            Add Item
          </button>

          <div className="mt-6 flex flex-col items-end">
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {calculateSubtotal().toLocaleString("en-KE", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>VAT (16%):</span>
                <span>
                  {calculateVAT().toLocaleString("en-KE", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  {calculateTotal().toLocaleString("en-KE", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Additional Information</h2>
            <p className="text-gray-600">
              Edit any additional notes or terms for this invoice
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium">
                Notes
              </label>
              <textarea
                id="notes"
                className="w-full p-2 border rounded min-h-[80px]"
                value={invoiceData.notes}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, notes: e.target.value })
                }
                placeholder="Add any notes or special instructions for the client"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="terms" className="block text-sm font-medium">
                Terms and Conditions
              </label>
              <textarea
                id="terms"
                className="w-full p-2 border rounded min-h-[80px]"
                value={invoiceData.terms}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, terms: e.target.value })
                }
                placeholder="Add your payment terms and conditions"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Link href={`/dashboard/invoices/${id}`}>
            <button
              type="button"
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
