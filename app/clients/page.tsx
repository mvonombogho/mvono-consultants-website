"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, Building, Star, Quote } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  "All Industries",
  "Manufacturing",
  "Construction",
  "Oil and Gas",
  "Mining",
  "Food Processing",
  "Pharmaceutical",
  "Chemical",
  "Hospitality",
  "Healthcare",
  "Education"
];

const clients = [
  { name: "Lafarge", industry: "Manufacturing" },
  { name: "Alpine Coolers", industry: "Manufacturing" },
  { name: "KTDA", industry: "Food Processing" },
  { name: "Alloy Castings", industry: "Manufacturing" },
  { name: "Autosterile", industry: "Healthcare" },
  { name: "Autosprings", industry: "Manufacturing" },
  { name: "Unga Group", industry: "Food Processing" },
  { name: "Movenpick", industry: "Hospitality" },
  { name: "Dormans Coffee", industry: "Food Processing" },
  { name: "Husseini Builders", industry: "Construction" },
  { name: "Iberafrica", industry: "Oil and Gas" },
  { name: "Kamili", industry: "Manufacturing" },
  { name: "KCI", industry: "Education" },
  { name: "Limbua", industry: "Manufacturing" },
  { name: "Tata Chemicals", industry: "Chemical" },
  { name: "Melvin Tea", industry: "Food Processing" },
  { name: "Radisson Blu", industry: "Hospitality" },
  { name: "Rapid Kate", industry: "Construction" },
  { name: "Saint Gobain", industry: "Manufacturing" },
  { name: "SICPA", industry: "Manufacturing" },
  { name: "Wire Products", industry: "Manufacturing" },
  { name: "Welding Alloys", industry: "Manufacturing" },
  { name: "National Cement", industry: "Manufacturing" },
  { name: "Line Plast", industry: "Manufacturing" },
];

const testimonials = [
  {
    quote: "Mvono Consultants provided exceptional service for our fire safety audit. Their team's expertise and professionalism ensured our facility is fully compliant with all safety regulations.",
    author: "John Kamau",
    position: "Operations Manager",
    company: "Unga Group",
    rating: 5
  },
  {
    quote: "We've worked with Mvono for over 5 years on all our safety compliance needs. Their attention to detail and industry knowledge has been invaluable to our operations.",
    author: "Sarah Ochieng",
    position: "Facility Director",
    company: "Dormans Coffee",
    rating: 5
  },
  {
    quote: "The energy audit conducted by Mvono Consultants helped us identify significant cost-saving opportunities. Their recommendations have reduced our energy consumption by 22%.",
    author: "David Mwangi",
    position: "Chief Engineer",
    company: "Radisson Blu",
    rating: 5
  }
];

export default function ClientsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const clientsGridRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  // Filter clients based on industry and search term
  useEffect(() => {
    let results = clients;
    
    // Filter by industry
    if (selectedIndustry !== "All Industries") {
      results = results.filter(client => client.industry === selectedIndustry);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(client => 
        client.name.toLowerCase().includes(term) || 
        client.industry.toLowerCase().includes(term)
      );
    }
    
    setFilteredClients(results);
  }, [selectedIndustry, searchTerm]);
  
  // Animation effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      
      // Filter animation
      gsap.from(filterRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
      
      // Client cards animation
      // We'll animate these when they appear or are filtered
      // This initial animation will show them all
      animateClientCards();
      
      // Testimonials animation
      gsap.from('.testimonial-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 80%',
        },
      });
      
    }, pageRef);
    
    return () => ctx.revert();
  }, []);
  
  // Re-animate client cards when they are filtered
  useEffect(() => {
    animateClientCards();
  }, [filteredClients]);
  
  const animateClientCards = () => {
    gsap.fromTo(
      '.client-card',
      {
        scale: 0.9,
        opacity: 0,
        y: 20
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.2)',
        clearProps: 'all'
      }
    );
  };
  
  return (
    <div ref={pageRef} className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div ref={headerRef} className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Clients</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            We're proud to have worked with leading organizations across various industries in Kenya and East Africa.
          </p>
        </div>
      </div>
      
      {/* Filter Section */}
      <div ref={filterRef} className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="relative">
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>{industry}</option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-gray-600">
            Showing {filteredClients.length} of {clients.length} clients
          </div>
        </div>
      </div>
      
      {/* Clients Grid */}
      <div className="container mx-auto px-4 py-12">
        <div 
          ref={clientsGridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {filteredClients.map((client, index) => (
            <div 
              key={index}
              className="client-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mb-3">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-center font-medium text-gray-800">{client.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{client.industry}</p>
            </div>
          ))}
        </div>
        
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No clients found matching your criteria.</p>
            <button 
              onClick={() => {
                setSelectedIndustry("All Industries");
                setSearchTerm("");
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
      
      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500">What Our Clients Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear directly from our satisfied clients about their experience working with Mvono Consultants.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-white rounded-lg shadow-lg p-8 relative">
                {/* Quote icon */}
                <div className="absolute -top-5 -left-5 bg-blue-500 rounded-full p-3 text-white">
                  <Quote className="h-6 w-6" />
                </div>
                
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} fill={i < testimonial.rating ? "#FACC15" : "none"} />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                
                {/* Author */}
                <div>
                  <p className="font-semibold text-blue-900">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Become Our Next Success Story
            </Link>
          </div>
        </div>
      </div>
      
      {/* Industry Coverage */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            <span className="inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500">Industry Coverage</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our specialized services cater to diverse industries across Kenya and East Africa.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industries.filter(industry => industry !== "All Industries").map((industry, index) => {
            const count = clients.filter(client => client.industry === industry).length;
            return (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{industry}</h3>
                <p className="text-gray-500">{count} client{count !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
