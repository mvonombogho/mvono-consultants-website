'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Shield, 
  Award, 
  Users, 
  ArrowUpCircle 
} from 'lucide-react'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    id: 'safety',
    title: 'Safety as Our Cornerstone',
    description: 'Every individual has the right to a safe and healthy work environment. We have an unwavering commitment to prioritizing the safety and well-being of workers, communities, and the environment.',
    icon: Shield,
    color: 'text-red-500',
    bg: 'bg-red-100',
  },
  {
    id: 'expertise',
    title: 'Expertise & Integrity',
    description: 'Driven by a passion for excellence, our team of seasoned professionals combines deep industry knowledge with technical proficiency, while upholding the highest ethical standards, ensuring transparency and trustworthiness.',
    icon: Award,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    id: 'client',
    title: 'Client-Focused Solutions',
    description: 'Understanding that every client is unique, we take time to listen, understand challenges, and develop tailored solutions. Your success is our success.',
    icon: Users,
    color: 'text-green-500',
    bg: 'bg-green-100',
  },
  {
    id: 'improvement',
    title: 'Relentless Improvement',
    description: 'Never settling for the status quo, we are committed to continuous learning, innovation, and staying ahead of industry trends, constantly enhancing our services, expertise, and technologies.',
    icon: ArrowUpCircle,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
  }
]

const ValuesSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const valuesRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const valueElements = valuesRef.current

    gsap.fromTo(
      heading,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )

    valueElements.forEach((value, index) => {
      gsap.fromTo(
        value,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: value,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-50 to-slate-100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            These principles guide everything we do and define who we are as a company.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div 
              key={value.id}
              ref={el => valuesRef.current[index] = el}
              className="bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className={`${value.bg} rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                <value.icon className={`h-8 w-8 ${value.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">{value.title}</h3>
              <p className="text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection
