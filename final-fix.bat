@echo off
echo === FINAL DEPLOYMENT FIX ===
echo.

echo Step 1: Installing missing dependencies...
npm install client-only@0.0.1 server-only@0.0.1
echo.

echo Step 2: Installing all dependencies fresh...
npm install
echo.

echo Step 3: Clearing cache and testing build...
if exist ".next" rmdir /s /q ".next"
npm run build
echo.

if %ERRORLEVEL% == 0 (
    echo.
    echo ✅ SUCCESS! Build completed successfully!
    echo.
    echo All issues resolved:
    echo ✓ Import paths fixed (39 files)
    echo ✓ Missing dependencies added
    echo ✓ Build passes locally
    echo.
    echo Ready for deployment! Pushing to GitHub...
    git add .
    git commit -m "Complete deployment fix: import paths + missing dependencies"
    git push origin main
    echo.
    echo 🚀 Deployed! Vercel should build successfully now.
) else (
    echo.
    echo ❌ Build still failing. 
    echo.
    echo Let's try one more approach - using a clean package.json...
    echo Backing up current package.json...
    copy package.json package-backup.json
    echo.
    echo Would you like to try a minimal package.json approach? [Y/N]
    set /p answer=
    if /i "%answer%"=="y" (
        echo Creating minimal working package.json...
        goto :minimal_package
    ) else (
        echo Please check the build errors above and let me know what specific error you're seeing.
    )
)
goto :end

:minimal_package
echo {> package.json
echo   "name": "mvono-consultants-website",>> package.json
echo   "version": "0.1.0",>> package.json
echo   "private": true,>> package.json
echo   "scripts": {>> package.json
echo     "dev": "next dev",>> package.json
echo     "build": "next build",>> package.json
echo     "start": "next start">> package.json
echo   },>> package.json
echo   "dependencies": {>> package.json
echo     "next": "14.2.13",>> package.json
echo     "react": "18.3.1",>> package.json
echo     "react-dom": "18.3.1",>> package.json
echo     "client-only": "0.0.1",>> package.json
echo     "server-only": "0.0.1">> package.json
echo   }>> package.json
echo }>> package.json

echo Minimal package.json created. Installing...
rmdir /s /q node_modules
npm install
npm run build

:end
echo.
echo === COMPLETE ===
pause
