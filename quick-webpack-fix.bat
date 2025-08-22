@echo off
echo Updating next.config.mjs...

echo /** @type {import('next').NextConfig} */ > next.config.mjs
echo const nextConfig = { >> next.config.mjs
echo   experimental: { esmExternals: 'loose' }, >> next.config.mjs
echo   webpack: (config) =^> { >> next.config.mjs
echo     config.resolve.alias = { ...config.resolve.alias, 'framer-motion': require.resolve('framer-motion') }; >> next.config.mjs
echo     return config; >> next.config.mjs
echo   }, >> next.config.mjs
echo   transpilePackages: ['framer-motion'] >> next.config.mjs
echo }; >> next.config.mjs
echo export default nextConfig; >> next.config.mjs

npm install framer-motion@10.18.0
npm run build

if %ERRORLEVEL% EQU 0 (
    git add .
    git commit -m "Fix framer-motion webpack issue"
    git push origin main
    echo DEPLOYED!
)
pause
