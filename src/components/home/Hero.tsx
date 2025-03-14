"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const hero = heroRef.current;
    const background = backgroundRef.current;
    
    if (hero && background) {
      // Create a timeline for hero animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      // Animate the background
      tl.fromTo(background, 
        { scale: 1.1, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.5 }, 
        0
      );
      
      // Animate the text elements
      tl.fromTo("h1.hero-title", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        0.3
      );
      
      tl.fromTo(".hero-subtitle", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        0.5
      );
      
      tl.fromTo(".hero-cta", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        0.7
      );
    }
    
    // Clean up
    return () => {
      // No need to cleanup gsap animations as they complete on their own
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero.jpg')", // Add your hero image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white">
        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 max-w-3xl">
          Expert Safety, Energy & Plant Management Solutions
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl max-w-2xl mb-8">
          Providing comprehensive consultancy services to ensure your operations are safe, efficient, and compliant.
        </p>
        <div className="hero-cta flex flex-wrap gap-4">
          <Link href="/contact" className="btn-primary text-lg py-3 px-8">
            Get a Consultation
          </Link>
          <Link href="/services" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg py-3 px-8">
            Our Services
          </Link>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
