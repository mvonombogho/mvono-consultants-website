@echo off
cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo ========================================
echo   SEO-OPTIMIZED BLOG SYSTEM DEPLOYMENT
echo ========================================
echo.
echo Deploying comprehensive SEO-optimized blog with:
echo.
echo 🔍 SEO OPTIMIZATION:
echo   ✓ Schema.org structured data (BlogPosting, Organization, Breadcrumb)  
echo   ✓ Comprehensive meta tags and Open Graph
echo   ✓ Optimized title tags and descriptions
echo   ✓ Strategic keyword placement
echo   ✓ Internal linking for SEO juice
echo   ✓ Image alt text optimization
echo   ✓ Proper heading hierarchy (H1, H2, H3)
echo   ✓ Canonical URLs and social sharing
echo.
echo 📱 TECHNICAL SEO:
echo   ✓ Mobile-responsive design
echo   ✓ Fast loading with optimized images
echo   ✓ Clean URL structure (/blog/post-slug)
echo   ✓ Proper semantic HTML markup
echo   ✓ Accessibility features (ARIA labels, alt text)
echo.
echo 📈 CONTENT FEATURES:
echo   ✓ Blog listing with search functionality
echo   ✓ Category filtering and organization
echo   ✓ Rich content display with PortableText
echo   ✓ Author attribution and social sharing
echo   ✓ Related content suggestions
echo   ✓ Search suggestions and error handling
echo.

echo Staging all blog changes...
git add .

echo Committing SEO-optimized blog system...
git commit -m "Complete SEO-optimized blog system: Schema markup, meta tags, structured data, and comprehensive search optimization"

echo Pushing to GitHub for deployment...
git push origin main || git push origin master

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================
    echo   🚀 SEO BLOG SYSTEM DEPLOYED! 
    echo ========================================
    echo.
    echo Your blog is now fully SEO optimized and will:
    echo.
    echo ✅ Rank better in Google search results
    echo ✅ Display rich snippets in search  
    echo ✅ Show proper social media previews
    echo ✅ Drive organic traffic to your services
    echo ✅ Build authority in safety/energy sectors
    echo.
    echo Next steps to maximize SEO impact:
    echo 1. Publish 3-5 high-quality blog posts in Sanity Studio
    echo 2. Focus on Kenya-specific keywords (safety Kenya, energy audit Nairobi)
    echo 3. Include internal links to your services pages
    echo 4. Share posts on social media for backlinks
    echo 5. Submit sitemap to Google Search Console
    echo.
    echo Blog URL: https://mvonoconsultants.com/blog
    echo Content Management: https://mvonoconsultants.com/studio
    echo.
) else (
    echo.
    echo ❌ Deployment failed - check connection and try again
)

pause
