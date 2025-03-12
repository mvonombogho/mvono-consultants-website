"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, Users, TrendingUp, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const coreValues = [
  {
    title: "Safety as Our Cornerstone",
    description: "Every individual has the right to a safe and healthy work environment. We have an unwavering commitment to prioritizing the safety and well-being of workers, communities, and the environment.",
    icon: Shield,
    color: "bg-red-500"
  },
  {
    title: "Expertise & Integrity",
    description: "Driven by a passion for excellence, our team of seasoned professionals combines deep industry knowledge with technical proficiency. We uphold the highest ethical standards, ensuring transparency and trustworthiness.",
    icon: Award,
    color: "bg-blue-500"
  },
  {
    title: "Client-Focused Solutions",
    description: "Understanding that every client is unique, we take time to listen, understand challenges, and develop tailored solutions. 'Your success is our success' is more than a saying—it's our operating principle.",
    icon: Users,
    color: "bg-green-500"
  },
  {
    title: "Relentless Improvement",
    description: "Never settling for the status quo, we are committed to continuous learning, innovation, and staying ahead of industry trends. We constantly enhance our services, expertise, and technologies.",
    icon: TrendingUp,
    color: "bg-purple-500"
  }
];

const milestones = [
  {
    year: "2009",
    title: "Company Founded",
    description: "Mvono Consultants established as a wholly Kenyan owned consultancy firm specializing in safety and plant management."
  },
  {
    year: "2012",
    title: "Service Expansion",
    description: "Added environmental impact assessment and energy audit services to our portfolio."
  },
  {
    year: "2015",
    title: "Regional Growth",
    description: "Expanded operations to serve clients across East Africa, including Uganda, Tanzania, and Rwanda."
  },
  {
    year: "2018",
    title: "Training Programs",
    description: "Launched comprehensive fire safety and first aid training programs for corporate clients."
  },
  {
    year: "2021",
    title: "Digital Transformation",
    description: "Embraced digital technologies to enhance service delivery and client experience."
  },
  {
    year: "2023",
    title: "Recognized Excellence",
    description: "Celebrated serving over 100 corporate clients and completing 1500+ successful projects."
  }
];

const teamMembers = [
  {
    name: "Donald M Mbogho",
    position: "Managing Director",
    bio: "Engineer with over 29 years of experience in plant management, statutory inspection, energy management, and safety advisory."
  },
  {
    name: "Sarah Kimani",
    position: "Environmental Specialist",
    bio: "Environmental scientist with expertise in impact assessments and NEMA compliance with 15+ years of experience."
  },
  {
    name: "James Otieno",
    position: "Occupational Safety Expert",
    bio: "Certified safety professional specializing in workplace risk assessments and safety management systems."
  },
  {
    name: "Mercy Achieng",
    position: "Energy Audit Manager",
    bio: "Energy engineer with extensive experience in power consumption analysis and optimization strategies."
  }
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      
      // Story section animation
      gsap.from(storyRef.current?.querySelectorAll('.animate-item'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
        },
      });
      
      // Values animation
      gsap.from(valuesRef.current?.querySelectorAll('.value-card'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
        },
      });
      
      // Timeline animation
      gsap.from(timelineRef.current?.querySelectorAll('.timeline-item'), {
        x: (index) => index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
      });
      
      // Team animation
      gsap.from(teamRef.current?.querySelectorAll('.team-card'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
        },
      });
    }, pageRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={pageRef} className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div ref={heroRef} className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Mvono Consultants</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            A wholly Kenyan owned consultancy firm specializing in the management of safety, energy, and plant systems since 2009.
          </p>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div ref={storyRef} className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="animate-item text-3xl font-bold text-blue-900 mb-4">
              <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500">Our Story</span>
            </h2>
            
            <p className="animate-item text-lg text-gray-600 leading-relaxed">
              Mvono Consultants was established in 2009 as a response to the growing need for specialized safety and plant management services in Kenya. Founded by Engineer Donald M Mbogho, the company was built on the foundation of providing expert, reliable, and professional services to organizations seeking to enhance their safety culture and operational efficiency.
            </p>
            
            <p className="animate-item text-lg text-gray-600 leading-relaxed">
              With over a decade of experience, we have grown from a small consultancy to a trusted partner for organizations across East Africa. Our journey has been marked by continuous improvement, expansion of services, and a steadfast commitment to excellence in every project we undertake.
            </p>
            
            <div className="animate-item bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To provide comprehensive, high-quality safety, energy, and plant management solutions that protect lives, preserve the environment, and enhance operational efficiency for our clients.
              </p>
            </div>
          </div>
          
          <div className="animate-item bg-gray-100 rounded-lg p-8 relative h-96">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-80"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">29+ Years of Experience</h3>
                <p className="text-lg mb-6">Our leadership brings decades of industry expertise to every project</p>
                <div className="flex justify-around w-full">
                  <div className="text-center">
                    <span className="text-4xl font-bold block">100+</span>
                    <span className="text-sm">Corporate Clients</span>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold block">1500+</span>
                    <span className="text-sm">Projects Completed</span>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold block">6</span>
                    <span className="text-sm">Countries Served</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Core Values Section */}
      <div ref={valuesRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500">Our Core Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide our approach to every project and interaction, forming the foundation of our business ethos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              
              return (
                <div 
                  key={index} 
                  className="value-card bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all"
                >
                  <div className={`h-16 w-16 ${value.color} rounded-full flex items-center justify-center mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-blue-900 mb-4">{value.title}</h3>
                  
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Timeline Section */}
      <div ref={timelineRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500">Our Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key milestones in our growth and evolution as a leading consultancy firm in East Africa.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`timeline-item relative ${index % 2 === 0 ? 'md:ml-auto md:pl-16 md:pr-8' : 'md:mr-auto md:pr-16 md:pl-8'} md:w-1/2`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-white z-10"></div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
                    <div className="bg-blue-100 text-blue-800 font-bold py-1 px-4 rounded-full inline-block mb-3">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div ref={teamRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500">Our Leadership Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals driving our mission forward with expertise and passion.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-blue-200 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-blue-300 flex items-center justify-center text-white text-4xl font-bold">
                    {member.name.split(' ').map(name => name[0]).join('')}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Get in Touch With Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
