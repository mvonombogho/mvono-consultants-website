'use client';

import Link from 'next/link';
import Image from 'next/image';
import { colors } from '../../utils/colors';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <div className="h-12 w-auto relative">
                <Image 
                  src="/images/footerLogo.svg" 
                  alt="Mvono Consultants Logo" 
                  width={180}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              A wholly Kenyan owned consultancy firm established in 2009, specializing in the management of safety, energy, and plant systems.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#environmental-impact-assessment" className="text-slate-300 hover:text-white transition-colors">
                  Environmental Impact Assessment
                </Link>
              </li>
              <li>
                <Link href="/services#occupational-safety" className="text-slate-300 hover:text-white transition-colors">
                  Occupational Safety
                </Link>
              </li>
              <li>
                <Link href="/services#fire-safety-audit" className="text-slate-300 hover:text-white transition-colors">
                  Fire Safety Audit
                </Link>
              </li>
              <li>
                <Link href="/services#energy-audit" className="text-slate-300 hover:text-white transition-colors">
                  Energy Audit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2 mt-0.5 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-slate-300">+254 701 868 849</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2 mt-0.5 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:sales@mvonoconsultants.com" className="text-slate-300 hover:text-white transition-colors">
                  sales@mvonoconsultants.com
                </a>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2 mt-0.5 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-300">Nairobi, Kenya</span>
              </li>
            </ul>
            
            {/* Company Profile Download Button */}
            <div className="mt-6">
              <a 
                href="/Mvono Consultants Profile.pdf"
                download="Mvono_Consultants_Company_Profile.pdf"
                className="inline-flex items-center border border-slate-600 hover:border-blue-400 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Company Profile
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Mvono Consultants. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by{' '}
            <a 
              href="https://www.luziafrika.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Luzi Afrika Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
