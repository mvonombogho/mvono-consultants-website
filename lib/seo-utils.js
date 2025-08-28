// Enhanced SEO utilities for blog posts
export function generateBlogPostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary || post.title,
    "image": post.coverImage ? [
      {
        "@type": "ImageObject",
        "url": post.coverImage,
        "width": 1200,
        "height": 630
      }
    ] : [],
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Mvono Consultants",
      "url": "https://www.mvonoconsultants.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mvono Consultants",
      "url": "https://www.mvonoconsultants.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mvonoconsultants.com/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.mvonoconsultants.com/blog/${post.slug?.current}`
    },
    "keywords": post.categories?.join(", "),
    "articleSection": post.categories?.[0] || "Safety Management",
    "wordCount": estimateWordCount(post.body),
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "about": [
      {
        "@type": "Thing",
        "name": "Safety Management",
        "sameAs": "https://en.wikipedia.org/wiki/Safety_management"
      },
      {
        "@type": "Thing", 
        "name": "Energy Management",
        "sameAs": "https://en.wikipedia.org/wiki/Energy_management"
      }
    ]
  };
}

export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.mvonoconsultants.com${item.path}`
    }))
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mvono Consultants",
    "url": "https://www.mvonoconsultants.com",
    "logo": "https://www.mvonoconsultants.com/logo.png",
    "description": "Leading safety, energy, and plant management consultants in Kenya since 2009",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Kenya",
      "addressLocality": "Nairobi"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254-720-270-694",
      "email": "sales@mvonoconsultants.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/mvono-consultants",
      "https://twitter.com/mvonoconsultants"
    ],
    "foundingDate": "2009",
    "numberOfEmployees": "10-50",
    "industry": "Safety and Environmental Consulting"
  };
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

function estimateWordCount(body) {
  if (!body) return 0;
  if (typeof body === 'string') {
    return body.split(/\s+/).length;
  }
  // For PortableText, estimate based on text blocks
  let wordCount = 0;
  if (Array.isArray(body)) {
    body.forEach(block => {
      if (block._type === 'block' && block.children) {
        block.children.forEach(child => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).length;
          }
        });
      }
    });
  }
  return wordCount;
}

export function generateKeywords(post, additionalKeywords = []) {
  const baseKeywords = [
    'safety management Kenya',
    'energy audit Nairobi',
    'environmental consulting',
    'plant management',
    'occupational safety',
    'fire safety audit',
    'DOSH compliance',
    'energy efficiency',
    'safety training',
    'environmental impact assessment'
  ];
  
  const categoryKeywords = post.categories?.map(cat => 
    `${cat.toLowerCase()} Kenya`
  ) || [];
  
  return [...baseKeywords, ...categoryKeywords, ...additionalKeywords].join(', ');
}

export function generateMetaDescription(post) {
  if (post.summary) {
    return post.summary.length > 160 
      ? post.summary.substring(0, 157) + '...'
      : post.summary;
  }
  
  return `Expert insights on ${post.categories?.[0]?.toLowerCase() || 'safety management'} from Mvono Consultants. Professional guidance for businesses in Kenya and East Africa.`;
}

export function generateCanonicalUrl(path) {
  return `https://www.mvonoconsultants.com${path}`;
}
