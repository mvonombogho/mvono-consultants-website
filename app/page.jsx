'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import MetaTags from '../components/MetaTags'
import WorkingEmailChat from '../components/common/WorkingEmailChat'
import { gradients, colorSchemes } from '../utils/colors'

export default function Home() {
  return (
    <>
      <MetaTags
        title="Mvono Consultants | Leading Safety, Energy & Plant Management Experts in Kenya"
        description="Mvono Consultants is Kenya's premier safety, energy, and plant management firm since 2009. We provide environmental impact assessment, occupational safety, fire safety audits, energy audits, statutory inspection, and professional training across East Africa."
        keywords="safety consultants Kenya, energy audit Nairobi, environmental impact assessment, occupational safety Kenya, fire safety audit, DOSH compliance, plant management Kenya, statutory inspection, energy management, safety training Kenya, East Africa consultants"
        canonicalUrl="https://www.mvonoconsultants.com"
        page="home"
      />
      <main className="overflow-x-hidden bg-white">
      {/* Header */}
      <Navbar activePage="home" />

      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center justify-center ${gradients.heroGradient} text-white pt-16`}>
        <div className="container mx-auto px-4 py-32 md:py-0 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block">Safety, Energy &</span>
                <span className="block text-blue-400">Plant Management</span>
                <span className="block">Experts</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Mvono Consultants is a wholly Kenyan owned firm specializing in safety, energy, and plant systems management since 2009.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-4 md:space-y-0 md:space-x-4">
                <Link 
                  href="/services"
                  className={`inline-flex h-12 min-w-[180px] items-center justify-center rounded-md ${colorSchemes.buttons.primary} px-6 font-medium shadow transition-colors`}
                >
                  Our Services
                </Link>
                <Link 
                  href="/contact"
                  className={`inline-flex h-12 min-w-[180px] items-center justify-center rounded-md ${colorSchemes.buttons.secondary} px-6 font-medium shadow-sm transition-colors`}
                >
                  Contact Us
                </Link>
                <a 
                  href="/Mvono Consultants Profile.pdf"
                  download="Mvono_Consultants_Company_Profile.pdf"
                  className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-md bg-[#f15a27] hover:bg-[#d94d1f] text-white px-6 font-medium shadow transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Company Profile
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-full h-[500px] rounded-lg overflow-hidden border border-white/10 shadow-2xl relative">
                <Image 
                  src="/images/homeImage1.png" 
                  alt="Mvono Consultants - Safety, Energy & Plant Management" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  priority
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHw8f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We offer a comprehensive range of services to help businesses maintain safety,
              optimize energy usage, and manage their plant systems effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {name: 'Environmental Impact Assessment', description: 'Comprehensive assessment of environmental impacts of projects and activities.'},
              {name: 'Occupational Safety', description: 'Assessment and implementation of workplace safety measures.'},
              {name: 'Fire Safety Audit', description: 'Thorough audit of fire safety systems and protocols.'},
              {name: 'Energy Audit', description: 'Analysis of energy consumption and efficiency recommendations.'},
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2 border border-slate-100">
                <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-7 w-7 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{service.name}</h3>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <Link href="/services" className={`inline-flex items-center ${colorSchemes.serviceCards.link} font-medium`}>
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/services"
              className={`inline-flex h-12 items-center justify-center rounded-md ${colorSchemes.buttons.primary} px-8 font-medium shadow transition-colors`}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                About Mvono Consultants
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, 
                specializing in the management of safety, energy, and plant systems.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                The business is managed by Engineer Donald M Mbogho who has over 29 years of 
                experience in plant management, statutory inspection, energy management, and safety advisory.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Our team of seasoned professionals combines deep industry knowledge with 
                technical proficiency to deliver solutions tailored to your unique needs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/about"
                  className={`inline-flex h-12 items-center justify-center rounded-md ${colorSchemes.buttons.primary} px-6 font-medium shadow transition-colors`}
                >
                  Learn More About Us
                </Link>
                <a 
                  href="/Mvono Consultants Profile.pdf"
                  download="Mvono_Consultants_Company_Profile.pdf"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-orange-600 hover:bg-orange-700 text-white px-6 font-medium shadow transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Download Profile
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg relative">
                <Image 
                  src="/images/homeImage2.png" 
                  alt="Mvono Consultants - About Us" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600">Quick answers to common questions about our services</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">What services does Mvono Consultants offer?</h3>
                <p className="text-slate-600">We offer comprehensive services including <Link href="/services#environmental-impact-assessment" className="text-blue-600 hover:text-blue-700">Environmental Impact Assessment</Link>, <Link href="/services#occupational-safety" className="text-blue-600 hover:text-blue-700">Occupational Safety</Link>, <Link href="/services#fire-safety-audit" className="text-blue-600 hover:text-blue-700">Fire Safety Audit</Link>, <Link href="/services#energy-audit" className="text-blue-600 hover:text-blue-700">Energy Audit</Link>, <Link href="/services#statutory-inspection" className="text-blue-600 hover:text-blue-700">Statutory Inspection</Link>, Non-Destructive Testing, and professional training programs.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How long has Mvono Consultants been in business?</h3>
                <p className="text-slate-600">Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, with over 15 years of experience in safety, energy, and plant systems management. We are managed by <Link href="/about" className="text-blue-600 hover:text-blue-700">Engineer Donald M Mbogho</Link> who has over 29 years of industry experience.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">What industries does Mvono Consultants serve?</h3>
                <p className="text-slate-600">We serve diverse industries including <Link href="/industries/manufacturing" className="text-blue-600 hover:text-blue-700">Manufacturing</Link>, Construction, Oil and Gas, Mining, Food Processing, Pharmaceuticals, Healthcare, Hospitality, and Education sectors across East Africa. Our client base includes Unga Group, Tata Chemicals, National Cement, and 200+ other companies.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">What geographic areas does Mvono Consultants cover?</h3>
                <p className="text-slate-600">While primarily based in <Link href="/locations/nairobi" className="text-blue-600 hover:text-blue-700">Nairobi, Kenya</Link>, we serve clients throughout East Africa including Uganda, Tanzania, Rwanda, Burundi, South Sudan, Ethiopia, and Somaliland. We provide on-site services across the entire region.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How can I get started with Mvono Consultants?</h3>
                <p className="text-slate-600">Getting started is easy! You can <Link href="/contact" className="text-blue-600 hover:text-blue-700">contact us</Link> through our website, call us at <a href="tel:+254701868849" className="text-blue-600 hover:text-blue-700">+254 701 868 849</a>, or email <a href="mailto:sales@mvonoconsultants.com" className="text-blue-600 hover:text-blue-700">sales@mvonoconsultants.com</a>. We offer free initial consultations to understand your specific requirements.</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-slate-600 mb-6">Have more questions? We're here to help!</p>
              <Link 
                href="/contact"
                className={`inline-flex h-12 items-center justify-center rounded-md ${colorSchemes.buttons.primary} px-6 font-medium shadow transition-colors`}
              >
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Add FAQ Schema for Homepage */}
      <Script id="faq-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does Mvono Consultants offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mvono Consultants offers a comprehensive range of services including Environmental Impact Assessment, Occupational Safety, Fire Safety Audit, Energy Audit, Statutory Inspection, Non-Destructive Testing, Fire Safety Training, and First Aider Training."
                }
              },
              {
                "@type": "Question",
                "name": "How long has Mvono Consultants been in business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, with over 15 years of experience in safety, energy, and plant systems management."
                }
              },
              {
                "@type": "Question",
                "name": "What industries does Mvono Consultants serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mvono Consultants serves a wide range of industries including Manufacturing, Construction, Oil and Gas, Mining, Food Processing, Pharmaceuticals, Chemicals, Hospitality, Healthcare, Education, Warehousing and Logistics, Agriculture, Retail, and Transport sectors across East Africa."
                }
              },
              {
                "@type": "Question",
                "name": "What geographic areas does Mvono Consultants cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While primarily based in Kenya with operations in major cities like Nairobi, Mombasa, Kisumu, and Nakuru, Mvono Consultants also serves clients throughout East Africa, including Uganda, Tanzania, Rwanda, Burundi, and South Sudan."
                }
              }
            ]
          }
        `}
      </Script>

      {/* Add WebSite Schema for Homepage */}
      <Script id="website-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.mvonoconsultants.com",
            "name": "Mvono Consultants",
            "description": "Mvono Consultants is a wholly Kenyan owned consultancy firm specializing in the management of safety, energy, and plant systems since 2009.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.mvonoconsultants.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </Script>

      {/* Add BreadcrumbList Schema for Homepage */}
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
              }
            ]
          }
        `}
      </Script>
      
      {/* Working Email Chat Widget */}
      <WorkingEmailChat 
        businessName="Mvono Consultants"
        position="bottom-right"
      />
      </main>
    </>
  )
}
