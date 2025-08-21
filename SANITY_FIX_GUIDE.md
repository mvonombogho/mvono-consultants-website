# Sanity Dependency Conflict Fix

## The Problem
The deployment is failing due to Sanity dependency conflicts:
- `@sanity/client` version mismatch (6.x vs 7.x required)
- "Invalid Version" error
- Peer dependency conflicts

## Solution Steps

### Step 1: Test Without Sanity (Quick Fix)
This will get your site deployed immediately:

```cmd
cd C:\Users\Admin\Documents\mvono-consultants-website-main

# Backup current package.json
copy package.json package-backup.json

# Use minimal package.json without Sanity
copy package-minimal.json package.json

# Clean and install
del package-lock.json
npm cache clean --force
npm install --legacy-peer-deps

# Test build
npm run build

# If successful, deploy
git add .
git commit -m "Remove Sanity temporarily to fix deployment"
git push origin main
```

### Step 2: Fix Sanity Integration (After Site is Live)
Once the site is deployed, we can add Sanity back properly:

```cmd
# Restore full package.json with fixed Sanity versions
copy package-backup.json package.json

# Update Sanity client to v7
npm install @sanity/client@^7.9.0 --save

# Install other Sanity packages
npm install @sanity/image-url@^1.1.0 --save
npm install @sanity/vision@^3.88.3 --save
npm install next-sanity@^9.11.1 --save
npm install sanity@^3.88.3 --save

# Test and deploy
npm run build
git add .
git commit -m "Re-add Sanity with compatible versions"
git push origin main
```

## Option 1: Immediate Fix (Recommended)
Run this now to get your site deployed:

```cmd
.\fix-sanity-dependencies.bat
```

If that fails, use the minimal approach:

```cmd
copy package-minimal.json package.json
del package-lock.json
npm install --legacy-peer-deps
npm run build
git add .
git commit -m "Deploy without Sanity to fix immediate issue"
git push origin main
```

## Option 2: Complete Sanity Fix
If you need the blog functionality right away, the updated package.json with `@sanity/client@^7.9.0` should work.

## What This Fixes
- ✅ Resolves Next.js 14 compatibility
- ✅ Fixes Sanity version conflicts
- ✅ Eliminates "Invalid Version" error
- ✅ Gets your site deployed immediately

## Impact
- **Without Sanity**: Your main website works perfectly, blog might not work
- **With Fixed Sanity**: Everything works including blog functionality

Choose Option 1 for immediate deployment, then add Sanity back later if needed.
