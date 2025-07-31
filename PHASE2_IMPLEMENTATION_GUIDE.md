# 🔍 Phase 2: Google Search Console & Performance Monitoring Setup

## 📋 **PHASE 2 OBJECTIVES**

1. ✅ Google Search Console verification and setup
2. ✅ Google Business Profile creation/optimization
3. ✅ Performance monitoring configuration
4. ✅ Search visibility tracking
5. ✅ Technical SEO monitoring setup

---

## 🚀 **STEP 1: Google Search Console Setup**

### **1.1 Verify Website Ownership**

1. **Go to Google Search Console**: https://search.google.com/search-console/
2. **Click "Start now"** and sign in with your Google account
3. **Add Property**: Enter `https://www.mvonoconsultants.com`
4. **Choose Verification Method**: We'll use multiple methods for redundancy

#### **Method 1: HTML File Upload** (Recommended)
```html
<!-- Download this file and upload to your website root -->
<!-- File name will be something like: google[verification-code].html -->
<!-- Content will be: google-site-verification: google[verification-code].html -->
```

#### **Method 2: HTML Meta Tag** (Backup)
Add this to your `/app/layout.tsx` in the `<head>` section:
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

#### **Method 3: Google Analytics** (Already Done!)
✅ Since we've already implemented Google Analytics with ID `G-MVNC2024KE`, this method should work automatically.

### **1.2 Submit Sitemap**

Once verified:
1. Go to **Sitemaps** section in Search Console
2. Submit: `https://www.mvonoconsultants.com/sitemap.xml`
3. Monitor indexing status

### **1.3 Essential Search Console Settings**

1. **Set Preferred Domain**: Choose `www.mvonoconsultants.com`
2. **Geographic Target**: Set to Kenya
3. **Crawl Rate**: Leave as automatic
4. **International Targeting**: Set to Kenya (KE)

---

## 🏢 **STEP 2: Google Business Profile Setup**

### **2.1 Create/Claim Business Profile**

1. **Go to**: https://business.google.com/
2. **Add Business**: "Mvono Consultants"
3. **Business Category**: "Business Consultant" or "Safety Consultant"
4. **Location**: Add your Nairobi office address
5. **Service Areas**: Add all Kenya counties + East Africa

### **2.2 Complete Business Information**

```json
{
  "businessName": "Mvono Consultants",
  "category": "Safety Consultant",
  "description": "Wholly Kenyan owned consultancy firm specializing in safety, energy, and plant systems management since 2009. Serving clients across Kenya and East Africa.",
  "address": "Nairobi, Kenya",
  "phone": "+254 701 868 849",
  "email": "sales@mvonoconsultants.com",
  "website": "https://www.mvonoconsultants.com",
  "hours": {
    "monday": "08:00-17:00",
    "tuesday": "08:00-17:00", 
    "wednesday": "08:00-17:00",
    "thursday": "08:00-17:00",
    "friday": "08:00-17:00",
    "saturday": "09:00-13:00",
    "sunday": "Closed"
  },
  "services": [
    "Environmental Impact Assessment",
    "Occupational Safety Consulting",
    "Fire Safety Audit",
    "Energy Audit",
    "Statutory Inspection",
    "Non-Destructive Testing",
    "Fire Safety Training",
    "First Aid Training"
  ]
}
```

### **2.3 Add Photos and Content**

**Required Photos**:
- Logo (square format)
- Office exterior/interior
- Team photos
- Equipment/training sessions
- Before/after project photos

**Posts to Create**:
- Service announcements
- Safety tips
- Industry updates
- Client testimonials

---

## 📊 **STEP 3: Performance Monitoring Setup**

### **3.1 Google Analytics Enhanced Configuration**

I'll update your GA4 setup with conversion tracking:

```javascript
// Enhanced Events to Track
gtag('event', 'contact_form_submit', {
  'event_category': 'lead_generation',
  'event_label': 'contact_form'
});

gtag('event', 'phone_click', {
  'event_category': 'lead_generation', 
  'event_label': 'phone_number'
});

gtag('event', 'email_click', {
  'event_category': 'lead_generation',
  'event_label': 'email_address'
});

gtag('event', 'company_profile_download', {
  'event_category': 'lead_generation',
  'event_label': 'pdf_download'
});
```

### **3.2 Search Console Performance Monitoring**

**Key Metrics to Monitor**:
- Search impressions
- Click-through rate (CTR)
- Average position
- Top performing keywords
- Pages with search traffic
- Mobile usability issues

**Weekly Check Items**:
- New indexing issues
- Search performance trends
- Rich snippet appearances
- Core Web Vitals scores

---

## 🔧 **STEP 4: Technical Monitoring Tools**

### **4.1 Create Monitoring Dashboard**

I'll create an automated monitoring script for your website:

```javascript
// Website Health Monitor
const monitoringChecks = {
  "sitemap_accessible": "https://www.mvonoconsultants.com/sitemap.xml",
  "robots_accessible": "https://www.mvonoconsultants.com/robots.txt", 
  "schema_validation": "Check homepage for Organization schema",
  "og_images": "Verify Open Graph images load correctly",
  "analytics_tracking": "Confirm GA4 is firing",
  "page_speed": "Monitor Core Web Vitals"
};
```

### **4.2 Error Monitoring Setup**

**404 Error Tracking**:
- Monitor Search Console for crawl errors
- Set up 404 redirect rules
- Track broken internal links

**Site Performance**:
- Page load speed monitoring
- Mobile responsiveness checks
- Schema markup validation

---

## 📈 **STEP 5: Keyword Tracking Setup**

### **5.1 Primary Keywords to Monitor**

```json
{
  "primary_keywords": [
    "safety consultants Kenya",
    "energy audit Nairobi", 
    "environmental impact assessment Kenya",
    "occupational safety Kenya",
    "fire safety audit Kenya"
  ],
  "secondary_keywords": [
    "DOSH compliance consultants",
    "plant management Kenya",
    "statutory inspection Kenya", 
    "energy management services",
    "safety training Kenya"
  ],
  "long_tail_keywords": [
    "occupational safety training Nairobi",
    "environmental consultants East Africa",
    "fire safety consulting Kenya",
    "energy efficiency consultants Kenya"
  ],
  "location_keywords": [
    "safety consultants Nairobi",
    "energy audit Mombasa",
    "safety training Kisumu",
    "environmental assessment Nakuru"
  ]
}
```

### **5.2 Competitor Tracking**

**Key Competitors to Monitor**:
- Local safety consultants in Kenya
- Energy audit companies
- Environmental consultancy firms
- Training organizations

---

## 🎯 **STEP 6: Local SEO Optimization**

### **6.1 Local Citations**

**Directory Listings to Create**:
- Kenya Association of Manufacturers
- Kenya Private Sector Alliance
- Nairobi Business Directory
- Yellow Pages Kenya
- Kenya Chamber of Commerce

### **6.2 Local Content Strategy**

**Content Ideas**:
- "Safety Regulations in Kenya: 2025 Updates"
- "Energy Efficiency Guidelines for Nairobi Businesses"
- "DOSH Compliance Checklist for Kenyan Companies"
- "Environmental Impact Assessment Process in Kenya"

---

## ⚙️ **AUTOMATED SETUP SCRIPTS**

Let me create automated scripts to help with Phase 2 implementation...