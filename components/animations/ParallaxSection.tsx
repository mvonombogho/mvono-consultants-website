"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // Parallax speed, higher = more movement
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.2,
  direction = 'up',
  className = ''
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !contentRef.current) return;
    
    // Calculate move direction and distance
    let xMove = 0;
    let yMove = 0;
    const moveDistance = 100 * speed;
    
    switch(direction) {
      case 'up':
        yMove = moveDistance;
        break;
      case 'down':
        yMove = -moveDistance;
        break;
      case 'left':
        xMove = moveDistance;
        break;
      case 'right':
        xMove = -moveDistance;
        break;
    }
    
    // Create the parallax effect
    gsap.fromTo(
      contentRef.current,
      { x: 0, y: 0 },
      {
        x: xMove,
        y: yMove,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
      }
    );
    
    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed, direction]);

  return (
    <div ref={sectionRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
