'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus, Filter, Search, FileText, ArrowUpDown, 
  Calendar, MoreHorizontal, RefreshCw, Download, Eye 
} from 'lucide-react';
import { format } from 'date-fns';

// UI Components import
import ProposalStatusBadge from '@/components/proposals/ProposalStatusBadge';
import AddProposalDialog from '@/components/proposals/AddProposalDialog';
import ProposalFilterDialog from '@/components/proposals/ProposalFilterDialog';

export default function ProposalsPage() {
  const router = useRouter();
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    clientId: '',
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    fetchProposals();
  }, [searchQuery, filters, sortField, sortDirection]);

  const fetchProposals = async () => {
    setIsLoading(true);
    try {
      // Build query string with search and filters
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('search', searchQuery);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/proposals?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch proposals');
      }
      const data = await response.json();
      
      // Apply sorting
      const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
      
      setProposals(sortedData);
    } catch (err) {
      console.error('Error fetching proposals:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProposal = async (newProposal) => {
    setShowAddDialog(false);
    try {
      await fetchProposals();
    } catch (err) {
      console.error('Error refreshing proposals:', err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowFilterDialog(false);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const navigateToProposalDetail = (proposalId) => {
    router.push(`/dashboard/proposals/${proposalId}`);
  };

  // Calculate proposal statistics
  const totalProposals = proposals.length;
  const pendingProposals = proposals.filter(p => p.status === 'draft' || p.status === 'sent').length;
  const acceptedProposals = proposals.filter(p => p.status === 'accepted').length;
  const acceptanceRate = totalProposals > 0 ? Math.round((acceptedProposals / totalProposals) * 100) : 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Proposal Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create, track, and manage client proposals efficiently.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
          <button
            type="button"
            onClick={() => setShowFilterDialog(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button
            type="button"
            onClick={fetchProposals}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setShowAddDialog(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Proposal
          </button>
        </div>
      </div>
      
      {/* Proposal Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Proposals</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {totalProposals}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Proposals</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {pendingProposals}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Accepted Proposals</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {acceptedProposals}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowUpDown className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Acceptance Rate</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {acceptanceRate}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
