import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade in animation
export const fadeIn = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
};

// Fade in from left animation
export const fadeInLeft = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
};

// Fade in from right animation
export const fadeInRight = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
};

// Staggered fade in animation for multiple elements
export const staggerFadeIn = (elements, delay = 0, duration = 0.5, staggerAmount = 0.1) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerAmount,
      delay,
      ease: 'power2.out',
    }
  );
};

// Scroll trigger fade in animation
export const scrollTriggerFadeIn = (element, triggerElement, start = 'top 70%', delay = 0, duration = 0.5) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerElement,
        start,
      },
    }
  );
};

// Scale in animation
export const scaleIn = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

// Clean up all ScrollTrigger instances
export const cleanupScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
};
