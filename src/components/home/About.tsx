"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const section = sectionRef.current;
    
    if (section) {
      // Create animations triggered by scrolling
      gsap.from(".about-image", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
      
      gsap.from(".about-content", {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20" id="about">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-image relative">
            <div className="bg-primary absolute -left-5 -top-5 w-24 h-24 z-0 rounded-lg"></div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              {/* Replace with actual image */}
              <div className="aspect-w-4 aspect-h-3 bg-neutral-200 w-full">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/about.jpg')" }}></div>
              </div>
            </div>
            <div className="bg-accent absolute -right-5 -bottom-5 w-24 h-24 z-0 rounded-lg"></div>
          </div>
          
          <div className="about-content">
            <h2 className="section-title mb-6">About Mvono Consultants</h2>
            <p className="text-lg text-neutral-700 mb-6">
              Mvono Consultants is a wholly Kenyan owned consultancy firm established in 2009, specializing in the management of safety, energy, and plant systems.
            </p>
            <p className="text-lg text-neutral-700 mb-6">
              The business is managed by Engineer Donald M Mbogho who has over 29 years of experience in plant management, statutory inspection (pressure vessels, lifting equipment, refrigeration plant), energy management, and safety advisory.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Expert Industry Knowledge</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Customized Solutions</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Regulatory Compliance</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Dedicated Support</span>
              </div>
            </div>
            <Link href="/about" className="btn-primary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
