'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Wrench, Search, CheckCircle, ArrowRight } from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: 'safety',
    title: 'Occupational Safety',
    icon: Shield,
    description: 'Comprehensive workplace safety assessments, compliance audits, and tailored safety solutions to protect your employees and assets.',
    benefits: [
      'Compliance with OSH regulations',
      'Reduced workplace accidents',
      'Improved employee well-being',
      'Lower insurance premiums',
    ],
    details: 'Our experienced safety professionals conduct thorough occupational safety assessments to identify hazards, evaluate risks, and develop customized safety management systems that align with your business objectives while ensuring regulatory compliance.'
  },
  {
    id: 'fire',
    title: 'Fire Safety Audit',
    icon: Shield,
    description: 'Expert fire safety audits to identify risks, ensure compliance, and protect your property and personnel from fire hazards.',
    benefits: [
      'Comprehensive fire risk assessment',
      'Legal compliance documentation',
      'Emergency evacuation planning',
      'Fire safety equipment evaluation',
    ],
    details: 'Our fire safety audits thoroughly evaluate your premises for fire hazards, assess the adequacy of fire protection systems, verify compliance with fire safety regulations, and provide actionable recommendations to enhance fire safety measures.'
  },
  {
    id: 'energy',
    title: 'Energy Audit',
    icon: Wrench,
    description: 'Detailed energy consumption analysis and optimization recommendations to reduce costs and improve sustainability.',
    benefits: [
      'Reduced energy costs',
      'Improved operational efficiency',
      'Enhanced environmental sustainability',
      'Energy consumption transparency',
    ],
    details: 'Our energy audits provide a comprehensive analysis of your facility\'s energy usage patterns, identify inefficiencies, and deliver practical, cost-effective recommendations to optimize energy consumption and reduce utility expenses.'
  },
  {
    id: 'inspection',
    title: 'Statutory Inspection',
    icon: Search,
    description: 'Professional inspection and certification services for pressure vessels, lifting equipment, and industrial plant systems.',
    benefits: [
      'Legal compliance assurance',
      'Equipment safety verification',
      'Reduced breakdown risks',
      'Extended equipment lifespan',
    ],
    details: 'Our certified inspectors conduct thorough examinations of your equipment and systems to ensure compliance with relevant regulations, verify operational safety, and provide official certification documentation.'
  },
  {
    id: 'testing',
    title: 'Non-Destructive Testing',
    icon: Search,
    description: 'Advanced testing methods to inspect materials and components without causing damage, ensuring structural integrity.',
    benefits: [
      'Early detection of defects',
      'Quality assurance',
      'Preventive maintenance support',
      'Cost-effective inspection solution',
    ],
    details: 'Using state-of-the-art NDT techniques such as ultrasonic testing, magnetic particle inspection, and radiographic testing, we evaluate the integrity of materials, welds, and components without affecting their usability.'
  },
  {
    id: 'training',
    title: 'Safety Training',
    icon: Shield,
    description: 'Comprehensive safety training programs for employees at all levels, from basic awareness to specialized safety roles.',
    benefits: [
      'Enhanced safety culture',
      'Reduced workplace incidents',
      'Regulatory compliance',
      'Improved emergency response',
    ],
    details: 'Our expert trainers deliver engaging, practical safety training programs tailored to your industry and specific needs, equipping your team with the knowledge and skills to maintain a safe working environment.'
  },
];

export default function Services() {
  const headerRef = useRef(null);
  const servicesRefs = useRef([]);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current.querySelectorAll('.animate-item'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      }
    );

    // Service card animations
    servicesRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
          },
        }
      );
    });

    return () => {
      // Clean up ScrollTrigger on component unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="pt-16">
      {/* Header */}
      <section 
        ref={headerRef}
        className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-20 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-item">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-8 animate-item">
            Comprehensive solutions for safety management, energy optimization, and plant systems to keep your business compliant, efficient, and secure.
          </p>
          <div className="animate-item">
            <Link 
              href="/contact"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-blue-50 transition duration-300 inline-flex items-center gap-2"
            >
              Request a Consultation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  ref={el => (servicesRefs.current[index] = el)}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 scroll-mt-20"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <ServiceIcon className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Key Benefits</h3>
                  <ul className="space-y-2 mb-4">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-gray-600 mb-6">{service.details}</p>
                  
                  <Link 
                    href="/contact"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Request this service
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Need a Custom Solution?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            We understand that every business has unique requirements. Contact us to discuss how we can tailor our services to meet your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
            <Link 
              href="/about"
              className="px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              About Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
