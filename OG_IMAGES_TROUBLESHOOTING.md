# 🔧 OG Images Troubleshooting Guide

## 🚨 **Current Issue: Empty Images in Preview**

Your OG preview page is loading but showing empty image placeholders. Here's how to fix it:

---

## ✅ **IMMEDIATE SOLUTION**

### **1. Install Missing Dependency**
The `@vercel/og` package is required for dynamic image generation:

```bash
npm install @vercel/og
```

### **2. Restart Development Server**
After installing, restart your dev server:

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### **3. Test the Fix**
Visit these URLs to verify:
- **OG Preview**: http://localhost:3000/og-preview
- **Direct API**: http://localhost:3000/api/og?page=home
- **Fallback API**: http://localhost:3000/api/og-fallback?page=home

---

## 🔍 **TROUBLESHOOTING STEPS**

### **If Images Still Don't Load:**

#### **Step 1: Check Browser Console**
1. Open browser Developer Tools (F12)
2. Look for errors in Console tab
3. Common errors:
   - `Cannot resolve module '@vercel/og'` → Install dependency
   - `Edge runtime not supported` → Use fallback API
   - Network errors → Check if API routes are accessible

#### **Step 2: Test API Endpoints Manually**
Try these URLs directly in your browser:

```
http://localhost:3000/api/og?page=home
http://localhost:3000/api/og-fallback?page=home
```

**Expected Results:**
- **Success**: Image displays or downloads
- **Error**: Error message with details

#### **Step 3: Use Debug Mode**
1. Go to http://localhost:3000/og-preview
2. Click "Show Debug" button
3. Test both API endpoints using the debug tools
4. Check the response status and content type

#### **Step 4: Verify Environment**
Ensure your `.env.local` file has:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_OG_IMAGE_BASE_URL=http://localhost:3000/api/og
```

---

## 🛠️ **COMMON SOLUTIONS**

### **Solution A: Dependency Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Install @vercel/og specifically
npm install @vercel/og
```

### **Solution B: Port Conflicts**
If port 3000 is busy:
```bash
# Use different port
npm run dev -- -p 3001
# Then visit: http://localhost:3001/og-preview
```

### **Solution C: Edge Runtime Issues**
If @vercel/og doesn't work in development:
1. Use the fallback SVG images (already implemented)
2. The fallback provides basic branded images
3. Full dynamic images will work in production

### **Solution D: Windows-Specific Issues**
On Windows, run as Administrator or use:
```bash
# Use Windows batch file
setup-seo.bat

# Or PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
./setup-seo.sh
```

---

## 📋 **VERIFICATION CHECKLIST**

After fixing, verify these work:

- [ ] ✅ **OG Preview Page**: http://localhost:3000/og-preview
- [ ] ✅ **Dynamic Images**: Should show colorful branded images
- [ ] ✅ **Fallback Images**: Should show simple SVG versions
- [ ] ✅ **Debug Tools**: Should show successful API responses
- [ ] ✅ **Copy URL**: Should copy working image URLs
- [ ] ✅ **Browser Console**: No error messages

---

## 🚀 **QUICK START SCRIPT**

### **Option 1: Automatic Setup (Recommended)**
Run the setup script:

**Windows:**
```bash
setup-seo.bat
```

**Mac/Linux:**
```bash
chmod +x setup-seo.sh
./setup-seo.sh
```

### **Option 2: Manual Setup**
```bash
# 1. Install dependency
npm install @vercel/og

# 2. Copy environment file (if needed)
cp .env.local.example .env.local

# 3. Start development server
npm run dev

# 4. Test the system
# Visit: http://localhost:3000/og-preview
```

---

## 🔗 **USEFUL DEBUG URLs**

### **Development Testing**
- Main site: http://localhost:3000
- OG Preview: http://localhost:3000/og-preview  
- Home OG: http://localhost:3000/api/og?page=home
- Services OG: http://localhost:3000/api/og?page=services
- About OG: http://localhost:3000/api/og?page=about
- Contact OG: http://localhost:3000/api/og?page=contact

### **Fallback Testing**
- Home Fallback: http://localhost:3000/api/og-fallback?page=home
- Services Fallback: http://localhost:3000/api/og-fallback?page=services

---

## 📞 **IF YOU'RE STILL STUCK**

The most common issue is simply missing the `@vercel/og` dependency. 

**90% of image loading issues are solved by:**
1. Running `npm install @vercel/og`
2. Restarting the development server
3. Refreshing the browser

**The fallback system ensures you always have working images**, even if the dynamic generation fails. The SVG fallbacks provide professional-looking branded images that work in all browsers.

---

## 🎯 **EXPECTED RESULTS AFTER FIX**

### **Dynamic Images Should Show:**
- **Home**: Blue gradient with "MVONO CONSULTANTS" title
- **Services**: Green gradient with service icons  
- **About**: Purple gradient with leadership theme
- **Contact**: Red gradient with contact information

### **Fallback Images Show:**
- Simple blue gradient SVG with company name
- Clean, professional appearance
- Fast loading and reliable

### **Debug Tools Should Show:**
- **API Status**: 200 OK responses
- **Content Type**: `image/png` for dynamic, `image/svg+xml` for fallback
- **No Console Errors**: Clean browser console

---

## 🔄 **PRODUCTION DEPLOYMENT**

Once working locally:

1. **Deploy with environment variables**:
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.mvonoconsultants.com
   NEXT_PUBLIC_OG_IMAGE_BASE_URL=https://www.mvonoconsultants.com/api/og
   ```

2. **Test production URLs**:
   - https://www.mvonoconsultants.com/og-preview
   - https://www.mvonoconsultants.com/api/og?page=home

3. **Validate social sharing**:
   - Facebook Sharing Debugger
   - Twitter Card Validator  
   - LinkedIn Post Inspector

---

## ✅ **QUICK SUMMARY**

**Problem**: Empty OG images in preview
**Solution**: Install `@vercel/og` and restart server
**Backup**: SVG fallback images work immediately
**Result**: Professional branded social media images

**🚀 Run this command to fix everything:**
```bash
npm install @vercel/og && npm run dev
```

**Then visit: http://localhost:3000/og-preview to see your beautiful OG images!**
