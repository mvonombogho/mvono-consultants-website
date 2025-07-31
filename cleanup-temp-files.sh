#!/bin/bash

echo "🧹 Cleaning up temporary files..."

# Remove test files
files_to_remove=(
    "lib/api-simple.js"
    "app/blog/test-page.js"
    "verify-api.js"
    "fix-complete.sh"
    "clean-project.sh"
)

for file in "${files_to_remove[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "✅ Removed $file"
    fi
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Current blog setup:"
echo "- Using lib/api-fixed.js for Sanity data"
echo "- All imports use relative paths"
echo "- Real blog data from your Sanity CMS"
echo ""
echo "🚀 Your blog should now work with actual data!"
echo "Run: npm run dev"
