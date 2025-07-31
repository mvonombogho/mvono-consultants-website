"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StatCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!counterRef.current) return;
    
    // Set up scroll trigger to start animation when element is in view
    ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (!hasAnimated.current) {
          // Animate the counter
          gsap.to({
            val: 0
          }, {
            val: value,
            duration: duration,
            delay: delay,
            ease: 'power2.out',
            onUpdate: function() {
              setDisplayValue(Math.round(this.targets()[0].val));
            }
          });
          
          hasAnimated.current = true;
        }
      },
    });
    
    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [value, duration, delay]);

  return (
    <div ref={counterRef} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </div>
  );
};

export default StatCounter;
