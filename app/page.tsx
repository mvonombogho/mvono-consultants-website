'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import ClientsSection from '@/components/home/ClientsSection'
import ContactSection from '@/components/home/ContactSection'
import ValuesSection from '@/components/home/ValuesSection'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize animations
    const ctx = gsap.context(() => {
      // Stagger fade in of sections
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section, i) => {
        gsap.fromTo(
          section,
          { 
            opacity: 0,
            y: 50
          },
          { 
            opacity: 1,
            y: 0,
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        )
      })
    }, mainRef)

    return () => ctx.revert() // Cleanup animations on unmount
  }, [])

  return (
    <main ref={mainRef} className="overflow-x-hidden bg-white">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ValuesSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
