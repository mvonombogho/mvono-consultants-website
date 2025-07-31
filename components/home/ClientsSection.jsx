'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Client logos with their information - Updated with all available logos
const clients = [
  { 
    id: 1, 
    name: 'Aga Khan University Hospital', 
    industry: 'Healthcare',
    logo: '/logos/agakhan-logo.png',
    alt: 'Aga Khan University Hospital Logo'
  },
  { 
    id: 2, 
    name: 'Alloy Castings', 
    industry: 'Manufacturing',
    logo: '/logos/alloy-castings-logo.png',
    alt: 'Alloy Castings Logo'
  },
  { 
    id: 3, 
    name: 'Alpine Coolers', 
    industry: 'HVAC',
    logo: '/logos/alpine-coolers-logo.png',
    alt: 'Alpine Coolers Logo'
  },
  { 
    id: 4, 
    name: 'Autosprings', 
    industry: 'Automotive',
    logo: '/logos/autosprings-logo.png',
    alt: 'Autosprings Logo'
  },
  { 
    id: 5, 
    name: 'Autosterile', 
    industry: 'Medical Equipment',
    logo: '/logos/autosterile-logo.png',
    alt: 'Autosterile Logo'
  },
  { 
    id: 6, 
    name: 'Bamburi Cement', 
    industry: 'Manufacturing',
    logo: '/logos/bamburi-cement-logo.png',
    alt: 'Bamburi Cement Logo'
  },
  { 
    id: 7, 
    name: 'Cylinder Works', 
    industry: 'Industrial',
    logo: '/logos/cylinder-works-logo.png',
    alt: 'Cylinder Works Logo'
  },
  { 
    id: 8, 
    name: 'Dormans Coffee', 
    industry: 'Food & Beverage',
    logo: '/logos/dormans-logo.png',
    alt: 'Dormans Coffee Logo'
  },
  { 
    id: 9, 
    name: 'Elite Tools Kenya', 
    industry: 'Tools & Equipment',
    logo: '/logos/elite-tools-kenya-logo.png',
    alt: 'Elite Tools Kenya Logo'
  },
  { 
    id: 10, 
    name: 'Empire Glass', 
    industry: 'Glass Manufacturing',
    logo: '/logos/empire-glass-logo.png',
    alt: 'Empire Glass Logo'
  },
  { 
    id: 11, 
    name: 'Husseini Builders', 
    industry: 'Construction',
    logo: '/logos/husseini-builders-logo.png',
    alt: 'Husseini Builders Logo'
  },
  { 
    id: 12, 
    name: 'Iberafrica', 
    industry: 'Power & Energy',
    logo: '/logos/iberafrica-logo.png',
    alt: 'Iberafrica Logo'
  },
  { 
    id: 13, 
    name: 'Kamili', 
    industry: 'Retail',
    logo: '/logos/kamili-logo.png',
    alt: 'Kamili Logo'
  },
  { 
    id: 14, 
    name: 'KCI', 
    industry: 'Industrial',
    logo: '/logos/KCI-logo.png',
    alt: 'KCI Logo'
  },
  { 
    id: 15, 
    name: 'KenGen', 
    industry: 'Power Generation',
    logo: '/logos/kengen-logo.png',
    alt: 'KenGen Logo'
  },
  { 
    id: 16, 
    name: 'Kens Metal', 
    industry: 'Manufacturing',
    logo: '/logos/kens-metal-logo.png',
    alt: 'Kens Metal Logo'
  },
  { 
    id: 17, 
    name: 'Kenya Hydraulics', 
    industry: 'Engineering',
    logo: '/logos/kenya-hydraulics-logo.png',
    alt: 'Kenya Hydraulics Logo'
  },
  { 
    id: 18, 
    name: 'Kenyatta National Hospital', 
    industry: 'Healthcare',
    logo: '/logos/KNH-logo.png',
    alt: 'Kenyatta National Hospital Logo'
  },
  { 
    id: 19, 
    name: 'KTDA', 
    industry: 'Agriculture',
    logo: '/logos/KTDA-logo.png',
    alt: 'KTDA Logo'
  },
  { 
    id: 20, 
    name: 'Limbua', 
    industry: 'Manufacturing',
    logo: '/logos/limbua-logo.png',
    alt: 'Limbua Logo'
  },
  { 
    id: 21, 
    name: 'Line Plast', 
    industry: 'Plastics',
    logo: '/logos/linePlast-logo.png',
    alt: 'Line Plast Logo'
  },
  { 
    id: 22, 
    name: 'Melvin Tea', 
    industry: 'Food & Beverage',
    logo: '/logos/melvinTea-logo.png',
    alt: 'Melvin Tea Logo'
  },
  { 
    id: 23, 
    name: 'Moi Teaching & Referral Hospital', 
    industry: 'Healthcare',
    logo: '/logos/moi-referral-logo.png',
    alt: 'Moi Teaching & Referral Hospital Logo'
  },
  { 
    id: 24, 
    name: 'Movenpick', 
    industry: 'Hospitality',
    logo: '/logos/movenpick-logo.png',
    alt: 'Movenpick Logo'
  },
  { 
    id: 25, 
    name: 'National Cement', 
    industry: 'Construction',
    logo: '/logos/national-cement-logo.png',
    alt: 'National Cement Logo'
  },
  { 
    id: 26, 
    name: 'Radisson Blu', 
    industry: 'Hospitality',
    logo: '/logos/radisson-blu-logo.png',
    alt: 'Radisson Blu Logo'
  },
  { 
    id: 27, 
    name: 'Rapid Kate', 
    industry: 'Logistics',
    logo: '/logos/rapid-kate-logo.png',
    alt: 'Rapid Kate Logo'
  },
  { 
    id: 28, 
    name: 'Royal Converters Kenya', 
    industry: 'Manufacturing',
    logo: '/logos/royal-converters-kenya-logo.jpg',
    alt: 'Royal Converters Kenya Logo'
  },
  { 
    id: 29, 
    name: 'Saint Gobain', 
    industry: 'Building Materials',
    logo: '/logos/saint-gobain-logo.png',
    alt: 'Saint Gobain Logo'
  },
  { 
    id: 30, 
    name: 'SICPA', 
    industry: 'Security Inks',
    logo: '/logos/sicpa-logo.png',
    alt: 'SICPA Logo'
  },
  { 
    id: 31, 
    name: 'Steel Structures', 
    industry: 'Construction',
    logo: '/logos/steel-structures-logo.png',
    alt: 'Steel Structures Logo'
  },
  { 
    id: 32, 
    name: 'Tata Chemicals', 
    industry: 'Chemicals',
    logo: '/logos/tata-chemicals-logo.png',
    alt: 'Tata Chemicals Logo'
  },
  { 
    id: 33, 
    name: 'Total', 
    industry: 'Oil & Gas',
    logo: '/logos/total-logo.png',
    alt: 'Total Logo'
  },
  { 
    id: 34, 
    name: 'Unga Group', 
    industry: 'Food Processing',
    logo: '/logos/unga-group-logo.png',
    alt: 'Unga Group Logo'
  },
  { 
    id: 35, 
    name: 'Welding Alloys', 
    industry: 'Industrial',
    logo: '/logos/welding-alloys-logo.png',
    alt: 'Welding Alloys Logo'
  },
  { 
    id: 36, 
    name: 'Wire Products', 
    industry: 'Manufacturing',
    logo: '/logos/wire-products-logo.png',
    alt: 'Wire Products Logo'
  }
]

