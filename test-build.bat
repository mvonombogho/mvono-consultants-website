@echo off
echo Testing build after import fixes...
echo.

echo Clearing cache...
if exist ".next" rmdir /s /q ".next"
echo.

echo Running build...
npm run build

if %ERRORLEVEL% == 0 (
    echo.
    echo ✓ SUCCESS! Build completed without errors.
    echo Ready for deployment to Vercel.
    echo.
    echo Would you like to commit and push? [Y/N]
    set /p answer=
    if /i "%answer%"=="y" (
        git add .
        git commit -m "Fix all import paths - 39 files updated for Vercel deployment"
        git push origin main
        echo.
        echo ✓ Changes pushed! Vercel should auto-deploy now.
    )
) else (
    echo.
    echo ✗ Build failed. Let's check the specific errors...
    echo.
    echo Running detailed error check...
    npm run build > build-error-log.txt 2>&1
    echo Error details saved to build-error-log.txt
    echo.
    echo Please share the contents of build-error-log.txt for further diagnosis.
)

pause
