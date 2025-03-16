"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, FileText, BarChart, Calendar, Settings,
  CreditCard, PieChart, Tag, Target, Zap, Award, Shield, ChevronDown,
  Menu, X
} from 'lucide-react';

type SidebarItem = {
  title: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string }[];
};

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Clients',
    href: '/dashboard/clients',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Invoices & Finances',
    icon: <CreditCard className="h-5 w-5" />,
    submenu: [
      { title: 'All Invoices', href: '/dashboard/invoices' },
      { title: 'Create Invoice', href: '/dashboard/invoices/create' },
      { title: 'Financial Reports', href: '/dashboard/finances/reports' },
      { title: 'Expenses', href: '/dashboard/finances/expenses' },
    ],
  },
  {
    title: 'Projects',
    icon: <FileText className="h-5 w-5" />,
    submenu: [
      { title: 'All Projects', href: '/dashboard/projects' },
      { title: 'Create Project', href: '/dashboard/projects/create' },
      { title: 'Project Tasks', href: '/dashboard/projects/tasks' },
    ],
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: 'Services',
    icon: <Zap className="h-5 w-5" />,
    submenu: [
      { title: 'Service Catalog', href: '/dashboard/services' },
      { title: 'Schedule Service', href: '/dashboard/services/schedule' },
    ],
  },
  {
    title: 'Sales & Marketing',
    icon: <Target className="h-5 w-5" />,
    submenu: [
      { title: 'Lead Management', href: '/dashboard/sales-marketing/leads' },
      { title: 'Campaigns', href: '/dashboard/sales-marketing/campaigns' },
      { title: 'Customer Segments', href: '/dashboard/sales-marketing/segments' },
      { title: 'Proposals', href: '/dashboard/sales-marketing/proposals' },
    ],
  },
  {
    title: 'Compliance',
    icon: <Shield className="h-5 w-5" />,
    submenu: [
      { title: 'Compliance Calendar', href: '/dashboard/compliance/calendar' },
      { title: 'Certifications', href: '/dashboard/compliance/certifications' },
      { title: 'Service Anniversaries', href: '/dashboard/compliance/anniversaries' },
    ],
  },
  {
    title: 'Competition',
    icon: <Award className="h-5 w-5" />,
    submenu: [
      { title: 'Competitor Tracking', href: '/dashboard/competition/tracking' },
      { title: 'Market Position', href: '/dashboard/competition/market-position' },
    ],
  },
  {
    title: 'Calendar',
    href: '/dashboard/calendar',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isSubmenuActive = (submenu: { title: string; href: string }[]) => {
    return submenu.some(item => isActive(item.href));
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 h-screen fixed top-0 left-0 z-20 transition-all duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-64 w-64 shadow-lg lg:shadow-none`}
      >
        <div className="p-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-2">
              M
            </div>
            <div className="text-xl font-bold text-gray-800">Mvono</div>
          </Link>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)] py-4 px-3">
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div className="mb-1">
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg ${isSubmenuActive(item.submenu) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${openSubmenu === item.title ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    {openSubmenu === item.title && (
                      <ul className="pl-10 mt-1 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              className={`block p-2 rounded-lg text-sm ${isActive(subItem.href) ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={`flex items-center p-2 rounded-lg ${isActive(item.href || '') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
