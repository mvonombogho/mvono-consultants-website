/**
 * Date utility functions for working with schedules and dates
 */

/**
 * Format a date for display in the UI
 * @param dateString The date string to format
 * @param options Options for the formatting
 */
export const formatDate = (
  dateString: string | Date | null | undefined,
  options: {
    includeTime?: boolean;
    includeWeekday?: boolean;
    useRelative?: boolean;
    shortMonth?: boolean;
  } = {}
): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Default options
  const {
    includeTime = false,
    includeWeekday = false,
    useRelative = false,
    shortMonth = false,
  } = options;
  
  // Build date formatting options
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: shortMonth ? 'short' : 'long',
    day: 'numeric',
    ...(includeWeekday ? { weekday: shortMonth ? 'short' : 'long' } : {}),
  };
  
  // Time formatting options
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  
  // Relative date formatting (today, yesterday, tomorrow)
  if (useRelative) {
    if (date.toDateString() === today.toDateString()) {
      return includeTime
        ? `Today at ${date.toLocaleTimeString([], timeOptions)}`
        : 'Today';
    }
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return includeTime
        ? `Tomorrow at ${date.toLocaleTimeString([], timeOptions)}`
        : 'Tomorrow';
    }
    
    if (date.toDateString() === yesterday.toDateString()) {
      return includeTime
        ? `Yesterday at ${date.toLocaleTimeString([], timeOptions)}`
        : 'Yesterday';
    }
  }
  
  // Standard date format
  let formattedDate = date.toLocaleDateString(undefined, dateOptions);
  
  // Add time if requested
  if (includeTime) {
    formattedDate += ` at ${date.toLocaleTimeString([], timeOptions)}`;
  }
  
  return formattedDate;
};

/**
 * Format date for input[type=datetime-local]
 * @param date Date to format
 */
export const formatDateForInput = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().slice(0, 16);
};

/**
 * Get the duration between two dates in a readable format
 * @param startDate Start date
 * @param endDate End date
 */
export const getDuration = (
  startDate: Date | string,
  endDate: Date | string
): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Duration in milliseconds
  const duration = end.getTime() - start.getTime();
  
  // Convert to appropriate units
  const minutes = Math.floor(duration / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  
  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    if (remainingMinutes > 0) {
      return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''}`;
    }
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  
  return `${minutes} min${minutes > 1 ? 's' : ''}`;
};

/**
 * Get the next occurrence of a recurring schedule
 * @param schedule The schedule
 * @param recurrence Recurrence pattern ('daily', 'weekly', 'monthly', 'yearly')
 * @param startDate Start date of the original schedule
 * @param endDate End date of the original schedule
 */
export const getNextOccurrence = (
  startDate: Date | string,
  endDate: Date | string,
  recurrence: 'daily' | 'weekly' | 'monthly' | 'yearly',
  afterDate: Date | string = new Date()
): { nextStart: Date; nextEnd: Date } => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const after = new Date(afterDate);
  
  // Initial duration in milliseconds
  const duration = end.getTime() - start.getTime();
  
  // Calculate next occurrence based on recurrence pattern
  let nextStart = new Date(start);
  
  switch (recurrence) {
    case 'daily':
      // Find next day occurrence
      while (nextStart < after) {
        nextStart.setDate(nextStart.getDate() + 1);
      }
      break;
    
    case 'weekly':
      // Find next week occurrence
      while (nextStart < after) {
        nextStart.setDate(nextStart.getDate() + 7);
      }
      break;
    
    case 'monthly':
      // Find next month occurrence
      while (nextStart < after) {
        nextStart.setMonth(nextStart.getMonth() + 1);
      }
      break;
    
    case 'yearly':
      // Find next year occurrence
      while (nextStart < after) {
        nextStart.setFullYear(nextStart.getFullYear() + 1);
      }
      break;
  }
  
  // Calculate next end time based on original duration
  const nextEnd = new Date(nextStart.getTime() + duration);
  
  return {
    nextStart,
    nextEnd,
  };
};

/**
 * Get the date range for the current week (Sunday to Saturday)
 */
export const getCurrentWeekRange = (): { startDate: Date; endDate: Date } => {
  const currentDate = new Date();
  const day = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
  
  // Get the first day of the week (Sunday)
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - day);
  startDate.setHours(0, 0, 0, 0);
  
  // Get the last day of the week (Saturday)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);
  
  return { startDate, endDate };
};

/**
 * Get the date range for the current month
 */
export const getCurrentMonthRange = (): { startDate: Date; endDate: Date } => {
  const currentDate = new Date();
  
  // Get the first day of the month
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  startDate.setHours(0, 0, 0, 0);
  
  // Get the last day of the month
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  endDate.setHours(23, 59, 59, 999);
  
  return { startDate, endDate };
};
