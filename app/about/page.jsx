'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, Users, ArrowRight, Calendar, CheckCircle, Building, TrendingUp, MapPin, Trophy, Cpu, LineChart, Leaf, Briefcase, Flame, Battery } from 'lucide-react';
import Footer from '../../components/shared/Footer';
// Navbar handled by layout.js
import MetaTags from '../../components/MetaTags';
import { gradients, colorSchemes } from '../../utils/colors';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  {
    year: '2009',
    title: 'Company Founded',
    description: 'Mvono Consultants established by Engineer Donald M Mbogho in Nairobi, Kenya with an initial focus on industrial safety inspections.',
    icon: <Building size={24} />,
    achievement: 'Successfully completed safety inspections for 12 industrial plants within first year',
    color: 'bg-blue-500'
  },
  {
    year: '2012',
    title: 'Service Expansion',
    description: 'Added comprehensive energy audit and management services to our portfolio, helping clients optimize energy consumption and reduce costs.',
    icon: <LineChart size={24} />,
    achievement: 'Helped clients achieve average energy savings of 23% through our recommendations',
    color: 'bg-green-500'
  },
  {
    year: '2014',
    title: 'Regional Growth',
    description: 'Expanded operations to serve clients across East Africa, establishing partnerships with key industries in Tanzania and Uganda.',
    icon: <MapPin size={24} />,
    achievement: 'Established offices in Dar es Salaam and Kampala to serve growing client base',
    color: 'bg-purple-500'
  },
  {
    year: '2016',
    title: 'Industry Recognition',
    description: 'Received the East African Safety Excellence Award for our contribution to improving workplace safety standards in the manufacturing sector.',
    icon: <Trophy size={24} />,
    achievement: 'Zero workplace incidents reported by our top 10 industrial clients',
    color: 'bg-yellow-500'
  },
  {
    year: '2018',
    title: 'Advanced NDT Services',
    description: 'Introduced advanced non-destructive testing services for industrial equipment, becoming one of the first companies in Kenya to offer comprehensive NDT solutions.',
    icon: <Cpu size={24} />,
    achievement: 'Certified in 5 advanced NDT methodologies with state-of-the-art equipment',
    color: 'bg-red-500'
  },
  {
    year: '2021',
    title: 'Digital Transformation',
    description: 'Implemented digital reporting and analytics platforms for enhanced client service delivery, allowing real-time monitoring and data-driven decision making.',
    icon: <TrendingUp size={24} />,
    achievement: 'Reduced reporting turnaround time by 65% while improving data accuracy',
    color: 'bg-indigo-500'
  },
  {
    year: '2023',
    title: 'Sustainability Focus',
    description: 'Expanded environmental assessment and sustainability consulting services to help clients meet global sustainability standards and reduce environmental impact.',
    icon: <Leaf size={24} />,
    achievement: 'Helped 15 major industrial clients achieve ISO 14001 environmental certification',
    color: 'bg-emerald-500'
  },
];

