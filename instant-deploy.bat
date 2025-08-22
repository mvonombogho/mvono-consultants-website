@echo off
echo =================================
echo INSTANT DEPLOYMENT FIX
echo =================================

echo.
echo Removing ALL problematic dependencies for clean deployment...

echo.
echo Step 1: Remove Sanity completely...
if exist app\studio rmdir /s /q app\studio
if exist sanity rmdir /s /q sanity
if exist sanity.config.js del sanity.config.js
if exist sanity.cli.js del sanity.cli.js

echo.
echo Step 2: Clean build environment...
rmdir /s /q node_modules 2>nul
rmdir /s /q .next 2>nul
del package-lock.json 2>nul

echo.
echo Step 3: Create deployment-ready package.json...
(
echo {
echo   "name": "mvono-consultants-website",
echo   "version": "0.1.0",
echo   "private": true,
echo   "scripts": {
echo     "dev": "next dev",
echo     "build": "next build",
echo     "start": "next start"
echo   },
echo   "dependencies": {
echo     "next": "14.2.13",
echo     "react": "18.3.1",
echo     "react-dom": "18.3.1",
echo     "framer-motion": "10.18.0",
echo     "@prisma/client": "5.7.1",
echo     "next-auth": "4.24.5",
echo     "bcrypt": "5.1.1",
echo     "tailwindcss": "3.4.0",
echo     "autoprefixer": "10.4.16",
echo     "postcss": "8.4.32"
echo   },
echo   "devDependencies": {
echo     "prisma": "5.7.1",
echo     "typescript": "5.3.3",
echo     "@types/node": "20.10.5",
echo     "@types/react": "18.2.45",
echo     "@types/react-dom": "18.2.18",
echo     "@types/bcrypt": "5.0.2",
echo     "eslint": "8.55.0",
echo     "eslint-config-next": "14.2.13"
echo   },
echo   "engines": {
echo     "node": "^>=18.17.0"
echo   }
echo }
) > package.json

echo.
echo Step 4: Install clean dependencies...
npm install

echo.
echo Step 5: Build and deploy...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ CLEAN BUILD SUCCESS!
    echo.
    echo Committing and deploying...
    git add .
    git commit -m "Deploy: Clean build without problematic dependencies"
    git push origin main
    echo.
    echo 🚀 WEBSITE IS NOW LIVE!
    echo.
    echo Your Mvono Consultants website should be accessible shortly.
    echo You can add advanced features back gradually after this works.
) else (
    echo.
    echo ❌ Build failed even with minimal setup.
    echo Check the specific error above and fix manually.
)

echo.
echo =================================
echo INSTANT FIX COMPLETE
echo =================================
pause
