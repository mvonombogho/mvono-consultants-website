'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaUserTie, FaBuilding, FaHandshake, FaChartLine } from 'react-icons/fa'

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Animate section
      gsap.fromTo(
        '.about-title',
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
      
      // Animate content
      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: -30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        }
      )
      
      // Animate image/stats section
      gsap.fromTo(
        '.about-image-section',
        { opacity: 0, x: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        }
      )
      
      // Animate stats items with stagger
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: '.stats-container',
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
    <div ref={sectionRef} className="about-section py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="about-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            About Mvono Consultants
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="about-content">
            <p className="text-lg text-gray-700 mb-6">
              Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, specializing in the management of safety, energy, and plant systems.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              The business is managed by Engineer Donald M Mbogho who has over 29 years of experience in plant management, statutory inspection (pressure vessels, lifting equipment, refrigeration plant), energy management, and safety advisory.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-6">Our Core Values</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <FaUserTie className="text-3xl text-primary-500 mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Safety as Our Cornerstone</h4>
                <p className="text-gray-600">Every individual has the right to a safe and healthy work environment.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <FaHandshake className="text-3xl text-primary-500 mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Expertise & Integrity</h4>
                <p className="text-gray-600">Our team combines deep industry knowledge with technical proficiency and ethical standards.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <FaBuilding className="text-3xl text-primary-500 mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Client-Focused Solutions</h4>
                <p className="text-gray-600">Understanding that every client is unique, we develop tailored solutions for your success.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <FaChartLine className="text-3xl text-primary-500 mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Relentless Improvement</h4>
                <p className="text-gray-600">Committed to continuous learning, innovation, and staying ahead of industry trends.</p>
              </div>
            </div>
            
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg text-base font-medium transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
          
          {/* Image/Stats Section */}
          <div className="about-image-section">
            <div className="relative rounded-xl overflow-hidden shadow-xl mb-10 h-80 bg-primary-600">
              {/* Placeholder for an image */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500">
                {/* Animation overlay */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className="absolute w-24 h-24 rounded-full bg-white animate-pulse"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                        transform: 'translate(-50%, -50%) scale(0.5)',
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">Established 2009</h3>
                  <p className="text-xl">Your Trusted Safety Partner</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="stats-container grid grid-cols-2 gap-4">
              <div className="stat-item p-6 bg-white rounded-lg shadow-md border border-gray-100 text-center">
                <h4 className="text-4xl font-bold text-primary-600 mb-2">29+</h4>
                <p className="text-gray-600">Years Experience</p>
              </div>
              
              <div className="stat-item p-6 bg-white rounded-lg shadow-md border border-gray-100 text-center">
                <h4 className="text-4xl font-bold text-primary-600 mb-2">100%</h4>
                <p className="text-gray-600">Kenyan Owned</p>
              </div>
              
              <div className="stat-item p-6 bg-white rounded-lg shadow-md border border-gray-100 text-center">
                <h4 className="text-4xl font-bold text-primary-600 mb-2">20+</h4>
                <p className="text-gray-600">Industry Clients</p>
              </div>
              
              <div className="stat-item p-6 bg-white rounded-lg shadow-md border border-gray-100 text-center">
                <h4 className="text-4xl font-bold text-primary-600 mb-2">8</h4>
                <p className="text-gray-600">Service Areas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
