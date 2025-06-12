"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    clientId: "",
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 10000)
    ).padStart(4, "0")}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    poNumber: "",
    notes: "",
    terms: "Payment due within 30 days of invoice date.",
  });

  const [items, setItems] = useState([
    { description: "", quantity: 1, amount: 0 },
  ]);

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
    setLoading(true);

    try {
      // Validate the form data
      const formData = {
        ...invoiceData,
        items,
      };

      // In a real app, you would send this data to your API
      console.log("Form data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Invoice created successfully!");
      router.push("/dashboard/finances/invoices");
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice. Please try again.");
    } finally {
      setLoading(false);
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

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create New Invoice</h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={() => router.push("/dashboard/finances/invoices")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Invoice Details Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Invoice Details</h2>
            <p className="text-gray-600">
              Enter the basic information for this invoice
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
          </div>
        </div>

        {/* Invoice Items Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Invoice Items</h2>
            <p className="text-gray-600">
              Add the services or products you're invoicing for
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
              Add any additional notes or terms to the invoice
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
          <button
            type="button"
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={() => router.push("/dashboard/finances/invoices")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}
