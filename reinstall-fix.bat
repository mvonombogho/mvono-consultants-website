@echo off
echo =================================
echo REINSTALL AND FIX
echo =================================

echo.
echo Step 1: Cleaning everything...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo.
echo Step 2: Installing fresh dependencies...
npm install

echo.
echo Step 3: Checking if Next.js is installed...
npm list next

echo.
echo Step 4: Creating webpack fix...
(
echo /** @type {import^('next'^).NextConfig} */
echo const nextConfig = {
echo   experimental: { esmExternals: 'loose' },
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
echo Step 5: Testing build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ SUCCESS! Deploying...
    git add .
    git commit -m "Fix: Reinstall dependencies and webpack config"
    git push origin main
    echo 🚀 DEPLOYED!
) else (
    echo ❌ Build failed. Checking what's wrong...
    echo.
    echo Checking Next.js installation...
    npm list next
    echo.
    echo Trying to install Next.js specifically...
    npm install next@14.2.13
    npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Fixed by reinstalling Next.js!
        git add .
        git commit -m "Fix: Reinstall Next.js"
        git push origin main
        echo 🚀 DEPLOYED!
    )
)

echo.
echo =================================
echo REINSTALL COMPLETE
echo =================================
pause
