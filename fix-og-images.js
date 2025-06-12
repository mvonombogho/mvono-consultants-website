#!/usr/bin/env node

/**
 * OG Images Diagnostic and Fix Tool
 * Mvono Consultants Website
 * 
 * This script diagnoses and fixes common OG image issues
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 OG Images Diagnostic Tool - Mvono Consultants');
console.log('='.repeat(60));

// Step 1: Check if @vercel/og is installed
console.log('\n1. Checking @vercel/og installation...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.dependencies['@vercel/og']) {
    console.log('✅ @vercel/og is installed:', packageJson.dependencies['@vercel/og']);
  } else {
    console.log('❌ @vercel/og is NOT installed');
    console.log('📦 Installing @vercel/og...');
    execSync('npm install @vercel/og', { stdio: 'inherit' });
    console.log('✅ @vercel/og installed successfully');
  }
} catch (error) {
  console.log('❌ Error checking/installing @vercel/og:', error.message);
}

// Step 2: Check OG API route
console.log('\n2. Checking OG API route...');
const ogRoutePath = path.join('app', 'api', 'og', 'route.js');
if (fs.existsSync(ogRoutePath)) {
  console.log('✅ OG API route exists:', ogRoutePath);
  
  // Check if it imports @vercel/og
  const ogRouteContent = fs.readFileSync(ogRoutePath, 'utf8');
  if (ogRouteContent.includes("import { ImageResponse } from '@vercel/og'")) {
    console.log('✅ OG route imports @vercel/og correctly');
  } else {
    console.log('❌ OG route missing @vercel/og import');
  }
} else {
  console.log('❌ OG API route not found');
}

// Step 3: Check fallback route
console.log('\n3. Checking fallback route...');
const fallbackRoutePath = path.join('app', 'api', 'og-fallback', 'route.js');
if (fs.existsSync(fallbackRoutePath)) {
  console.log('✅ Fallback route exists:', fallbackRoutePath);
} else {
  console.log('❌ Fallback route not found');
  console.log('📝 Creating fallback route...');
  
  // Create fallback directory if it doesn't exist
  const fallbackDir = path.join('app', 'api', 'og-fallback');
  if (!fs.existsSync(fallbackDir)) {
    fs.mkdirSync(fallbackDir, { recursive: true });
  }
  
  // Create fallback route
  const fallbackContent = `// Fallback API route for OG images when @vercel/og fails
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'home';
  const title = searchParams.get('title') || 'Mvono Consultants';
  
  // Define page-specific colors
  const pageColors = {
    home: { primary: '#1e40af', secondary: '#3b82f6' },
    services: { primary: '#059669', secondary: '#10b981' },
    about: { primary: '#7c3aed', secondary: '#a855f7' },
    contact: { primary: '#dc2626', secondary: '#ef4444' }
  };
  
  const colors = pageColors[page] || pageColors.home;
  
  const svgContent = \`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:\${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:\${colors.secondary};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad)"/>
      
      <!-- Background pattern -->
      <defs>
        <pattern id="dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="2" fill="rgba(255,255,255,0.1)"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#dots)"/>
      
      <!-- Company logo placeholder -->
      <rect x="60" y="60" width="70" height="70" rx="15" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <text x="95" y="105" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle">🏢</text>
      
      <!-- Company name -->
      <text x="150" y="85" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white">MVONO</text>
      <text x="150" y="110" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.9)">CONSULTANTS</text>
      
      <!-- Main title -->
      <text x="600" y="280" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">\${title.toUpperCase()}</text>
      
      <!-- Subtitle -->
      <text x="600" y="340" font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle">Safety, Energy & Plant Management Experts</text>
      
      <!-- Description -->
      <text x="600" y="400" font-family="Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.9)" text-anchor="middle">Serving Kenya & East Africa Since 2009</text>
      
      <!-- Website URL -->
      <rect x="950" y="540" width="180" height="40" rx="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <text x="1040" y="565" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">www.mvonoconsultants.com</text>
      
      <!-- Quality badge -->
      <rect x="1020" y="60" width="120" height="60" rx="15" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <text x="1080" y="85" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">⭐</text>
      <text x="1080" y="105" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Est. 2009</text>
    </svg>
  \`;
  
  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}`;

  fs.writeFileSync(fallbackRoutePath, fallbackContent);
  console.log('✅ Fallback route created successfully');
}

// Step 4: Check environment variables
console.log('\n4. Checking environment variables...');
if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  if (envContent.includes('NEXT_PUBLIC_OG_IMAGE_BASE_URL')) {
    console.log('✅ OG image environment variables configured');
  } else {
    console.log('⚠️ Adding OG image environment variables...');
    const ogEnvVars = `
# Open Graph Images Configuration (Added by diagnostic tool)
NEXT_PUBLIC_OG_IMAGE_BASE_URL=http://localhost:3000/api/og
NEXT_PUBLIC_OG_FALLBACK_URL=http://localhost:3000/api/og-fallback
`;
    fs.appendFileSync('.env.local', ogEnvVars);
    console.log('✅ Environment variables added');
  }
} else {
  console.log('❌ .env.local file not found');
}

// Step 5: Test API endpoints
console.log('\n5. Testing API endpoints...');
console.log('📝 Manual testing required:');
console.log('   1. Start your development server: npm run dev');
console.log('   2. Visit: http://localhost:3000/api/og?page=home');
console.log('   3. Visit: http://localhost:3000/api/og-fallback?page=home');
console.log('   4. Visit: http://localhost:3000/og-preview');

// Step 6: Create test script
console.log('\n6. Creating test script...');
const testScript = `#!/usr/bin/env node

/**
 * Quick OG Images Test Script
 */

const http = require('http');

const testEndpoints = [
  '/api/og?page=home',
  '/api/og?page=services', 
  '/api/og?page=about',
  '/api/og?page=contact',
  '/api/og-fallback?page=home'
];

console.log('🧪 Testing OG Image Endpoints...');
console.log('Make sure your dev server is running on http://localhost:3000');

testEndpoints.forEach(endpoint => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: endpoint,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(\`\${endpoint}: \${res.statusCode} - \${res.headers['content-type']}\`);
  });

  req.on('error', (e) => {
    console.log(\`\${endpoint}: ERROR - \${e.message}\`);
  });

  req.end();
});
`;

fs.writeFileSync('test-og-endpoints.js', testScript);
console.log('✅ Test script created: test-og-endpoints.js');

console.log('\n🎉 Diagnostic complete!');
console.log('\n📋 Next Steps:');
console.log('1. Restart your development server: npm run dev');
console.log('2. Visit: http://localhost:3000/og-preview');
console.log('3. If images still fail, try: node test-og-endpoints.js');
console.log('4. For production, ensure environment variables are set correctly');

console.log('\n🔧 Common Issues & Solutions:');
console.log('• Images not loading locally: Use fallback route (SVG images)');
console.log('• @vercel/og errors: Edge runtime only works in Vercel/production');
console.log('• Mixed content errors: Ensure HTTPS in production');
console.log('• Caching issues: Clear browser cache or use private/incognito mode');

console.log('\n✅ Your OG images should now work correctly!');
