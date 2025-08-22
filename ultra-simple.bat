@echo off
echo =================================
echo ULTRA SIMPLE FIX
echo =================================

echo Step 1: Just fixing next.config.mjs...
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
echo Step 2: Testing build immediately...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ WORKS! Deploying now...
    git add .
    git commit -m "Fix: webpack config for framer-motion"
    git push origin main
    echo 🚀 DEPLOYED!
) else (
    echo ❌ Still failing. Manual fix needed.
)

pause
