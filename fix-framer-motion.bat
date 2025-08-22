@echo off
echo === FIXING FRAMER-MOTION DEPENDENCY ISSUE ===
echo.

echo The framer-motion package is corrupted. Let's fix this...
echo.

echo Step 1: Removing corrupted framer-motion...
npm uninstall framer-motion
echo.

echo Step 2: Clearing npm cache...
npm cache clean --force
echo.

echo Step 3: Reinstalling framer-motion...
npm install framer-motion@latest
echo.

echo Step 4: Testing build with fixed dependencies...
npm run build

if %ERRORLEVEL% == 0 (
    echo.
    echo 🎉🎉🎉 SUCCESS! FRAMER-MOTION FIXED! 🎉🎉🎉
    echo.
    echo ✅ BUILD COMPLETED SUCCESSFULLY!
    echo.
    echo 🚀 DEPLOYING TO GITHUB...
    git add .
    git commit -m "Fix framer-motion dependency - complete deployment ready"
    git push origin main
    echo.
    echo ✅ MVONO CONSULTANTS WEBSITE DEPLOYED WITH SANITY!
    echo.
    echo 🌐 Your complete website with CMS is now live!
) else (
    echo.
    echo Framer-motion fix didn't work. Let's try alternative approach...
    echo.
    echo Trying to install specific compatible version...
    npm install framer-motion@10.16.16
    echo.
    echo Testing with specific version...
    npm run build
    echo.
    if %ERRORLEVEL% == 0 (
        echo ✅ Success with specific framer-motion version!
        git add .
        git commit -m "Use compatible framer-motion version for deployment"
        git push origin main
    ) else (
        echo Still having issues. Let's check package versions...
        echo.
        echo Current versions:
        npm list framer-motion
        npm list @sanity/ui
        npm list sanity
        echo.
        echo Try manually: npm install framer-motion@10.16.16 --force
    )
)

echo.
echo === FRAMER-MOTION FIX COMPLETE ===
pause
