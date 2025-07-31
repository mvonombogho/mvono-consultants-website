/**
 * Enhanced Blog SEO Metadata Generator
 * Creates comprehensive SEO metadata for blog posts
 */

import { getBreadcrumbSchema } from '../utils/schemaGenerator';

export const generateBlogPostSchema = (post) => {
  const baseUrl = 'https://www.mvonoconsultants.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.summary || post.excerpt,
    'image': post.coverImage ? [post.coverImage] : [`${baseUrl}/images/logo.svg`],
    'datePublished': post.publishedAt,
    'dateModified': post.publishedAt,
    'author': {
      '@type': 'Person',
      'name': post.author?.name || 'Mvono Consultants Expert Team'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Mvono Consultants',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/images/logo.svg`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug.current}`
    },
    'articleSection': post.categories ? post.categories.join(', ') : 'Safety and Energy Management',
    'keywords': generateBlogKeywords(post),
    'about': generateAboutEntities(post),
    'mentions': generateMentionedEntities(post)
  };
};

export const generateBlogListingSchema = (posts) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Mvono Consultants Safety & Energy Insights',
    'description': 'Expert insights on safety management, energy efficiency, environmental compliance, and regulatory updates for businesses in Kenya and East Africa.',
    'url': 'https://www.mvonoconsultants.com/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'Mvono Consultants'
    },
    'blogPost': posts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'url': `https://www.mvonoconsultants.com/blog/${post.slug.current}`,
      'datePublished': post.publishedAt,
      'author': {
        '@type': 'Person',
        'name': post.author?.name || 'Mvono Consultants Expert Team'
      }
    }))
  };
};

// Helper function to generate relevant keywords based on content
const generateBlogKeywords = (post) => {
  const baseKeywords = [
    'safety consulting Kenya',
    'energy management',
    'environmental compliance',
    'DOSH regulations',
    'occupational safety'
  ];
  
  // Add category-specific keywords
  const categoryKeywords = {
    'Safety Management': ['workplace safety', 'safety audit', 'risk assessment', 'safety training'],
    'Energy Efficiency': ['energy audit', 'cost reduction', 'sustainable energy', 'power management'],
    'Environmental Compliance': ['NEMA compliance', 'environmental impact', 'EIA process', 'environmental management'],
    'Fire Safety': ['fire safety audit', 'fire prevention', 'emergency response', 'fire training'],
    'Training & Certification': ['safety training', 'certification programs', 'skills development', 'professional training'],
    'Regulatory Updates': ['DOSH updates', 'regulatory compliance', 'safety regulations', 'compliance requirements']
  };
  
  let keywords = [...baseKeywords];
  
  if (post.categories) {
    post.categories.forEach(category => {
      if (categoryKeywords[category]) {
        keywords = [...keywords, ...categoryKeywords[category]];
      }
    });
  }
  
  return keywords.join(', ');
};

// Generate structured data for entities mentioned in the post
const generateAboutEntities = (post) => {
  const aboutEntities = [];
  
  // Add category-based entities
  if (post.categories?.includes('Safety Management')) {
    aboutEntities.push({
      '@type': 'Thing',
      'name': 'Occupational Safety and Health',
      'description': 'Workplace safety management and regulatory compliance'
    });
  }
  
  if (post.categories?.includes('Energy Efficiency')) {
    aboutEntities.push({
      '@type': 'Thing',
      'name': 'Energy Management',
      'description': 'Energy efficiency optimization and cost reduction strategies'
    });
  }
  
  if (post.categories?.includes('Environmental Compliance')) {
    aboutEntities.push({
      '@type': 'Thing',
      'name': 'Environmental Impact Assessment',
      'description': 'Environmental compliance and impact assessment services'
    });
  }
  
  return aboutEntities;
};

// Generate mentions for organizations and locations
const generateMentionedEntities = (post) => {
  const mentions = [
    {
      '@type': 'Organization',
      'name': 'Directorate of Occupational Safety and Health Services (DOSH)',
      'description': 'Kenya government regulatory body for workplace safety'
    },
    {
      '@type': 'Organization',
      'name': 'National Environment Management Authority (NEMA)',
      'description': 'Kenya environmental regulatory authority'
    },
    {
      '@type': 'Place',
      'name': 'Kenya',
      'description': 'Primary service area for Mvono Consultants'
    },
    {
      '@type': 'Place',
      'name': 'East Africa',
      'description': 'Regional service coverage area'
    }
  ];
  
  return mentions;
};

// Enhanced meta tags for blog posts
export const generateBlogMetaTags = (post) => {
  const baseUrl = 'https://www.mvonoconsultants.com';
  
  return {
    title: `${post.title} | Mvono Consultants Safety & Energy Insights`,
    description: post.summary || `Expert insights on ${post.title} from Mvono Consultants - Kenya's leading safety and energy management specialists.`,
    keywords: generateBlogKeywords(post),
    canonical: `${baseUrl}/blog/${post.slug.current}`,
    openGraph: {
      title: `${post.title} | Mvono Consultants`,
      description: post.summary || `Professional insights on ${post.title}`,
      image: post.coverImage || `${baseUrl}/images/og/blog-og.svg`,
      url: `${baseUrl}/blog/${post.slug.current}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [post.author?.name || 'Mvono Consultants Expert Team'],
      section: post.categories ? post.categories[0] : 'Safety & Energy Management',
      tags: post.categories || ['Safety Management', 'Energy Efficiency']
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Mvono Consultants`,
      description: post.summary || `Expert insights on ${post.title}`,
      image: post.coverImage || `${baseUrl}/images/og/blog-og.svg`,
      creator: '@MvonoConsultants'
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug.current}`
    }
  };
};