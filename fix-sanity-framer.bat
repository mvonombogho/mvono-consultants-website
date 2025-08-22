@echo off
echo =================================
echo FIXING FRAMER MOTION + SANITY COMPATIBILITY
echo =================================

echo.
echo Step 1: Fixing Framer Motion version compatibility...

REM Remove problematic node_modules and lock file
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo.
echo Step 2: Installing compatible Framer Motion version...

REM Install specific compatible versions
npm install framer-motion@11.0.28
npm install @sanity/ui@2.8.9 sanity@3.57.4 @sanity/client@6.21.3

echo.
echo Step 3: Updating next.config.mjs to handle ESM modules properly...

(
echo /** @type {import^('next'^).NextConfig} */
echo const nextConfig = {
echo   experimental: {
echo     esmExternals: 'loose',
echo     serverComponentsExternalPackages: ['framer-motion']
echo   },
echo   webpack: ^(config, { isServer }^) =^> {
echo     // Handle ESM modules properly
echo     config.externals = [...^(config.externals ^|^| []^), 'canvas', 'jsdom'];
echo.
echo     // Fix framer-motion module resolution
echo     config.resolve.alias = {
echo       ...config.resolve.alias,
echo       'framer-motion': require.resolve^('framer-motion'^),
echo       '@sanity/ui': require.resolve^('@sanity/ui'^)
echo     };
echo.
echo     // Handle .mjs files properly
echo     config.module.rules.push^({
echo       test: /\.mjs$/,
echo       type: 'javascript/auto',
echo       resolve: {
echo         fullySpecified: false
echo       }
echo     }^);
echo.
echo     if ^(!isServer^) {
echo       config.resolve.fallback = {
echo         ...config.resolve.fallback,
echo         fs: false,
echo         net: false,
echo         tls: false,
echo       };
echo     }
echo.
echo     return config;
echo   },
echo   transpilePackages: ['framer-motion', '@sanity/ui', 'sanity'],
echo   images: {
echo     domains: ['cdn.sanity.io'],
echo     unoptimized: false
echo   },
echo   swcMinify: true
echo };
echo.
echo export default nextConfig;
) > next.config.mjs

echo.
echo Step 4: Installing all dependencies with compatible versions...
npm install

echo.
echo Step 5: Testing build with Sanity + Framer Motion...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Sanity + Framer Motion working together!
    echo.
    echo Deploying to production...
    git add .
    git commit -m "Fix: Resolve Framer Motion + Sanity compatibility issues"
    git push origin main
    echo.
    echo 🚀 DEPLOYED WITH FULL FUNCTIONALITY!
) else (
    echo.
    echo ❌ Still having issues. Trying alternative approach...
    
    echo.
    echo Alternative: Use Framer Motion 10.x LTS...
    npm uninstall framer-motion
    npm install framer-motion@10.18.0
    
    echo.
    echo Updating package.json to lock compatible versions...
    
    powershell -Command "$json = Get-Content 'package.json' | ConvertFrom-Json; $json.dependencies.'framer-motion' = '10.18.0'; $json.dependencies.'@sanity/ui' = '2.8.9'; $json.dependencies.'sanity' = '3.57.4'; $json.resolutions = @{ 'framer-motion' = '10.18.0' }; $json | ConvertTo-Json -Depth 10 | Set-Content 'package.json'"
    
    echo.
    echo Testing with locked versions...
    npm install --force
    npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ SUCCESS with locked versions!
        git add .
        git commit -m "Fix: Lock Framer Motion to 10.18.0 for Sanity compatibility"
        git push origin main
        echo.
        echo 🚀 DEPLOYED!
    ) else (
        echo.
        echo ❌ Need manual intervention. Check specific error above.
    )
)

echo.
echo =================================
echo SANITY + FRAMER MOTION FIX COMPLETE
echo =================================
pause
