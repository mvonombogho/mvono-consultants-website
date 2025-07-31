'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import CompanyProfileDownload from '../common/CompanyProfileDownload'

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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-slate-900 text-white overflow-hidden"
    >
      {/* Background pattern/animation could be added here */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 py-32 md:py-0 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left" ref={textRef}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Safety, Energy &</span>
              <span className="block text-primary-400">Plant Management</span>
              <span className="block">Experts</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Mvono Consultants is a wholly Kenyan owned firm specializing in safety, energy, and plant systems management since 2009.
            </p>
            
            <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-4 md:space-y-0 md:space-x-4">
              <Link 
                href="/services"
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-md bg-primary-900 px-6 font-medium text-white shadow transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
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
            
            {/* Company Profile Download */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-slate-300 text-sm mb-4 text-center lg:text-left">
                Learn more about our company and capabilities
              </p>
              <div className="flex justify-center lg:justify-start">
                <CompanyProfileDownload 
                  variant="ghost" 
                  size="md"
                  className="text-primary-300 hover:text-white hover:bg-white/10 border border-primary-300/40 hover:border-white/40"
                />
              </div>
            </div>
          </div>
          
          {/* Mobile hero image */}
          <div className="lg:hidden mt-8">
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="/images/homeImage1.png"
                alt="Mvono Consultants - Safety, Energy & Plant Management Experts"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[0.5px] transition-opacity duration-300 group-hover:bg-blue-900/10"></div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            {/* Hero image */}
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl group">
              <Image
                src="/images/homeImage1.png"
                alt="Mvono Consultants - Safety, Energy & Plant Management Experts"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[0.5px] transition-opacity duration-300 group-hover:bg-blue-900/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
