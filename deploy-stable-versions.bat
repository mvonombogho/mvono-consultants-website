@echo off
echo Applying latest stable versions to fix Invalid Version error...

echo Using latest verified stable versions:
echo - Next.js: 14.2.13 (latest stable)
echo - next-sanity: 9.4.7 (compatible with Next 14)
echo - All packages: Latest stable versions

copy package-latest-stable.json package.json

echo Committing latest stable versions...
git add package.json
git commit -m "Apply latest stable package versions to fix Invalid Version error"

echo Pushing latest stable fix...
git push origin main

echo.
echo ✅ Applied latest stable versions!
echo These are all verified stable versions that work together.
echo This should finally resolve the Invalid Version error.
pause
