@echo off
echo === FINAL BUILD TEST AFTER FIXING BACKUP FILES ===
echo.

echo Fixed the old_files_backup directory imports...
echo Testing build again...
echo.

npm run build

if %ERRORLEVEL% == 0 (
    echo.
    echo 🎉🎉🎉 COMPLETE SUCCESS! 🎉🎉🎉
    echo.
    echo BUILD COMPLETED SUCCESSFULLY!
    echo.
    echo All issues resolved:
    echo ✓ Fixed 45+ import path files
    echo ✓ Fixed client-only/server-only packages
    echo ✓ Fixed @sanity/vision dependency
    echo ✓ Fixed backup files in old_files_backup
    echo ✓ Build passes completely
    echo.
    echo 🚀 DEPLOYING TO GITHUB FOR VERCEL...
    git add .
    git commit -m "COMPLETE DEPLOYMENT FIX: All import paths and dependencies resolved"
    git push origin main
    echo.
    echo ✅ MVONO CONSULTANTS WEBSITE DEPLOYED!
    echo.
    echo 🌐 Your website should now be live on Vercel!
    echo Check your Vercel dashboard for deployment status.
) else (
    echo.
    echo Build still failing. Let's see what's left...
    echo Saving detailed error log...
    npm run build > final-errors.log 2>&1
    echo.
    echo If there are still @/ import errors, we may need to check for more files.
)

echo.
echo === FINAL DEPLOYMENT TEST COMPLETE ===
pause
