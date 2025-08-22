@echo off
echo =================================
echo FIXING FRAMER MOTION VERSION
echo =================================

echo.
echo Step 1: Installing correct Framer Motion version...
npm install framer-motion@10.18.0

echo.
echo Step 2: If that failed, trying alternative versions...
if %ERRORLEVEL% NEQ 0 (
    echo Trying 10.16.5...
    npm install framer-motion@10.16.5
)

if %ERRORLEVEL% NEQ 0 (
    echo Trying 10.12.0...
    npm install framer-motion@10.12.0
)

echo.
echo Step 3: Updating next.config.mjs...
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
echo       resolve: {
echo         fullySpecified: false
echo       }
echo     }^);
echo     return config;
echo   },
echo   transpilePackages: ['framer-motion'],
echo   images: {
echo     domains: ['cdn.sanity.io']
echo   }
echo };
echo.
echo export default nextConfig;
) > next.config.mjs

echo.
echo Step 4: Testing build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Deploying...
    git add .
    git commit -m "Fix: Framer Motion version compatibility"
    git push origin main
    echo.
    echo 🚀 DEPLOYED!
) else (
    echo.
    echo ❌ Build failed. Checking what Framer Motion version is currently installed...
    npm list framer-motion
    echo.
    echo Try running: npm run build
    echo to see the specific error.
)

echo.
echo =================================
echo VERSION FIX COMPLETE
echo =================================
pause
