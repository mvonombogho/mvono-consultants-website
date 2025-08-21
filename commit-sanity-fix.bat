@echo off
echo Committing Sanity dependency fix...

echo Committing changes...
git commit -m "Fix Sanity dependency conflicts - update @sanity/client to v7.9.0 and add .npmrc for better peer dependency resolution"

echo Pushing to GitHub...
git push origin main

echo Checking push status...
git status

echo.
echo ✅ Changes pushed! Vercel should now use:
echo    - @sanity/client: ^7.9.0 (instead of ^6.10.0)
echo    - .npmrc with legacy-peer-deps=true
echo    - This should resolve the dependency conflicts
echo.
echo Monitor your Vercel deployment now - it should work!
pause
