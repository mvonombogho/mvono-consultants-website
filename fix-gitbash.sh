#!/bin/bash
echo "================================="
echo "EMERGENCY CLEAN INSTALL FOR GIT BASH"
echo "================================="

echo
echo "Step 1: Removing node_modules (this may take a minute)..."
if [ -d "node_modules" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules
fi

echo
echo "Step 2: Removing lock files..."
if [ -f "package-lock.json" ]; then
    rm package-lock.json
fi
if [ -d ".next" ]; then
    rm -rf .next
fi

echo
echo "Step 3: Fresh npm install..."
npm install

echo
echo "Step 4: Creating webpack fix..."
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: 'loose' },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion')
    };
    config.module.rules.push({
      test: /\.mjs$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false }
    });
    return config;
  },
  transpilePackages: ['framer-motion'],
  images: { domains: ['cdn.sanity.io'] }
};
export default nextConfig;
EOF

echo
echo "Step 5: Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo
    echo "✅ BUILD SUCCESS!"
    echo "Deploying..."
    git add .
    git commit -m "Fix: Clean reinstall and webpack config"
    git push origin main
    echo "🚀 DEPLOYED!"
else
    echo
    echo "❌ Build failed. Trying with npx..."
    npx next build
    
    if [ $? -eq 0 ]; then
        echo "✅ Fixed with npx!"
        git add .
        git commit -m "Fix: Build working with npx"
        git push origin main
        echo "🚀 DEPLOYED!"
    else
        echo "❌ Still failing. Check errors above."
    fi
fi

echo
echo "================================="
echo "CLEAN INSTALL COMPLETE"
echo "================================="
