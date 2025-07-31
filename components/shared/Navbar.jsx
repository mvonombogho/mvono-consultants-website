'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { colorSchemes } from '../../utils/colors';

export default function Navbar({ activePage }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ${scrollPosition > 50 ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-auto">
            <Image 
              src="/images/logo.svg" 
              alt="Mvono Consultants Logo" 
              width={180}
              height={48}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`text-sm font-medium ${activePage === 'home' ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'}`}
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className={`text-sm font-medium ${activePage === 'services' ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'}`}
          >
            Services
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium ${activePage === 'about' ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'}`}
          >
            About
          </Link>
          <Link 
            href="/blog" 
            className={`text-sm font-medium ${activePage === 'blog' ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'}`}
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm font-medium ${activePage === 'contact' ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'}`}
          >
            Contact
          </Link>
          <a 
            href="/Mvono Consultants Profile.pdf"
            download="Mvono_Consultants_Company_Profile.pdf"
            className="inline-flex items-center text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Company Profile
          </a>
        </nav>
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`text-base font-medium ${activePage === 'home' ? 'text-blue-700' : 'text-slate-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className={`text-base font-medium ${activePage === 'services' ? 'text-blue-700' : 'text-slate-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className={`text-base font-medium ${activePage === 'about' ? 'text-blue-700' : 'text-slate-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className={`text-base font-medium ${activePage === 'blog' ? 'text-blue-700' : 'text-slate-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`text-base font-medium ${activePage === 'contact' ? 'text-blue-700' : 'text-slate-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <a 
              href="/Mvono Consultants Profile.pdf"
              download="Mvono_Consultants_Company_Profile.pdf"
              className="inline-flex items-center text-base font-medium bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md transition-colors w-fit"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Company Profile
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
