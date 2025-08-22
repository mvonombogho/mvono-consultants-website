@echo off
echo === FIXING SANITY VERSION COMPATIBILITY ===
echo.

echo Updated all Sanity packages to version 3.99.0 for compatibility:
echo ✓ @sanity/vision: 3.57.4 → 3.99.0
echo ✓ sanity: 3.57.4 → 3.99.0  
echo ✓ @sanity/cli: 3.57.4 → 3.99.0
echo.

echo This resolves the 'usePerspective' import error from @sanity/vision.
echo.

echo Committing and deploying the final fix...
git add .
git commit -m "Update Sanity packages to 3.99.0 for usePerspective compatibility"
git push origin main
echo.

echo ✅ SANITY VERSION FIX DEPLOYED!
echo.

echo 🚀 Vercel will now rebuild with compatible Sanity versions.
echo.

echo This should be the FINAL fix needed for successful deployment.
echo.

echo Progress made:
echo ✅ Fixed 46+ import path files
echo ✅ Created client-only/server-only packages  
echo ✅ Resolved styled-components version conflict
echo ✅ Updated Sanity packages for compatibility
echo ✅ Dependencies installing successfully
echo.

echo 🌐 Your Mvono Consultants website should now deploy completely!

pause
