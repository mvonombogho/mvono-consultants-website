"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
  isMobile?: boolean;
  setMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavItem = ({ href, label, children, isMobile, setMobileMenuOpen }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!children) {
      if (isMobile && setMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${isMobile ? 'w-full' : ''}`}>
      <div
        className={`flex items-center ${isMobile ? 'py-2' : 'h-full'} cursor-pointer`}
        onClick={handleClick}
      >
        {children ? (
          <div className={`flex items-center ${isMobile ? 'justify-between w-full' : ''}`}>
            <span className={`mr-1 ${isMobile ? 'text-xl font-medium' : 'text-sm font-medium'}`}>{label}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        ) : (
          <Link 
            href={href} 
            className={`${isMobile ? 'text-xl font-medium block' : 'text-sm font-medium'} transition-colors hover:text-blue-600`}
          >
            {label}
          </Link>
        )}
      </div>
      
      {children && isOpen && (
        <div
          className={`
            ${isMobile ? 'mt-2 pl-4 border-l-2 border-gray-200' : 'absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg border border-gray-200 p-2 z-50'}
          `}
        >
          {children.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`
                ${isMobile ? 'py-2 block text-lg' : 'p-2 block text-sm rounded-md hover:bg-blue-50'}
                transition-colors hover:text-blue-600
              `}
              onClick={() => isMobile && setMobileMenuOpen && setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    {
      href: '/services',
      label: 'Services',
      children: [
        { href: '/services/environmental-impact', label: 'Environmental Impact Assessment' },
        { href: '/services/occupational-safety', label: 'Occupational Safety' },
        { href: '/services/fire-safety', label: 'Fire Safety Audit' },
        { href: '/services/energy-audit', label: 'Energy Audit' },
        { href: '/services/statutory-inspection', label: 'Statutory Inspection' }
      ]
    },
    {
      href: '/about',
      label: 'About Us',
      children: [
        { href: '/about/team', label: 'Our Team' },
        { href: '/about/values', label: 'Core Values' },
        { href: '/about/history', label: 'Our History' }
      ]
    },
    { href: '/clients', label: 'Clients' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32">
              <Image
                src={scrolled ? "/images/logo.png" : "/images/logo-white.png"}
                alt="Mvono Consultants"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <NavItem
                key={i}
                href={item.href}
                label={item.label}
                children={item.children}
              />
            ))}
          </nav>

          {/* Call to Action */}
          <div className="hidden lg:block">
            <Button 
              className={`${
                scrolled
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-white hover:bg-blue-50 text-blue-900'
              }`}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 mt-2 absolute w-full left-0 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, i) => (
                <NavItem
                  key={i}
                  href={item.href}
                  label={item.label}
                  children={item.children}
                  isMobile={true}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get in Touch
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
