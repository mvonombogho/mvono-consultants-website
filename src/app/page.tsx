"use client";

import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Stats from "@/components/home/Stats";
import Clients from "@/components/home/Clients";
import CTA from "@/components/home/CTA";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize animations
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from(".hero-title", { 
        opacity: 0, 
        y: 50, 
        duration: 1,
        ease: "power3.out"
      });
      
      gsap.from(".hero-subtitle", { 
        opacity: 0, 
        y: 30, 
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });
      
      gsap.from(".hero-cta", { 
        opacity: 0, 
        y: 20, 
        duration: 1,
        delay: 0.6,
        ease: "power3.out"
      });
      
      // Section animations triggered by scroll
      gsap.utils.toArray(".animate-section").forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
          }
        });
      });
    });
    
    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <About />
      <Stats />
      <Clients />
      <CTA />
    </div>
  );
}
