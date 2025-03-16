"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Users, ArrowDown } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mouseFollowerRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: ref.current, offsetY: 80 },
        ease: "power3.inOut"
      });
    }
  };
  
  useEffect(() => {
    // Mouse follower effect
    const follower = mouseFollowerRef.current;
    if (follower) {
      const handleMouseMove = (e: MouseEvent) => {
        gsap.to(follower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power2.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
    
    // Hero section animation
    const heroTimeline = gsap.timeline();
    
    heroTimeline.fromTo(
      '.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    
    heroTimeline.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
    
    heroTimeline.fromTo(
      '.hero-cta',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
    
    heroTimeline.fromTo(
      '.hero-image-container',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
    
    heroTimeline.fromTo(
      '.scroll-indicator',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );
    
    // Stats counter animation
    ScrollTrigger.create({
      trigger: '.stats-section',
      start: 'top 80%',
      onEnter: () => {
        // Animate counter numbers
        gsap.to('.stat-value', {
          duration: 2,
          onUpdate: function() {
            const elements = document.querySelectorAll('.stat-value');
            elements.forEach((el) => {
              const target = parseInt(el.getAttribute('data-value') || '0');
              const current = Math.round(target * this.progress());
              el.textContent = current.toString();
            });
          },
          ease: "power1.inOut"
        });
      }
    });
    
    // Services animation with scroll trigger and staggered effect
    const serviceCards = gsap.utils.toArray('.service-card');
    serviceCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
          },
          delay: i * 0.15
        }
      );
    });
    
    // About section parallax effect
    gsap.fromTo(
      '.about-image',
      { y: 0 },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        }
      }
    );
    
    // About content animation
    gsap.fromTo(
      '.about-content',
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
        }
      }
    );
    
    // Animated background for client section
    gsap.to('.gradient-bg', {
      backgroundPosition: '400% 400%',
      duration: 15,
      repeat: -1,
      ease: 'linear'
    });
    
    // Client logos animation with mouse hover effect
    const clientLogos = gsap.utils.toArray('.client-logo');
    clientLogos.forEach((logo) => {
      gsap.fromTo(
        logo,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logo as Element,
            start: 'top 85%',
          }
        }
      );
      
      // Hover effect
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
    
    // CTA section animation
    gsap.fromTo(
      '.cta-section',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 80%',
        }
      }
    );
    
    // Scroll indicator animation
    gsap.to('.scroll-arrow', {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mouse follower */}
      <div 
        ref={mouseFollowerRef} 
        className="fixed w-6 h-6 rounded-full bg-blue-500 opacity-30 pointer-events-none z-50 mix-blend-screen hidden lg:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
      
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative flex items-center min-h-[100vh] bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center z-10">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <div className="inline-block mb-6 py-1 px-3 border border-blue-400 rounded-full bg-blue-900/50 text-blue-300 text-sm font-medium">
              <span className="animate-pulse">✦</span> Leading Safety & Energy Management
            </div>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block">Safety, Energy &</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Plant Management Experts</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl mb-8 text-blue-100 max-w-xl">
              Mvono Consultants specializes in managing safety, energy, and plant systems, helping businesses achieve compliance, efficiency, and safety.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-lg font-medium text-lg">
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white px-8 py-6 rounded-lg font-medium text-lg hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 hero-image-container relative">
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 mix-blend-overlay"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg opacity-50 blur"></div>
              <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
                <Image 
                  src="/images/hero-image.jpg" 
                  alt="Safety inspection" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-6 rounded-lg shadow-xl">
              <p className="text-2xl font-bold">29+ Years</p>
              <p className="text-sm">Experience</p>
            </div>
            <div className="absolute w-24 h-24 -left-8 top-1/2 transform -translate-y-1/2 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg animate-pulse duration-4000">
              <div className="text-center">
                <div className="text-xl font-bold">ISO</div>
                <div className="text-xs">Certified</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection(servicesRef)}
        >
          <p className="text-blue-200 text-sm mb-2">Scroll Down</p>
          <div className="scroll-arrow h-10 w-10 flex items-center justify-center rounded-full border border-blue-400/50 bg-blue-900/30">
            <ArrowDown className="h-5 w-5 text-blue-300" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white stats-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-sm border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                <span className="stat-value" data-value="126">0</span>+
              </div>
              <p className="text-gray-700">Satisfied Clients</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl shadow-sm border border-indigo-100">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                <span className="stat-value" data-value="280">0</span>+
              </div>
              <p className="text-gray-700">Completed Projects</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-sm border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                <span className="stat-value" data-value="29">0</span>+
              </div>
              <p className="text-gray-700">Years of Experience</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-xl shadow-sm border border-pink-100">
              <div className="text-3xl font-bold text-pink-600 mb-2">
                <span className="stat-value" data-value="14">0</span>+
              </div>
              <p className="text-gray-700">Industry Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-blue-600 text-sm font-medium bg-blue-100">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Our Specialized Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive solutions to help organizations maintain safety standards, optimize energy consumption, and ensure efficient plant operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Environmental Impact Assessment',
                icon: <Shield className="h-10 w-10 text-blue-500" />,
                description: 'Comprehensive assessment of environmental impacts for regulatory compliance and sustainable operations.'
              },
              { 
                title: 'Occupational Safety',
                icon: <Users className="h-10 w-10 text-indigo-500" />,
                description: 'Creating safe workplace environments through meticulous safety protocols and training programs.'
              },
              { 
                title: 'Fire Safety Audit',
                icon: <Zap className="h-10 w-10 text-red-500" />,
                description: 'Thorough evaluation of fire safety measures to protect lives and assets from fire hazards.'
              },
              { 
                title: 'Energy Audit',
                icon: <Award className="h-10 w-10 text-amber-500" />,
                description: 'Detailed analysis of energy consumption patterns to identify optimization opportunities.'
              },
            ].map((service, index) => (
              <div 
                key={index} 
                className="service-card bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="bg-blue-50 group-hover:bg-blue-100 p-4 rounded-lg inline-block mb-6 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-900 group-hover:text-blue-700 transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">{service.description}</p>
                <Link href="/services" className="text-blue-500 font-medium flex items-center group-hover:text-blue-600 transition-colors">
                  Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:ml-3 transition-all" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/services">
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-500 hover:bg-blue-50 transform hover:scale-105 transition-all"
              >
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 about-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-5/12 mb-10 lg:mb-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-xl opacity-20 blur-lg transform -rotate-3"></div>
                <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-xl about-image relative">
                  <Image 
                    src="/images/about-image.jpg" 
                    alt="Engineer conducting inspection" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg shadow-xl transform rotate-3">
                  <p className="text-2xl font-bold">2009</p>
                  <p className="text-sm">Established</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-7/12 lg:pl-16 about-content">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-blue-600 text-sm font-medium bg-blue-100">
                About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">About Mvono Consultants</h2>
              <p className="text-lg text-gray-600 mb-6">
                Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, specializing in the management of safety, energy, and plant systems. The business is managed by Engineer Donald M Mbogho who has over 29 years of experience in plant management, statutory inspection, energy management, and safety advisory.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    title: 'Safety as Our Cornerstone',
                    description: 'Every individual has the right to a safe and healthy work environment'
                  },
                  {
                    title: 'Expertise & Integrity',
                    description: 'Driven by a passion for excellence with deep industry knowledge'
                  },
                  {
                    title: 'Client-Focused Solutions',
                    description: 'Understanding that every client is unique with tailored solutions'
                  },
                  {
                    title: 'Relentless Improvement',
                    description: 'Never settling for the status quo, constantly enhancing our services'
                  }
                ].map((value, index) => (
                  <div key={index} className="value-card group bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200 flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
                    <div className="ml-3">
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{value.title}</h4>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/about">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 transition-all transform hover:scale-105">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section ref={clientsRef} className="py-24 clients-section relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg bg-gradient-to-br from-blue-50 via-white to-indigo-50 bg-[length:400%_400%]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-blue-600 text-sm font-medium bg-blue-100">
              Our Clients
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud to work with companies across various industries, helping them maintain the highest standards of safety and efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              'Lafarge', 'KTDA', 'Alpine Coolers', 'Unga Group', 'Movenpick', 
              'Dormans Coffee', 'Husseini Builders', 'Iberafrica', 'KCI', 'Tata Chemicals', 
              'Radisson Blu', 'National Cement'
            ].map((client, index) => (
              <div key={index} className="client-logo flex items-center justify-center p-2">
                <div className="bg-white rounded-lg p-6 w-full h-24 flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200">
                  <p className="text-gray-700 font-semibold">{client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 cta-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -right-1/4 top-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -left-1/4 bottom-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Enhance Your Safety and Energy Management?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us today to discuss how Mvono Consultants can help your organization achieve compliance, efficiency, and safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 rounded-lg font-medium text-lg transition-all transform hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white px-8 py-6 rounded-lg font-medium text-lg hover:bg-white/10 transition-all"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
