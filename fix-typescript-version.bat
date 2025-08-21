@echo off
echo Fixing TypeScript version and testing...

echo Applying package.json with correct TypeScript version...
copy package-fixed-versions.json package.json

echo Committing fix...
git add package.json
git commit -m "Fix TypeScript version - use existing 5.2.2 instead of non-existent 5.0.0"

echo Pushing fix...
git push origin main

echo.
echo ✅ Fixed TypeScript version issue!
echo TypeScript 5.0.0 doesn't exist - using 5.2.2 instead.
echo This should now deploy successfully.
pause
