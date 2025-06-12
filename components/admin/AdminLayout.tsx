"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Bell, UserCircle, Search } from 'lucide-react';

type AdminLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export default function AdminLayout({ children, title = 'Dashboard' }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    return null;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-20 sticky top-0">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1.5">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-40 lg:w-60"
                />
              </div>
              
              {/* Notifications */}
              <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Profile */}
              <div className="flex items-center">
                <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors">
                  <UserCircle className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 hidden lg:inline-block">
                    {session?.user?.name || 'Admin User'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white py-4 px-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Mvono Consultants. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
