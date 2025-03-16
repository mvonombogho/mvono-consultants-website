import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Wrench, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  BarChart4,
  CreditCard,
  RefreshCw,
  Receipt,
  BellRing,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  LineChart,
  FolderArchive,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemType = {
  title: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: {
    title: string;
    href: string;
  }[];
};

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(prev => prev === title ? null : title);
  };

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') {
      return true;
    }
    return pathname.startsWith(path) && path !== '/admin';
  };

  const sidebarItems: SidebarItemType[] = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: 'Clients',
      href: '/admin/clients',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Finance',
      icon: <CreditCard className="h-5 w-5" />,
      submenu: [
        { title: 'Overview', href: '/admin/finance' },
        { title: 'Invoices', href: '/admin/finance/invoices' },
        { title: 'Quotations', href: '/admin/finance/quotations' },
        { title: 'Payments', href: '/admin/finance/payments' },
        { title: 'Client Statements', href: '/admin/finance/client-statements' },
        { title: 'Reports', href: '/admin/finance/reports' }
      ]
    },
    {
      title: 'Projects',
      href: '/admin/projects',
      icon: <ClipboardList className="h-5 w-5" />
    },
    {
      title: 'Services',
      href: '/admin/services',
      icon: <Wrench className="h-5 w-5" />
    },
    {
      title: 'Analytics',
      icon: <LineChart className="h-5 w-5" />,
      submenu: [
        { title: 'Financial', href: '/admin/analytics/financial' },
        { title: 'Performance', href: '/admin/analytics/performance' },
        { title: 'KPI Dashboard', href: '/admin/analytics/kpi' },
        { title: 'Reports', href: '/admin/analytics/reports' }
      ]
    },
    {
      title: 'Documents',
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        { title: 'Repository', href: '/admin/documents/repository' },
        { title: 'Certificates', href: '/admin/documents/certificates' },
        { title: 'Templates', href: '/admin/documents/templates' }
      ]
    },
    {
      title: 'Schedule',
      icon: <Calendar className="h-5 w-5" />,
      submenu: [
        { title: 'Calendar', href: '/admin/schedule/calendar' },
        { title: 'Bookings', href: '/admin/schedule/bookings' },
        { title: 'Resources', href: '/admin/schedule/resources' }
      ]
    },
    {
      title: 'Subcontractors',
      href: '/admin/subcontractors',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Marketing',
      icon: <BarChart4 className="h-5 w-5" />,
      submenu: [
        { title: 'Dashboard', href: '/admin/marketing' },
        { title: 'Campaigns', href: '/admin/marketing/campaigns' },
        { title: 'Leads', href: '/admin/marketing/leads' },
        { title: 'Analytics', href: '/admin/marketing/analytics' }
      ]
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r">
      <div className="py-6 px-4 border-b">
        <h2 className="text-lg font-semibold text-primary">Mvono Consultants</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {sidebarItems.map((item) => {
            const hasSubmenu = !!item.submenu?.length;
            const isSubmenuOpen = openSubmenu === item.title;
            const isItemActive = item.href ? isActive(item.href) : item.submenu?.some(subitem => isActive(subitem.href));
            
            return (
              <div key={item.title} className="mb-1">
                {hasSubmenu ? (
                  <div>
                    <button
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md group transition-colors",
                        isItemActive
                          ? "text-primary bg-primary/10"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      <div className="flex items-center flex-1">
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </div>
                      {isSubmenuOpen ? (
                        <ChevronDown className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronRight className="h-4 w-4 ml-2" />
                      )}
                    </button>
                    
                    {isSubmenuOpen && (
                      <div className="mt-1 ml-6 space-y-1">
                        {item.submenu?.map(subitem => (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            className={cn(
                              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              isActive(subitem.href)
                                ? "text-primary bg-primary/10"
                                : "text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            <span className="text-sm">{subitem.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isItemActive
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <div className="space-y-2">
          <Link
            href="/admin/settings"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
          <Link
            href="/admin/help"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            Help & Support
          </Link>
          <Link
            href="/api/auth/signout"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
