'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Mock client logos - these would be replaced with actual client logos
const clients = [
  { id: 1, name: 'Lafarge' },
  { id: 2, name: 'Alpine Coolers' },
  { id: 3, name: 'KTDA' },
  { id: 4, name: 'Alloy Castings' },
  { id: 5, name: 'Autosterile' },
  { id: 6, name: 'Autosprings' },
  { id: 7, name: 'Unga Group' },
  { id: 8, name: 'Movenpick' },
  { id: 9, name: 'Dormans Coffee' },
  { id: 10, name: 'Husseini Builders' },
  { id: 11, name: 'Iberafrica' },
  { id: 12, name: 'Kamili' },
  { id: 13, name: 'KCI' },
  { id: 14, name: 'Limbua' },
  { id: 15, name: 'Tata Chemicals' },
  { id: 16, name: 'Melvin Tea' }
]

const ClientsSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const clientsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const clientsEl = clientsRef.current

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    tl.fromTo(
      heading,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(
      clientsEl.children,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.05 
      },
      '-=0.4'
    )
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Clients
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We're proud to have worked with some of the leading companies across various industries.
          </p>
        </div>

        <div 
          ref={clientsRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
        >
          {clients.map((client) => (
            <div 
              key={client.id}
              className="bg-slate-100 rounded-lg p-4 h-24 flex items-center justify-center transition-transform hover:scale-105"
            >
              {/* We would use actual logos here */}
              <div className="text-center text-slate-700 font-medium">
                {client.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientsSection
