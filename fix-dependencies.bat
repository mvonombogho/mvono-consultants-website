@echo off
echo === FIXING MISSING DEPENDENCIES ===
echo.

echo Step 1: Installing missing client-only module...
npm install client-only
echo.

echo Step 2: Installing server-only module (often needed together)...
npm install server-only
echo.

echo Step 3: Checking for other potential missing dependencies...
npm install react@18.3.1 react-dom@18.3.1
npm install next@14.2.13
echo.

echo Step 4: Clearing all caches...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"
npm cache clean --force
echo.

echo Step 5: Reinstalling all dependencies fresh...
rmdir /s /q node_modules
npm install
echo.

echo Step 6: Testing build again...
npm run build
echo.

if %ERRORLEVEL% == 0 (
    echo.
    echo ✓ SUCCESS! Build completed after dependency fixes.
    echo.
    echo Pushing to GitHub for deployment...
    git add .
    git commit -m "Fix dependencies and import paths for Vercel deployment"
    git push origin main
    echo.
    echo ✓ Changes pushed! Vercel should deploy successfully now.
) else (
    echo.
    echo ✗ Still having build issues. Let's try a nuclear option...
    echo.
    echo Creating minimal package.json for testing...
    
    echo { > package-minimal-test.json
    echo   "name": "mvono-consultants-website", >> package-minimal-test.json
    echo   "version": "0.1.0", >> package-minimal-test.json
    echo   "private": true, >> package-minimal-test.json
    echo   "scripts": { >> package-minimal-test.json
    echo     "dev": "next dev", >> package-minimal-test.json
    echo     "build": "next build", >> package-minimal-test.json
    echo     "start": "next start" >> package-minimal-test.json
    echo   }, >> package-minimal-test.json
    echo   "dependencies": { >> package-minimal-test.json
    echo     "next": "14.2.13", >> package-minimal-test.json
    echo     "react": "18.3.1", >> package-minimal-test.json
    echo     "react-dom": "18.3.1", >> package-minimal-test.json
    echo     "client-only": "^0.0.1", >> package-minimal-test.json
    echo     "server-only": "^0.0.1" >> package-minimal-test.json
    echo   } >> package-minimal-test.json
    echo } >> package-minimal-test.json
    
    echo.
    echo Minimal package.json created. You can try:
    echo 1. Copy package-minimal-test.json to package.json
    echo 2. Run: npm install
    echo 3. Run: npm run build
)

echo.
echo === DEPENDENCY FIX COMPLETE ===
pause
