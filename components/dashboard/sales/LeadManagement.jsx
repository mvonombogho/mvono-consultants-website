'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Filter, Download, PlusCircle, 
  CheckCircle2, Clock, XCircle, ArrowUpRight,
  Phone, Mail, Calendar, Edit, Trash2, MoreHorizontal
} from 'lucide-react';
import { gsap } from 'gsap';

const LEAD_STATUSES = {
  NEW: { label: 'New', color: 'bg-blue-500', icon: PlusCircle },
  QUALIFIED: { label: 'Qualified', color: 'bg-green-500', icon: CheckCircle2 },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-amber-500', icon: Clock },
  LOST: { label: 'Lost', color: 'bg-red-500', icon: XCircle },
  CONVERTED: { label: 'Converted', color: 'bg-purple-500', icon: ArrowUpRight },
};

// Sample lead data - would come from API in production
const SAMPLE_LEADS = [
  {
    id: 1,
    name: 'Lafarge Kenya',
    contactPerson: 'John Mwangi',
    email: 'john.mwangi@lafarge.com',
    phone: '+254 712 345 678',
    status: 'QUALIFIED',
    source: 'Website',
    industry: 'Manufacturing',
    score: 85,
    lastContact: '2025-03-10',
    notes: 'Interested in our fire safety audit services. Follow up with service details.',
    createdAt: '2025-03-01',
  },
  {
    id: 2,
    name: 'Radisson Blu Nairobi',
    contactPerson: 'Sarah Kimani',
    email: 'sarah.kimani@radissonblu.com',
    phone: '+254 722 987 654',
    status: 'NEW',
    source: 'Referral',
    industry: 'Hospitality',
    score: 65,
    lastContact: '2025-03-12',
    notes: 'Referred by Movenpick. Looking for occupational safety services.',
    createdAt: '2025-03-12',
  },
  {
    id: 3,
    name: 'Tata Chemicals Magadi',
    contactPerson: 'David Otieno',
    email: 'david.otieno@tatachemicals.com',
    phone: '+254 733 111 222',
    status: 'IN_PROGRESS',
    source: 'Exhibition',
    industry: 'Chemical',
    score: 75,
    lastContact: '2025-03-08',
    notes: 'Met at the Industrial Trade Fair. Need full safety assessment.',
    createdAt: '2025-02-28',
  },
  {
    id: 4,
    name: 'Dormans Coffee',
    contactPerson: 'Patricia Wanjiku',
    email: 'patricia@dormans.co.ke',
    phone: '+254 711 456 789',
    status: 'CONVERTED',
    source: 'LinkedIn',
    industry: 'Food Processing',
    score: 90,
    lastContact: '2025-03-05',
    notes: 'Successfully converted to client. Starting with environmental assessment.',
    createdAt: '2025-02-15',
  },
  {
    id: 5,
    name: 'Saint Gobain Kenya',
    contactPerson: 'Mohammed Ali',
    email: 'mali@saintgobain.co.ke',
    phone: '+254 722 333 444',
    status: 'LOST',
    source: 'Email Campaign',
    industry: 'Construction',
    score: 40,
    lastContact: '2025-03-02',
    notes: 'Went with a competitor. Price was the deciding factor.',
    createdAt: '2025-02-20',
  },
];

