'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes } from 'react-icons/fa'
import gsap from 'gsap'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Clients', path: '/clients' },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // Animate header elements
    gsap.fromTo(
      '.nav-logo',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
    )

    gsap.fromTo(
      '.nav-item',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
    )

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Animate mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        '.mobile-nav-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' }
      )
    }
  }, [isMenuOpen])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="relative flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                MVONO
              </span>
              <span className="ml-1 text-xl font-semibold text-secondary-600">
                CONSULTANTS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path}
                className={`nav-item text-sm font-medium transition-colors hover:text-primary-600 ${
                  pathname === link.path ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="nav-item bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-primary-700 hover:shadow-lg"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path}
                className={`mobile-nav-item text-base font-medium transition-colors hover:text-primary-600 ${
                  pathname === link.path ? 'text-primary-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="mobile-nav-item bg-primary-600 text-white px-4 py-2 rounded-md text-base font-medium transition-all hover:bg-primary-700 w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
