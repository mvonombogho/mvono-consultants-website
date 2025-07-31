'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSchedule } from '@/contexts/ScheduleContext';
import { SCHEDULE_STATUSES } from '@/types/schedule';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

export default function ScheduleFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { getSchedules } = useSchedule();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [clientId, setClientId] = useState(searchParams.get('clientId') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
  
  // Fetch clients for the dropdown
  const [clients, setClients] = useState<Array<{ id: string; name: string }>>([]);
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    
    fetchClients();
  }, []);
  
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (clientId) params.set('clientId', clientId);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    
    router.push(`${pathname}?${params.toString()}`);
    getSchedules({
      search,
      status,
      clientId,
      startDate,
      endDate,
    });
  };
  
  const resetFilters = () => {
    setSearch('');
    setStatus('');
    setClientId('');
    setStartDate('');
    setEndDate('');
    router.push(pathname);
    getSchedules();
  };
  
  // Apply filters on page load
  useEffect(() => {
    getSchedules({
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
      clientId: searchParams.get('clientId') || '',
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || '',
    });
  }, [searchParams, getSchedules]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search bar */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schedules..."
            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {/* Filter toggle button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
        >
          <FaFilter className="mr-2" />
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <FaTimes className="mr-2" />
            Reset
          </button>
        </div>
      </div>
      
      {/* Expanded filters */}
      {isFilterOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All statuses</option>
              {SCHEDULE_STATUSES.map((statusOption) => (
                <option key={statusOption.value} value={statusOption.value}>
                  {statusOption.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Client filter */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <select
              id="client"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All clients</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Date range filters */}
          <div className="md:col-span-1 grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
