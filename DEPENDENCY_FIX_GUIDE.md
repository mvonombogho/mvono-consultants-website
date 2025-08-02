# Mvono Consultants Website - Dependency Fix Guide

## 🔧 Quick Fix for "react-is" Module Not Found Error

If you're encountering the error:
```
Module not found: Can't resolve 'react-is'
```

This is a common dependency issue with Sanity and Next.js integration. Here's how to fix it:

### Automatic Fix (Recommended)

**Windows Users:**
```bash
./fix-and-deploy.bat
```

**Mac/Linux Users:**
```bash
chmod +x fix-and-deploy.sh
./fix-and-deploy.sh
```

### Manual Fix

1. **Clean existing dependencies:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   ```

2. **Install dependencies with legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install missing react-is:**
   ```bash
   npm install react-is@^18.2.0 --save
   ```

4. **Test the build:**
   ```bash
   npm run build
   ```

### Why This Happens

The `react-is` module is a peer dependency required by:
- Sanity's visual editing components
- Various React utilities
- Next.js's internal dependencies

Our fix ensures all React-related packages are compatible and properly installed.

## 🚀 Deployment

After fixing dependencies:

1. **Local Development:**
   ```bash
   npm run dev
   ```

2. **Production Build:**
   ```bash
   npm run build
   npm run start
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Fix dependencies and deploy"
   git push origin main
   ```

## 📋 Project Features

This Mvono Consultants website includes:

### ✅ Completed Features
- Modern responsive design inspired by GigaCloud
- Professional services showcase
- Contact forms with EmailJS integration
- SEO optimization for Kenyan market
- Blog system with Sanity CMS
- Company profile and team sections

### 🚧 In Development (Phase 1-8 Implementation)
- Admin dashboard with Next-Auth
- Client management system
- Financial management tools
- Document generation (invoices, quotations)
- Sales and marketing automation
- Project management features

## 🛠️ Tech Stack

- **Frontend:** Next.js 13, React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **CMS:** Sanity
- **Database:** MongoDB with Prisma
- **Authentication:** Next-Auth
- **Email:** EmailJS, Nodemailer
- **Deployment:** Vercel/Netlify ready

## 📞 Support

For technical issues:
1. Check this guide first
2. Run the automatic fix script
3. Contact the development team

---

**Mvono Consultants** - Safety, Energy & Plant Management Excellence
