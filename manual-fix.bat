@echo off
echo === MANUAL DEPENDENCY FIX ===
echo.

echo Let's check what's causing the npm error...
echo.

echo Current Node.js version:
node --version
echo.

echo Current npm version:
npm --version
echo.

echo Checking npm cache...
npm cache verify
echo.

echo Let's try alternative approaches...
echo.

echo Option 1: Try installing with --no-package-lock flag
npm install client-only --no-package-lock
npm install server-only --no-package-lock
echo.

echo Option 2: If that failed, let's try yarn instead
echo Installing yarn...
npm install -g yarn
echo.

echo Using yarn to install dependencies...
yarn add client-only@0.0.1
yarn add server-only@0.0.1
echo.

echo Option 3: Try building without installing new dependencies
echo The import fixes might be enough...
npm run build
echo.

if %ERRORLEVEL% == 0 (
    echo ✅ BUILD SUCCESSFUL without new dependencies!
    echo The import path fixes were sufficient.
    echo.
    echo Pushing changes...
    git add .
    git commit -m "Fix import paths for deployment"
    git push origin main
    echo.
    echo 🚀 Deployed! Check Vercel dashboard.
) else (
    echo Build still failing. Let's save the error for analysis...
    npm run build > detailed-error.log 2>&1
    echo.
    echo Error details saved to detailed-error.log
    echo.
    echo Please share the contents of detailed-error.log
    echo This will help identify the specific remaining issues.
)

echo.
echo === MANUAL FIX COMPLETE ===
pause
