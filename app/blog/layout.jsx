'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function BlogLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activePage="blog" />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
