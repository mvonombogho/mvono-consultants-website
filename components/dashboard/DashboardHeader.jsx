'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardHeader() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);
  
  // Handle clicks outside the dropdown to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'New client added',
      message: 'Lafarge has been successfully added to your client list.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Project completed',
      message: 'Fire Safety Audit for Dormans Coffee has been marked as complete.',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Payment received',
      message: 'KES 245,000 payment from Unga Group has been processed.',
      time: 'Yesterday',
      read: true
    }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search bar */}
        <div className="relative max-w-md w-full mr-4">
          <div className={`flex items-center rounded-lg border ${searchFocused ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-300'} transition-all duration-200 bg-white px-3 py-2`}>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="ml-2 flex-grow outline-none text-slate-600 text-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Help button */}
          <button className="p-1.5 text-slate-500 hover:text-emerald-600 transition-colors rounded-lg hover:bg-slate-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          {/* Notifications dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1.5 text-slate-500 hover:text-emerald-600 transition-colors rounded-lg hover:bg-slate-100 relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
              {/* Notification badge */}
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-10">
                <div className="p-3 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-medium text-slate-800">Notifications</h3>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700">
                    Mark all as read
                  </button>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-3 hover:bg-slate-50 transition-colors ${!notification.read ? 'bg-slate-50' : ''}`}
                        >
                          <div className="flex items-center mb-1">
                            <h4 className="text-sm font-medium text-slate-800">{notification.title}</h4>
                            {!notification.read && (
                              <span className="ml-2 h-2 w-2 rounded-full bg-emerald-500"></span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mb-1">{notification.message}</p>
                          <p className="text-xs text-slate-400">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      No notifications at this time
                    </div>
                  )}
                </div>
                
                <div className="p-2 border-t border-slate-200 text-center">
                  <Link href="/dashboard/notifications" className="text-xs text-emerald-600 hover:text-emerald-700">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* User profile dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 overflow-hidden border border-slate-300">
                <span className="font-medium">DM</span>
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:inline-block">Donald Mbogho</span>
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-10">
                <div className="p-3 border-b border-slate-200">
                  <p className="text-sm font-medium text-slate-800">Donald Mbogho</p>
                  <p className="text-xs text-slate-500">Engineer & Director</p>
                </div>
                
                <div className="py-1">
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Your Profile
                  </Link>
                  <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Settings
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Switch Account
                  </button>
                </div>
                
                <div className="py-1 border-t border-slate-200">
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
