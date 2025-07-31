'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and in the browser
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Web Vitals tracking function
    function trackWebVital(metric) {
      // Log to console for now - you can later send to analytics
      console.log(`[Web Vital] ${metric.name}:`, metric.value);
      
      // Example: Send to Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', metric.name, {
          event_category: 'Web Vitals',
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_label: metric.id,
          non_interaction: true,
        });
      }
    }

    // Dynamically import web-vitals to avoid build issues
    try {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(trackWebVital);
        getFID(trackWebVital);
        getFCP(trackWebVital);
        getLCP(trackWebVital);
        getTTFB(trackWebVital);
      }).catch((error) => {
        console.warn('Web Vitals package not available:', error.message);
      });
    } catch (error) {
      console.warn('Web Vitals import failed:', error.message);
    }

    // Performance observer for custom metrics
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('[LCP] Largest Contentful Paint:', entry.startTime + 'ms');
              // Trigger warning if LCP > 2.5s
              if (entry.startTime > 2500) {
                console.warn('⚠️ LCP is slow. Consider optimizing largest content element.');
              }
            }
            if (entry.entryType === 'first-input') {
              const fid = entry.processingStart - entry.startTime;
              console.log('[FID] First Input Delay:', fid + 'ms');
              // Trigger warning if FID > 100ms
              if (fid > 100) {
                console.warn('⚠️ FID is slow. Consider reducing JavaScript execution time.');
              }
            }
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              console.log('[CLS] Cumulative Layout Shift:', entry.value);
              // Trigger warning if individual shift > 0.1
              if (entry.value > 0.1) {
                console.warn('⚠️ Large layout shift detected. Check image/content dimensions.');
              }
            }
          });
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        observer.observe({ type: 'first-input', buffered: true });
        observer.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // PerformanceObserver not supported
      }
    }

    // Resource loading optimization
    const criticalResources = [
      '/images/logo.svg',
      '/images/homeImage1.png'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'image';
      if (!document.querySelector(`link[href="${resource}"]`)) {
        document.head.appendChild(link);
      }
    });

    // Lazy load non-critical resources
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }, []);

  return null; // This component doesn't render anything
}

// Helper function to improve loading performance
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts with font-display: swap
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = function() {
    this.onload = null;
    this.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);

  // Preload critical above-the-fold images
  const criticalImages = [
    '/images/homeImage1.png',
    '/images/logo.svg',
    '/images/favicon.svg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

// Image optimization helper with responsive sizing
export function optimizeImage(src, width, height, quality = 75) {
  if (src.startsWith('/images/')) {
    return {
      src,
      width,
      height,
      quality,
      loading: 'lazy',
      placeholder: 'blur',
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
      sizes: `(max-width: 768px) ${Math.round(width * 0.8)}px, ${width}px`
    };
  }
  return { src, width, height, loading: 'lazy' };
}

// Core Web Vitals optimization utilities
export const webVitalsOptimizations = {
  // Improve LCP (Largest Contentful Paint)
  improveLCP: () => {
    // Preload LCP candidate elements
    const lcpCandidates = document.querySelectorAll('h1, .hero-image, [data-lcp]');
    lcpCandidates.forEach(element => {
      if (element.tagName === 'IMG') {
        element.loading = 'eager';
        element.fetchPriority = 'high';
      }
    });
  },

  // Improve FID (First Input Delay)
  improveFID: () => {
    // Defer non-critical JavaScript
    const scripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
    scripts.forEach(script => {
      if (!script.src.includes('critical')) {
        script.defer = true;
      }
    });
  },

  // Improve CLS (Cumulative Layout Shift)
  improveCLS: () => {
    // Add aspect ratios to images without dimensions
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      img.style.aspectRatio = 'auto';
      img.addEventListener('load', () => {
        img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
      });
    });

    // Reserve space for dynamic content
    const dynamicElements = document.querySelectorAll('[data-dynamic]');
    dynamicElements.forEach(element => {
      element.style.minHeight = element.dataset.minHeight || '100px';
    });
  }
};