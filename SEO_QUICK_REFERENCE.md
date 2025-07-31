# 🚀 Mvono Consultants SEO - Quick Reference Card

## ⚡ **INSTANT HEALTH CHECK**
```bash
# Open browser console on your website and run:
runHealthCheck()

# View SEO implementation status:
displaySEOChecklist()
```

## 📞 **ANALYTICS TRACKING - QUICK INTEGRATION**

### **Replace Standard Links With Tracked Components:**

```jsx
// ❌ Standard phone link
<a href="tel:+254701868849">+254 701 868 849</a>

// ✅ Tracked phone link
<TrackedPhoneLink phoneNumber="+254701868849" />
```

```jsx
// ❌ Standard email link  
<a href="mailto:sales@mvonoconsultants.com">Contact Us</a>

// ✅ Tracked email link
<TrackedEmailLink email="sales@mvonoconsultants.com" />
```

```jsx
// ❌ Standard WhatsApp link
<a href="https://wa.me/254701868849">WhatsApp</a>

// ✅ Tracked WhatsApp link
<TrackedWhatsAppLink phoneNumber="254701868849" />
```

## 🔍 **SEARCH CONSOLE QUICK SETUP**

### **3 Verification Methods (Choose One):**

1. **Google Analytics** (Automatic - Recommended)
   - Already implemented with ID: `G-MVNC2024KE`
   - Should work immediately

2. **Meta Tag** (Manual)
   - Get verification code from Search Console
   - Replace `REPLACE_WITH_YOUR_VERIFICATION_CODE` in `/app/layout.tsx`

3. **HTML File** (Alternative)
   - Download verification file from Search Console
   - Upload to `/public/` directory

### **After Verification:**
- Submit sitemap: `https://www.mvonoconsultants.com/sitemap.xml`
- Set geographic target: Kenya
- Enable email alerts for critical issues

## 🏢 **BUSINESS PROFILE EXPRESS SETUP**

### **Essential Information:**
```json
{
  "name": "Mvono Consultants",
  "category": "Safety Consultant", 
  "phone": "+254 701 868 849",
  "email": "sales@mvonoconsultants.com",
  "website": "https://www.mvonoconsultants.com",
  "hours": "Mon-Fri 8AM-5PM, Sat 9AM-1PM",
  "description": "Safety, energy & plant systems consultancy since 2009"
}
```

### **Required Photos:**
- Company logo (square)
- Office exterior/interior
- Team photos  
- Equipment/training sessions
- Professional headshots

## 📊 **KEY METRICS TO MONITOR**

### **Google Analytics (Weekly)**
- Organic traffic growth
- Contact form submissions
- Phone/email click rates
- Service page engagement
- Geographic traffic sources

### **Search Console (Weekly)**  
- Search impressions
- Click-through rates
- Average position improvements
- New keyword rankings
- Technical issues alerts

### **Business Profile (Monthly)**
- Profile views and clicks
- Direction requests  
- Photo engagement
- Review generation
- Q&A interactions

## 🎯 **PRIMARY KEYWORDS TO TRACK**

### **High Priority:**
1. `safety consultants Kenya`
2. `energy audit Nairobi`  
3. `environmental impact assessment Kenya`
4. `occupational safety Kenya`
5. `fire safety audit Kenya`

### **Secondary:**
1. `DOSH compliance consultants`
2. `plant management Kenya`
3. `statutory inspection Kenya`
4. `energy management services`
5. `safety training Kenya`

## 🚨 **QUICK TROUBLESHOOTING**

### **Analytics Not Working?**
- Check if `gtag` is loaded: Run `typeof gtag` in browser console
- Verify tracking ID: Should be `G-MVNC2024KE`
- Wait 24-48 hours for data to appear

### **Search Console Issues?**
- Re-verify using different method
- Check if sitemap is accessible: Visit `/sitemap.xml`
- Ensure HTTPS is working properly

### **Schema Markup Problems?**
- Test with Google Rich Results Test
- Check JSON syntax in browser console
- Verify schema scripts are loading

## 📞 **EMERGENCY CONTACTS**

### **Technical Issues:**
- Google Search Console Help
- Google Analytics Support  
- Google Business Profile Support

### **SEO Monitoring:**
- Daily health check script: `/scripts/website-health-monitor.js`
- Log files: `/logs/seo-monitoring.log`
- Manual verification: Browser console tools

## 🏆 **SUCCESS INDICATORS**

### **Week 1:**
- ✅ Search Console verified and data flowing
- ✅ Business Profile live and optimized
- ✅ Analytics tracking all interactions

### **Month 1:**
- 📈 25-50% increase in search impressions
- 📈 Business Profile appearing in local searches  
- 📈 Contact form submissions tracked

### **Month 3:**
- 📈 50-100% organic traffic growth
- 📈 Top 20 rankings for primary keywords
- 📈 Significant lead generation improvement

---

**💡 Remember: SEO is a marathon, not a sprint. Consistent monitoring and optimization lead to long-term success!**

**🎯 Next Review Date: ________________**

**📈 Current Phase: Phase 2 - Search Console & Monitoring**