const ClientLogo = ({ client, isVisible = true }) => {
  return (
    <div className={`client-logo-item ${isVisible ? 'opacity-100' : 'opacity-50'}`}>
      <div className="bg-white rounded-xl p-6 mx-4 h-48 w-80 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105 group border border-slate-100">
        {/* Logo Image */}
        <div className="relative w-48 h-32 mb-2 group-hover:scale-110 transition-transform duration-300">
          <Image
            src={client.logo}
            alt={client.alt}
            fill
            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            onError={(e) => {
              // Fallback to text if image fails to load
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          {/* Fallback text logo */}
          <div 
            className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg items-center justify-center"
            style={{ display: 'none' }}
          >
            <span className="text-white font-bold text-6xl">
              {client.name.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Client Info */}
        <div className="text-center">
          <div className="font-semibold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors leading-tight">
            {client.name}
          </div>
          <div className="text-sm text-slate-500">
            {client.industry}
          </div>
        </div>
      </div>
    </div>
  )
}

const ClientsSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current

    // Section entrance animation
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

    // GSAP-based infinite scroll for all logos
    const marquee = marqueeRef.current
    if (marquee) {
      const logos = marquee.querySelectorAll('.client-logo-item')
      const totalWidth = Array.from(logos).reduce((acc, logo) => acc + logo.offsetWidth + 32, 0) // 32px for margins
      
      gsap.set(marquee, { x: 0 })
      
      gsap.to(marquee, {
        x: -totalWidth / 2, // Move half the width (because we duplicate)
        duration: 60, // 60 seconds for full cycle
        ease: 'none',
        repeat: -1,
      })
    }
  }, [])

  // Create duplicated clients array for seamless loop
  const duplicatedClients = [...clients, ...clients]

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-2">
            We're proud to have worked with some of the leading companies across various industries, 
            helping them achieve excellence in safety, energy efficiency, and operational compliance.
          </p>
          <div className="text-sm text-slate-500">
            {clients.length}+ satisfied clients and counting
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays to create fade effect */}
          <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Marquee Track */}
          <div 
            ref={marqueeRef}
            className="flex items-center"
            style={{ width: 'fit-content' }}
          >
            {duplicatedClients.map((client, index) => (
              <ClientLogo 
                key={`${client.id}-${Math.floor(index / clients.length)}`} 
                client={client} 
              />
            ))}
          </div>
        </div>

        {/* Client Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{clients.length}+</div>
            <div className="text-sm text-slate-600">Satisfied Clients</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">15+</div>
            <div className="text-sm text-slate-600">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-sm text-slate-600">Industries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">1000+</div>
            <div className="text-sm text-slate-600">Projects Completed</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">
            Join these industry leaders in achieving operational excellence
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 hover:shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>

      {/* CSS for additional styling */}
      <style jsx>{`
        .client-logo-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        
        .client-logo-item:hover .client-logo-container {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}

export default ClientsSection