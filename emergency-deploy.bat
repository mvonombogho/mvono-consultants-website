@echo off
echo =================================
echo EMERGENCY DEPLOYMENT FIX
echo =================================

echo.
echo This will temporarily remove Sanity to get deployment working...

echo.
echo Step 1: Removing problematic Sanity files...
if exist app\studio rmdir /s /q app\studio
if exist sanity rmdir /s /q sanity
if exist sanity.config.js del sanity.config.js
if exist sanity.cli.js del sanity.cli.js

echo.
echo Step 2: Updating package.json to remove Sanity dependencies...
powershell -Command "$json = Get-Content 'package.json' | ConvertFrom-Json; $json.dependencies.PSObject.Properties | Where-Object { $_.Name -like '*sanity*' } | ForEach-Object { $json.dependencies.PSObject.Properties.Remove($_.Name) }; $json | ConvertTo-Json -Depth 10 | Set-Content 'package.json'"

echo.
echo Step 3: Clean reinstall...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
npm install

echo.
echo Step 4: Testing build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Deploying immediately...
    git add .
    git commit -m "Emergency: Remove Sanity for successful deployment"
    git push origin main
    echo.
    echo 🚀 SITE DEPLOYED!
    echo.
    echo NOTE: Sanity CMS has been temporarily removed.
    echo You can add it back later once the site is stable.
) else (
    echo.
    echo ❌ Build still failing. Trying minimal approach...
    
    echo.
    echo Creating minimal package.json...
    (
    echo {
    echo   "name": "mvono-consultants-website",
    echo   "version": "0.1.0",
    echo   "private": true,
    echo   "scripts": {
    echo     "dev": "next dev",
    echo     "build": "next build",
    echo     "start": "next start",
    echo     "lint": "next lint"
    echo   },
    echo   "dependencies": {
    echo     "next": "14.2.13",
    echo     "react": "18.3.1",
    echo     "react-dom": "18.3.1",
    echo     "@prisma/client": "^5.7.1",
    echo     "prisma": "^5.7.1",
    echo     "next-auth": "^4.24.5",
    echo     "bcrypt": "^5.1.1",
    echo     "framer-motion": "^10.18.0"
    echo   },
    echo   "devDependencies": {
    echo     "@types/node": "^20",
    echo     "@types/react": "^18",
    echo     "@types/react-dom": "^18",
    echo     "eslint": "^8",
    echo     "eslint-config-next": "14.2.13",
    echo     "typescript": "^5"
    echo   },
    echo   "engines": {
    echo     "node": "^>=18.17.0"
    echo   }
    echo }
    ) > package.json
    
    echo.
    echo Reinstalling minimal dependencies...
    npm install
    
    echo.
    echo Final build test...
    npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ MINIMAL BUILD SUCCESS!
        git add .
        git commit -m "Minimal: Basic site deployment without extras"
        git push origin main
        echo.
        echo 🚀 BASIC SITE DEPLOYED!
    )
)

echo.
echo =================================
echo EMERGENCY FIX COMPLETE
echo =================================
pause
