@echo off
echo =================================
echo SIMPLE FRAMER MOTION FIX
echo =================================

echo.
echo Step 1: Reading current package.json...
if exist package-backup.json del package-backup.json
copy package.json package-backup.json

echo.
echo Step 2: Manually adding version overrides...

REM Create a simple PowerShell script to fix package.json
(
echo $pkg = Get-Content 'package.json' ^| ConvertFrom-Json
echo if ^(-not $pkg.resolutions^) { 
echo     $pkg ^| Add-Member -Type NoteProperty -Name 'resolutions' -Value @{} 
echo }
echo $pkg.resolutions.'framer-motion' = '11.0.8'
echo $pkg ^| ConvertTo-Json -Depth 10 ^| Set-Content 'package.json'
) > fix-package.ps1

powershell -ExecutionPolicy Bypass -File fix-package.ps1
del fix-package.ps1

echo.
echo Step 3: Clean install...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo Step 4: Installing with forced resolution...
npm install

echo.
echo Step 5: Creating next.config.mjs...
(
echo /** @type {import^('next'^).NextConfig} */
echo const nextConfig = {
echo   experimental: { esmExternals: 'loose' },
echo   webpack: ^(config^) =^> {
echo     config.resolve.alias = { ...config.resolve.alias, 'framer-motion': require.resolve^('framer-motion'^) };
echo     config.module.rules.push^({ test: /\.mjs$/, type: 'javascript/auto', resolve: { fullySpecified: false } }^);
echo     return config;
echo   },
echo   transpilePackages: ['framer-motion']
echo };
echo export default nextConfig;
) > next.config.mjs

echo.
echo Step 6: Testing build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ SUCCESS! Deploying...
    git add .
    git commit -m "Fix: Framer Motion version conflicts resolved"
    git push origin main
    echo 🚀 DEPLOYED!
) else (
    echo ❌ Build failed. Restoring backup...
    copy package-backup.json package.json
    echo Check errors above.
)

pause
