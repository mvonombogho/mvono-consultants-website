"use client";

import { useState, useEffect } from 'react';
import { PlusCircle, Filter, Search, FileText, Clock, Calendar, Download, Eye, Edit, Trash, MoreHorizontal, AlertTriangle } from 'lucide-react';
import ProposalForm from './ProposalForm';
import ProposalViewer from './ProposalViewer';

// Sample data for development
const SAMPLE_PROPOSALS = [
  {
    id: 1,
    title: 'Fire Safety Audit & Training Program',
    client: 'Acme Industries',
    value: 450000,
    status: 'Draft',
    createdDate: '2025-03-08',
    expiryDate: '2025-04-08',
    lastUpdated: '2025-03-10',
    createdBy: 'David Kamau',
    sections: [
      { title: 'Executive Summary', content: 'Comprehensive fire safety audit and training program for Acme Industries manufacturing facility...' },
      { title: 'Scope of Work', content: 'Our proposed services include a thorough assessment of fire safety systems...' },
      { title: 'Methodology', content: 'We will employ a multi-phased approach to ensure all safety standards are met...' },
      { title: 'Timeline', content: 'The project will be completed within 4 weeks of commencement...' },
      { title: 'Pricing', content: 'The total cost for the services outlined is KSh 450,000...' },
      { title: 'Terms & Conditions', content: 'Standard terms and conditions apply. Payment terms are 50% advance, 50% upon completion...' }
    ],
    comments: [
      { id: 1, user: 'Grace Njeri', date: '2025-03-09', text: 'Please review pricing section again' },
      { id: 2, user: 'David Kamau', date: '2025-03-10', text: 'Updated pricing based on new scope' }
    ]
  },
  {
    id: 2,
    title: 'Energy Optimization Assessment',
    client: 'Savanna Hotels',
    value: 780000,
    status: 'Sent',
    createdDate: '2025-03-05',
    expiryDate: '2025-04-05',
    sentDate: '2025-03-12',
    lastUpdated: '2025-03-12',
    createdBy: 'Grace Njeri',
    sections: [
      { title: 'Executive Summary', content: 'Comprehensive energy audit and optimization plan for Savanna Hotels chain...' },
      { title: 'Scope of Work', content: 'Our services include assessment of current energy usage, identification of efficiency opportunities...' },
      { title: 'Methodology', content: 'We will conduct a detailed analysis of all energy systems across your three properties...' },
      { title: 'Timeline', content: 'The assessment will take approximately 6 weeks to complete...' },
      { title: 'Pricing', content: 'The total investment for this energy optimization assessment is KSh 780,000...' },
      { title: 'ROI Projection', content: 'Based on our preliminary analysis, we project annual savings of KSh 2.1 million...' },
      { title: 'Terms & Conditions', content: 'Payment terms are 30% advance, 40% at midpoint, and 30% upon delivery of final report...' }
    ],
    comments: []
  },
  {
    id: 3,
    title: 'Occupational Safety Training Program',
    client: 'BuildRight Construction',
    value: 320000,
    status: 'Accepted',
    createdDate: '2025-03-01',
    expiryDate: '2025-04-01',
    sentDate: '2025-03-07',
    acceptedDate: '2025-03-14',
    lastUpdated: '2025-03-14',
    createdBy: 'David Kamau',
    sections: [
      { title: 'Executive Summary', content: 'Comprehensive safety training program for 150 construction workers...' },
      { title: 'Training Objectives', content: 'Our training program aims to increase safety awareness, reduce workplace accidents...' },
      { title: 'Training Modules', content: 'The program consists of 5 key modules covering PPE, hazard identification...' },
      { title: 'Schedule', content: 'Training will be conducted over a 3-week period with 50 workers per week...' },
      { title: 'Pricing', content: 'The total cost for the training program is KSh 320,000...' },
      { title: 'Terms & Conditions', content: 'Payment terms are 50% advance and 50% upon completion of training...' }
    ],
    comments: []
  },
  {
    id: 4,
    title: 'Refrigeration Plant Safety Compliance',
    client: 'Fresh Foods Processors',
    value: 250000,
    status: 'Expired',
    createdDate: '2025-02-15',
    expiryDate: '2025-03-15',
    sentDate: '2025-02-20',
    lastUpdated: '2025-02-20',
    createdBy: 'Samuel Omondi',
    sections: [
      { title: 'Executive Summary', content: 'Safety compliance assessment for refrigeration plants at processing facility...' },
      { title: 'Scope of Work', content: 'Detailed inspection and certification of refrigeration equipment...' },
      { title: 'Inspection Process', content: 'Our certified inspectors will conduct thorough examinations of all equipment...' },
      { title: 'Deliverables', content: 'You will receive comprehensive inspection reports and safety certificates...' },
      { title: 'Pricing', content: 'The total cost for inspection and certification is KSh 250,000...' },
      { title: 'Terms & Conditions', content: 'Standard terms apply with 100% payment due upon completion...' }
    ],
    comments: []
  },
  {
    id: 5,
    title: 'Environmental Compliance Assessment',
    client: 'EcoFarms Kenya',
    value: 450000,
    status: 'Declined',
    createdDate: '2025-02-28',
    expiryDate: '2025-03-28',
    sentDate: '2025-03-02',
    declinedDate: '2025-03-10',
    lastUpdated: '2025-03-10',
    createdBy: 'Faith Wanjiku',
    declineReason: 'Budget constraints - will revisit in Q3 2025',
    sections: [
      { title: 'Executive Summary', content: 'Environmental compliance assessment for agricultural processing facilities...' },
      { title: 'Assessment Scope', content: 'Comprehensive review of operations against NEMA regulations...' },
      { title: 'Methodology', content: 'Our approach includes site inspections, document reviews, and compliance gap analysis...' },
      { title: 'Timeline', content: 'The assessment will take approximately 4 weeks to complete...' },
      { title: 'Pricing', content: 'The total investment for this assessment is KSh 450,000...' },
      { title: 'Terms & Conditions', content: 'Payment terms are 40% advance and 60% upon delivery of final report...' }
    ],
    comments: []
  }
];

