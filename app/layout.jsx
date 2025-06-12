import './globals.css'
import { Inter } from 'next/font/google'
import { ToastProvider } from '../components/ui/toast.jsx'
import Script from 'next/script'

// Load Inter font
const inter = Inter({ subsets: ['latin'] })

// Simple metadata - no favicon references
export const metadata = {
  title: 'Mvono Consultants',
  description: 'Safety, Energy & Plant Management Experts'
}

export default function RootLayout({ children }) {
  // Get Google Analytics ID from environment variables
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || 'G-MVNC2024KE';
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://www.mvonoconsultants.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          {children}
        </ToastProvider>
        
        {/* Google Analytics 4 with Environment Variable */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
        <Script id="organization-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
              "name": "Mvono Consultants",
              "url": "https://www.mvonoconsultants.com",
              "logo": "https://www.mvonoconsultants.com/images/logo.png",
              "description": "Mvono Consultants is a wholly Kenyan owned consultancy firm specializing in the management of safety, energy, and plant systems since 2009.",
              "founder": {
                "@type": "Person",
                "name": "Donald M Mbogho"
              },
              "foundingDate": "2009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressRegion": "Nairobi County",
                "addressCountry": "Kenya"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-1.2864",
                "longitude": "36.8172"
              },
              "openingHours": "Mo,Tu,We,Th,Fr 08:00-17:00",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "telephone": "+254 720 270 694",
                "email": "sales@mvonoconsultants.com"
              },
              "sameAs": [
                "https://www.linkedin.com/company/mvono-consultants",
                "https://www.facebook.com/mvonoconsultants"
              ],
              "priceRange": "$$",
              "areaServed": ["Kenya", "Uganda", "Tanzania", "Rwanda", "Burundi", "South Sudan"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Mvono Consultants Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Environmental Impact Assessment",
                      "description": "Comprehensive assessment of environmental impacts of projects and activities."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Occupational Safety",
                      "description": "Assessment and implementation of workplace safety measures."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Fire Safety Audit",
                      "description": "Thorough audit of fire safety systems and protocols."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Energy Audit",
                      "description": "Analysis of energy consumption and efficiency recommendations."
                    }
                  }
                ]
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}
