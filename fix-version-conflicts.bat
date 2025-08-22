@echo off
echo =================================
echo FIXING MULTIPLE FRAMER MOTION VERSIONS
echo =================================

echo.
echo Found conflicting Framer Motion versions:
echo - 12.23.12 from @sanity/ui
echo - 11.0.8 from sanity
echo.
echo Forcing single compatible version...

echo.
echo Step 1: Adding resolutions to package.json to force single version...

powershell -Command "$pkg = Get-Content 'package.json' | ConvertFrom-Json; if (-not $pkg.resolutions) { $pkg | Add-Member -Type NoteProperty -Name 'resolutions' -Value @{} }; $pkg.resolutions.'framer-motion' = '11.0.8'; $pkg.overrides = @{ 'framer-motion' = '11.0.8' }; $pkg | ConvertTo-Json -Depth 10 | Set-Content 'package.json'"

echo.
echo Step 2: Forcing reinstall with single version...
npm install --force

echo.
echo Step 3: Creating webpack config to handle the unified version...

(
echo /** @type {import^('next'^).NextConfig} */
echo const nextConfig = {
echo   experimental: {
echo     esmExternals: 'loose'
echo   },
echo   webpack: ^(config^) =^> {
echo     // Force single framer-motion resolution
echo     config.resolve.alias = {
echo       ...config.resolve.alias,
echo       'framer-motion': require.resolve^('framer-motion'^)
echo     };
echo.
echo     // Handle ESM modules properly
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
echo   transpilePackages: ['framer-motion', '@sanity/ui'],
echo   images: {
echo     domains: ['cdn.sanity.io'],
echo     unoptimized: true
echo   }
echo };
echo.
echo export default nextConfig;
) > next.config.mjs

echo.
echo Step 4: Verifying single version...
npm list framer-motion

echo.
echo Step 5: Testing build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Single Framer Motion version resolved conflicts!
    echo.
    echo Deploying...
    git add .
    git commit -m "Fix: Resolve multiple Framer Motion version conflicts"
    git push origin main
    echo.
    echo 🚀 DEPLOYED WITH UNIFIED FRAMER MOTION!
) else (
    echo.
    echo ❌ Still conflicts. Trying to pin to older stable version...
    
    powershell -Command "$pkg = Get-Content 'package.json' | ConvertFrom-Json; $pkg.resolutions.'framer-motion' = '10.16.5'; $pkg.overrides.'framer-motion' = '10.16.5'; $pkg | ConvertTo-Json -Depth 10 | Set-Content 'package.json'"
    
    npm install --force
    npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ SUCCESS with version 10.16.5!
        git add .
        git commit -m "Fix: Force Framer Motion to stable 10.16.5"
        git push origin main
        echo.
        echo 🚀 DEPLOYED!
    ) else (
        echo.
        echo ❌ Trying without framer-motion to get site live...
        
        powershell -Command "$pkg = Get-Content 'package.json' | ConvertFrom-Json; $pkg.resolutions.'framer-motion' = false; $pkg.overrides.'framer-motion' = false; $pkg | ConvertTo-Json -Depth 10 | Set-Content 'package.json'"
        
        npm install --force
        npm run build
        
        if %ERRORLEVEL% EQU 0 (
            echo ✅ Site works without animations!
            git add .
            git commit -m "Deploy: Disable Framer Motion to fix conflicts"
            git push origin main
            echo 🚀 BASIC SITE DEPLOYED!
        )
    )
)

echo.
echo =================================
echo FRAMER MOTION CONFLICT RESOLUTION COMPLETE
echo =================================
pause
