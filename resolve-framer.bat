@echo off
echo =================================
echo FRAMER MOTION VERSION RESOLVER
echo =================================

echo.
echo Step 1: Checking available Framer Motion versions...
npm view framer-motion versions --json

echo.
echo Step 2: Trying to install latest stable version...
npm install framer-motion@latest

echo.
echo Step 3: If that didn't work, checking what's currently installed...
npm list framer-motion

echo.
echo Step 4: Creating webpack fix regardless of version...
(
echo /** @type {import^('next'^).NextConfig} */
echo const nextConfig = {
echo   experimental: {
echo     esmExternals: 'loose'
echo   },
echo   webpack: ^(config^) =^> {
echo     // Fix framer-motion module resolution
echo     config.resolve.alias = {
echo       ...config.resolve.alias,
echo       'framer-motion': require.resolve^('framer-motion'^)
echo     };
echo.
echo     // Handle .mjs files
echo     config.module.rules.push^({
echo       test: /\.mjs$/,
echo       type: 'javascript/auto',
echo       resolve: {
echo         fullySpecified: false
echo       }
echo     }^);
echo.
echo     return config;
echo   },
echo   transpilePackages: ['framer-motion'],
echo   images: {
echo     domains: ['cdn.sanity.io'],
echo     unoptimized: true
echo   }
echo };
echo.
echo export default nextConfig;
) > next.config.mjs

echo.
echo Step 5: Testing build with current setup...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ BUILD SUCCESS!
    git add .
    git commit -m "Fix: Webpack config for Framer Motion compatibility"
    git push origin main
    echo.
    echo 🚀 DEPLOYED!
) else (
    echo.
    echo ❌ Build failed. Let's try without framer-motion entirely...
    npm uninstall framer-motion
    npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ Works without Framer Motion. Deploying basic version...
        git add .
        git commit -m "Temporary: Remove Framer Motion to fix build"
        git push origin main
        echo.
        echo 🚀 BASIC VERSION DEPLOYED!
        echo You can add animations back later.
    )
)

echo.
echo =================================
echo VERSION RESOLVER COMPLETE
echo =================================
pause
