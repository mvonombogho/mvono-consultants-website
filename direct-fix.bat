@echo off
echo =================================
echo DIRECT FRAMER MOTION FIX
echo =================================

echo.
echo Step 1: Updating next.config.mjs to fix module resolution...

(
echo /** @type {import^('next'^).NextConfig} */
echo const nextConfig = {
echo   experimental: {
echo     esmExternals: 'loose'
echo   },
echo   webpack: ^(config^) =^> {
echo     config.resolve.alias = {
echo       ...config.resolve.alias,
echo       'framer-motion': require.resolve^('framer-motion'^)
echo     };
echo     config.module.rules.push^({
echo       test: /\.mjs$/,
echo       type: 'javascript/auto',
echo       resolve: { fullySpecified: false }
echo     }^);
echo     return config;
echo   },
echo   transpilePackages: ['framer-motion'],
echo   images: { domains: ['cdn.sanity.io'] }
echo };
echo export default nextConfig;
) > next.config.mjs

echo.
echo Step 2: Installing compatible framer-motion version...
npm install framer-motion@10.18.0 --save-exact

echo.
echo Step 3: Testing build immediately...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Pushing to production...
    git add .
    git commit -m "Fix: Framer Motion compatibility with Sanity"
    git push origin main
    echo 🚀 DEPLOYED!
) else (
    echo ❌ Build failed. Trying alternative...
    
    echo.
    echo Alternative: Update package.json to force compatible versions...
    
    powershell -Command "$pkg = Get-Content 'package.json' | ConvertFrom-Json; $pkg.dependencies.'framer-motion' = '10.18.0'; $pkg.overrides = @{'framer-motion' = '10.18.0'}; $pkg | ConvertTo-Json -Depth 10 | Set-Content 'package.json'"
    
    npm install --force
    npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Fixed with version override!
        git add .
        git commit -m "Fix: Force Framer Motion 10.18.0 compatibility"
        git push origin main
        echo 🚀 DEPLOYED!
    )
)

pause
