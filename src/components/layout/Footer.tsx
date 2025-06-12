'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  { name: 'Environmental Impact Assessment', path: '/services/environmental-impact-assessment' },
  { name: 'Occupational Safety', path: '/services/occupational-safety' },
  { name: 'Fire Safety Audit', path: '/services/fire-safety-audit' },
  { name: 'Energy Audit', path: '/services/energy-audit' },
  { name: 'Statutory Inspection', path: '/services/statutory-inspection' },
  { name: 'Non-Destructive Testing', path: '/services/non-destructive-testing' },
]

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Clients', path: '/clients' },
  { name: 'Contact', path: '/contact' },
]

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Footer animations
    const footerAnimation = gsap.context(() => {
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        }
      )
    })
    
    return () => footerAnimation.revert()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="footer-col">
            <h3 className="text-xl font-bold mb-6">Mvono Consultants</h3>
            <p className="mb-4 text-gray-300">
              A wholly Kenyan owned consultancy firm established in 2009, specializing in safety, energy, and plant management.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-primary-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-300 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-300 transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div className="footer-col">
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.path}
                    className="text-gray-300 hover:text-primary-300 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.path}
                    className="text-gray-300 hover:text-primary-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="footer-col">
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary-400 mt-1 mr-3" />
                <span className="text-gray-300">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary-400 mr-3" />
                <a 
                  href="tel:+254720270694" 
                  className="text-gray-300 hover:text-primary-300 transition-colors"
                >
                  +254 720 270 694
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary-400 mr-3" />
                <a 
                  href="mailto:sales@mvonoconsultants.com" 
                  className="text-gray-300 hover:text-primary-300 transition-colors"
                >
                  sales@mvonoconsultants.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© {currentYear} Mvono Consultants. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
