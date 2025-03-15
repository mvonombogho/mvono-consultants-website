"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, CheckCircle } from 'lucide-react';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animations
    const headerTimeline = gsap.timeline();
    headerTimeline.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
    headerTimeline.from('.hero-description', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, "-=0.6");
    headerTimeline.from('.hero-button', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, "-=0.4");

    // Services section animations with scroll trigger
    gsap.from('.service-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: servicesRef.current,
        start: 'top 80%',
      },
    });

    // Benefits section animations
    gsap.from('.benefit-item', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: benefitsRef.current,
        start: 'top 80%',
      },
    });

    // Clients section animations
    gsap.from('.client-logo', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: clientsRef.current,
        start: 'top 90%',
      },
    });

    // CTA section animations
    gsap.from('.cta-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 80%',
      },
    });
  }, []);

  const services = [
    {
      title: 'Environmental Impact Assessment',
      description: 'Comprehensive assessments to ensure your projects comply with NEMA regulations.',
      icon: '🌱',
    },
    {
      title: 'Occupational Safety',
      description: 'Creating safer workplaces through comprehensive safety audits and strategies.',
      icon: '🛡️',
    },
    {
      title: 'Fire Safety Audit',
      description: 'Detailed fire safety assessments to protect your people and assets.',
      icon: '🧯',
    },
    {
      title: 'Energy Audit',
      description: 'Optimize energy usage and reduce costs with our detailed auditing process.',
      icon: '⚡',
    },
    {
      title: 'Statutory Inspection',
      description: 'Ensure compliance with all regulatory requirements for your equipment and facilities.',
      icon: '📋',
    },
    {
      title: 'Non-Destructive Testing',
      description: 'Advanced testing methods to analyze materials without causing damage.',
      icon: '🔍',
    },
  ];

  const benefits = [
    'Expert consultants with over 29 years of industry experience',
    'Comprehensive safety management and compliance solutions',
    'Customized approaches tailored to your specific industry needs',
    'Proven track record with leading companies across East Africa',
    'Cost-effective strategies to enhance safety and efficiency',
    'Continuous support and follow-up to ensure sustained improvement',
  ];

  const clients = [
    'Lafarge', 'Unga Group', 'KTDA', 'Dormans Coffee', 'National Cement',
    'Radisson Blu', 'Saint Gobain', 'Tata Chemicals', 'Iberafrica', 'Movenpick',
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <div 
        ref={headerRef} 
        className="bg-gradient-to-b from-blue-900 to-blue-700 w-full px-6 py-24 md:py-32 flex flex-col items-center justify-center text-white"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-title">
            Safety, Energy & Plant Management Experts
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-90 hero-description">
            Mvono Consultants helps businesses optimize safety, manage energy usage, and ensure regulatory compliance.
          </p>
          <Link href="/contact">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition duration-300 hover:bg-blue-50 hover:scale-105 hero-button flex items-center mx-auto">
              Get a Free Consultation
              <ChevronRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="w-full px-6 py-24 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md service-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div ref={benefitsRef} className="w-full px-6 py-24 bg-blue-800 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose Mvono Consultants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 benefit-item">
                <CheckCircle className="h-6 w-6 text-blue-300 flex-shrink-0 mt-0.5" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div ref={clientsRef} className="w-full px-6 py-24 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Our Trusted Clients
          </h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {clients.map((client, index) => (
              <div 
                key={index} 
                className="bg-white px-6 py-3 rounded-lg shadow-sm client-logo flex items-center justify-center min-w-[150px]"
              >
                <span className="text-gray-800 font-semibold">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef} 
        className="w-full px-6 py-24 bg-gradient-to-r from-blue-900 to-blue-700 text-white"
      >
        <div className="container mx-auto text-center cta-content">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your safety & energy management?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Let our experts help you optimize your operations and ensure compliance with regulatory requirements.
          </p>
          <Link href="/contact">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition duration-300 hover:bg-blue-50 hover:scale-105 flex items-center mx-auto">
              Contact Us Today
              <ChevronRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Mvono Consultants</h3>
              <p className="text-gray-400">
                Providing expert safety, energy, and plant management services since 2009.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <p className="text-gray-400 mb-2">Email: sales@mvonoconsultants.com</p>
              <p className="text-gray-400">Phone: +254 720 270 694</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Mvono Consultants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
