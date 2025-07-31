'use client';

import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/footer';
// WorkingEmailChat component not available

export default function BlogLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activePage="blog" />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
      
      {/* Working Email Chat Widget - component not available */}
    </div>
  );
}
