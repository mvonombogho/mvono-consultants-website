'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const AboutSection = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const image = imageRef.current

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      }
    })

    tl.fromTo(
      content, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(
      image, 
      { x: 50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              About Mvono Consultants
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, 
              specializing in the management of safety, energy, and plant systems.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              The business is managed by Engineer Donald M Mbogho who has over 29 years of 
              experience in plant management, statutory inspection (pressure vessels, lifting 
              equipment, refrigeration plant), energy management, and safety advisory.
            </p>
            <p className="text-lg text-slate-600">
              Our team of seasoned professionals combines deep industry knowledge with 
              technical proficiency to deliver solutions tailored to your unique needs.
            </p>
          </div>
          
          <div ref={imageRef} className="relative">
            {/* About section image */}
            <div className="w-full h-[400px] rounded-lg relative overflow-hidden shadow-lg group">
              <Image
                src="/images/homeImage2.png"
                alt="Mvono Consultants Team - Professional Safety and Energy Management Services"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent transition-opacity duration-300 group-hover:from-blue-900/5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
