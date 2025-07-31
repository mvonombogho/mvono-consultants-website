const fs = require('fs');
const path = require('path');

// This script creates placeholder files for OG images
// You'll need to replace these with actual 1200x630px images

const ogDir = path.join(__dirname, '..', 'public', 'images', 'og');

// Ensure directory exists
if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
}

// Create placeholder files (you'll replace these with real images)
const ogImages = [
  'home-og.jpg',
  'services-og.jpg', 
  'about-og.jpg',
  'contact-og.jpg'
];

// Create SVG placeholders that can be converted to JPG later
const createSVGPlaceholder = (title, color) => `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color}cc;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad)"/>
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle">${title}</text>
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" opacity="0.9">Professional consultancy services</text>
  <text x="600" y="400" font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle" opacity="0.8">MVONO CONSULTANTS</text>
  <text x="600" y="450" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.7">Kenya | East Africa</text>
</svg>`;

const svgContent = {
  'home-og.svg': createSVGPlaceholder('Safety, Energy & Plant Systems', '#1e40af'),
  'services-og.svg': createSVGPlaceholder('Our Professional Services', '#059669'), 
  'about-og.svg': createSVGPlaceholder('About Mvono Consultants', '#7c3aed'),
  'contact-og.svg': createSVGPlaceholder('Contact Our Expert Team', '#dc2626')
};

// Write SVG files
Object.entries(svgContent).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(ogDir, filename), content);
  console.log(`✅ Created: ${filename}`);
});

console.log('\n🎨 Open Graph placeholder images created!');
console.log('📝 Next steps:');
console.log('   1. Convert SVG files to JPG (1200x630px) using any image editor');
console.log('   2. Rename them to: home-og.jpg, services-og.jpg, about-og.jpg, contact-og.jpg');
console.log('   3. Replace the SVG files with the JPG versions');
console.log('   4. Or use online tools like Canva to create professional OG images');
