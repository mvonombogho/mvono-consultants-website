#!/bin/bash
echo "Quick fix for Git Bash..."

# Remove problematic directories
rm -rf node_modules .next
rm -f package-lock.json

# Install dependencies
npm install

# Create webpack fix
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: 'loose' },
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, 'framer-motion': require.resolve('framer-motion') };
    return config;
  },
  transpilePackages: ['framer-motion']
};
export default nextConfig;
EOF

# Build and deploy
npm run build && git add . && git commit -m "Fix: Framer Motion webpack conflicts" && git push origin main && echo "🚀 DEPLOYED!"
