import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Mvono Consultants',
  description: 'Administrative dashboard for managing clients, invoices, and projects at Mvono Consultants.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      {/* We don't include the header/sidebar here since we're using a custom layout in page.tsx */}
      {children}
    </div>
  );
}
