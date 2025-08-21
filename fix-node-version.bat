@echo off
echo Adding Node.js version specification to fix Invalid Version error...

echo Step 1: Adding engines field to package.json...
copy package-with-engines.json package.json

echo Step 2: Created .nvmrc file with Node.js 18.17.0...
echo .nvmrc created: 
type .nvmrc

echo Step 3: Committing Node.js version requirements...
git add package.json .nvmrc
git commit -m "Add Node.js version requirement (18.17.0+) to fix Invalid Version error"

echo Step 4: Pushing Node.js version fix...
git push origin main

echo.
echo ✅ Added Node.js version requirements!
echo Vercel will now use Node.js 18.17.0+ which should fix the Invalid Version error.
echo.
echo If this still fails, we'll need to check Vercel project settings.
pause
