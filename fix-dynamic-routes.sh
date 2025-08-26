#!/bin/bash
echo "================================="
echo "FIXING DYNAMIC SERVER USAGE ERROR"
echo "================================="

echo
echo "Step 1: Making API routes dynamic to prevent static generation errors..."

# Add dynamic export to problematic API routes
find app/api -name "route.js" -o -name "route.ts" | while read file; do
    if ! grep -q "export const dynamic" "$file"; then
        echo "export const dynamic = 'force-dynamic';" | cat - "$file" > temp && mv temp "$file"
        echo "Fixed: $file"
    fi
done

echo
echo "Step 2: Deploying fix..."
git add .
git commit -m "Fix: Add dynamic export to API routes for static generation"
git push origin main

echo
echo "================================="
echo "DYNAMIC SERVER FIX DEPLOYED"
echo "================================="
