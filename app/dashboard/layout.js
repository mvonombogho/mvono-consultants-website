<<<<<<< HEAD
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
=======
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa

export const metadata = {
  title: 'Dashboard - Mvono Consultants',
  description: 'Administration dashboard for Mvono Consultants',
};

<<<<<<< HEAD
// Main layout component for the dashboard
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "📊",
      current: pathname === "/dashboard",
    },
    {
      name: "Clients",
      href: "/dashboard/clients",
      icon: "👥",
      current: pathname.startsWith("/dashboard/clients"),
    },
    {
      name: "Finances",
      icon: "💰",
      current: pathname.startsWith("/dashboard/finances") || pathname.startsWith("/dashboard/invoices"),
      children: [
        {
          name: "Invoices",
          href: "/dashboard/invoices",
          current: pathname.startsWith("/dashboard/invoices"),
        },
        {
          name: "Expenses",
          href: "/dashboard/finances/expenses",
          current: pathname.startsWith("/dashboard/finances/expenses"),
        },
        {
          name: "Reports",
          href: "/dashboard/finances/reports",
          current: pathname.startsWith("/dashboard/finances/reports"),
        },
      ],
    },
    {
      name: "Services",
      href: "/dashboard/services",
      icon: "🛠️",
      current: pathname.startsWith("/dashboard/services"),
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: "📝",
      current: pathname.startsWith("/dashboard/projects"),
    },
    {
      name: "Team",
      href: "/dashboard/team",
      icon: "👨‍💼",
      current: pathname.startsWith("/dashboard/team"),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: "⚙️",
      current: pathname.startsWith("/dashboard/settings"),
    },
  ];

  // Function to toggle mobile sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 flex flex-col flex-shrink-0 w-64 pt-5 pb-4 bg-gray-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 z-30
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center flex-shrink-0 px-4">
          <div className="flex items-center justify-center w-full h-16 bg-gray-700 rounded-lg">
            <h1 className="text-xl font-bold text-white">Mvono Consultants</h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col flex-grow mt-5 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => 
              !item.children ? (
                // Regular menu item
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              ) : (
                // Dropdown menu item
                <div key={item.name}>
                  <button
                    className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </button>
                  <div className="mt-1 ml-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`group flex items-center pl-4 pr-2 py-2 text-xs font-medium rounded-md ${
                          child.current
                            ? 'bg-gray-700 text-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top navbar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          {/* Mobile menu button */}
          <button
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <span className="text-xl">☰</span>
          </button>

          {/* Right side of navbar */}
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1"></div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        DM
                      </span>
                    </div>
                    <span className="ml-2 text-gray-700">
                      Donald Mbogho
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
=======
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main>
            {children}
          </main>
        </div>
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
      </div>
    </div>
  );
}
