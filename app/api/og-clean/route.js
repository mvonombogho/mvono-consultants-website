// Clean, working OG images with your Mvono logo - guaranteed to work
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'home';
  
  // Page-specific colors and content
  const pageData = {
    home: { 
      color1: '#1e40af', color2: '#3b82f6', 
      title: 'MVONO CONSULTANTS',
      subtitle: 'Safety, Energy & Plant Management Experts',
      desc: 'Serving Kenya & East Africa Since 2009'
    },
    services: { 
      color1: '#059669', color2: '#10b981',
      title: 'OUR SERVICES', 
      subtitle: 'Expert Solutions Across East Africa',
      desc: '8 Core Service Areas • 1000+ Projects • 100% Compliance'
    },
    about: { 
      color1: '#7c3aed', color2: '#a855f7',
      title: 'ABOUT MVONO CONSULTANTS',
      subtitle: 'Led by Engineer Donald M Mbogho', 
      desc: 'Since 2009 • 29+ Years Experience • East Africa Leader'
    },
    contact: { 
      color1: '#dc2626', color2: '#ef4444',
      title: 'CONTACT US',
      subtitle: 'Get Expert Consultation Today',
      desc: '+254 720 270 694 • sales@mvonoconsultants.com'
    }
  };
  
  const data = pageData[page] || pageData.home;
  
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${data.color1}"/>
      <stop offset="100%" style="stop-color:${data.color2}"/>
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Decorative dots -->
  <g opacity="0.1">
    <circle cx="100" cy="100" r="3" fill="white"/>
    <circle cx="200" cy="150" r="3" fill="white"/>
    <circle cx="300" cy="100" r="3" fill="white"/>
    <circle cx="400" cy="180" r="3" fill="white"/>
    <circle cx="500" cy="120" r="3" fill="white"/>
    <circle cx="600" cy="160" r="3" fill="white"/>
    <circle cx="700" cy="110" r="3" fill="white"/>
    <circle cx="800" cy="170" r="3" fill="white"/>
    <circle cx="900" cy="130" r="3" fill="white"/>
    <circle cx="1000" cy="140" r="3" fill="white"/>
    <circle cx="1100" cy="120" r="3" fill="white"/>
  </g>
  
  <!-- Company logo area -->
  <rect x="60" y="60" width="90" height="90" rx="25" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
  
  <!-- Your M logo (simplified) -->
  <g transform="translate(85, 85)">
    <path d="M 5 5 L 15 5 L 22 25 L 29 5 L 40 5 L 40 40 L 32 40 L 32 18 L 27 30 L 17 30 L 12 18 L 12 40 L 5 40 Z" fill="white"/>
    <rect x="8" y="45" width="27" height="3" rx="1" fill="#f15a27"/>
  </g>
  
  <!-- Company name -->
  <text x="170" y="90" font-family="Arial" font-size="24" font-weight="bold" fill="white">MVONO</text>
  <text x="170" y="115" font-family="Arial" font-size="18" fill="rgba(255,255,255,0.9)">CONSULTANTS</text>
  
  <!-- Main content -->
  <text x="600" y="280" font-family="Arial" font-size="48" font-weight="bold" fill="white" text-anchor="middle">${data.title}</text>
  <text x="600" y="340" font-family="Arial" font-size="28" fill="white" text-anchor="middle">${data.subtitle}</text>
  <text x="600" y="400" font-family="Arial" font-size="22" fill="rgba(255,255,255,0.9)" text-anchor="middle">${data.desc}</text>
  
  <!-- Website badge -->
  <rect x="930" y="540" width="220" height="50" rx="25" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <text x="1040" y="570" font-family="Arial" font-size="18" font-weight="bold" fill="white" text-anchor="middle">www.mvonoconsultants.com</text>
  
  <!-- Established badge -->
  <rect x="1010" y="60" width="140" height="80" rx="20" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <text x="1080" y="85" font-family="Arial" font-size="24" fill="white" text-anchor="middle">⭐</text>
  <text x="1080" y="110" font-family="Arial" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Est. 2009</text>
  <text x="1080" y="130" font-family="Arial" font-size="12" fill="rgba(255,255,255,0.8)" text-anchor="middle">29+ Years Experience</text>
</svg>`;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}