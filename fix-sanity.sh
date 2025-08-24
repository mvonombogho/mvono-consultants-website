#!/bin/bash
echo "================================="
echo "FIXING SANITY DEPENDENCY ISSUES"
echo "================================="

echo
echo "Step 1: Installing missing Sanity dependency..."
npm install @sanity/descriptors

echo
echo "Step 2: Updating Sanity packages to compatible versions..."
npm install sanity@latest @sanity/ui@latest @sanity/client@latest @sanity/vision@latest

echo
echo "Step 3: Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo
    echo "✅ BUILD SUCCESS!"
    echo "Deploying..."
    git add .
    git commit -m "Fix: Install missing Sanity dependencies"
    git push origin main
    echo "🚀 DEPLOYED!"
else
    echo
    echo "❌ Still failing. Trying to fix Sanity schema..."
    
    echo "Step 4: Reinstalling all Sanity packages..."
    npm uninstall sanity @sanity/ui @sanity/client @sanity/vision @sanity/schema
    npm install sanity@3.57.4 @sanity/ui@2.8.9 @sanity/client@6.21.3 @sanity/vision@3.57.4
    
    echo "Step 5: Testing with fixed versions..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Fixed with specific versions!"
        git add .
        git commit -m "Fix: Use compatible Sanity versions"
        git push origin main
        echo "🚀 DEPLOYED!"
    else
        echo "❌ Need to check Sanity config..."
    fi
fi

echo
echo "================================="
echo "SANITY FIX COMPLETE"
echo "================================="
