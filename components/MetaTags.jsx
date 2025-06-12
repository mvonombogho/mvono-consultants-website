import Head from 'next/head';

/**
 * Meta Tags Component for SEO optimization
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Comma separated keywords
 * @param {string} props.ogImage - Open Graph image URL (optional - will generate dynamic if not provided)
 * @param {string} props.ogType - Open Graph type
 * @param {string} props.canonicalUrl - Canonical URL
 * @param {string} props.page - Page identifier for dynamic OG image generation
 * @returns {JSX.Element} Meta Tags Component
 */
const MetaTags = ({
  title = 'Mvono Consultants | Safety, Energy & Plant Systems Management',
  description = 'Mvono Consultants is a wholly Kenyan owned consultancy firm specializing in the management of safety, energy, and plant systems since 2009.',
  keywords = 'occupational safety consulting, energy audit, environmental impact assessment, fire safety audit, statutory inspection, plant inspection',
  ogImage,
  ogType = 'website',
  canonicalUrl = 'https://www.mvonoconsultants.com',
  page = 'home'
}) => {
  // Construct the full title with brand name if not already included
  const fullTitle = title.includes('Mvono Consultants') 
    ? title 
    : `${title} | Mvono Consultants`;

  // Generate dynamic OG image URL if not provided
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mvonoconsultants.com';
  const ogImageBaseUrl = process.env.NEXT_PUBLIC_OG_IMAGE_BASE_URL || `${baseUrl}/api/og`;
  
  const dynamicOgImage = ogImage || 
    `${ogImageBaseUrl}?page=${page}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
  
  const fullOgImageUrl = dynamicOgImage.startsWith('http') 
    ? dynamicOgImage 
    : `${baseUrl}${dynamicOgImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags for Social Media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Mvono Consultants" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Mvono Consultants" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  );
};

export default MetaTags;