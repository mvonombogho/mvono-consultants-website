"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 20,
  colors = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#10B981'],
  minSize = 5,
  maxSize = 20,
  speed = 20,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing elements
    containerRef.current.innerHTML = '';
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create floating elements
    for (let i = 0; i < count; i++) {
      const element = document.createElement('div');
      
      // Random properties
      const size = Math.random() * (maxSize - minSize) + minSize;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * containerWidth;
      const startY = Math.random() * containerHeight;
      const duration = (Math.random() * speed) + 10;
      const delay = Math.random() * 5;
      
      // Set element style
      element.style.position = 'absolute';
      element.style.borderRadius = '50%';
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.backgroundColor = color;
      element.style.opacity = '0.2';
      element.style.left = `${startX}px`;
      element.style.top = `${startY}px`;
      
      // Add to container
      container.appendChild(element);
      
      // Animate with GSAP
      gsap.to(element, {
        x: '+=' + (Math.random() * 200 - 100),
        y: '+=' + (Math.random() * 200 - 100),
        opacity: Math.random() * 0.3 + 0.1,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    
    return () => {
      // Clean up animations when component unmounts
      gsap.killTweensOf(container.children);
    };
  }, [count, colors, minSize, maxSize, speed]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}></div>
  );
};

export default FloatingElements;
