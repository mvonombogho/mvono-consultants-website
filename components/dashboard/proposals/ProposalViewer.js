"use client";

import { useState } from 'react';
import { X, Download, Edit, CheckCircle, XCircle, Calendar, Clock, FileText, DollarSign, User, AlertTriangle } from 'lucide-react';

export default function ProposalViewer({ proposal, onClose, onEdit, onAccept, onDecline }) {
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const formatCurrency = (amount) => {
    return `KSh ${amount.toLocaleString()}`;
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
  
  const isExpiringSoon = 
    proposal.status === 'Sent' && 
    new Date(proposal.expiryDate) < new Date(new Date().setDate(new Date().getDate() + 7)) &&
    new Date(proposal.expiryDate) > new Date();
  
  const showEditButton = proposal.status === 'Draft';
  const showAcceptDeclineButtons = proposal.status === 'Sent';

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary-600" />
            Proposal
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Header Info */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{proposal.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span className="font-medium text-gray-700">Client:</span>
                <span className="ml-1">{proposal.client}</span>
              </div>
              
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="font-medium text-gray-700">Value:</span>
                <span className="ml-1">{formatCurrency(proposal.value)}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Status:</span>
                <span className={`ml-1 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(proposal.status)}`}>
                  {proposal.status}
                  {isExpiringSoon && (
                    <AlertTriangle className="h-3 w-3 ml-1 text-amber-500" />
                  )}
                </span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="font-medium text-gray-700">Created:</span>
                <span className="ml-1">{formatDate(proposal.createdDate)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span className="font-medium text-gray-700">Expires:</span>
                <span className="ml-1">{formatDate(proposal.expiryDate)}</span>
              </div>
              
              {proposal.sentDate && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">Sent:</span>
                  <span className="ml-1">{formatDate(proposal.sentDate)}</span>
                </div>
              )}
              
              {proposal.acceptedDate && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">Accepted:</span>
                  <span className="ml-1">{formatDate(proposal.acceptedDate)}</span>
                </div>
              )}
              
              {proposal.declinedDate && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">Declined:</span>
                  <span className="ml-1">{formatDate(proposal.declinedDate)}</span>
                </div>
              )}
            </div>
            
            {proposal.declineReason && (
              <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-lg">
                <p className="font-medium">Decline Reason:</p>
                <p>{proposal.declineReason}</p>
              </div>
            )}
          </div>
          
          {/* Proposal Content */}
          <div className="mb-8 space-y-6">
            {proposal.sections.map((section, index) => (
              <div key={index} className="border-b pb-6 last:border-b-0">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
                <div className="prose max-w-none">
                  {section.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Comments */}
          {proposal.comments && proposal.comments.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
              <div className="space-y-4">
                {proposal.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{comment.user}</span>
                      <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            {showEditButton && (
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
              >
                <Edit className="h-5 w-5 mr-2" />
                Edit Proposal
              </button>
            )}
            
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Export PDF
            </button>
            
            {showAcceptDeclineButtons && (
              <>
                <button
                  onClick={onAccept}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Accept Proposal
                </button>
                
                <button
                  onClick={() => setIsDeclineModalOpen(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Decline Proposal
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Decline Reason Modal */}
      {isDeclineModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsDeclineModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">Decline Proposal</h3>
              <p className="text-sm text-gray-500 mt-1">Please provide a reason for declining this proposal.</p>
            </div>
            
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-4"
              placeholder="E.g., Budget constraints, timing issues..."
            ></textarea>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeclineModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDecline(declineReason);
                  setIsDeclineModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={!declineReason.trim()}
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
