'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  FaHome, 
  FaUsers, 
  FaFileInvoiceDollar, 
  FaChartBar, 
  FaClipboardList,
  FaUserTie,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaFileAlt,
  FaCalendarAlt
} from 'react-icons/fa'
import { ClientProvider } from '@/contexts/ClientContext'

// Admin sidebar menu items
const sidebarItems = [
  { name: 'Dashboard', icon: <FaHome size={18} />, path: '/admin' },
  { name: 'Clients', icon: <FaUsers size={18} />, path: '/admin/clients' },
  { name: 'Subcontractors', icon: <FaUserTie size={18} />, path: '/admin/subcontractors' },
  { name: 'Finance', icon: <FaFileInvoiceDollar size={18} />, path: '/admin/finance' },
  { name: 'Projects', icon: <FaClipboardList size={18} />, path: '/admin/projects' },
  { name: 'Documents', icon: <FaFileAlt size={18} />, path: '/admin/documents' },
  { name: 'Schedule', icon: <FaCalendarAlt size={18} />, path: '/admin/schedule' },
  { name: 'Analytics', icon: <FaChartBar size={18} />, path: '/admin/analytics' },
  { name: 'Settings', icon: <FaCog size={18} />, path: '/admin/settings' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <ClientProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-50 px-4 py-4 shadow-md flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 mr-3"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <span className="font-bold text-lg text-primary-600">Mvono Admin</span>
          </div>
          <Link 
            href="/api/auth/signout"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaSignOutAlt size={18} />
          </Link>
        </div>

        {/* Mobile Sidebar (Overlay) */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`bg-white fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 w-64 shadow-lg lg:pt-0 pt-16`}
        >
          {/* Desktop Logo & Branding */}
          <div className="hidden lg:flex justify-between items-center p-4 mb-6 border-b">
            <span className="font-bold text-xl text-primary-600">Mvono Admin</span>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isSidebarOpen ? <FaBars size={18} /> : <FaBars size={18} />}
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-4 py-2">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.path}
                    className={`flex items-center py-2 px-4 rounded-lg transition-all ${
                      pathname === item.path 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className={isSidebarOpen ? 'block' : 'lg:hidden'}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout Option */}
          <div className="px-4 py-4 mt-8 border-t">
            <Link 
              href="/api/auth/signout"
              className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
            >
              <FaSignOutAlt className="mr-3" size={18} />
              <span className={isSidebarOpen ? 'block' : 'lg:hidden'}>
                Sign Out
              </span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main 
          className={`pt-16 lg:pt-0 transition-all duration-300 ${
            isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
          }`}
        >
          <div className="px-4 py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </ClientProvider>
  )
}
