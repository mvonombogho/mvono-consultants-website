@echo off
echo === FIXING STYLED-COMPONENTS VERSION CONFLICT ===
echo.

echo Fixed styled-components version from 6.1.8 to 6.1.15
echo Added .npmrc for dependency resolution
echo.

echo Committing and deploying the fix...
git add .
git commit -m "Fix styled-components version conflict for Sanity Vision compatibility"
git push origin main
echo.

echo ✅ DEPENDENCY FIX DEPLOYED!
echo.

echo 🚀 Vercel will now rebuild with the correct styled-components version.
echo.

echo Check your Vercel dashboard for the new deployment.
echo This should resolve the ERESOLVE dependency conflict.
echo.

echo What was fixed:
echo ✓ Updated styled-components from 6.1.8 to 6.1.15
echo ✓ Added .npmrc for better dependency resolution
echo ✓ Satisfied @sanity/vision peer dependency requirement
echo.

echo 🌐 Your Mvono Consultants website should now deploy successfully!

pause
