@echo off
echo Fixing React version dependency conflict...

echo ✅ Invalid Version error is GONE!
echo Now fixing React 18.3+ requirement for Sanity...

echo Updating React to 18.3.1 to satisfy Sanity dependencies...
copy package-react-fixed.json package.json

echo Committing React version fix...
git add package.json
git commit -m "Fix React version: 18.2.0 → 18.3.1 to satisfy Sanity dependencies"

echo Pushing React fix...
git push origin main

echo.
echo ✅ React version updated!
echo - React: 18.2.0 → 18.3.1
echo - React-DOM: 18.2.0 → 18.3.1  
echo - @types/react: updated to 18.3.0
echo.
echo This should resolve the dependency conflict and build successfully!
pause
