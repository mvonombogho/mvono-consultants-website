'use client';

import { useState, useEffect } from 'react';
import { Schedule, getScheduleStatusColor } from '@/types/schedule';
import { FaCalendarAlt, FaUser, FaBuilding, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function UpcomingSchedulesWidget() {
  const [upcomingSchedules, setUpcomingSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpcomingSchedules();
  }, []);

  const fetchUpcomingSchedules = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get schedules for the next 7 days
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + 7);
      
      const startDateStr = today.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const response = await fetch(`/api/schedules?startDate=${startDateStr}&endDate=${endDateStr}&status=scheduled`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming schedules');
      }
      
      const data = await response.json();
      setUpcomingSchedules(data.slice(0, 5)); // Limit to 5 upcoming schedules
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
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
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

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <FaCalendarAlt className="text-primary-600 mr-2" size={20} />
          <h3 className="text-lg font-medium text-gray-900">Upcoming Schedules</h3>
        </div>
        <Link 
          href="/admin/schedule" 
          className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
        >
          View All
          <FaArrowRight className="ml-1" size={12} />
        </Link>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 p-3 text-center">{error}</div>
        ) : upcomingSchedules.length === 0 ? (
          <div className="text-gray-500 py-10 text-center">
            <p>No upcoming schedules for the next 7 days</p>
            <Link 
              href="/admin/schedule?new=true" 
              className="mt-2 inline-block text-primary-600 hover:text-primary-800"
            >
              Create a new schedule
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {upcomingSchedules.map((schedule) => (
              <Link 
                key={schedule.id} 
                href={`/admin/schedule?id=${schedule.id}&action=view`}
                className="block py-3 px-1 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{schedule.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(schedule.startDate)}</p>
                    
                    <div className="flex flex-wrap mt-2 gap-2">
                      {schedule.client && (
                        <div className="flex items-center text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
                          <FaBuilding className="mr-1" size={10} />
                          {schedule.client.name}
                        </div>
                      )}
                      
                      {schedule.assignedTo && (
                        <div className="flex items-center text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
                          <FaUser className="mr-1" size={10} />
                          {schedule.assignedTo.name}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <span className={`text-xs font-medium rounded-full px-2 py-1 ${getScheduleStatusColor(schedule.status)}`}>
                    {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                  </span>
                </div>
                
                {schedule.location && (
                  <div className="mt-2 text-xs text-gray-500">
                    📍 {schedule.location}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
