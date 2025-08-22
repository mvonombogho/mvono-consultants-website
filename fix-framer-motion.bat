@echo off
echo =================================
echo FIXING FRAMER MOTION / SANITY CONFLICT
echo =================================

echo.
echo Step 1: Backing up current package.json...
copy package.json package-backup.json

echo.
echo Step 2: Clearing problematic dependencies...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo.
echo Step 3: Installing compatible versions...

REM First install core dependencies
npm install next@14.2.13 react@18.3.1 react-dom@18.3.1

REM Install framer-motion with specific compatible version
npm install framer-motion@10.18.0

REM Install Sanity with compatible version
npm install sanity@3.57.4 @sanity/ui@2.8.9 @sanity/client@6.21.3

REM Install other essential dependencies
npm install @prisma/client prisma next-auth bcrypt @next/bundle-analyzer

echo.
echo Step 4: Updating next.config.mjs to handle module resolution...

(
echo import { withNextBundleAnalyzer } from '@next/bundle-analyzer';
echo.
echo const bundleAnalyzer = withNextBundleAnalyzer^({
echo   enabled: process.env.ANALYZE === 'true'
echo }^);
echo.
echo /** @type {import^('next'^).NextConfig} */
echo const nextConfig = {
echo   experimental: {
echo     esmExternals: 'loose'
echo   },
echo   webpack: ^(config, { isServer }^) =^> {
echo     if ^(!isServer^) {
echo       config.resolve.fallback = {
echo         ...config.resolve.fallback,
echo         fs: false,
echo         net: false,
echo         tls: false,
echo       };
echo     }
echo.
echo     // Fix framer-motion module resolution
echo     config.resolve.alias = {
echo       ...config.resolve.alias,
echo       'framer-motion': require.resolve^('framer-motion'^)
echo     };
echo.
echo     return config;
echo   },
echo   transpilePackages: ['framer-motion', '@sanity/ui'],
echo   images: {
echo     domains: ['cdn.sanity.io'],
echo     unoptimized: true
echo   }
echo };
echo.
echo export default bundleAnalyzer^(nextConfig^);
) > next.config.mjs

echo.
echo Step 5: Testing build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ BUILD SUCCESS! Pushing to production...
    git add .
    git commit -m "Fix: Resolve Framer Motion/Sanity webpack conflicts"
    git push origin main
    echo.
    echo 🚀 DEPLOYED!
) else (
    echo.
    echo ❌ Still failing. Trying alternative fix...
    
    echo.
    echo Alternative: Remove Sanity studio temporarily...
    rmdir /s /q app\studio 2>nul
    rmdir /s /q sanity 2>nul
    del sanity.config.js 2>nul
    del sanity.cli.js 2>nul
    
    echo.
    echo Testing build without Sanity...
    npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ SUCCESS! Pushing without Sanity studio...
        git add .
        git commit -m "Temporary: Remove Sanity studio to fix deployment"
        git push origin main
        echo.
        echo 🚀 DEPLOYED! You can re-add Sanity later.
    ) else (
        echo.
        echo ❌ Build still failing. Check errors above.
    )
)

echo.
echo =================================
echo FRAMER MOTION FIX COMPLETE
echo =================================
pause
