import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Mvono Consultants</h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner in safety, energy, and plant system management since 2009.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone size={18} className="text-blue-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-300">+254 720 270 694</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail size={18} className="text-blue-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-300">sales@mvonoconsultants.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="text-blue-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-300">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/clients" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Clients
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#safety" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Occupational Safety
                </Link>
              </li>
              <li>
                <Link href="/services#fire" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Fire Safety Audit
                </Link>
              </li>
              <li>
                <Link href="/services#energy" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Energy Audit
                </Link>
              </li>
              <li>
                <Link href="/services#inspection" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Statutory Inspection
                </Link>
              </li>
              <li>
                <Link href="/services#testing" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Non-Destructive Testing
                </Link>
              </li>
              <li>
                <Link href="/services#training" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Safety Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-400 mb-4">
              Follow us on social media for industry insights, safety tips, and company updates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mvono Consultants. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-blue-400 transition duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-400 transition duration-300">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
