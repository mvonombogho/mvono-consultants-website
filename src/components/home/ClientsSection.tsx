'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// List of client logos
const clients = [
  { name: 'Lafarge', logo: '/images/clients/placeholder.svg' },
  { name: 'Alpine Coolers', logo: '/images/clients/placeholder.svg' },
  { name: 'KTDA', logo: '/images/clients/placeholder.svg' },
  { name: 'Alloy Castings', logo: '/images/clients/placeholder.svg' },
  { name: 'Autosterile', logo: '/images/clients/placeholder.svg' },
  { name: 'Autosprings', logo: '/images/clients/placeholder.svg' },
  { name: 'Unga Group', logo: '/images/clients/placeholder.svg' },
  { name: 'Movenpick', logo: '/images/clients/placeholder.svg' },
  { name: 'Dormans Coffee', logo: '/images/clients/placeholder.svg' },
  { name: 'Husseini Builders', logo: '/images/clients/placeholder.svg' },
  { name: 'Iberafrica', logo: '/images/clients/placeholder.svg' },
  { name: 'Kamili', logo: '/images/clients/placeholder.svg' },
  { name: 'KCI', logo: '/images/clients/placeholder.svg' },
  { name: 'Limbua', logo: '/images/clients/placeholder.svg' },
  { name: 'Tata Chemicals', logo: '/images/clients/placeholder.svg' },
  { name: 'Melvin Tea', logo: '/images/clients/placeholder.svg' },
  { name: 'Radisson Blu', logo: '/images/clients/placeholder.svg' },
  { name: 'National Cement', logo: '/images/clients/placeholder.svg' },
]

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Animate clients title
      gsap.fromTo(
        '.clients-title',
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
      
      // Animate clients description
      gsap.fromTo(
        '.clients-description',
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
      
      // Animate client logos with stagger
      gsap.fromTo(
        '.client-logo',
        { opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: '.clients-grid',
            start: 'top 80%',
          },
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.5)',
        }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="clients-section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="clients-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Trusted Clients
          </h2>
          <p className="clients-description text-lg text-gray-600 max-w-3xl mx-auto">
            We're proud to serve industry leaders across diverse sectors with our safety, energy, and plant management expertise.
          </p>
        </div>
        
        <div className="clients-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <div
              key={index}
              className="client-logo p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center h-24 transition-all hover:shadow-md"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">{client.name.substring(0, 2)}</span>
                </div>
                <p className="text-xs text-center text-gray-700 font-medium">{client.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-700">
            Join our growing list of satisfied clients from manufacturing, hospitality, agriculture, and more.
          </p>
          <p className="mt-2 font-medium text-primary-600">
            Your industry expertise + our safety excellence = a winning partnership
          </p>
        </div>
      </div>
    </div>
  )
}
