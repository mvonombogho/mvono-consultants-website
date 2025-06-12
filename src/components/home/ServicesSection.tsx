'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FaShieldAlt, 
  FaFire, 
  FaLeaf, 
  FaBolt, 
  FaCogs, 
  FaWrench,
  FaArrowRight
} from 'react-icons/fa'

const services = [
  {
    id: 'environmental-impact-assessment',
    icon: <FaLeaf className="text-4xl text-primary-500 mb-4" />,
    title: 'Environmental Impact Assessment',
    description: 'Comprehensive assessment of your project's environmental impact with NEMA compliance solutions.',
    href: '/services/environmental-impact-assessment',
  },
  {
    id: 'occupational-safety',
    icon: <FaShieldAlt className="text-4xl text-primary-500 mb-4" />,
    title: 'Occupational Safety',
    description: 'Workplace risk assessments and safety management systems to ensure DOSH compliance.',
    href: '/services/occupational-safety',
  },
  {
    id: 'fire-safety-audit',
    icon: <FaFire className="text-4xl text-primary-500 mb-4" />,
    title: 'Fire Safety Audit',
    description: 'Thorough fire safety audits and training to protect your people and property.',
    href: '/services/fire-safety-audit',
  },
  {
    id: 'energy-audit',
    icon: <FaBolt className="text-4xl text-primary-500 mb-4" />,
    title: 'Energy Audit',
    description: 'Energy optimization solutions and renewable energy consulting to reduce costs.',
    href: '/services/energy-audit',
  },
  {
    id: 'statutory-inspection',
    icon: <FaCogs className="text-4xl text-primary-500 mb-4" />,
    title: 'Statutory Inspection',
    description: 'Plant, pressure vessel, and lifting equipment certification and inspection.',
    href: '/services/statutory-inspection',
  },
  {
    id: 'non-destructive-testing',
    icon: <FaWrench className="text-4xl text-primary-500 mb-4" />,
    title: 'Non-Destructive Testing',
    description: 'Advanced NDT testing to ensure the integrity of critical equipment and components.',
    href: '/services/non-destructive-testing',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Animate services title
      gsap.fromTo(
        '.services-title',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      )
      
      // Animate services description
      gsap.fromTo(
        '.services-description',
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        }
      )
      
      // Animate service cards with stagger
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="services-section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="services-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="services-description text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive safety, energy, and plant management solutions tailored to your specific needs.
          </p>
        </div>
        
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-lg shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl hover:border-primary-100 hover:translate-y-[-5px]"
            >
              {service.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                Learn More <FaArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all hover:bg-primary-700 hover:shadow-lg"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  )
}
