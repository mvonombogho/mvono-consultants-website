#!/bin/bash

echo "🧹 Cleaning Next.js project..."

# Remove .next cache directory if it exists
if [ -d ".next" ]; then
    echo "🗑️  Removing .next cache..."
    rm -rf .next
fi

# Remove node_modules/.cache if it exists
if [ -d "node_modules/.cache" ]; then
    echo "🗑️  Removing node_modules cache..."
    rm -rf node_modules/.cache
fi

echo "✅ Project cleaned!"
echo ""
echo "🚀 Next steps:"
echo "1. Run: npm run dev"
echo "2. Test the /blog page"
echo ""
echo "If the issue persists, try:"
echo "rm -rf node_modules && npm install"
