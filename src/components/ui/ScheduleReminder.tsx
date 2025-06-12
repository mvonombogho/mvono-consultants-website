'use client';

import { useState, useEffect } from 'react';
import { Schedule } from '@/types/schedule';
import { FaBell, FaTimes, FaCalendarAlt, FaUser, FaBuilding, FaTools } from 'react-icons/fa';
import Link from 'next/link';

interface ScheduleReminderProps {
  upcomingSchedules?: Schedule[];
  daysThreshold?: number;
}

export default function ScheduleReminder({ 
  upcomingSchedules: initialSchedules,
  daysThreshold = 3
}: ScheduleReminderProps) {
  const [upcomingSchedules, setUpcomingSchedules] = useState<Schedule[]>(initialSchedules || []);
  const [isLoading, setIsLoading] = useState(!initialSchedules);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch upcoming schedules if not provided
  useEffect(() => {
    if (!initialSchedules) {
      fetchUpcomingSchedules();
    }
  }, [initialSchedules]);

  const fetchUpcomingSchedules = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate the date range for upcoming schedules
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + daysThreshold);
      
      const startDateStr = today.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const response = await fetch(`/api/schedules?startDate=${startDateStr}&endDate=${endDateStr}&status=scheduled`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming schedules');
      }
      
      const data = await response.json();
      setUpcomingSchedules(data);
      
      // Auto-open if there are upcoming schedules
      if (data.length > 0) {
        setIsOpen(true);
      }
    } catch (error) {
      setError('Failed to load upcoming schedules');
      console.error('Error loading upcoming schedules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise, show full date
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // If no upcoming schedules and not loading, don't render anything
  if (upcomingSchedules.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Notification header */}
      <div 
        className="bg-primary-600 text-white p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaBell className="mr-2" />
          <span className="font-medium">
            {isLoading ? 'Checking upcoming schedules...' : `${upcomingSchedules.length} Upcoming Schedule${upcomingSchedules.length !== 1 ? 's' : ''}`}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="text-white hover:text-gray-200"
        >
          <FaTimes />
        </button>
      </div>
      
      {/* Notification body */}
      {isOpen && (
        <div className="p-3 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 p-3">{error}</div>
          ) : (
            <div className="space-y-3">
              {upcomingSchedules.map((schedule) => (
                <div key={schedule.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <Link href={`/admin/schedule?id=${schedule.id}&action=view`} className="block">
                    <div className="font-medium text-gray-900 mb-1">{schedule.title}</div>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <FaCalendarAlt className="mr-2 text-gray-400" size={14} />
                      {formatDate(schedule.startDate)}
                    </div>
                    
                    {schedule.client && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaBuilding className="mr-2 text-gray-400" size={14} />
                        {schedule.client.name}
                      </div>
                    )}
                    
                    {schedule.service && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaTools className="mr-2 text-gray-400" size={14} />
                        {schedule.service.name}
                      </div>
                    )}
                    
                    {schedule.assignedTo && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaUser className="mr-2 text-gray-400" size={14} />
                        Assigned to: {schedule.assignedTo.name}
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-3 flex justify-end">
            <Link
              href="/admin/schedule"
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              View all schedules
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