export default function ProposalManagement() {
  const [proposals, setProposals] = useState(SAMPLE_PROPOSALS);
  const [filteredProposals, setFilteredProposals] = useState(SAMPLE_PROPOSALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showProposalViewer, setShowProposalViewer] = useState(false);
  
  // Effect to filter proposals based on search and status
  useEffect(() => {
    let result = [...proposals];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(proposal => 
        proposal.title.toLowerCase().includes(query) || 
        proposal.client.toLowerCase().includes(query) ||
        proposal.createdBy.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(proposal => proposal.status === statusFilter);
    }
    
    setFilteredProposals(result);
  }, [searchQuery, statusFilter, proposals]);
  
  // Calculate proposal stats
  const proposalStats = {
    total: proposals.length,
    draft: proposals.filter(p => p.status === 'Draft').length,
    sent: proposals.filter(p => p.status === 'Sent').length,
    accepted: proposals.filter(p => p.status === 'Accepted').length,
    declined: proposals.filter(p => p.status === 'Declined').length,
    expired: proposals.filter(p => p.status === 'Expired').length,
    totalValue: proposals.reduce((sum, p) => sum + p.value, 0),
    acceptedValue: proposals.filter(p => p.status === 'Accepted').reduce((sum, p) => sum + p.value, 0),
  };
  
  // Handlers
  const handleAddProposal = (proposalData) => {
    const newProposal = {
      ...proposalData,
      id: proposals.length + 1,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      comments: [],
    };
    
    setProposals([...proposals, newProposal]);
    setShowProposalForm(false);
  };
  
  const handleUpdateProposal = (updatedProposal) => {
    setProposals(proposals.map(proposal => 
      proposal.id === updatedProposal.id ? {
        ...updatedProposal,
        lastUpdated: new Date().toISOString().split('T')[0]
      } : proposal
    ));
    setSelectedProposal(null);
    setShowProposalForm(false);
  };
  
  const handleSendProposal = (proposalId) => {
    setProposals(proposals.map(proposal => 
      proposal.id === proposalId ? {
        ...proposal,
        status: 'Sent',
        sentDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      } : proposal
    ));
  };
  
  const handleAcceptProposal = (proposalId) => {
    setProposals(proposals.map(proposal => 
      proposal.id === proposalId ? {
        ...proposal,
        status: 'Accepted',
        acceptedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      } : proposal
    ));
  };
  
  const handleDeclineProposal = (proposalId, reason) => {
    setProposals(proposals.map(proposal => 
      proposal.id === proposalId ? {
        ...proposal,
        status: 'Declined',
        declinedDate: new Date().toISOString().split('T')[0],
        declineReason: reason,
        lastUpdated: new Date().toISOString().split('T')[0]
      } : proposal
    ));
  };
  
  const handleDeleteProposal = (proposalId) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      setProposals(proposals.filter(proposal => proposal.id !== proposalId));
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proposal Management</h1>
            <p className="text-gray-600 mt-1">Create, track, and manage client proposals efficiently</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => {
                setSelectedProposal(null);
                setShowProposalForm(true);
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Proposal
            </button>
          </div>
        </div>
      </div>
      
      {/* Metrics */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Proposals</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{proposalStats.total}</p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span className="text-green-600 font-medium">{proposalStats.accepted} Accepted</span>
              <span className="mx-1">•</span>
              <span>{proposalStats.draft} Draft</span>
              <span className="mx-1">•</span>
              <span>{proposalStats.sent} Sent</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Proposal Value</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(proposalStats.totalValue)}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Accepted Value</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(proposalStats.acceptedValue)}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Acceptance Rate</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {proposalStats.total > 0 ? 
                `${Math.round((proposalStats.accepted / proposalStats.total) * 100)}%` : 
                '0%'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters & Search */}
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-primary-500 focus:border-primary-500 w-full md:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Proposals List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProposals.length > 0 ? (
              filteredProposals.map(proposal => {
                const isExpiringSoon = proposal.status === 'Sent' && 
                  new Date(proposal.expiryDate) < new Date(new Date().setDate(new Date().getDate() + 7)) &&
                  new Date(proposal.expiryDate) > new Date();
                
                return (
                  <tr key={proposal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div 
                            className="text-sm font-medium text-primary-600 hover:text-primary-800 cursor-pointer"
                            onClick={() => {
                              setSelectedProposal(proposal);
                              setShowProposalViewer(true);
                            }}
                          >
                            {proposal.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Last updated: {new Date(proposal.lastUpdated).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {proposal.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(proposal.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(proposal.status)}`}>
                          {proposal.status}
                        </span>
                        {isExpiringSoon && (
                          <span className="ml-2" title="Expiring soon">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(proposal.createdDate).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(proposal.expiryDate).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {proposal.createdBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedProposal(proposal);
                            setShowProposalViewer(true);
                          }}
                          className="text-gray-500 hover:text-primary-600"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        
                        {proposal.status === 'Draft' && (
                          <button 
                            onClick={() => {
                              setSelectedProposal(proposal);
                              setShowProposalForm(true);
                            }}
                            className="text-gray-500 hover:text-primary-600"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                        )}
                        
                        {proposal.status === 'Draft' && (
                          <button 
                            onClick={() => handleSendProposal(proposal.id)}
                            className="text-gray-500 hover:text-primary-600"
                            title="Send to Client"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                        )}
                        
                        {proposal.status === 'Draft' && (
                          <button 
                            onClick={() => handleDeleteProposal(proposal.id)}
                            className="text-gray-500 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        )}
                        
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                  No proposals found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Proposal Form Modal */}
      {showProposalForm && (
        <ProposalForm 
          proposal={selectedProposal}
          onSubmit={selectedProposal ? handleUpdateProposal : handleAddProposal}
          onCancel={() => {
            setSelectedProposal(null);
            setShowProposalForm(false);
          }}
        />
      )}
      
      {/* Proposal Viewer Modal */}
      {showProposalViewer && selectedProposal && (
        <ProposalViewer 
          proposal={selectedProposal}
          onClose={() => {
            setSelectedProposal(null);
            setShowProposalViewer(false);
          }}
          onAccept={() => {
            handleAcceptProposal(selectedProposal.id);
            setShowProposalViewer(false);
          }}
          onDecline={(reason) => {
            handleDeclineProposal(selectedProposal.id, reason);
            setShowProposalViewer(false);
          }}
          onEdit={() => {
            setShowProposalViewer(false);
            setShowProposalForm(true);
          }}
        />
      )}
    </div>
  );
}
