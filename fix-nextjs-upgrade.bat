@echo off
echo Starting Next.js 14 upgrade and deployment fix...

echo Removing old dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo Installing new dependencies...
npm install --legacy-peer-deps

echo Building project...
npm run build

echo Adding changes to git...
git add .
git commit -m "Update to Next.js 14 to fix Vercel deployment"

echo Pushing to GitHub...
git push origin main

echo Deployment fix complete!
pause
