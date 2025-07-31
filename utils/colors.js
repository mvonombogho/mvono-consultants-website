/**
 * Mvono Consultants Color Palette
 * 
 * This file defines the consistent color palette for the Mvono Consultants website.
 * Use these color variables throughout the application to maintain design consistency.
 */

export const colors = {
  // Primary colors
  primary: {
    900: '#1e3a8a', // from-blue-900
    800: '#1e40af', // blue-800
    700: '#1d4ed8', // hover:bg-blue-700
    600: '#2563eb', // bg-blue-600
    500: '#3b82f6', // text-blue-500
    400: '#60a5fa', // text-blue-400
    300: '#93c5fd', // text-blue-300
    200: '#bfdbfe', // text-blue-200
    100: '#dbeafe', // bg-blue-100
    50: '#eff6ff',  // bg-blue-50
  },
  
  // Blue (keeping for compatibility)
  blue: {
    900: '#1e3a8a', // from-blue-900
    800: '#1e40af', // blue-800
    700: '#1d4ed8', // hover:bg-blue-700
    600: '#2563eb', // bg-blue-600
    500: '#3b82f6', // text-blue-500
    400: '#60a5fa', // text-blue-400
    300: '#93c5fd', // text-blue-300
    200: '#bfdbfe', // text-blue-200
    100: '#dbeafe', // bg-blue-100
    50: '#eff6ff',  // bg-blue-50
  },
  
  // Slate (neutrals)
  slate: {
    900: '#0f172a', // bg-slate-900 (footer)
    800: '#1e293b', // text-slate-800
    700: '#334155', // border-slate-700
    600: '#475569', // text-slate-600
    500: '#64748b', // text-slate-500
    400: '#94a3b8', // text-slate-400
    300: '#cbd5e1', // text-slate-300
    200: '#e2e8f0', // border-slate-200
    100: '#f1f5f9', // bg-slate-100
    50: '#f8fafc',  // bg-slate-50
  },
  
  // Accent colors
  green: {
    600: '#16a34a', // bg-green-600
    500: '#22c55e', // text-green-500
    100: '#dcfce7', // bg-green-100
    50: '#f0fdf4',  // bg-green-50
  },
  
  // Other UI colors
  white: '#ffffff',
  gray: {
    700: '#374151', // text-gray-700
    600: '#4b5563', // text-gray-600
    300: '#d1d5db', // border-gray-300
    200: '#e5e7eb', // border-gray-200
    100: '#f3f4f6', // border-gray-100
  },
};

// Gradient definitions
export const gradients = {
  heroGradient: 'bg-gradient-to-br from-blue-900 to-slate-900',
};

// Component-specific color schemes
export const colorSchemes = {
  // Button variants
  buttons: {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white',
    secondary: 'border border-white/20 text-white hover:bg-white/10',
    outline: 'border border-slate-200 text-slate-700 hover:bg-slate-50',
  },
  
  // Service card colors
  serviceCards: {
    icon: 'bg-blue-100 text-blue-600',
    title: 'text-blue-900',
    description: 'text-slate-600',
    link: 'text-blue-600 hover:text-blue-800',
  },
};
