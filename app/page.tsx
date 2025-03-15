"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Users } from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
      '.hero-image',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
    
    // Services animation with scroll trigger
    const serviceCards = gsap.utils.toArray('.service-card');
    serviceCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 80%',
          },
          delay: i * 0.15
        }
      );
    });
    
    // About section animation
    gsap.fromTo(
      '.about-content',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
        }
      }
    );
    
    // Values animation
    const valueCards = gsap.utils.toArray('.value-card');
    valueCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
          },
          delay: i * 0.15
        }
      );
    });
    
    // Client logos animation
    gsap.fromTo(
      '.client-logo',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.clients-section',
          start: 'top 80%',
        }
      }
    );
    
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
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative flex items-center min-h-[90vh] bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/hero-dots.svg')] bg-no-repeat bg-right-top opacity-20"></div>
        
        <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 z-10">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Safety, Energy & Plant Management Experts
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
          <div className="lg:w-1/2 hero-image relative">
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 mix-blend-overlay"></div>
              <Image 
                src="/images/hero-image.jpg" 
                alt="Safety inspection" 
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-6 rounded-lg shadow-xl">
              <p className="text-2xl font-bold">29+ Years</p>
              <p className="text-sm">Experience</p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
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
                icon: <Users className="h-10 w-10 text-blue-500" />,
                description: 'Creating safe workplace environments through meticulous safety protocols and training programs.'
              },
              { 
                title: 'Fire Safety Audit',
                icon: <Zap className="h-10 w-10 text-blue-500" />,
                description: 'Thorough evaluation of fire safety measures to protect lives and assets from fire hazards.'
              },
              { 
                title: 'Energy Audit',
                icon: <Award className="h-10 w-10 text-blue-500" />,
                description: 'Detailed analysis of energy consumption patterns to identify optimization opportunities.'
              },
            ].map((service, index) => (
              <div key={index} className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-blue-50 p-4 rounded-lg inline-block mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href="/services" className="text-blue-500 font-medium flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/services">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-5/12 mb-10 lg:mb-0">
              <div className="relative">
                <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-xl about-image">
                  <Image 
                    src="/images/about-image.jpg" 
                    alt="Engineer conducting inspection" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-6 rounded-lg shadow-xl">
                  <p className="text-2xl font-bold">2009</p>
                  <p className="text-sm">Established</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-7/12 lg:pl-16 about-content">
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
                  <div key={index} className="value-card flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div className="ml-3">
                      <h4 className="font-bold text-gray-800">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/about">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section ref={clientsRef} className="py-20 bg-white clients-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
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
              <div key={index} className="client-logo flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                <div className="bg-gray-100 rounded-lg p-4 w-full h-20 flex items-center justify-center">
                  <p className="text-gray-500 font-semibold">{client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 bg-gradient-to-r from-blue-800 to-indigo-900 text-white cta-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Safety and Energy Management?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us today to discuss how Mvono Consultants can help your organization achieve compliance, efficiency, and safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 rounded-lg font-medium text-lg">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white px-8 py-6 rounded-lg font-medium text-lg hover:bg-white/10">
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
