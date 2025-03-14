import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export const metadata = {
  title: 'Dashboard - Mvono Consultants',
  description: 'Administration dashboard for Mvono Consultants',
};

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
      </div>
    </div>
  );
}
