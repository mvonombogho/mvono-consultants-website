'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ScheduleCalendar from './components/ScheduleCalendar';
import ScheduleList from './components/ScheduleList';
import ScheduleFilters from './components/ScheduleFilters';
import ScheduleModal from './components/ScheduleModal';
import { ScheduleProvider } from '@/contexts/ScheduleContext';
import { FaCalendarAlt, FaList, FaPlus } from 'react-icons/fa';

export default function SchedulePage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  
  // Check if we need to open a specific schedule
  useEffect(() => {
    const scheduleId = searchParams.get('id');
    if (scheduleId) {
      // We'll handle this in the child components
    }
  }, [searchParams]);

  return (
    <ScheduleProvider>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Service Schedule</h1>
            <p className="text-gray-600 mt-1">Manage service appointments and schedules</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-lg shadow p-1 flex mr-2">
              <button
                onClick={() => setView('calendar')}
                className={`px-3 py-2 rounded-md flex items-center ${
                  view === 'calendar'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaCalendarAlt className="mr-2" size={16} />
                <span className="hidden sm:inline">Calendar</span>
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-2 rounded-md flex items-center ${
                  view === 'list'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaList className="mr-2" size={16} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <FaPlus className="mr-2" size={14} />
              <span>Add Schedule</span>
            </button>
          </div>
        </div>
        
        <ScheduleFilters />
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {view === 'calendar' ? (
            <ScheduleCalendar openModal={() => setIsModalOpen(true)} />
          ) : (
            <ScheduleList openModal={() => setIsModalOpen(true)} />
          )}
        </div>
        
        <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </ScheduleProvider>
  );
}
