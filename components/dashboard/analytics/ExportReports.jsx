'use client';

import { useState, useRef } from 'react';

export default function ExportReports() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleExport = (format) => {
    // Implement the actual export functionality
    // This would normally call an API to generate the report
    console.log(`Exporting report in ${format} format`);
    setIsOpen(false);
    
    // Mock successful export with a notification
    alert(`Analytics report exported successfully in ${format.toUpperCase()} format!`);
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export Report
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
          <div className="py-1">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              Export as PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              Export as Excel
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              Export as CSV
            </button>
            <button
              onClick={() => handleExport('print')}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-4 h-4 mr-2 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              Print Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
