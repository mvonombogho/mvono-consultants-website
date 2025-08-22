@echo off
echo === TESTING BUILD AFTER SANITY INSTALL ===
echo.

echo The @sanity/vision dependency has been installed.
echo Now testing the build...
echo.

npm run build

if %ERRORLEVEL% == 0 (
    echo.
    echo 🎉 COMPLETE SUCCESS! Build finished successfully!
    echo.
    echo 🚀 DEPLOYING TO GITHUB...
    git add .
    git commit -m "FINAL FIX: All import paths, dependencies, and build issues resolved"
    git push origin main
    echo.
    echo ✅ DEPLOYMENT COMPLETE!
    echo Your Mvono Consultants website should now deploy successfully on Vercel!
) else (
    echo.
    echo Let's check what specific errors remain...
    npm run build > build-errors.log 2>&1
    echo Build errors saved to build-errors.log
    echo.
    echo Most likely remaining issues could be:
    echo - More @/ import paths in deeply nested files
    echo - Missing environment variables
    echo - TypeScript compilation errors
)

pause
