'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

const HeroSection = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      textRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    .fromTo(
      ctaRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 text-white overflow-hidden"
    >
      {/* Background pattern/animation could be added here */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 py-32 md:py-0 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left" ref={textRef}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Safety, Energy &</span>
              <span className="block text-blue-400">Plant Management</span>
              <span className="block">Experts</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Mvono Consultants is a wholly Kenyan owned firm specializing in safety, energy, and plant systems management since 2009.
            </p>
            
            <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-4 md:space-y-0 md:space-x-4">
              <Link 
                href="/services"
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-md bg-blue-600 px-6 font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Our Services
              </Link>
              <Link 
                href="/contact"
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-md border border-white/20 px-6 font-medium text-white shadow-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block">
            {/* Hero image would go here */}
            <div className="w-full h-[500px] bg-blue-800/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
