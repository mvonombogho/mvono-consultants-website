@echo off
echo SOLUTION FOUND: Removing corrupted package-lock.json...

echo The issue is a corrupted package-lock.json file with malformed versions.
echo Solution from Vercel Community: Remove package-lock.json entirely.

echo Step 1: Removing package-lock.json...
if exist package-lock.json (
    del package-lock.json
    echo ✅ Deleted package-lock.json
) else (
    echo No package-lock.json found
)

echo Step 2: Adding package-lock.json to .gitignore temporarily...
echo package-lock.json >> .gitignore

echo Step 3: Committing the removal...
git add .
git commit -m "SOLUTION: Remove corrupted package-lock.json - let Vercel generate fresh one"

echo Step 4: Pushing the fix...
git push origin main

echo.
echo ✅ SOLUTION APPLIED!
echo - Corrupted package-lock.json removed
echo - Vercel will generate a fresh lock file
echo - This should finally fix the Invalid Version error!
pause