const teamMembers = [
  {
    name: 'Donald M Mbogho',
    position: 'Managing Director',
    bio: 'Engineer with over 29 years of experience in plant management, statutory inspection, energy management, and safety advisory.',
    expertise: ['Safety Management', 'Energy Audit', 'Plant Systems', 'Statutory Compliance'],
    icon: <Briefcase size={32} />,
    image: '/images/Donald.png',
  },
  {
    name: 'Israel Mbogho',
    position: 'Chief Operations Officer',
    bio: 'BSc in Computer Technology with expertise in operations management. Holds NEBOSH diploma in Occupational Health and Safety, and certificate in Fire Engineering (IFE). Specialized in lithium battery technology and safety management.',
    expertise: ['Occupational Health & Safety', 'Fire Engineering', 'Lithium Battery/Technology Expert', 'Computer Technology', 'Operations Management'],
    icon: <Battery size={32} />,
    image: '/images/Mvono.png',
  }
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
    <>
      <MetaTags
        title="About Us | Mvono Consultants - Leading Safety & Energy Experts in Kenya"
        description="Learn about Mvono Consultants, established in 2009 as Kenya's premier safety, energy, and plant management firm. Led by Engineer Donald M Mbogho with 29+ years of experience serving East Africa."
        keywords="about mvono consultants, safety experts Kenya, energy management firm, Donald M Mbogho, plant systems management, DOSH compliance, environmental consultants Kenya, statutory inspection experts"
        canonicalUrl="https://www.mvonoconsultants.com/about"
        page="about"
      />
      <main className="overflow-x-hidden bg-white">
      {/* Header - handled by layout.js */}

      {/* Hero Banner */}
      <section 
        ref={headerRef}
        className={`${gradients.heroGradient} text-white py-20 pt-28`}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-item">About Mvono Consultants</h1>
          <p className="text-xl text-blue-200 max-w-3xl mb-8 animate-item">
            A trusted partner in safety, energy, and plant management with over a decade of experience serving East Africa's industries.
          </p>
          <div className="animate-item">
            <Link 
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-6 font-medium text-white shadow transition-colors hover:bg-blue-700 border border-white/20"
            >
              Get in Touch
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Story</h2>
              <p className="text-lg text-slate-600 mb-6">
                Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, 
                specializing in the management of safety, energy, and plant systems.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                The business is managed by Engineer Donald M Mbogho who has over 29 years of 
                experience in plant management, statutory inspection (pressure vessels, lifting equipment, 
                refrigeration plant), energy management, and safety advisory.
              </p>
              <p className="text-lg text-slate-600">
                Our team of seasoned professionals combines deep industry knowledge with 
                technical proficiency to deliver solutions tailored to your unique needs.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl relative">
                <Image 
                  src="/images/homeImage2.png" 
                  alt="Mvono Consultants Team" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section 
        ref={missionRef}
        className="py-20 px-4 sm:px-6 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-item">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-4">
                To provide exceptional, reliable, and innovative solutions in safety, energy, and plant management that protect people, preserve assets, enhance efficiency, and promote sustainable practices.
              </p>
              <p className="text-lg text-slate-600">
                We are dedicated to delivering uncompromising quality and service excellence, establishing enduring partnerships with our clients, and contributing to a safer, more efficient, and sustainable industrial environment.
              </p>
            </div>
            
            <div className="animate-item">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="text-blue-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Vision</h2>
              <p className="text-lg text-slate-600 mb-4">
                To be the leading safety, energy, and plant management consultancy in East Africa, recognized for our expertise, integrity, and commitment to excellence.
              </p>
              <p className="text-lg text-slate-600">
                We aspire to set industry standards, drive innovation in our field, and positively impact businesses, communities, and the environment through our specialized services and unwavering dedication to safety and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every service we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Safety as Our Cornerstone</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Every individual has the right to a safe and healthy work environment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Unwavering commitment to prioritizing the safety and well-being of workers, communities, and the environment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Award className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Expertise & Integrity</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Driven by a passion for excellence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Team of seasoned professionals combining deep industry knowledge with technical proficiency</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Upholding the highest ethical standards, ensuring transparency and trustworthiness</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Client-Focused Solutions</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Understanding that every client is unique</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Taking time to listen, understand challenges, and develop tailored solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">"Your success is our success"</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ArrowRight className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Relentless Improvement</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Never settling for the status quo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Committed to continuous learning, innovation, and staying ahead of industry trends</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Constantly enhancing services, expertise, and technologies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Excellence Timeline */}
      <section 
        ref={timelineRef}
        className="py-20 px-4 sm:px-6 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Leading Change</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Delivering exceptional results across all our service areas with proven methodologies and innovative solutions.
            </p>
          </div>

          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 rounded-full"></div>
            
            {/* Timeline items */}
            <div className="relative z-10">
              {/* Environmental Impact Assessment */}
              <div 
                ref={el => (milestoneRefs.current[0] = el)}
                className="flex items-center mb-16 flex-row"
              >
                <div className="w-1/2 pr-12 text-right">
                  <div className="p-6 bg-white rounded-xl shadow-md ml-auto max-w-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-end mb-3">
                      <span className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-green-500 text-white">
                        <Leaf size={24} />
                      </span>
                      <span className="text-2xl font-bold text-green-600 ml-2">EIA</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-right">Environmental Impact Assessment</h3>
                    <p className="text-slate-600 mb-4 text-right">Comprehensive environmental evaluations ensuring NEMA compliance and sustainable practices.</p>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-right">
                      <span className="font-medium text-green-700 block mb-1">Achievement Highlights:</span>
                      <span className="text-slate-700 text-sm">100+ successful EIA projects • 98% NEMA approval rate • Zero environmental violations</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 border-4 border-white shadow-md flex items-center justify-center text-white">
                    <Leaf size={24} />
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>

              {/* Occupational Safety */}
              <div 
                ref={el => (milestoneRefs.current[1] = el)}
                className="flex items-center mb-16 flex-row-reverse"
              >
                <div className="w-1/2 pl-12">
                  <div className="p-6 bg-white rounded-xl shadow-md mr-auto max-w-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-start mb-3">
                      <span className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-blue-500 text-white">
                        <Shield size={24} />
                      </span>
                      <span className="text-2xl font-bold text-blue-600 ml-2">OSH</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-left">Occupational Safety</h3>
                    <p className="text-slate-600 mb-4 text-left">Complete safety management systems and DOSH compliance services protecting workers and assets.</p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-left">
                      <span className="font-medium text-blue-700 block mb-1">Achievement Highlights:</span>
                      <span className="text-slate-700 text-sm">85% reduction in workplace incidents • 200+ workers trained annually • 100% DOSH compliance</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center text-white">
                    <Shield size={24} />
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>

              {/* Fire Safety Audit */}
              <div 
                ref={el => (milestoneRefs.current[2] = el)}
                className="flex items-center mb-16 flex-row"
              >
                <div className="w-1/2 pr-12 text-right">
                  <div className="p-6 bg-white rounded-xl shadow-md ml-auto max-w-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-end mb-3">
                      <span className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-red-500 text-white">
                        <Flame size={24} />
                      </span>
                      <span className="text-2xl font-bold text-red-600 ml-2">FSA</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-right">Fire Safety Audit</h3>
                    <p className="text-slate-600 mb-4 text-right">Thorough fire risk assessments and safety system evaluations to prevent incidents and ensure compliance.</p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-right">
                      <span className="font-medium text-red-700 block mb-1">Achievement Highlights:</span>
                      <span className="text-slate-700 text-sm">500+ fire safety audits • Zero fire incidents at audited facilities • 95% improvement in safety ratings</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-500 border-4 border-white shadow-md flex items-center justify-center text-white">
                    <Flame size={24} />
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>

              {/* Energy Audit */}
              <div 
                ref={el => (milestoneRefs.current[3] = el)}
                className="flex items-center mb-16 flex-row-reverse"
              >
                <div className="w-1/2 pl-12">
                  <div className="p-6 bg-white rounded-xl shadow-md mr-auto max-w-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-start mb-3">
                      <span className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-yellow-500 text-white">
                        <Battery size={24} />
                      </span>
                      <span className="text-2xl font-bold text-yellow-600 ml-2">EA</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-left">Energy Audit</h3>
                    <p className="text-slate-600 mb-4 text-left">Comprehensive energy assessments and optimization strategies to reduce costs and improve efficiency.</p>
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-left">
                      <span className="font-medium text-yellow-700 block mb-1">Achievement Highlights:</span>
                      <span className="text-slate-700 text-sm">Average 23% energy cost reduction • $2M+ in client savings • 300+ optimization projects</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 border-4 border-white shadow-md flex items-center justify-center text-white">
                    <Battery size={24} />
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>

              {/* Statutory Inspection */}
              <div 
                ref={el => (milestoneRefs.current[4] = el)}
                className="flex items-center mb-16 flex-row"
              >
                <div className="w-1/2 pr-12 text-right">
                  <div className="p-6 bg-white rounded-xl shadow-md ml-auto max-w-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-end mb-3">
                      <span className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-purple-500 text-white">
                        <CheckCircle size={24} />
                      </span>
                      <span className="text-2xl font-bold text-purple-600 ml-2">SI</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-right">Statutory Inspection</h3>
                    <p className="text-slate-600 mb-4 text-right">Expert inspection of pressure vessels, lifting equipment, and industrial machinery ensuring regulatory compliance.</p>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-right">
                      <span className="font-medium text-purple-700 block mb-1">Achievement Highlights:</span>
                      <span className="text-slate-700 text-sm">1000+ equipment inspections annually • 100% regulatory compliance • 29 years expertise</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 border-4 border-white shadow-md flex items-center justify-center text-white">
                    <CheckCircle size={24} />
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>

              {/* Non-Destructive Testing */}
              <div 
                ref={el => (milestoneRefs.current[5] = el)}
                className="flex items-center mb-8 flex-row-reverse"
              >
                <div className="w-1/2 pl-12">
                  <div className="p-6 bg-white rounded-xl shadow-md mr-auto max-w-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-start mb-3">
                      <span className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-indigo-500 text-white">
                        <Cpu size={24} />
                      </span>
                      <span className="text-2xl font-bold text-indigo-600 ml-2">NDT</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-left">Non-Destructive Testing</h3>
                    <p className="text-slate-600 mb-4 text-left">Advanced NDT services using cutting-edge technology to assess material integrity without damage.</p>
                    <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-left">
                      <span className="font-medium text-indigo-700 block mb-1">Achievement Highlights:</span>
                      <span className="text-slate-700 text-sm">5 advanced NDT methodologies certified • 99.8% accuracy in defect detection • State-of-the-art equipment</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 border-4 border-white shadow-md flex items-center justify-center text-white">
                    <Cpu size={24} />
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Ready to experience the difference our expertise can make for your business? 
              Let's discuss how we can help you achieve your goals.
            </p>
            <Link 
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 font-medium text-white shadow transition-colors hover:bg-blue-700 border border-blue-600 gap-2"
            >
              Get Started Today
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        className="py-20 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Meet the experts behind Mvono Consultants who bring decades of experience and a passion for excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                ref={el => (teamRefs.current[index] = el)}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-blue-200 shadow-lg">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: member.name === 'Israel Mbogho' ? 'center 20%' : 'center center'
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center text-slate-900">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg mb-4 text-center">{member.position}</p>
                </div>
                
                <p className="text-slate-600 mb-6 text-center leading-relaxed">{member.bio}</p>
                
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 text-center">Areas of Expertise</h4>
                  <ul className="space-y-3">
                    {member.expertise.map((skill, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle size={18} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 sm:px-6 ${gradients.heroGradient} text-white`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
          <p className="text-lg text-blue-200 mb-8 max-w-3xl mx-auto">
            Our team of experts is ready to help you achieve your safety, energy optimization, and plant management goals. Contact us today to discuss how we can support your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className={`inline-flex h-12 items-center justify-center rounded-md ${colorSchemes.buttons.primary} px-6 font-medium shadow transition-colors border border-white/20 gap-2`}
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
            <Link 
              href="/services"
              className={`inline-flex h-12 items-center justify-center rounded-md ${colorSchemes.buttons.secondary} px-6 font-medium shadow-sm transition-colors`}
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Page Schema */}
      <Script id="about-page-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Mvono Consultants",
            "description": "Learn about Mvono Consultants, a wholly Kenyan owned consultancy firm established in 2009, specializing in safety, energy, and plant systems management.",
            "url": "https://www.mvonoconsultants.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "Mvono Consultants",
              "foundingDate": "2009",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Donald M Mbogho",
                  "jobTitle": "Managing Director"
                }
              ],
              "employees": [
              {
              "@type": "Person",
              "name": "Donald M Mbogho",
              "jobTitle": "Managing Director",
                "image": "https://www.mvonoconsultants.com/images/Donald.png"
              },
              {
              "@type": "Person",
              "name": "Israel Mbogho",
                "jobTitle": "Chief Operations Officer",
                  "image": "https://www.mvonoconsultants.com/images/Mvono.png"
                }
              ]
            }
          }
        `}
      </Script>

      {/* Timeline/Event Schema */}
      <Script id="timeline-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              ${milestones.map((milestone, index) => `
                {
                  "@type": "ListItem",
                  "position": ${index + 1},
                  "item": {
                    "@type": "Event",
                    "name": "${milestone.title}",
                    "description": "${milestone.description}",
                    "startDate": "${milestone.year}",
                    "organizer": {
                      "@type": "Organization",
                      "name": "Mvono Consultants"
                    },
                    "location": {
                      "@type": "Place",
                      "name": "Kenya"
                    }
                  }
                }
              `).join(',')}
            ]
          }
        `}
      </Script>

      {/* BreadcrumbList Schema */}
      <Script id="breadcrumb-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.mvonoconsultants.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://www.mvonoconsultants.com/about"
              }
            ]
          }
        `}
      </Script>
      
      {/* Footer */}
      <Footer />
      </main>
    </>
  );
}
