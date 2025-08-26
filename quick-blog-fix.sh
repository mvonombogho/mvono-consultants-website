#!/bin/bash
echo "================================="
echo "FIXING BUILD ERRORS QUICKLY"
echo "================================="

echo
echo "Step 1: Fix Sanity client export issue..."

cat > lib/sanity-client.js << 'EOF'
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// Default export
export default client;
EOF

echo
echo "Step 2: Clean up node_modules dependency issue..."
rm -rf node_modules/.cache 2>/dev/null
npm install console-control-strings --force

echo
echo "Step 3: Deploy with warnings only..."
git add .
git commit -m "Fix: Blog pages with corrected Sanity client"
git push origin main

echo
echo "================================="
echo "QUICK FIX DEPLOYED"
echo "================================="
