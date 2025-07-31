/**
 * Utility functions to generate structured data for Mvono Consultants website
 */

/**
 * Generate Organization schema
 * @returns {Object} Organization schema object
 */
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    'name': 'Mvono Consultants',
    'url': 'https://www.mvonoconsultants.com',
    'logo': 'https://www.mvonoconsultants.com/images/logo.png',
    'description': 'Mvono Consultants is a wholly Kenyan owned consultancy firm specializing in the management of safety, energy, and plant systems since 2009.',
    'founder': {
      '@type': 'Person',
      'name': 'Donald M Mbogho'
    },
    'foundingDate': '2009',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Nairobi',
      'addressRegion': 'Nairobi County',
      'addressCountry': 'Kenya'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '-1.2864',
      'longitude': '36.8172'
    },
    'openingHours': 'Mo,Tu,We,Th,Fr 08:00-17:00',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'telephone': '+254 720 270 694',
      'email': 'sales@mvonoconsultants.com'
    },
    'sameAs': [
      'https://www.linkedin.com/company/mvono-consultants',
      'https://www.facebook.com/mvonoconsultants'
    ],
    'priceRange': '$$$'
  };
};

/**
 * Generate WebSite schema
 * @returns {Object} WebSite schema object
 */
export const getWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': 'https://www.mvonoconsultants.com',
    'name': 'Mvono Consultants',
    'description': 'Mvono Consultants is a wholly Kenyan owned consultancy firm specializing in the management of safety, energy, and plant systems since 2009.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://www.mvonoconsultants.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

/**
 * Generate BreadcrumbList schema
 * @param {Array} items - Array of breadcrumb items
 * @returns {Object} BreadcrumbList schema object
 */
export const getBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://www.mvonoconsultants.com${item.path}`
    }))
  };
};

/**
 * Generate Service schema
 * @param {Object} service - Service data
 * @returns {Object} Service schema object
 */
export const getServiceSchema = (service) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.title,
    'description': service.description,
    'provider': {
      '@type': 'Organization',
      'name': 'Mvono Consultants',
      'url': 'https://www.mvonoconsultants.com'
    },
    'serviceType': service.title,
    'areaServed': ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi', 'South Sudan'],
    'url': `https://www.mvonoconsultants.com/services#${service.id}`
  };
};

/**
 * Generate FAQPage schema
 * @param {Array} faqs - Array of FAQ items
 * @returns {Object} FAQPage schema object
 */
export const getFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
};

/**
 * Generate ContactPage schema
 * @returns {Object} ContactPage schema object
 */
export const getContactPageSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact Mvono Consultants',
    'description': 'Contact Mvono Consultants, a leading safety, energy, and plant management firm in Kenya. Get in touch with our team of experts today.',
    'url': 'https://www.mvonoconsultants.com/contact',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Mvono Consultants',
      'telephone': '+254 720 270 694',
      'email': 'sales@mvonoconsultants.com',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Nairobi',
        'addressRegion': 'Nairobi County',
        'addressCountry': 'Kenya'
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '08:00',
          'closes': '17:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Saturday'],
          'opens': '09:00',
          'closes': '13:00'
        }
      ]
    }
  };
};

/**
 * Generate AboutPage schema
 * @returns {Object} AboutPage schema object
 */
export const getAboutPageSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About Mvono Consultants',
    'description': 'Learn about Mvono Consultants, a wholly Kenyan owned consultancy firm established in 2009, specializing in safety, energy, and plant systems management.',
    'url': 'https://www.mvonoconsultants.com/about',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Mvono Consultants',
      'foundingDate': '2009',
      'founders': [
        {
          '@type': 'Person',
          'name': 'Donald M Mbogho',
          'jobTitle': 'Managing Director'
        }
      ],
      'employees': [
        {
          '@type': 'Person',
          'name': 'Donald M Mbogho',
          'jobTitle': 'Managing Director'
        },
        {
          '@type': 'Person',
          'name': 'Israel Mbogho',
          'jobTitle': 'Chief Operations Officer'
        }
      ]
    }
  };
};

/**
 * Generate JobPosting schema
 * @param {Object} job - Job data
 * @returns {Object} JobPosting schema object
 */
export const getJobPostingSchema = (job) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': job.title,
    'description': job.description,
    'datePosted': job.datePosted,
    'validThrough': job.validThrough,
    'employmentType': job.employmentType,
    'hiringOrganization': {
      '@type': 'Organization',
      'name': 'Mvono Consultants',
      'sameAs': 'https://www.mvonoconsultants.com',
      'logo': 'https://www.mvonoconsultants.com/images/logo.png'
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Nairobi',
        'addressRegion': 'Nairobi County',
        'addressCountry': 'Kenya'
      }
    },
    'baseSalary': job.baseSalary ? {
      '@type': 'MonetaryAmount',
      'currency': 'KES',
      'value': {
        '@type': 'QuantitativeValue',
        'value': job.baseSalary.value,
        'unitText': job.baseSalary.unitText
      }
    } : undefined,
    'skills': job.skills,
    'qualifications': job.qualifications,
    'educationRequirements': job.educationRequirements,
    'experienceRequirements': job.experienceRequirements
  };
};
