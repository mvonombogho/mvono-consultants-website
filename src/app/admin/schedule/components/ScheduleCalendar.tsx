'use client';

import { useState, useEffect } from 'react';
import { useSchedule } from '@/contexts/ScheduleContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Schedule } from '@/types/schedule';
import ScheduleModal from './ScheduleModal';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

interface ScheduleCalendarProps {
  openModal: () => void;
}

export default function ScheduleCalendar({ openModal }: ScheduleCalendarProps) {
  const { schedules, loading, error, getSchedules, setSelectedSchedule } = useSchedule();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [dateForNewEvent, setDateForNewEvent] = useState<Date | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Set up calendar days
  useEffect(() => {
    const days = generateCalendarDays(currentDate, currentView);
    setCalendarDays(days);
  }, [currentDate, currentView]);

  // Initial data fetch
  useEffect(() => {
    // Get first and last day from calendar
    if (calendarDays.length > 0) {
      const startDate = calendarDays[0].toISOString().split('T')[0];
      const lastDay = calendarDays[calendarDays.length - 1];
      // Set end date to end of the day
      const endDate = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate(), 23, 59, 59)
        .toISOString()
        .split('T')[0];
      
      getSchedules({ startDate, endDate });
    }
  }, [calendarDays, getSchedules]);

  // Check URL params for schedule ID
  useEffect(() => {
    const id = searchParams.get('id');
    const action = searchParams.get('action');
    
    if (id && action === 'edit') {
      handleEditSchedule(id);
    } else if (id && action === 'view') {
      handleViewSchedule(id);
    }
  }, [searchParams]);

  const generateCalendarDays = (date: Date, view: 'month' | 'week' | 'day'): Date[] => {
    const days: Date[] = [];
    
    if (view === 'month') {
      // Get the first day of the month
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
      const firstDayOfWeek = firstDay.getDay();
      
      // Add days from previous month to start the calendar from Sunday
      for (let i = firstDayOfWeek; i > 0; i--) {
        const prevDate = new Date(date.getFullYear(), date.getMonth(), 1 - i);
        days.push(prevDate);
      }
      
      // Add all days of the current month
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(date.getFullYear(), date.getMonth(), i));
      }
      
      // Add days from next month to complete the grid (6 rows × 7 columns)
      const remainingDays = 42 - days.length; // 6 rows of 7 days
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(date.getFullYear(), date.getMonth() + 1, i));
      }
    } else if (view === 'week') {
      // Get the first day of the week (Sunday)
      const dayOfWeek = date.getDay();
      const firstDayOfWeek = new Date(date);
      firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
      
      // Add all 7 days of the week
      for (let i = 0; i < 7; i++) {
        const newDate = new Date(firstDayOfWeek);
        newDate.setDate(firstDayOfWeek.getDate() + i);
        days.push(newDate);
      }
    } else if (view === 'day') {
      // Just add the current date
      days.push(new Date(date));
    }
    
    return days;
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (view: 'month' | 'week' | 'day') => {
    setCurrentView(view);
  };

  const handleDayClick = (date: Date) => {
    setDateForNewEvent(date);
    setIsCreateModalOpen(true);
  };

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsViewModalOpen(true);
  };

  const handleEditSchedule = async (id: string) => {
    const schedule = schedules.find(s => s.id === id) || await getScheduleById(id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsEditModalOpen(true);
    }
  };

  const handleViewSchedule = async (id: string) => {
    const schedule = schedules.find(s => s.id === id) || await getScheduleById(id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsViewModalOpen(true);
    }
  };

  const getScheduleById = async (id: string) => {
    try {
      const response = await fetch(`/api/schedules/${id}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
    return null;
  };

  // Helper function to get schedules for a specific day
  const getSchedulesForDay = (date: Date) => {
    return schedules.filter(schedule => {
      const scheduleStart = new Date(schedule.startDate);
      const scheduleEnd = new Date(schedule.endDate);
      
      return (
        scheduleStart.getDate() === date.getDate() &&
        scheduleStart.getMonth() === date.getMonth() &&
        scheduleStart.getFullYear() === date.getFullYear()
      ) || (
        scheduleEnd.getDate() === date.getDate() &&
        scheduleEnd.getMonth() === date.getMonth() &&
        scheduleEnd.getFullYear() === date.getFullYear()
      ) || (
        scheduleStart <= date && scheduleEnd >= date
      );
    });
  };

  // Get month name and year for the header
  const getHeaderText = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };
    
    if (currentView === 'month') {
      return currentDate.toLocaleDateString('en-US', options);
    } else if (currentView === 'week') {
      const firstDay = calendarDays[0];
      const lastDay = calendarDays[calendarDays.length - 1];
      
      if (firstDay.getMonth() === lastDay.getMonth()) {
        return `${firstDay.toLocaleDateString('en-US', { month: 'long' })} ${firstDay.getDate()} - ${lastDay.getDate()}, ${firstDay.getFullYear()}`;
      } else {
        return `${firstDay.toLocaleDateString('en-US', { month: 'short' })} ${firstDay.getDate()} - ${lastDay.toLocaleDateString('en-US', { month: 'short' })} ${lastDay.getDate()}, ${firstDay.getFullYear()}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  if (loading && schedules.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && schedules.length === 0) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Error loading schedules: {error}</p>
        <button
          onClick={() => getSchedules()}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4 mb-3 sm:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">{getHeaderText()}</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Previous"
            >
              <FaChevronLeft className="text-gray-600" size={14} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Next"
            >
              <FaChevronRight className="text-gray-600" size={14} />
            </button>
            <button
              onClick={handleToday}
              className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Today
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="border rounded-md overflow-hidden">
            <button
              onClick={() => handleViewChange('month')}
              className={`px-3 py-1 text-sm ${
                currentView === 'month' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => handleViewChange('week')}
              className={`px-3 py-1 text-sm ${
                currentView === 'week' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => handleViewChange('day')}
              className={`px-3 py-1 text-sm ${
                currentView === 'day' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
          </div>
        </div>
      </div>
      
      {/* Calendar Body */}
      <div className="overflow-auto">
        {currentView === 'month' && (
          <div className="grid grid-cols-7 text-sm">
            {/* Weekday headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center font-semibold text-gray-600 border-b">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const daySchedules = getSchedulesForDay(date);
              
              return (
                <div
                  key={index}
                  className={`min-h-24 border-b border-r p-1 ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                  } ${isToday ? 'bg-blue-50' : ''}`}
                  onClick={() => handleDayClick(date)}
                >
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm font-medium ${isToday ? 'text-primary-600' : ''}`}>
                      {date.getDate()}
                    </span>
                    {daySchedules.length > 0 && (
                      <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-1">
                        {daySchedules.length}
                      </span>
                    )}
                  </div>
                  
                  {/* Display events for the day */}
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {daySchedules.slice(0, 3).map((schedule) => (
                      <div
                        key={schedule.id}
                        className={`text-xs p-1 rounded cursor-pointer truncate ${
                          schedule.color ? `bg-${schedule.color}-100 text-${schedule.color}-800` : 'bg-blue-100 text-blue-800'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScheduleClick(schedule);
                        }}
                      >
                        {new Date(schedule.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {schedule.title}
                      </div>
                    ))}
                    {daySchedules.length > 3 && (
                      <div className="text-xs text-gray-500 pl-1">
                        +{daySchedules.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Week view */}
        {currentView === 'week' && (
          <div className="min-h-screen">
            <div className="grid grid-cols-8 border-b">
              <div className="border-r p-2"></div>
              {calendarDays.map((date, index) => {
                const isToday = date.toDateString() === new Date().toDateString();
                return (
                  <div
                    key={index}
                    className={`p-2 text-center border-r ${isToday ? 'bg-blue-50' : ''}`}
                  >
                    <div className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className={`text-sm ${isToday ? 'text-primary-600 font-bold' : ''}`}>
                      {date.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="relative">
              {/* Time slots */}
              {Array.from({ length: 24 }).map((_, hour) => (
                <div key={hour} className="grid grid-cols-8 border-b">
                  <div className="text-xs text-right pr-2 pt-1 border-r">
                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                  </div>
                  {calendarDays.map((date, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="border-r h-12 relative"
                      onClick={() => {
                        const newDate = new Date(date);
                        newDate.setHours(hour);
                        handleDayClick(newDate);
                      }}
                    >
                      {/* Event placeholders */}
                      {schedules
                        .filter((schedule) => {
                          const scheduleStart = new Date(schedule.startDate);
                          return (
                            scheduleStart.getDate() === date.getDate() &&
                            scheduleStart.getMonth() === date.getMonth() &&
                            scheduleStart.getFullYear() === date.getFullYear() &&
                            scheduleStart.getHours() === hour
                          );
                        })
                        .map((schedule) => (
                          <div
                            key={schedule.id}
                            className={`absolute left-0 right-0 mx-1 p-1 text-xs rounded z-10 truncate ${
                              schedule.color ? `bg-${schedule.color}-100 text-${schedule.color}-800` : 'bg-blue-100 text-blue-800'
                            }`}
                            style={{
                              top: `${(new Date(schedule.startDate).getMinutes() / 60) * 100}%`,
                              height: `${
                                Math.min(
                                  ((new Date(schedule.endDate).getTime() - new Date(schedule.startDate).getTime()) / 3600000) * 100,
                                  100
                                )
                              }%`,
                              minHeight: '20px'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScheduleClick(schedule);
                            }}
                          >
                            {schedule.title}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Day view */}
        {currentView === 'day' && (
          <div className="min-h-screen">
            <div className="relative">
              {/* Time slots */}
              {Array.from({ length: 24 }).map((_, hour) => {
                const currentHour = new Date().getHours();
                const isCurrentHour = hour === currentHour && currentDate.toDateString() === new Date().toDateString();
                
                return (
                  <div key={hour} className={`flex border-b ${isCurrentHour ? 'bg-blue-50' : ''}`}>
                    <div className="w-20 text-xs text-right pr-2 pt-1 border-r">
                      {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                    </div>
                    <div
                      className="flex-grow h-20 relative"
                      onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setHours(hour);
                        handleDayClick(newDate);
                      }}
                    >
                      {/* Current time indicator */}
                      {isCurrentHour && (
                        <div
                          className="absolute left-0 right-0 h-0.5 bg-red-500 z-20"
                          style={{
                            top: `${(new Date().getMinutes() / 60) * 100}%`,
                          }}
                        />
                      )}
                      
                      {/* Event placeholders */}
                      {schedules
                        .filter((schedule) => {
                          const scheduleStart = new Date(schedule.startDate);
                          const scheduleDay = calendarDays[0]; // There's only one day in day view
                          
                          return (
                            scheduleStart.getDate() === scheduleDay.getDate() &&
                            scheduleStart.getMonth() === scheduleDay.getMonth() &&
                            scheduleStart.getFullYear() === scheduleDay.getFullYear() &&
                            scheduleStart.getHours() === hour
                          );
                        })
                        .map((schedule) => (
                          <div
                            key={schedule.id}
                            className={`absolute left-0 right-0 mx-2 p-2 rounded z-10 ${
                              schedule.color ? `bg-${schedule.color}-100 text-${schedule.color}-800` : 'bg-blue-100 text-blue-800'
                            }`}
                            style={{
                              top: `${(new Date(schedule.startDate).getMinutes() / 60) * 100}%`,
                              height: `${
                                Math.min(
                                  ((new Date(schedule.endDate).getTime() - new Date(schedule.startDate).getTime()) / 3600000) * 100,
                                  100
                                )
                              }%`,
                              minHeight: '24px'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScheduleClick(schedule);
                            }}
                          >
                            <div className="font-medium">{schedule.title}</div>
                            <div className="text-xs">
                              {new Date(schedule.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(schedule.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            {schedule.location && (
                              <div className="text-xs mt-1">📍 {schedule.location}</div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* View Schedule Modal */}
      <ScheduleModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedSchedule(null);
          router.push('/admin/schedule');
        }}
        viewOnly={true}
      />
      
      {/* Edit Schedule Modal */}
      <ScheduleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSchedule(null);
          router.push('/admin/schedule');
        }}
      />
      
      {/* Create Schedule Modal */}
      <ScheduleModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setDateForNewEvent(null);
        }}
        initialDate={dateForNewEvent}
      />
    </div>
  );
}
