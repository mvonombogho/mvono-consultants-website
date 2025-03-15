import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image 
                src="/images/logo-white.png" 
                alt="Mvono Consultants" 
                width={150} 
                height={40} 
                className="object-contain"
              />
            </div>
            <p className="text-blue-100 mb-4">
              Mvono Consultants is a Kenyan consultancy firm specializing in safety, energy, and plant management services since 2009.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                { href: '/services/environmental-impact', label: 'Environmental Impact Assessment' },
                { href: '/services/occupational-safety', label: 'Occupational Safety' },
                { href: '/services/fire-safety', label: 'Fire Safety Audit' },
                { href: '/services/energy-audit', label: 'Energy Audit' },
                { href: '/services/statutory-inspection', label: 'Statutory Inspection' },
                { href: '/services/non-destructive-testing', label: 'Non-Destructive Testing' },
              ].map((item, i) => (
                <li key={i}>
                  <Link 
                    href={item.href}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/clients', label: 'Our Clients' },
                { href: '/blog', label: 'Blog' },
                { href: '/careers', label: 'Careers' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms-of-service', label: 'Terms of Service' },
              ].map((item, i) => (
                <li key={i}>
                  <Link 
                    href={item.href}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0" />
                <a 
                  href="tel:+254720270694" 
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  +254 720 270 694
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0" />
                <a 
                  href="mailto:sales@mvonoconsultants.com" 
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  sales@mvonoconsultants.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Mvono Consultants. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
