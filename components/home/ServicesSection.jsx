'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { 
  Lightbulb, 
  ShieldCheck, 
  Flame, 
  Activity, 
  Workflow, 
  Users, 
  FileCheck, 
  Briefcase
} from 'lucide-react'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'environmental',
    name: 'Environmental Impact Assessment',
    description: 'Comprehensive assessment of environmental impacts of projects and activities.',
    icon: Lightbulb,
    color: 'text-green-500',
    bg: 'bg-green-100',
  },
  {
    id: 'safety',
    name: 'Occupational Safety',
    description: 'Assessment and implementation of workplace safety measures to ensure compliance with regulations.',
    icon: ShieldCheck,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    id: 'fire',
    name: 'Fire Safety Audit',
    description: 'Thorough audit of fire safety systems and protocols to protect lives and assets.',
    icon: Flame,
    color: 'text-red-500',
    bg: 'bg-red-100',
  },
  {
    id: 'energy',
    name: 'Energy Audit',
    description: 'Analysis of energy consumption and efficiency recommendations to reduce costs.',
    icon: Activity,
    color: 'text-amber-500',
    bg: 'bg-amber-100',
  },
  {
    id: 'statutory',
    name: 'Statutory Inspection',
    description: 'Inspection services to ensure compliance with statutory requirements and regulations.',
    icon: FileCheck,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100',
  },
  {
    id: 'testing',
    name: 'Non-Destructive Testing',
    description: 'Testing methods that don\'t cause damage to the materials being tested.',
    icon: Workflow,
    color: 'text-violet-500',
    bg: 'bg-violet-100',
  },
  {
    id: 'fire-training',
    name: 'Fire Safety Training',
    description: 'Training for employees on fire safety procedures and protocols.',
    icon: Users,
    color: 'text-orange-500',
    bg: 'bg-orange-100',
  },
  {
    id: 'first-aid',
    name: 'First Aider Training',
    description: 'Training for employees on first aid procedures and protocols.',
    icon: Briefcase,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
  },
]

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const headingElement = headingRef.current
    const cards = cardsRef.current

    gsap.fromTo(
      headingElement,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 bg-slate-100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We offer a comprehensive range of services to help businesses maintain safety,
            optimize energy usage, and manage their plant systems effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className={`${service.bg} rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
                <service.icon className={`h-7 w-7 ${service.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">{service.name}</h3>
              <p className="text-slate-600 mb-4">{service.description}</p>
              <Link 
                href={`/services#${service.id}`}
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
              >
                Learn more
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
