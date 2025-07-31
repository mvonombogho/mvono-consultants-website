'use client';

import Script from 'next/script';

/**
 * Enhanced Local Business Schema for Google My Business optimization
 */
export default function LocalBusinessSchema() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.mvonoconsultants.com/#organization",
    "name": "Mvono Consultants",
    "alternateName": "Mvono Consultants Kenya",
    "description": "Leading safety, energy, and plant management consultants in Kenya and East Africa. Specializing in DOSH compliance, environmental impact assessments, energy audits, and industrial safety solutions since 2009.",
    "url": "https://www.mvonoconsultants.com",
    "logo": "https://www.mvonoconsultants.com/images/logo.svg",
    "image": [
      "https://www.mvonoconsultants.com/images/homeImage1.png",
      "https://www.mvonoconsultants.com/images/homeImage2.png"
    ],
    "telephone": "+254701868849",
    "email": "sales@mvonoconsultants.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nairobi Office",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-1.286389",
      "longitude": "36.817223"
    },
    "openingHours": "Mo-Fr 08:00-17:00",
    "foundingDate": "2009",
    "founder": {
      "@type": "Person",
      "name": "Donald M Mbogho",
      "jobTitle": "Managing Director",
      "description": "Engineer with over 29 years of experience in plant management, statutory inspection, energy management, and safety advisory."
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Donald M Mbogho",
        "jobTitle": "Managing Director",
        "image": "https://www.mvonoconsultants.com/images/Donald.png"
      },
      {
        "@type": "Person",
        "name": "Israel Mbogho",
        "jobTitle": "Chief Operations Officer",
        "image": "https://www.mvonoconsultants.com/images/Mvono.png"
      }
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Kenya"
      },
      {
        "@type": "Country",
        "name": "Uganda"
      },
      {
        "@type": "Country",
        "name": "Tanzania"
      },
      {
        "@type": "Country",
        "name": "Rwanda"
      },
      {
        "@type": "Country",
        "name": "Ethiopia"
      },
      {
        "@type": "Country",
        "name": "Somaliland"
      }
    ],
    "serviceType": [
      "Environmental Impact Assessment",
      "Occupational Safety Consulting",
      "Fire Safety Audit",
      "Energy Audit",
      "Statutory Inspection",
      "Non-Destructive Testing",
      "Safety Training",
      "Energy Management"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Safety & Energy Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Environmental Impact Assessment",
            "description": "NEMA compliance and environmental consulting for businesses across Kenya"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Occupational Safety Audit",
            "description": "DOSH compliance and workplace safety management systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Energy Audit",
            "description": "Energy optimization and cost reduction for industrial facilities"
          }
        }
      ]
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Free Initial Consultation",
        "description": "Complimentary assessment of your safety and energy requirements",
        "price": "0",
        "priceCurrency": "KES"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "85",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Organization",
          "name": "Unga Group"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Exceptional safety consulting services. Mvono Consultants helped us achieve 100% DOSH compliance and significantly reduced our workplace incidents."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Organization",
          "name": "Tata Chemicals"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Outstanding energy audit services that helped us reduce energy costs by 25%. Professional team with deep industry expertise."
      }
    ],
    "knowsAbout": [
      "DOSH Compliance Kenya",
      "NEMA Environmental Assessment",
      "Industrial Safety Management",
      "Energy Efficiency Optimization",
      "Statutory Equipment Inspection",
      "Fire Safety Systems",
      "Occupational Health and Safety",
      "Manufacturing Safety",
      "Plant Management Systems"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Kenya Association of Manufacturers"
      },
      {
        "@type": "Organization",
        "name": "Institution of Engineers of Kenya"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/mvono-consultants",
      "https://twitter.com/mvonoconsultants",
      "https://www.facebook.com/mvonoconsultants"
    ],
    "potentialAction": [
      {
        "@type": "ContactAction",
        "target": "tel:+254701868849"
      },
      {
        "@type": "ContactAction",
        "target": "mailto:sales@mvonoconsultants.com"
      }
    ]
  };

  return (
    <Script 
      id="local-business-schema" 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  );
}