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

      <div className="mb-5">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search proposals by title, client, or description..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Filters summary */}
      {Object.values(filters).some(val => val) && (
        <div className="mb-5 flex items-center space-x-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          {Object.entries(filters).map(([key, value]) => (
            value ? (
              <span 
                key={key} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}
                <button 
                  type="button" 
                  onClick={() => setFilters({...filters, [key]: ''})}
                  className="ml-1 inline-flex text-primary-600 hover:text-primary-800 focus:outline-none"
                >
                  <span className="sr-only">Remove filter for {key}</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            ) : null
          ))}
          <button 
            type="button" 
            onClick={() => setFilters({status: '', clientId: ''})}
            className="text-xs text-primary-600 hover:text-primary-800"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button 
                        className="group inline-flex items-center"
                        onClick={() => handleSort('title')}
                      >
                        Proposal
                        <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ArrowUpDown className="h-4 w-4" />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button 
                        className="group inline-flex items-center"
                        onClick={() => handleSort('client.name')}
                      >
                        Client
                        <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ArrowUpDown className="h-4 w-4" />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button 
                        className="group inline-flex items-center"
                        onClick={() => handleSort('status')}
                      >
                        Status
                        <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ArrowUpDown className="h-4 w-4" />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button
                        className="group inline-flex items-center"
                        onClick={() => handleSort('amount')}
                      >
                        Value
                        <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ArrowUpDown className="h-4 w-4" />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button
                        className="group inline-flex items-center"
                        onClick={() => handleSort('createdAt')}
                      >
                        Created
                        <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ArrowUpDown className="h-4 w-4" />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button
                        className="group inline-flex items-center"
                        onClick={() => handleSort('validUntil')}
                      >
                        Valid Until
                        <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ArrowUpDown className="h-4 w-4" />
                        </span>
                      </button>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center">
                        <div className="flex justify-center">
                          <RefreshCw className="h-8 w-8 text-primary-600 animate-spin" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Loading proposals...</p>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center">
                        <p className="text-sm text-red-500">{error}</p>
                        <button
                          onClick={fetchProposals}
                          className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Try Again
                        </button>
                      </td>
                    </tr>
                  ) : proposals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center">
                        <p className="text-sm text-gray-500">No proposals found.</p>
                        <button
                          onClick={() => setShowAddDialog(true)}
                          className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Create your first proposal
                        </button>
                      </td>
                    </tr>
                  ) : (