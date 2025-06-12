'use client'

import Link from 'next/link'
import { PhoneCall, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Mvono Consultants</h3>
            <p className="text-slate-300 mb-4">
              A wholly Kenyan owned consultancy firm established in 2009, specializing in the management of safety, energy, and plant systems.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons would go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#environmental" className="text-slate-300 hover:text-white transition-colors">
                  Environmental Impact Assessment
                </Link>
              </li>
              <li>
                <Link href="/services#safety" className="text-slate-300 hover:text-white transition-colors">
                  Occupational Safety
                </Link>
              </li>
              <li>
                <Link href="/services#fire" className="text-slate-300 hover:text-white transition-colors">
                  Fire Safety Audit
                </Link>
              </li>
              <li>
                <Link href="/services#energy" className="text-slate-300 hover:text-white transition-colors">
                  Energy Audit
                </Link>
              </li>
              <li>
                <Link href="/services#training" className="text-slate-300 hover:text-white transition-colors">
                  Safety Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <PhoneCall className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <span className="text-slate-300">+254 720 270 694</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <a href="mailto:sales@mvonoconsultants.com" className="text-slate-300 hover:text-white transition-colors">
                  sales@mvonoconsultants.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <span className="text-slate-300">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Mvono Consultants. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
