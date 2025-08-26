export const dynamic = 'force-dynamic';
// Fixed OG API with proper XML syntax and your actual logo
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'home';
  const title = searchParams.get('title') || 'Mvono Consultants';
  const description = searchParams.get('description') || 'Safety, Energy & Plant Management Experts';
  
  // Define page-specific content
  const pageContent = {
    home: {
      colors: { primary: '#1e40af', secondary: '#3b82f6' },
      mainTitle: 'MVONO CONSULTANTS',
      subtitle: 'Safety, Energy & Plant Management Experts',
      description: 'Serving Kenya & East Africa Since 2009'
    },
    services: {
      colors: { primary: '#059669', secondary: '#10b981' },
      mainTitle: 'OUR SERVICES',
      subtitle: 'Expert Solutions Across East Africa',
      description: '8 Core Service Areas • 1000+ Projects • 100% Compliance'
    },
    about: {
      colors: { primary: '#7c3aed', secondary: '#a855f7' },
      mainTitle: 'ABOUT MVONO CONSULTANTS',
      subtitle: 'Led by Engineer Donald M Mbogho',
      description: 'Since 2009 • 29+ Years Experience • East Africa Leader'
    },
    contact: {
      colors: { primary: '#dc2626', secondary: '#ef4444' },
      mainTitle: 'CONTACT US',
      subtitle: 'Get Expert Consultation Today',
      description: '+254 720 270 694 • sales@mvonoconsultants.com'
    }
  };
  
  const content = pageContent[page] || pageContent.home;
  const colors = content.colors;
  
  const svgContent = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
    
    <pattern id="dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <circle cx="25" cy="25" r="2" fill="rgba(255,255,255,0.1)"/>
    </pattern>
  </defs>
  
  <!-- Main gradient background -->
  <rect width="1200" height="630" fill="url(#grad)"/>
  
  <!-- Background pattern -->
  <rect width="1200" height="630" fill="url(#dots)"/>
  
  <!-- Your Mvono logo background -->
  <rect x="60" y="60" width="90" height="90" rx="25" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
  
  <!-- Simplified version of your M logo from the SVG -->
  <g transform="translate(75, 75) scale(0.8)">
    <!-- Main M shape (simplified from your logo paths) -->
    <path d="M 10 10 L 25 10 L 35 35 L 45 10 L 60 10 L 60 60 L 50 60 L 50 25 L 42 45 L 28 45 L 20 25 L 20 60 L 10 60 Z" fill="white" opacity="0.95"/>
    <!-- Orange accent (your brand color) -->
    <rect x="15" y="65" width="35" height="4" rx="2" fill="#f15a27"/>
  </g>
  
  <!-- Company name positioned next to logo -->
  <text x="170" y="90" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">MVONO</text>
  <text x="170" y="115" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.9)">CONSULTANTS</text>
  
  <!-- Main title -->
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">${content.mainTitle}</text>
  
  <!-- Subtitle -->
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle">${content.subtitle}</text>
  
  <!-- Description -->
  <text x="600" y="400" font-family="Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.9)" text-anchor="middle">${content.description}</text>
  
  <!-- Website URL badge -->
  <rect x="930" y="540" width="220" height="50" rx="25" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <text x="1040" y="570" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">www.mvonoconsultants.com</text>
  
  <!-- Quality badge -->
  <rect x="1010" y="60" width="140" height="80" rx="20" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <text x="1080" y="85" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">⭐</text>
  <text x="1080" y="110" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Est. 2009</text>
  <text x="1080" y="130" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.8)" text-anchor="middle">29+ Years Experience</text>
</svg>`;
  
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}