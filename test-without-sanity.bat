@echo off
echo Temporarily removing Sanity to isolate the Invalid Version error...

echo Step 1: Testing deployment without Sanity...
copy package-no-sanity.json package.json

echo Committing package.json without Sanity...
git add package.json
git commit -m "Temporarily remove Sanity to fix Invalid Version error"

echo Pushing to test deployment...
git push origin main

echo.
echo ✅ Testing deployment without Sanity packages...
echo If this succeeds, we know Sanity is causing the Invalid Version error.
echo If it still fails, the issue is elsewhere.
echo.
echo Monitor Vercel deployment now!
pause
