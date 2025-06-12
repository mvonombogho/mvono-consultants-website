import React, { useState, useEffect, useRef } from "react";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, placeholder, children }: SelectProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pass the context to children
  const selectContext = {
    open,
    setOpen,
    value,
    onValueChange
  };

  return (
    <div className="relative" ref={selectRef}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            ...selectContext
          });
        }
        return child;
      })}
    </div>
  );
}

interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function SelectTrigger({ className, children, open, setOpen, ...props }: SelectTriggerProps) {
  return (
    <button 
      className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      onClick={() => setOpen && setOpen(!open)}
      type="button"
      {...props}
    >
      {children}
      <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );
}

interface SelectValueProps {
  placeholder?: string;
  value?: string;
  children?: React.ReactNode;
}

export function SelectValue({ placeholder, value, children }: SelectValueProps) {
  return <span>{value || placeholder || children}</span>;
}

interface SelectContentProps {
  className?: string;
  children: React.ReactNode;
  open?: boolean;
}

export function SelectContent({ className, children, open, ...props }: SelectContentProps) {
  if (!open) return null;
  
  return (
    <div className={`absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg ${className}`} {...props}>
      <div className="py-1">
        {children}
      </div>
    </div>
  );
}

interface SelectItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  setOpen?: (open: boolean) => void;
}

export function SelectItem({ value, className, children, onValueChange, setOpen, ...props }: SelectItemProps) {
  const handleSelect = () => {
    if (onValueChange) {
      onValueChange(value);
    }
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <div 
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
      onClick={handleSelect}
      {...props}
    >
      {children}
    </div>
  );
}
