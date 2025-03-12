"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Building, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      
      // Form animation
      gsap.from(formRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      });
      
      // Info animation
      gsap.from(infoRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
        },
      });
      
      // Contact cards animation
      gsap.from('.contact-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-cards',
          start: 'top 80%',
        },
      });
    }, pageRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={pageRef} className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div ref={headerRef} className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Have questions or need a consultation? Our team is ready to assist you with your safety, energy, and plant management needs.
          </p>
        </div>
      </div>
      
      {/* Contact Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="contact-cards grid md:grid-cols-3 gap-6 mb-16">
          {/* Email Card */}
          <div className="contact-card bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
            <a href="mailto:sales@mvonoconsultants.com" className="text-blue-600 hover:text-blue-800 transition-colors">
              sales@mvonoconsultants.com
            </a>
          </div>
          
          {/* Phone Card */}
          <div className="contact-card bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
            <a href="tel:+254720270694" className="text-blue-600 hover:text-blue-800 transition-colors">
              +254 720 270 694
            </a>
          </div>
          
          {/* Office Card */}
          <div className="contact-card bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Office</h3>
            <p className="text-gray-600">
              Nairobi, Kenya<br />
              Serving all counties and East Africa
            </p>
          </div>
        </div>
        
        {/* Contact Form and Info */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <form ref={formRef} className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Send Us a Message</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="First name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service of Interest</label>
                <select 
                  id="service" 
                  name="service" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="environmental-impact">Environmental Impact Assessment</option>
                  <option value="occupational-safety">Occupational Safety</option>
                  <option value="fire-safety">Fire Safety Audit</option>
                  <option value="energy-audit">Energy Audit</option>
                  <option value="statutory-inspection">Statutory Inspection</option>
                  <option value="non-destructive-testing">Non-Destructive Testing</option>
                  <option value="training">Training Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
          
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, specializing in the management of safety, energy, and plant systems.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday:</span>
                  <span className="text-gray-700">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday:</span>
                  <span className="text-gray-700">9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday:</span>
                  <span className="text-gray-700">Closed</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-full mr-4">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Company Registration</h3>
                  <p className="text-gray-600">Registered under Kenyan law as a professional consultancy firm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Response Time</h3>
                  <p className="text-gray-600">We typically respond to all inquiries within 24 hours during business days</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-900 text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Industries We Serve</h3>
              <div className="grid grid-cols-2 gap-2">
                <p>• Manufacturing</p>
                <p>• Construction</p>
                <p>• Oil and Gas</p>
                <p>• Mining</p>
                <p>• Food Processing</p>
                <p>• Pharmaceutical</p>
                <p>• Chemical</p>
                <p>• Hospitality</p>
                <p>• Healthcare</p>
                <p>• Education</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
