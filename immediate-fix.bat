@echo off
echo =================================
echo IMMEDIATE WEBPACK FIX
echo =================================

echo Fixing webpack config without deleting anything...

echo /** @type {import('next').NextConfig} */ > next.config.mjs
echo const nextConfig = { >> next.config.mjs
echo   experimental: { esmExternals: 'loose' }, >> next.config.mjs
echo   webpack: (config) =^> { >> next.config.mjs
echo     config.resolve.alias = { ...config.resolve.alias, 'framer-motion': require.resolve('framer-motion') }; >> next.config.mjs
echo     config.module.rules.push({ test: /\.mjs$/, type: 'javascript/auto', resolve: { fullySpecified: false } }); >> next.config.mjs
echo     return config; >> next.config.mjs
echo   }, >> next.config.mjs
echo   transpilePackages: ['framer-motion'], >> next.config.mjs
echo   images: { domains: ['cdn.sanity.io'] } >> next.config.mjs
echo }; >> next.config.mjs
echo export default nextConfig; >> next.config.mjs

echo.
echo Installing compatible framer-motion...
npm install framer-motion@10.18.0

echo.
echo Building...
npm run build

if %ERRORLEVEL% EQU 0 (
    git add . && git commit -m "Fix webpack config" && git push origin main
    echo ✅ DEPLOYED!
) else (
    echo ❌ Failed - check errors
)

pause
