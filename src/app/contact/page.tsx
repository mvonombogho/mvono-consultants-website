"use client";

import { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { gsap } from "gsap";

export default function ContactPage() {
  useEffect(() => {
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
      
      // Contact form animations
      gsap.from(".contact-form", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
      });
      
      // Contact info animations
      gsap.from(".contact-info", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
      });
    });
    
    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div>
      <PageHeader 
        title="Contact Us" 
        description="Reach out to our expert consultants for all your safety, energy, and plant management needs."
        backgroundImage="/images/contact-header.jpg"
      />
      <div className="container-custom py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="contact-form">
          <ContactForm />
        </div>
        <div className="contact-info">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
