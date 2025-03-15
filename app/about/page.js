'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, Users, ArrowRight, Calendar, Clock, CheckCircle, MapPin } from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  {
    year: '2009',
    title: 'Company Founded',
    description: 'Mvono Consultants established by Engineer Donald M Mbogho in Nairobi, Kenya.',
  },
  {
    year: '2012',
    title: 'Service Expansion',
    description: 'Added comprehensive energy audit and management services to our portfolio.',
  },
  {
    year: '2014',
    title: 'Regional Growth',
    description: 'Expanded operations to serve clients across East Africa, including Tanzania and Uganda.',
  },
  {
    year: '2016',
    title: 'Industry Recognition',
    description: 'Received industry recognition for excellence in safety management consulting.',
  },
  {
    year: '2018',
    title: 'Advanced NDT Services',
    description: 'Introduced advanced non-destructive testing services for industrial equipment.',
  },
  {
    year: '2021',
    title: 'Digital Transformation',
    description: 'Implemented digital reporting and analytics platforms for enhanced client service delivery.',
  },
  {
    year: '2023',
    title: 'Sustainability Focus',
    description: 'Expanded environmental assessment and sustainability consulting services.',
  },
];

const teamMembers = [
  {
    name: 'Donald M Mbogho',
    position: 'Managing Director',
    bio: 'Engineer with over 29 years of experience in plant management, statutory inspection, energy management, and safety advisory.',
    expertise: ['Safety Management', 'Energy Audit', 'Plant Systems', 'Statutory Compliance'],
  },
  {
    name: 'Jane Wanjiku',
    position: 'Lead Safety Consultant',
    bio: 'Certified safety professional with 15 years of experience in occupational health and safety management across various industries.',
    expertise: ['Occupational Safety', 'Risk Assessment', 'Safety Training', 'Compliance Auditing'],
  },
  {
    name: 'James Mwangi',
    position: 'Senior Energy Consultant',
    bio: 'Energy management specialist with expertise in industrial energy optimization and renewable energy integration.',
    expertise: ['Energy Auditing', 'Efficiency Optimization', 'Renewable Energy', 'Power Systems'],
  },
];

export default function About() {
  const headerRef = useRef(null);
  const missionRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const milestoneRefs = useRef([]);
  const teamRefs = useRef([]);

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

    // Mission section animation
    gsap.fromTo(
      missionRef.current.querySelectorAll('.animate-item'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 70%',
        },
        ease: 'power2.out',
      }
    );

    // Timeline animation
    milestoneRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
          },
        }
      );
    });

    // Team members animation
    teamRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-item">About Mvono Consultants</h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-8 animate-item">
            A trusted partner in safety, energy, and plant management with over a decade of experience serving East Africa's industries.
          </p>
          <div className="animate-item">
            <Link 
              href="/contact"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-blue-50 transition duration-300 inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section 
        ref={missionRef}
        className="py-20 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-item">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                To provide exceptional, reliable, and innovative solutions in safety, energy, and plant management that protect people, preserve assets, enhance efficiency, and promote sustainable practices.
              </p>
              <p className="text-lg text-gray-600">
                We are dedicated to delivering uncompromising quality and service excellence, establishing enduring partnerships with our clients, and contributing to a safer, more efficient, and sustainable industrial environment.
              </p>
            </div>
            
            <div className="animate-item">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="text-indigo-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-4">
                To be the leading safety, energy, and plant management consultancy in East Africa, recognized for our expertise, integrity, and commitment to excellence.
              </p>
              <p className="text-lg text-gray-600">
                We aspire to set industry standards, drive innovation in our field, and positively impact businesses, communities, and the environment through our specialized services and unwavering dedication to safety and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section 
        ref={timelineRef}
        className="py-20 px-4 sm:px-6 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From our founding to the present day, we've been committed to excellence in everything we do.
            </p>
          </div>

          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            {/* Timeline items */}
            <div className="relative z-10">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  ref={el => (milestoneRefs.current[index] = el)}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className={`p-6 bg-white rounded-xl shadow-md ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-md`}>
                      <div className="flex items-center mb-2 text-blue-600 font-bold text-lg">
                        <Calendar size={18} className="inline mr-2" />
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-white"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        className="py-20 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experts behind Mvono Consultants who bring decades of experience and a passion for excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                ref={el => (teamRefs.current[index] = el)}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-1 text-center text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4 text-center">{member.position}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Areas of Expertise</h4>
                <ul className="space-y-2">
                  {member.expertise.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
            Our team of experts is ready to help you achieve your safety, energy optimization, and plant management goals. Contact us today to discuss how we can support your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-blue-50 transition duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
            <Link 
              href="/services"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
