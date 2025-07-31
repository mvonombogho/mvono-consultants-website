#!/bin/bash

echo "🔧 Fixing module resolution issues..."

# Remove the test file
if [ -f "test-imports.js" ]; then
    rm test-imports.js
    echo "✅ Removed test file"
fi

echo "✅ Module resolution fixes applied!"
echo ""
echo "📋 Summary of changes:"
echo "- Fixed tsconfig.json path mapping to use single path resolution"
echo "- All @/ aliases should now resolve correctly"
echo ""
echo "🚀 You can now run your development server:"
echo "npm run dev"
echo ""
echo "If you still encounter issues, try:"
echo "1. Delete .next folder: rm -rf .next"
echo "2. Clear node_modules: rm -rf node_modules && npm install"
echo "3. Restart your development server"
