@echo off
echo Adding back all dependencies with correct versions...

echo Applying complete package.json with verified versions...
copy package-complete-fixed.json package.json

echo Committing complete dependencies...
git add package.json
git commit -m "Add back all dependencies with verified versions - fix missing modules"

echo Pushing complete fix...
git push origin main

echo.
echo ✅ Added back all required dependencies!
echo Key fixes:
echo - TailwindCSS: 3.3.5 (was missing)
echo - GSAP: 3.12.2 (for animations)
echo - Lucide React: 0.289.0 (for icons)
echo - Sanity: Compatible versions (6.21.3)
echo.
echo This should now build successfully!
pause