const LeadManagement = () => {
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [filteredLeads, setFilteredLeads] = useState(SAMPLE_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newLead, setNewLead] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    status: 'NEW',
    source: '',
    industry: '',
    notes: '',
  });

  // Reference for animation
  const listRef = React.useRef(null);
  const detailsRef = React.useRef(null);
  const formRef = React.useRef(null);

  useEffect(() => {
    // Animation for lead list on component mount
    gsap.fromTo(
      listRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out' }
    );
  }, [filteredLeads]);

  useEffect(() => {
    // Filter leads based on search term and status filter
    let results = leads;
    
    if (searchTerm) {
      results = results.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'ALL') {
      results = results.filter(lead => lead.status === statusFilter);
    }
    
    setFilteredLeads(results);
  }, [searchTerm, statusFilter, leads]);

  const handleOpenDetails = (lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
    
    // Animate details panel
    gsap.fromTo(
      detailsRef.current,
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  };

  const handleCloseDetails = () => {
    gsap.to(detailsRef.current, {
      x: 300,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsDetailOpen(false)
    });
  };

  const handleOpenAddLead = () => {
    setIsAddLeadOpen(true);
    
    // Animate form
    gsap.fromTo(
      formRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  };

  const handleCloseAddLead = () => {
    gsap.to(formRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsAddLeadOpen(false)
    });
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newLeadWithDetails = {
      ...newLead,
      id: leads.length + 1,
      score: Math.floor(Math.random() * 50) + 50, // Random score between 50-100
      lastContact: currentDate,
      createdAt: currentDate,
    };
    
    setLeads([newLeadWithDetails, ...leads]);
    
    // Reset form
    setNewLead({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      status: 'NEW',
      source: '',
      industry: '',
      notes: '',
    });
    
    handleCloseAddLead();
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
    if (isDetailOpen && selectedLead.id === id) {
      handleCloseDetails();
    }
  };

  const handleUpdateLeadStatus = (id, newStatus) => {
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lead Management</h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => handleOpenAddLead()}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Plus size={18} className="mr-1" />
            <span>Add Lead</span>
          </button>
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors">
            <Download size={18} className="mr-1" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-between mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Leads</option>
            {Object.keys(LEAD_STATUSES).map(statusKey => (
              <option key={statusKey} value={statusKey}>
                {LEAD_STATUSES[statusKey].label} Leads
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody ref={listRef} className="bg-white divide-y divide-gray-200">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4" onClick={() => handleOpenDetails(lead)}>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{lead.name}</span>
                      <span className="text-sm text-gray-500">{lead.contactPerson}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4" onClick={() => handleOpenDetails(lead)}>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${LEAD_STATUSES[lead.status].color} text-white`}>
                      {React.createElement(LEAD_STATUSES[lead.status].icon, { size: 12, className: "mr-1" })}
                      {LEAD_STATUSES[lead.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500" onClick={() => handleOpenDetails(lead)}>
                    {lead.source}
                  </td>
                  <td className="px-6 py-4" onClick={() => handleOpenDetails(lead)}>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            lead.score >= 80 ? 'bg-green-500' : 
                            lead.score >= 60 ? 'bg-blue-500' : 
                            lead.score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${lead.score}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500" onClick={() => handleOpenDetails(lead)}>
                    {new Date(lead.lastContact).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No leads found. Try adjusting your filters or add a new lead.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Lead Details Panel */}
      {isDetailOpen && (
        <div 
          ref={detailsRef}
          className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-2xl p-6 z-50 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Lead Details</h2>
            <button 
              onClick={handleCloseDetails}
              className="text-gray-400 hover:text-gray-500"
            >
              <XCircle size={20} />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{selectedLead.name}</h3>
            <p className="text-sm text-gray-500">Added on {new Date(selectedLead.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${LEAD_STATUSES[selectedLead.status].color} text-white`}>
                {React.createElement(LEAD_STATUSES[selectedLead.status].icon, { size: 14, className: "mr-1" })}
                {LEAD_STATUSES[selectedLead.status].label}
              </span>
              <div className="ml-auto">
                <select 
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateLeadStatus(selectedLead.id, e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(LEAD_STATUSES).map(statusKey => (
                    <option key={statusKey} value={statusKey}>
                      {LEAD_STATUSES[statusKey].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3">CONTACT INFORMATION</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-2" />
                <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">{selectedLead.email}</a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-gray-400 mr-2" />
                <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:underline">{selectedLead.phone}</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3">LEAD INFORMATION</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Contact Person</p>
                <p>{selectedLead.contactPerson}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Industry</p>
                <p>{selectedLead.industry}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Source</p>
                <p>{selectedLead.source}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Score</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedLead.score >= 80 ? 'bg-green-500' : 
                        selectedLead.score >= 60 ? 'bg-blue-500' : 
                        selectedLead.score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${selectedLead.score}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">{selectedLead.score}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3">NOTES</h4>
            <p className="text-sm text-gray-700 whitespace-pre-line">{selectedLead.notes}</p>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-500">ACTIVITIES</h4>
              <button className="text-sm text-blue-600 hover:text-blue-800">Add Activity</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last contacted</p>
                  <p className="text-xs text-gray-500">{new Date(selectedLead.lastContact).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Convert to Client
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors">
              Schedule Follow-up
            </button>
          </div>
        </div>
      )}

      {/* Add Lead Form Modal */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={formRef}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add New Lead</h2>
              <button 
                onClick={handleCloseAddLead}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleAddLead}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLead.contactPerson}
                    onChange={(e) => setNewLead({...newLead, contactPerson: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source
                    </label>
                    <select
                      value={newLead.source}
                      onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Source</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Exhibition">Exhibition</option>
                      <option value="Email Campaign">Email Campaign</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <select
                      value={newLead.industry}
                      onChange={(e) => setNewLead({...newLead, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Industry</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Food Processing">Food Processing</option>
                      <option value="Construction">Construction</option>
                      <option value="Chemical">Chemical</option>
                      <option value="Oil and Gas">Oil and Gas</option>
                      <option value="Mining">Mining</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseAddLead}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;