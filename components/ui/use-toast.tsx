'use client';

import * as React from 'react';
import { createContext, useContext } from 'react';

type ToastProps = {
  variant?: 'default' | 'destructive' | 'success';
  title?: string;
  description?: string;
};

type ToastActionElement = React.ReactElement;

type ToastContextType = {
  toast: (props: ToastProps) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = (props: ToastProps) => {
    // In a real implementation, this would show a toast notification
    console.log('Toast:', props);
  };

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { type ToastProps, type ToastActionElement };
