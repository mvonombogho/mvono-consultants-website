"use client";

import { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import CompanyHistory from "@/components/about/CompanyHistory";
import CoreValues from "@/components/about/CoreValues";
import Team from "@/components/about/Team";
import CTA from "@/components/home/CTA";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPage() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize animations
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(".page-header h1", { 
        opacity: 0, 
        y: 30, 
        duration: 0.8,
        ease: "power3.out"
      });
      
      gsap.from(".page-header p", { 
        opacity: 0, 
        y: 20, 
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });
      
      // About content animations
      gsap.utils.toArray(".animate-section").forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });
      
      // Core values animations
      gsap.utils.toArray(".core-value-card").forEach((card: any, index: number) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });
    });
    
    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div>
      <PageHeader 
        title="About Mvono Consultants" 
        description="Delivering expert safety, energy, and plant management services since 2009."
        backgroundImage="/images/about-header.jpg"
      />
      <CompanyHistory />
      <CoreValues />
      <Team />
      <CTA />
    </div>
  );
}
