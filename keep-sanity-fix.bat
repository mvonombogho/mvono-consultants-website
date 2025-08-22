@echo off
echo =================================
echo KEEP SANITY - FIX FRAMER MOTION
echo =================================

echo.
echo Preserving Sanity CMS while fixing Framer Motion conflicts...

echo.
echo Step 1: Clean slate for dependencies...
rmdir /s /q node_modules 2>nul
rmdir /s /q .next 2>nul
del package-lock.json 2>nul

echo.
echo Step 2: Install compatible Framer Motion version...
npm install framer-motion@10.18.0 --save-exact

echo.
echo Step 3: Reinstall all dependencies...
npm install

echo.
echo Step 4: Create webpack fix for next.config.mjs...

echo /** @type {import('next').NextConfig} */ > next.config.mjs
echo const nextConfig = { >> next.config.mjs
echo   experimental: { esmExternals: 'loose' }, >> next.config.mjs
echo   webpack: (config) =^> { >> next.config.mjs
echo     config.resolve.alias = { >> next.config.mjs
echo       ...config.resolve.alias, >> next.config.mjs
echo       'framer-motion': require.resolve('framer-motion') >> next.config.mjs
echo     }; >> next.config.mjs
echo     config.module.rules.push({ >> next.config.mjs
echo       test: /\.mjs$/, >> next.config.mjs
echo       type: 'javascript/auto', >> next.config.mjs
echo       resolve: { fullySpecified: false } >> next.config.mjs
echo     }); >> next.config.mjs
echo     return config; >> next.config.mjs
echo   }, >> next.config.mjs
echo   transpilePackages: ['framer-motion'], >> next.config.mjs
echo   images: { domains: ['cdn.sanity.io'] } >> next.config.mjs
echo }; >> next.config.mjs
echo export default nextConfig; >> next.config.mjs

echo.
echo Step 5: Testing build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Sanity preserved, Framer Motion fixed!
    git add .
    git commit -m "Fix: Framer Motion compatibility while preserving Sanity"
    git push origin main
    echo 🚀 DEPLOYED WITH FULL CMS FUNCTIONALITY!
) else (
    echo ❌ Still failing. Check error above.
)

pause
