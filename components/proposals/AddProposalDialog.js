'use client';

import { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';

export default function AddProposalDialog({ open, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clients, setClients] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    clientId: '',
    description: '',
    templateId: '',
    amount: '',
    validDays: '30',
    status: 'draft',
    notes: '',
    items: []
  });

  useEffect(() => {
    // Fetch clients and templates when dialog opens
    const fetchData = async () => {
      try {
        const [clientsRes, templatesRes] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/proposal-templates')
        ]);
        
        if (!clientsRes.ok) {
          throw new Error('Failed to fetch clients');
        }
        
        const clientsData = await clientsRes.json();
        setClients(clientsData);
        
        // Templates might not be implemented yet, so handle that gracefully
        if (templatesRes.ok) {
          const templatesData = await templatesRes.json();
          setTemplates(templatesData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTemplateChange = async (e) => {
    const templateId = e.target.value;
    setFormData(prev => ({ ...prev, templateId }));

    if (templateId) {
      try {
        const response = await fetch(`/api/proposal-templates/${templateId}`);
        if (response.ok) {
          const template = await response.json();
          setFormData(prev => ({
            ...prev,
            items: template.items || [],
            description: template.description || prev.description
          }));
        }
      } catch (err) {
        console.error('Error fetching template:', err);
      }
    }
  };

  // Handle line items
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: 1, unitPrice: 0, total: 0 }
      ]
    }));
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    
    // Calculate total if quantity or price changes
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? value : updatedItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? value : updatedItems[index].unitPrice;
      updatedItems[index].total = quantity * unitPrice;
    }

    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  // Calculate total amount based on items
  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare the data with calculated total if not manually entered
      const proposalData = {
        ...formData,
        amount: formData.amount || calculateTotal()
      };

      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create proposal');
      }

      const newProposal = await response.json();
      onSave(newProposal);
    } catch (err) {
      console.error('Error creating proposal:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Create New Proposal</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
