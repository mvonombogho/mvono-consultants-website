'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Head from 'next/head';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import { colors, gradients, colorSchemes } from '../../utils/colors';
import MetaTags from '../../components/MetaTags';

// Define service data
const services = [
  {
    id: 'environmental-impact-assessment',
    title: "Environmental Impact Assessment",
    description: "Comprehensive analysis and reporting on environmental effects of proposed projects, ensuring compliance with NEMA regulations and sustainable development practices.",
    color: "bg-blue-100 text-blue-600",
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
    color: "bg-blue-100 text-blue-600",
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
    color: "bg-blue-100 text-blue-600",
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
    color: "bg-blue-100 text-blue-600",
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
    color: "bg-blue-100 text-blue-600",
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
    color: "bg-blue-100 text-blue-600",
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
    color: "bg-blue-100 text-blue-600",
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
  return (
    <>
      <MetaTags
        title="Our Services | Mvono Consultants - Safety, Energy & Plant Management"
        description="Comprehensive safety, energy, and plant management services across Kenya and East Africa. Environmental impact assessment, occupational safety, fire safety audits, energy audits, statutory inspection, NDT testing, and professional training."
        keywords="safety consultants Kenya, energy audit Nairobi, environmental impact assessment, fire safety audit, DOSH compliance, occupational safety training, statutory inspection Kenya, NDT testing, plant inspection, safety management systems"
        canonicalUrl="https://www.mvonoconsultants.com/services"
        page="services"
      />
      <main className="overflow-x-hidden bg-white">
      {/* Header */}
      <Navbar activePage="services" />

      {/* Hero Section */}
      <div className={`${gradients.heroGradient} text-white py-20 pt-28`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Comprehensive solutions for safety, energy, and plant management across industries in Kenya and East Africa.
          </p>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                id={service.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`p-6 ${service.color}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  
                  <h4 className="font-medium text-blue-800 mb-2">Key Features:</h4>
                  <ul className="space-y-1 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Related Services Internal Links */}
                  {service.id === 'occupational-safety' && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 mb-2"><strong>Related Services:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        <Link href="#fire-safety-audit" className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors">Fire Safety Audit</Link>
                        <Link href="#fire-safety-training" className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors">Fire Safety Training</Link>
                      </div>
                    </div>
                  )}
                  
                  {service.id === 'fire-safety-audit' && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 mb-2"><strong>Related Services:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        <Link href="#occupational-safety" className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors">Occupational Safety</Link>
                        <Link href="#fire-safety-training" className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors">Fire Safety Training</Link>
                      </div>
                    </div>
                  )}
                  
                  {service.id === 'energy-audit' && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 mb-2"><strong>Related Services:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        <Link href="#environmental-impact-assessment" className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors">Environmental Assessment</Link>
                        <Link href="#statutory-inspection" className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors">Plant Inspection</Link>
                      </div>
                    </div>
                  )}
                  
                  <Link 
                    href="/contact" 
                    className={`inline-block ${colorSchemes.buttons.primary} font-medium px-4 py-2 rounded-md transition-colors`}
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Need Specialized Consultation?</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                Our team of experts is ready to provide customized solutions for your specific industry requirements.
              </p>
            </div>
            
            {/* Location-based CTAs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <h3 className="text-xl font-bold mb-2 text-slate-900">Nairobi Services</h3>
                <p className="text-slate-600 mb-4">Comprehensive safety and energy solutions for Nairobi businesses</p>
                <Link 
                  href="/locations/nairobi"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <h3 className="text-xl font-bold mb-2 text-slate-900">About Our Team</h3>
                <p className="text-slate-600 mb-4">Meet our experienced safety and energy management experts</p>
                <Link 
                  href="/about"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Our Expertise →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <h3 className="text-xl font-bold mb-2 text-slate-900">Industry Insights</h3>
                <p className="text-slate-600 mb-4">Stay updated with latest safety and energy management trends</p>
                <Link 
                  href="/blog"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Read Blog →
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/contact"
                className={`${colorSchemes.buttons.primary} font-medium px-8 py-3 rounded-lg transition-colors inline-block`}
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Add Services Schema */}
      <Script id="services-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              ${services.map((service, index) => `
                {
                  "@type": "ListItem",
                  "position": ${index + 1},
                  "item": {
                    "@type": "Service",
                    "name": "${service.title}",
                    "description": "${service.description}",
                    "url": "https://www.mvonoconsultants.com/services#${service.id}",
                    "provider": {
                      "@type": "Organization",
                      "name": "Mvono Consultants",
                      "url": "https://www.mvonoconsultants.com"
                    }
                  }
                }
              `).join(',')}
            ]
          }
        `}
      </Script>

      {/* Add BreadcrumbList Schema */}
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
                "name": "Services",
                "item": "https://www.mvonoconsultants.com/services"
              }
            ]
          }
        `}
      </Script>
      </main>
    </>
  );
}
