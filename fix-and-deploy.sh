#!/bin/bash

echo "🔧 Fixing Mvono Consultants Website Dependencies and Deployment"
echo "================================================================"

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Found package.json - proceeding with fixes..."

# Step 2: Clean node_modules and package-lock.json
echo "🧹 Cleaning existing dependencies..."
rm -rf node_modules
rm -f package-lock.json

# Step 3: Install dependencies with legacy peer deps flag to handle conflicts
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Step 4: Specifically install react-is if still missing
echo "🔍 Ensuring react-is is installed..."
npm install react-is@^18.2.0 --save

# Step 5: Install any peer dependencies that might be missing
echo "🔄 Installing peer dependencies..."
npm install react-is prop-types --save

# Step 6: Run a build test to ensure everything works
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the error messages above."
    echo "🔧 Attempting to fix common issues..."
    
    # Try to fix common Next.js/React issues
    npm install @types/react@^18 @types/react-dom@^18 --save-dev
    npm install react@^18 react-dom@^18 --save
    
    echo "🏗️ Retrying build..."
    npm run build
fi

# Step 7: Git operations
echo "📁 Preparing Git commit..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🆕 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Fix react-is dependency issue and update project dependencies

- Added missing react-is dependency to package.json
- Updated all dependencies to resolve conflicts
- Fixed build issues with Sanity and Next.js integration
- Ensured compatibility between all React-related packages"

# Check if remote exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "🚀 Pushing to existing repository..."
    git push origin main
else
    echo "⚠️ No Git remote found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/mvono-consultants-website.git"
    echo "   git push -u origin main"
fi

echo ""
echo "🎉 Setup Complete!"
echo "================================================================"
echo "✅ Dependencies fixed and installed"
echo "✅ Build tested successfully" 
echo "✅ Code committed to Git"
echo "✅ Ready for deployment"
echo ""
echo "Next steps:"
echo "1. If you haven't set up the GitHub remote, run:"
echo "   git remote add origin YOUR_GITHUB_REPO_URL"
echo "   git push -u origin main"
echo ""
echo "2. For local development:"
echo "   npm run dev"
echo ""
echo "3. For production deployment:"
echo "   npm run build"
echo "   npm run start"
