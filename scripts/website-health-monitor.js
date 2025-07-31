/**
 * Website Health Monitoring Script for Mvono Consultants
 * Run this script periodically to check website health and SEO status
 */

const siteUrl = 'https://www.mvonoconsultants.com';

const healthChecks = {
  // Basic Accessibility Checks
  sitemap: `${siteUrl}/sitemap.xml`,
  robots: `${siteUrl}/robots.txt`,
  homepage: `${siteUrl}`,
  
  // Page Checks
  pages: [
    `${siteUrl}/`,
    `${siteUrl}/services`,
    `${siteUrl}/about`,
    `${siteUrl}/contact`
  ],
  
  // Resource Checks
  resources: [
    `${siteUrl}/images/logo.svg`,
    `${siteUrl}/images/og/home-og.svg`,
    `${siteUrl}/images/og/services-og.svg`,
    `${siteUrl}/images/og/about-og.svg`,
    `${siteUrl}/images/og/contact-og.svg`
  ]
};

// Website Health Check Function (for browser console)
async function runHealthCheck() {
  console.log('🔍 Starting Mvono Consultants Website Health Check...\n');
  
  const results = {
    passed: 0,
    failed: 0,
    warnings: 0
  };
  
  // Check Sitemap
  try {
    const sitemapResponse = await fetch(healthChecks.sitemap);
    if (sitemapResponse.ok) {
      console.log('✅ Sitemap accessible');
      results.passed++;
    } else {
      console.log('❌ Sitemap not accessible');
      results.failed++;
    }
  } catch (error) {
    console.log('❌ Sitemap check failed:', error.message);
    results.failed++;
  }
  
  // Check Robots.txt
  try {
    const robotsResponse = await fetch(healthChecks.robots);
    if (robotsResponse.ok) {
      console.log('✅ Robots.txt accessible');
      results.passed++;
    } else {
      console.log('❌ Robots.txt not accessible');
      results.failed++;
    }
  } catch (error) {
    console.log('❌ Robots.txt check failed:', error.message);
    results.failed++;
  }
  
  // Check Google Analytics
  if (typeof gtag !== 'undefined') {
    console.log('✅ Google Analytics loaded');
    results.passed++;
  } else {
    console.log('⚠️ Google Analytics not detected');
    results.warnings++;
  }
  
  // Check Schema Markup (basic check)
  const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
  if (schemaScripts.length > 0) {
    console.log(`✅ Schema markup found (${schemaScripts.length} schemas)`);
    results.passed++;
    
    // Validate each schema
    schemaScripts.forEach((script, index) => {
      try {
        JSON.parse(script.textContent);
        console.log(`  ✅ Schema ${index + 1} valid JSON`);
      } catch (error) {
        console.log(`  ❌ Schema ${index + 1} invalid JSON:`, error.message);
        results.failed++;
      }
    });
  } else {
    console.log('❌ No schema markup found');
    results.failed++;
  }
  
  // Check Meta Tags
  const metaChecks = [
    { selector: 'meta[name="description"]', name: 'Meta Description' },
    { selector: 'meta[property="og:title"]', name: 'OG Title' },
    { selector: 'meta[property="og:description"]', name: 'OG Description' },
    { selector: 'meta[property="og:image"]', name: 'OG Image' },
    { selector: 'meta[name="twitter:card"]', name: 'Twitter Card' }
  ];
  
  metaChecks.forEach(check => {
    const element = document.querySelector(check.selector);
    if (element && element.content) {
      console.log(`✅ ${check.name} present`);
      results.passed++;
    } else {
      console.log(`❌ ${check.name} missing`);
      results.failed++;
    }
  });
  
  // Performance Check
  if ('performance' in window && 'timing' in performance) {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    
    if (loadTime < 3000) {
      console.log(`✅ Page load time: ${loadTime}ms (Good)`);
      results.passed++;
    } else if (loadTime < 5000) {
      console.log(`⚠️ Page load time: ${loadTime}ms (Acceptable)`);
      results.warnings++;
    } else {
      console.log(`❌ Page load time: ${loadTime}ms (Slow)`);
      results.failed++;
    }
  }
  
  // Summary
  console.log('\n📊 Health Check Summary:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`⚠️ Warnings: ${results.warnings}`);
  console.log(`❌ Failed: ${results.failed}`);
  
  const total = results.passed + results.warnings + results.failed;
  const score = ((results.passed + (results.warnings * 0.5)) / total * 100).toFixed(1);
  console.log(`🎯 Overall Score: ${score}%`);
  
  if (score >= 90) {
    console.log('🏆 Excellent website health!');
  } else if (score >= 75) {
    console.log('👍 Good website health');
  } else if (score >= 60) {
    console.log('⚠️ Website health needs improvement');
  } else {
    console.log('🚨 Critical website health issues');
  }
  
  return results;
}

// SEO Checklist Function
function displaySEOChecklist() {
  console.log(`
🎯 MVONO CONSULTANTS SEO CHECKLIST
==================================

Phase 1 - Technical SEO ✅
✅ Google Analytics (G-MVNC2024KE)
✅ Schema markup (Organization, Services, FAQ)
✅ Open Graph images
✅ Sitemap.xml
✅ Robots.txt
✅ Meta tags optimization

Phase 2 - Search Console & Monitoring 🔄
☐ Google Search Console verification
☐ Submit sitemap to Search Console  
☐ Google Business Profile setup
☐ Local directory listings
☐ Performance monitoring setup
☐ Keyword ranking tracking

Phase 3 - Content & Authority 📋
☐ Blog content creation
☐ Industry-specific landing pages
☐ Client case studies
☐ Local SEO content
☐ Link building campaign
☐ Review management strategy

Current Focus: Phase 2 Implementation
Next Steps: 
1. Verify Google Search Console
2. Set up Google Business Profile  
3. Configure performance monitoring
4. Start keyword tracking

Run runHealthCheck() to test current website status.
  `);
}

// Auto-run checklist on script load
if (typeof window !== 'undefined') {
  console.log('🚀 Mvono Consultants SEO Monitoring Script Loaded');
  console.log('💡 Run runHealthCheck() to check website health');
  console.log('📋 Run displaySEOChecklist() to see implementation status');
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    runHealthCheck,
    displaySEOChecklist,
    healthChecks
  };
}