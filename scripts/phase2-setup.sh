#!/bin/bash

# Google Search Console and Performance Monitoring Setup Script
# Run this script after completing the manual verification steps

echo "🔍 Mvono Consultants - Phase 2 Setup Script"
echo "============================================="

# Function to check if Google Analytics is working
check_analytics() {
    echo "📊 Checking Google Analytics setup..."
    
    # This would typically be done in browser, but we can check the implementation
    if grep -q "G-MVNC2024KE" app/layout.tsx; then
        echo "✅ Google Analytics tracking code found in layout.tsx"
    else
        echo "❌ Google Analytics tracking code not found"
        return 1
    fi
    
    if [ -f "utils/analytics.js" ]; then
        echo "✅ Enhanced analytics tracking functions available"
    else
        echo "⚠️ Enhanced analytics file missing"
    fi
}

# Function to check schema implementation
check_schema() {
    echo "🏗️ Checking Schema markup implementation..."
    
    local schema_count=0
    
    if grep -q "getOrganizationSchema" app/page.tsx; then
        echo "✅ Homepage Organization schema implemented"
        ((schema_count++))
    fi
    
    if grep -q "getServiceSchema" app/services/page.tsx; then
        echo "✅ Services page schema implemented"
        ((schema_count++))
    fi
    
    if grep -q "getAboutPageSchema" app/about/page.tsx; then
        echo "✅ About page schema implemented"
        ((schema_count++))
    fi
    
    if grep -q "getContactPageSchema" app/contact/page.tsx; then
        echo "✅ Contact page schema implemented"
        ((schema_count++))
    fi
    
    echo "📈 Total schema implementations: $schema_count/4"
}

# Function to check sitemap and robots.txt
check_technical_seo() {
    echo "🛠️ Checking technical SEO files..."
    
    if [ -f "public/sitemap.xml" ]; then
        echo "✅ Sitemap.xml exists"
        # Count URLs in sitemap
        local url_count=$(grep -c "<url>" public/sitemap.xml)
        echo "📄 Sitemap contains $url_count URLs"
    else
        echo "❌ Sitemap.xml missing"
    fi
    
    if [ -f "public/robots.txt" ]; then
        echo "✅ Robots.txt exists"
    else
        echo "❌ Robots.txt missing"
    fi
}

# Function to check Open Graph images
check_og_images() {
    echo "🖼️ Checking Open Graph images..."
    
    local og_count=0
    local og_images=("home-og.svg" "services-og.svg" "about-og.svg" "contact-og.svg")
    
    for image in "${og_images[@]}"; do
        if [ -f "public/images/og/$image" ]; then
            echo "✅ $image exists"
            ((og_count++))
        else
            echo "❌ $image missing"
        fi
    done
    
    echo "🎨 Open Graph images: $og_count/4"
}

# Function to create monitoring cron job
setup_monitoring() {
    echo "⏰ Setting up automated monitoring..."
    
    # Create a simple monitoring script
    cat > scripts/daily-seo-check.sh << 'EOF'
#!/bin/bash
# Daily SEO Health Check Script

echo "$(date): Running daily SEO health check" >> logs/seo-monitoring.log

# Check if website is accessible
if curl -f -s https://www.mvonoconsultants.com > /dev/null; then
    echo "$(date): ✅ Website accessible" >> logs/seo-monitoring.log
else
    echo "$(date): ❌ Website not accessible" >> logs/seo-monitoring.log
fi

# Check sitemap accessibility
if curl -f -s https://www.mvonoconsultants.com/sitemap.xml > /dev/null; then
    echo "$(date): ✅ Sitemap accessible" >> logs/seo-monitoring.log
else
    echo "$(date): ❌ Sitemap not accessible" >> logs/seo-monitoring.log
fi

# Check robots.txt
if curl -f -s https://www.mvonoconsultants.com/robots.txt > /dev/null; then
    echo "$(date): ✅ Robots.txt accessible" >> logs/seo-monitoring.log
else
    echo "$(date): ❌ Robots.txt not accessible" >> logs/seo-monitoring.log
fi
EOF

    chmod +x scripts/daily-seo-check.sh
    echo "✅ Daily monitoring script created"
    
    # Create logs directory
    mkdir -p logs
    echo "✅ Logs directory created"
}

# Function to display next steps
show_next_steps() {
    echo ""
    echo "🎯 PHASE 2 NEXT STEPS - MANUAL ACTIONS REQUIRED"
    echo "==============================================="
    echo ""
    echo "1. 🔍 GOOGLE SEARCH CONSOLE SETUP:"
    echo "   - Visit: https://search.google.com/search-console/"
    echo "   - Add property: https://www.mvonoconsultants.com"
    echo "   - Use verification methods:"
    echo "     a) HTML file upload (use google-verification-template.html)"
    echo "     b) Meta tag (already prepared in layout.tsx)"
    echo "     c) Google Analytics (already implemented)"
    echo "   - Submit sitemap: https://www.mvonoconsultants.com/sitemap.xml"
    echo "   - Set geographic target: Kenya"
    echo ""
    echo "2. 🏢 GOOGLE BUSINESS PROFILE:"
    echo "   - Visit: https://business.google.com/"
    echo "   - Create/claim: Mvono Consultants"
    echo "   - Use template: google-business-profile-template.json"
    echo "   - Add photos, services, and hours"
    echo "   - Enable messaging and Q&A"
    echo ""
    echo "3. 📊 ANALYTICS MONITORING:"
    echo "   - Wait 24-48 hours for data collection"
    echo "   - Check Google Analytics dashboard"
    echo "   - Verify conversion tracking is working"
    echo "   - Set up automated reports"
    echo ""
    echo "4. 🎨 OPEN GRAPH IMAGES (OPTIONAL):"
    echo "   - Replace SVG placeholders with professional JPG images"
    echo "   - Use 1200x630px dimensions"
    echo "   - Tools: Canva, Figma, or professional designer"
    echo ""
    echo "5. 📈 KEYWORD TRACKING:"
    echo "   - Set up tracking for primary keywords:"
    echo "     * safety consultants Kenya"
    echo "     * energy audit Nairobi"
    echo "     * environmental impact assessment Kenya"
    echo "     * occupational safety Kenya"
    echo "     * fire safety audit Kenya"
    echo ""
    echo "🏆 EXPECTED TIMELINE:"
    echo "- Week 1: Complete manual setup steps"
    echo "- Week 2-4: Monitor initial search performance"
    echo "- Month 1-3: Track ranking improvements"
    echo "- Month 3-6: Measure traffic and lead growth"
    echo ""
    echo "📞 SUPPORT:"
    echo "- Monitor website health: npm run health-check"
    echo "- Check daily logs: tail -f logs/seo-monitoring.log"
    echo "- Analytics utils: Use components in utils/analytics.js"
}

# Main execution
main() {
    echo "Starting Phase 2 verification checks..."
    echo ""
    
    check_analytics
    echo ""
    
    check_schema
    echo ""
    
    check_technical_seo
    echo ""
    
    check_og_images
    echo ""
    
    setup_monitoring
    echo ""
    
    show_next_steps
}

# Run the main function
main