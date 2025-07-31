'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaShieldAlt, FaIndustry, FaMoneyBillWave, FaRegLightbulb } from 'react-icons/fa'

const values = [
  {
    icon: <FaShieldAlt className="text-5xl text-white mb-4" />,
    title: 'Safety Compliance',
    description: 'Stay compliant with all Kenyan safety regulations while creating a safer workplace.',
  },
  {
    icon: <FaIndustry className="text-5xl text-white mb-4" />,
    title: 'Industry Expertise',
    description: 'Benefit from our 29+ years of specialized experience across multiple sectors.',
  },
  {
    icon: <FaMoneyBillWave className="text-5xl text-white mb-4" />,
    title: 'Cost Reduction',
    description: 'Our energy audits and safety solutions lead to significant operational savings.',
  },
  {
    icon: <FaRegLightbulb className="text-5xl text-white mb-4" />,
    title: 'Expert Solutions',
    description: 'Tailored recommendations that address your exact safety and energy needs.',
  },
]

export default function ValueProposition() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Animate value cards with stagger
      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        }
      )
      
      // Animate background gradient
      gsap.to('.value-bg', {
        backgroundPosition: '100% 100%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      
      // Animate hover effect for cards
      document.querySelectorAll('.value-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={sectionRef} 
      className="values-section py-20 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div 
        className="value-bg absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 bg-[length:200%_200%]"
        style={{ backgroundPosition: '0% 0%' }}
      />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose Mvono Consultants?
          </h2>
          <p className="text-lg text-white text-opacity-90 max-w-3xl mx-auto">
            Our consultancy delivers tangible safety improvements and energy savings with local expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center border border-white border-opacity-20 shadow-lg transition-all"
            >
              <div className="flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-white text-opacity-80">
                {value.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-white font-light">
            "Your success is our success"
          </p>
        </div>
      </div>
    </div>
  )
}
