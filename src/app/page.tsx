'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import ClientsSection from '@/components/home/ClientsSection'
import ContactSection from '@/components/home/ContactSection'
import ValueProposition from '@/components/home/ValueProposition'

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Initialize animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      )
      
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
      )
      
      // Services section animations (triggered on scroll)
      gsap.fromTo(
        '.services-title',
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      )
      
      // Animate service cards with stagger
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 70%',
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      )
      
      // About section animations
      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: -50 },
        {
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      )
      
      // Values section animations with stagger
      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        }
      )
      
      // Clients section animations
      gsap.fromTo(
        '.clients-title',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: '.clients-section',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      )
      
      // Client logo animations with stagger
      gsap.fromTo(
        '.client-logo',
        { opacity: 0, scale: 0.8 },
        {
          scrollTrigger: {
            trigger: '.clients-section',
            start: 'top 70%',
          },
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.5)',
        }
      )
      
      // Contact section animations
      gsap.fromTo(
        '.contact-content',
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      )
      
    }, mainRef)
    
    // Cleanup
    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ValueProposition />
      <AboutSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
