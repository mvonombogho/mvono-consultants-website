"use client";

import { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import ServicesList from "@/components/services/ServicesList";
import ServiceProcess from "@/components/services/ServiceProcess";
import Testimonials from "@/components/common/Testimonials";
import CTA from "@/components/home/CTA";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesPage() {
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
      
      // Services list animations
      gsap.utils.toArray(".service-card").forEach((card: any, index: number) => {
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
        title="Our Services" 
        description="Comprehensive safety, energy, and plant management solutions tailored to your industry needs."
        backgroundImage="/images/services-header.jpg"
      />
      <ServicesList />
      <ServiceProcess />
      <Testimonials />
      <CTA />
    </div>
  );
}
