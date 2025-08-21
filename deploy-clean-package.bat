@echo off
echo Applying clean package.json to fix Invalid Version error...

echo Backing up current package.json...
copy package.json package-backup.json

echo Applying clean package.json with exact versions...
copy package-clean.json package.json

echo Removing problematic files...
if exist package-lock.json del package-lock.json
if exist .npmrc del .npmrc

echo Committing the clean package.json...
git add package.json
git commit -m "Fix Invalid Version error with clean package.json - exact Sanity versions"

echo Pushing to GitHub...
git push origin main

echo.
echo ✅ Clean package.json deployed!
echo This should fix the "Invalid Version" error on Vercel.
echo Monitor your deployment now.
pause
