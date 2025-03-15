'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const shapeRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Create a timeline for the animation sequence
    const tl = gsap.timeline({
      defaults: { 
        ease: 'power3.out',
        duration: 1
      }
    })
    
    // Initialize GSAP animations
    tl
      // Animate the entry of the main heading with a slight offset and fade
      .fromTo(headingRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        0
      )
      // Animate the description text with a slight delay
      .fromTo(textRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        0.3
      )
      // Animate the CTA buttons with an additional delay
      .fromTo(ctaRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6 }, 
        0.6
      )
      // Animate the main image from the right side
      .fromTo(imageRef.current, 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1.2 }, 
        0.4
      )
      // Animate the background shape with a slow reveal
      .fromTo(shapeRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 0.1, duration: 1.5 }, 
        0.2
      )
    
    // Clean up animation on unmount
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-950 text-white py-20 md:py-32"
    >
      {/* Background animated shape */}
      <div 
        ref={shapeRef}
        className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary-600 blur-[120px] opacity-10"
      />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 hero-title"
            >
              Safety, Energy & Plant Management <span className="text-primary-400">Specialists</span>
            </h1>
            
            <p 
              ref={textRef}
              className="text-lg md:text-xl text-gray-200 mb-8 hero-subtitle"
            >
              Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, 
              providing expert solutions for safety audits, energy management, and plant systems.
            </p>
            
            <div 
              ref={ctaRef}
              className="flex flex-wrap gap-4 hero-cta"
            >
              <Button 
                asChild
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all"
              >
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="border-2 border-white/30 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all"
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="relative w-full h-[400px] lg:h-[500px]"
          >
            {/* Hero image - replace with appropriate company image */}
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/hero-image.jpg" 
                alt="Mvono Consultants Safety Experts"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 text-gray-900 w-48">
              <div className="text-4xl font-bold text-primary-600">29+</div>
              <div className="text-sm font-medium">Years of Industry Experience</div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute top-6 -right-6 bg-primary-500 rounded-full shadow-xl p-4 text-white">
              <div className="text-xl font-bold">Trusted by 200+ Companies</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70">
        <span className="text-sm font-medium mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
