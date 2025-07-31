#!/bin/bash

# Mvono Consultants - SEO & OG Images Setup Script
# =================================================

echo "🚀 Setting up Mvono Consultants SEO & OG Images System..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Install @vercel/og dependency
echo "📦 Installing @vercel/og dependency..."
npm install @vercel/og

if [ $? -eq 0 ]; then
    echo "✅ @vercel/og installed successfully"
else
    echo "❌ Failed to install @vercel/og"
    exit 1
fi

echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file exists"
else
    echo "⚠️  .env.local file not found"
    echo "📋 Copying from .env.local.example..."
    cp .env.local.example .env.local
    echo "✅ .env.local created from template"
    echo ""
    echo "🔧 Please update the following in .env.local:"
    echo "   - EMAIL_PASS: Replace with actual Zoho Mail password"
    echo "   - Any other environment-specific values"
    echo ""
fi

# Start development server
echo "🎯 Setup complete! Starting development server..."
echo ""
echo "📍 Visit these URLs to test:"
echo "   - Main site: http://localhost:3000"
echo "   - OG Preview: http://localhost:3000/og-preview"
echo "   - Direct OG API: http://localhost:3000/api/og?page=home"
echo ""

npm run dev
