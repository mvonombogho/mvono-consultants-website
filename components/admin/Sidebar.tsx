"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, Users, FileText, CreditCard, Settings, LogOut,
  Menu, X, ChevronDown, Briefcase, Calendar, BarChart3, Buildings, 
  ListTodo, CheckSquare, Mail, BarChart, Target
} from 'lucide-react';

type SidebarLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  submenu?: {
    label: string;
    href: string;
  }[];
};

const sidebarLinks: SidebarLink[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Clients',
    href: '/admin/clients',
    icon: <Users className="h-5 w-5" />,
    submenu: [
      { label: 'All Clients', href: '/admin/clients' },
      { label: 'Add New Client', href: '/admin/clients/new' },
    ],
  },
  {
    label: 'Projects',
    href: '/admin/projects',
    icon: <Briefcase className="h-5 w-5" />,
    submenu: [
      { label: 'All Projects', href: '/admin/projects' },
      { label: 'Add New Project', href: '/admin/projects/new' },
      { label: 'Project Management', href: '/admin/projects/management' },
    ],
  },
  {
    label: 'Invoices',
    href: '/admin/invoices',
    icon: <FileText className="h-5 w-5" />,
    submenu: [
      { label: 'All Invoices', href: '/admin/invoices' },
      { label: 'Create Invoice', href: '/admin/invoices/new' },
    ],
  },
  {
    label: 'Finance',
    href: '/admin/finance',
    icon: <CreditCard className="h-5 w-5" />,
    submenu: [
      { label: 'Overview', href: '/admin/finance' },
      { label: 'Payments', href: '/admin/finance/payments' },
      { label: 'Expenses', href: '/admin/finance/expenses' },
    ],
  },
  {
    label: 'Subcontractors',
    href: '/admin/subcontractors',
    icon: <Buildings className="h-5 w-5" />,
  },
  {
    label: 'Calendar',
    href: '/admin/calendar',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    label: 'Marketing',
    href: '/admin/marketing',
    icon: <BarChart className="h-5 w-5" />,
    submenu: [
      { label: 'Campaigns', href: '/admin/marketing/campaigns' },
      { label: 'Customer Segments', href: '/admin/marketing/segments' },
      { label: 'Email Management', href: '/admin/marketing/emails' },
    ],
  },
  {
    label: 'Documents',
    href: '/admin/documents',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: 'Schedule',
    href: '/admin/schedule',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  // Check if a link is active
  const isLinkActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };
  
  // Toggle submenu
  const toggleSubmenu = (label: string) => {
    if (openSubmenu === label) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(label);
    }
  };
  
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };
  
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-blue-600 text-white p-2 rounded-md"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Sidebar Container */}
      <aside 
        className={`bg-blue-900 text-white fixed top-0 bottom-0 left-0 z-40 w-64 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-y-auto lg:sticky`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-blue-800">
          <Link href="/admin" className="flex items-center">
            <h1 className="text-xl font-bold">MVONO<span className="text-blue-400">ADMIN</span></h1>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="py-4">
          <ul className="space-y-1 px-2">
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                {link.submenu ? (
                  <div className="mb-1">
                    <button
                      onClick={() => toggleSubmenu(link.label)}
                      className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${isLinkActive(link.href) ? 'bg-blue-800 text-white' : 'hover:bg-blue-800/60'}`}
                    >
                      <div className="flex items-center">
                        {link.icon}
                        <span className="ml-3">{link.label}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openSubmenu === link.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {/* Submenu */}
                    {(openSubmenu === link.label || isLinkActive(link.href)) && (
                      <ul className="mt-1 ml-4 pl-4 border-l border-blue-800 space-y-1">
                        {link.submenu.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              href={subitem.href}
                              className={`block px-4 py-2 text-sm rounded-md transition-colors ${pathname === subitem.href ? 'bg-blue-800/80 text-white' : 'text-blue-200 hover:bg-blue-800/40 hover:text-white'}`}
                            >
                              {subitem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${isLinkActive(link.href) ? 'bg-blue-800 text-white' : 'hover:bg-blue-800/60'}`}
                  >
                    {link.icon}
                    <span className="ml-3">{link.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Info & Logout */}
        <div className="mt-auto p-4 border-t border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-blue-300">admin@mvono.co.ke</p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-md hover:bg-blue-800 transition-colors"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
