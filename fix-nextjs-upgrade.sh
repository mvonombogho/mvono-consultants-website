#!/bin/bash
set -e

echo "Starting Next.js 14 upgrade and deployment fix..."

echo "Removing old dependencies..."
rm -rf node_modules package-lock.json .next

echo "Installing new dependencies..."
npm install --legacy-peer-deps

echo "Building project to test..."
npm run build

echo "Adding changes to git..."
git add .
git commit -m "Update to Next.js 14 to fix Vercel deployment dependency conflicts"

echo "Pushing to GitHub..."
git push origin main

echo "Deployment fix complete!"
