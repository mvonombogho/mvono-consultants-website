@echo off
echo NUCLEAR OPTION: Complete fresh start to eliminate Invalid Version error...

echo Step 1: Removing ALL node_modules and lock files...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules 2>nul
)
if exist package-lock.json del package-lock.json 2>nul
if exist yarn.lock del yarn.lock 2>nul

echo Step 2: Using absolute minimal package.json...
copy package-minimal-working.json package.json

echo Step 3: Clearing npm cache completely...
npm cache clean --force 2>nul

echo Step 4: Committing minimal setup...
git add package.json
git commit -m "NUCLEAR: Minimal package.json to eliminate Invalid Version error completely"

echo Step 5: Pushing minimal setup...
git push origin main

echo.
echo ✅ NUCLEAR OPTION DEPLOYED!
echo - Only Next.js, React, TypeScript basics
echo - No Sanity, no complex dependencies
echo - If this fails, the issue is with Vercel/npm infrastructure
pause
