"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Shield, Flame, Zap, FileSearch, Wrench, BookOpen, Heart } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'environmental-impact-assessment',
    title: "Environmental Impact Assessment",
    description: "Comprehensive analysis and reporting on environmental effects of proposed projects, ensuring compliance with NEMA regulations and sustainable development practices.",
    icon: Activity,
    color: "bg-green-100 text-green-600",
    features: [
      "Baseline environmental surveys",
      "Impact identification and assessment",
      "Mitigation measures development",
      "Environmental management plans",
      "Public consultation facilitation",
      "NEMA compliance documentation"
    ]
  },
  {
    id: 'occupational-safety',
    title: "Occupational Safety",
    description: "Workplace safety audits, risk assessments, and safety management systems to ensure DOSH compliance and safeguard employee wellbeing across all operational environments.",
    icon: Shield,
    color: "bg-blue-100 text-blue-600",
    features: [
      "Workplace risk assessments",
      "Safety management systems",
      "DOSH compliance audits",
      "Accident investigation",
      "Safety committee training",
      "Personal protective equipment evaluation"
    ]
  },
  {
    id: 'fire-safety-audit',
    title: "Fire Safety Audit",
    description: "Thorough evaluation of fire risks, safety measures, and emergency protocols to protect lives and property through comprehensive prevention and response planning.",
    icon: Flame,
    color: "bg-red-100 text-red-600",
    features: [
      "Fire risk assessment",
      "Emergency evacuation planning",
      "Fire detection system evaluation",
      "Fire-fighting equipment inspection",
      "Staff emergency response training",
      "Fire safety compliance documentation"
    ]
  },
  {
    id: 'energy-audit',
    title: "Energy Audit",
    description: "Expert analysis of energy consumption patterns and optimization strategies to reduce costs, improve efficiency, and minimize environmental impact across operations.",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
    features: [
      "Power consumption analysis",
      "Energy efficiency assessment",
      "Cost-saving optimization",
      "Renewable energy consulting",
      "Carbon footprint reduction",
      "Energy management systems"
    ]
  },
  {
    id: 'statutory-inspection',
    title: "Statutory Inspection",
    description: "Professional inspection and certification of pressure vessels, lifting equipment, and refrigeration plants to meet regulatory requirements and ensure operational safety.",
    icon: FileSearch,
    color: "bg-purple-100 text-purple-600",
    features: [
      "Pressure vessel certification",
      "Lifting equipment inspection",
      "Refrigeration plant assessment",
      "Regulatory compliance documentation",
      "Equipment safety verification",
      "Risk-based inspection planning"
    ]
  },
  {
    id: 'non-destructive-testing',
    title: "Non-Destructive Testing",
    description: "Advanced testing methodologies to evaluate material integrity without causing damage to the equipment or structure, ensuring reliability and safety in operations.",
    icon: Wrench,
    color: "bg-gray-100 text-gray-600",
    features: [
      "Ultrasonic testing",
      "Radiographic inspection",
      "Magnetic particle testing",
      "Liquid penetrant inspection",
      "Visual inspection services",
      "Material integrity reporting"
    ]
  },
  {
    id: 'fire-safety-training',
    title: "Fire Safety Training",
    description: "Comprehensive training programs that equip employees with essential knowledge and skills for fire prevention, protection, and emergency response procedures.",
    icon: BookOpen,
    color: "bg-orange-100 text-orange-600",
    features: [
      "Fire prevention principles",
      "Fire extinguisher operation",
      "Emergency evacuation procedures",
      "Fire warden responsibilities",
      "Practical firefighting exercises",
      "Fire awareness certification"
    ]
  },
  {
    id: 'first-aider-training',
    title: "First Aider Training",
    description: "Professional training that prepares employees to provide immediate assistance in medical emergencies, potentially saving lives and reducing the severity of injuries.",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
    features: [
      "Basic life support techniques",
      "Wound management",
      "Emergency response protocols",
      "CPR and AED training",
      "Fracture and sprain management",
      "First aid certification"
    ]
  }
];

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      
      // Services cards animation
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
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
        <div ref={headerRef} className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Comprehensive solutions for safety, energy, and plant management across industries in Kenya and East Africa.
          </p>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="service-card bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className={`p-6 ${service.color}`}>
                <service.icon className="h-10 w-10" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <h4 className="font-medium text-blue-800 mb-2">Key Features:</h4>
                <ul className="space-y-1 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/services/${service.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Need Specialized Consultation?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Our team of experts is ready to provide customized solutions for your specific industry requirements.
          </p>
          <Link 
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  );
}
