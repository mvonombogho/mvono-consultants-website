'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Schedule, ScheduleFormData } from '@/types/schedule';

interface ScheduleContextType {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
  getSchedules: (filters?: Record<string, string>) => Promise<void>;
  getScheduleById: (id: string) => Promise<Schedule | null>;
  createSchedule: (scheduleData: ScheduleFormData) => Promise<Schedule | null>;
  updateSchedule: (id: string, scheduleData: Partial<ScheduleFormData>) => Promise<Schedule | null>;
  deleteSchedule: (id: string) => Promise<boolean>;
  selectedSchedule: Schedule | null;
  setSelectedSchedule: (schedule: Schedule | null) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  // Fetch all schedules with optional filters
  const getSchedules = async (filters?: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      let url = '/api/schedules';
      
      if (filters && Object.keys(filters).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) searchParams.append(key, value);
        });
        url += `?${searchParams.toString()}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }
      
      const data = await response.json();
      setSchedules(data);
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get a specific schedule by ID
  const getScheduleById = async (id: string): Promise<Schedule | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/schedules/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch schedule');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error fetching schedule:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new schedule
  const createSchedule = async (scheduleData: ScheduleFormData): Promise<Schedule | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create schedule');
      }
      
      const data = await response.json();
      
      // Update local state
      setSchedules((prevSchedules) => [...prevSchedules, data]);
      
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error creating schedule:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing schedule
  const updateSchedule = async (id: string, scheduleData: Partial<ScheduleFormData>): Promise<Schedule | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update schedule');
      }
      
      const data = await response.json();
      
      // Update local state
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) => (schedule.id === id ? data : schedule))
      );
      
      // Update selected schedule if it's the one being edited
      if (selectedSchedule && selectedSchedule.id === id) {
        setSelectedSchedule(data);
      }
      
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error updating schedule:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a schedule
  const deleteSchedule = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete schedule');
      }
      
      // Update local state
      setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== id));
      
      // Clear selected schedule if it's the one being deleted
      if (selectedSchedule && selectedSchedule.id === id) {
        setSelectedSchedule(null);
      }
      
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error deleting schedule:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        loading,
        error,
        getSchedules,
        getScheduleById,
        createSchedule,
        updateSchedule,
        deleteSchedule,
        selectedSchedule,
        setSelectedSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
}
