'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  })
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setFormStatus('success')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('idle')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        })
      }, 3000)
    }, 1500)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Animate contact content
      gsap.fromTo(
        '.contact-content',
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
      
      // Animate form with slight delay
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        }
      )
      
      // Animate form fields with stagger
      gsap.fromTo(
        '.form-field',
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: 'power2.out',
        }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="contact-section py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to improve your safety standards and optimize energy efficiency? Contact us today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-content">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Phone</h4>
                    <a 
                      href="tel:+254720270694"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      +254 720 270 694
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <FaEnvelope className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                    <a 
                      href="mailto:sales@mvonoconsultants.com"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      sales@mvonoconsultants.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <FaMapMarkerAlt className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Location</h4>
                    <p className="text-gray-600">
<<<<<<< HEAD
                      Kiserian, Kajiado
=======
                      Nairobi, Kenya
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium text-gray-800 mb-4">Business Hours</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:30 AM - 5:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="contact-form">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-field">
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-field">
                    <label className="block text-gray-700 mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="block text-gray-700 mb-2" htmlFor="company">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6 form-field">
                  <label className="block text-gray-700 mb-2" htmlFor="service">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a service</option>
                    <option value="environmental-impact-assessment">Environmental Impact Assessment</option>
                    <option value="occupational-safety">Occupational Safety</option>
                    <option value="fire-safety-audit">Fire Safety Audit</option>
                    <option value="energy-audit">Energy Audit</option>
                    <option value="statutory-inspection">Statutory Inspection</option>
                    <option value="non-destructive-testing">Non-Destructive Testing</option>
                    <option value="fire-safety-training">Fire Safety Training</option>
                    <option value="first-aider-training">First Aider Training</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6 form-field">
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  ></textarea>
                </div>
                
                <div className="form-field">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-3 px-6 rounded-md text-white font-medium transition-all ${
                      formStatus === 'submitting'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg'
                    }`}
                  >
                    {formStatus === 'submitting'
                      ? 'Sending...'
                      : formStatus === 'success'
                      ? 'Message Sent!'
                      : 'Send Message'}
                  </button>
                  
                  {formStatus === 'success' && (
                    <p className="mt-4 text-green-600 text-center">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  )}
                  
                  {formStatus === 'error' && (
                    <p className="mt-4 text-red-600 text-center">
                      There was an error sending your message. Please try again.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
