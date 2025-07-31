export interface Schedule {
  id: string;
  title: string;
  description: string | null;
  startDate: Date | string;
  endDate: Date | string;
  location: string | null;
  status: ScheduleStatus;
  priority: SchedulePriority | null;
  clientId: string | null;
  client?: {
    id: string;
    name: string;
  } | null;
  projectId: string | null;
  project?: {
    id: string;
    title: string;
  } | null;
  serviceId: string | null;
  service?: {
    id: string;
    name: string;
  } | null;
  subcontractorId: string | null;
  subcontractor?: {
    id: string;
    name: string;
  } | null;
  notes: string | null;
  createdById: string;
  createdBy?: {
    id: string;
    name: string;
  };
  assignedToId: string | null;
  assignedTo?: {
    id: string;
    name: string;
  } | null;
  reminderSent: boolean;
  isAllDay: boolean;
  recurrence: ScheduleRecurrence | null;
  recurrenceEnd: Date | string | null;
  color: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ScheduleFormData {
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
  status: ScheduleStatus;
  priority: SchedulePriority;
  clientId: string | null;
  projectId: string | null;
  serviceId: string | null;
  subcontractorId: string | null;
  notes: string;
  assignedToId: string | null;
  isAllDay: boolean;
  recurrence: ScheduleRecurrence;
  recurrenceEnd: Date | string | null;
  color: string | null;
}

export type ScheduleStatus = 'scheduled' | 'completed' | 'cancelled' | 'postponed';
export type SchedulePriority = 'high' | 'medium' | 'low';
export type ScheduleRecurrence = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export const SCHEDULE_STATUSES: { value: ScheduleStatus; label: string }[] = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'postponed', label: 'Postponed' },
];

export const SCHEDULE_PRIORITIES: { value: SchedulePriority; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const SCHEDULE_RECURRENCES: { value: ScheduleRecurrence; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export const SCHEDULE_COLORS = [
  { value: '#f44336', label: 'Red' },
  { value: '#e91e63', label: 'Pink' },
  { value: '#9c27b0', label: 'Purple' },
  { value: '#673ab7', label: 'Deep Purple' },
  { value: '#3f51b5', label: 'Indigo' },
  { value: '#2196f3', label: 'Blue' },
  { value: '#03a9f4', label: 'Light Blue' },
  { value: '#00bcd4', label: 'Cyan' },
  { value: '#009688', label: 'Teal' },
  { value: '#4caf50', label: 'Green' },
  { value: '#8bc34a', label: 'Light Green' },
  { value: '#cddc39', label: 'Lime' },
  { value: '#ffeb3b', label: 'Yellow' },
  { value: '#ffc107', label: 'Amber' },
  { value: '#ff9800', label: 'Orange' },
  { value: '#ff5722', label: 'Deep Orange' },
  { value: '#795548', label: 'Brown' },
  { value: '#9e9e9e', label: 'Grey' },
  { value: '#607d8b', label: 'Blue Grey' },
];

export const getScheduleStatusColor = (status: ScheduleStatus): string => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'postponed':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getSchedulePriorityColor = (priority: SchedulePriority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800';
    case 'low':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatDateToLocalString = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString();
};

export const formatDateToInputDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().slice(0, 16);
};
