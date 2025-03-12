'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated gradient background
      gsap.to('.gradient-bg', {
        backgroundPosition: '200% 0%',
        duration: 15,
        repeat: -1,
        ease: 'linear',
      })

      // Particle animation
      const particles = document.querySelectorAll('.particle')
      particles.forEach((particle) => {
        const randomX = Math.random() * 300 - 150
        const randomY = Math.random() * 300 - 150
        const randomDuration = 5 + Math.random() * 10
        
        gsap.to(particle, {
          x: randomX,
          y: randomY,
          opacity: 0,
          duration: randomDuration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div 
        className="gradient-bg absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-500 to-secondary-500 bg-[length:200%_200%]"
        style={{ backgroundPosition: '0% 0%' }}
      >
        {/* Particle overlay */}
        <div className="absolute inset-0">
          {/* Generate particles */}
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="particle absolute w-6 h-6 rounded-full bg-white opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-white text-center">
        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Safety. Energy. Expertise.
        </h1>
        <h2 className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto">
          Mvono Consultants: Kenya's trusted partner for safety, energy, and plant management since 2009.
        </h2>
        <div className="hero-cta flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link 
            href="/services"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-medium transition-all hover:bg-opacity-90 hover:shadow-lg"
          >
            Our Services
          </Link>
          <Link 
            href="/contact"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium transition-all hover:bg-white hover:bg-opacity-10"
          >
            Contact Us
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M12 5V19M12 19L5 12M12 19L19 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
