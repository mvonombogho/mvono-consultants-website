@echo off
echo Committing the API route fixes...

echo The lib files are already tracked in git ✅
echo Now committing the API route import changes...

git add app/api/certifications/route.ts
git commit -m "Fix API route imports: use @/lib/auth-options instead of @/lib/auth"

echo Pushing the fix...
git push origin main

echo.
echo ✅ API route import fixes committed!
echo - Changed from @/lib/auth to @/lib/auth-options
echo - All lib files are already in the repository
echo.
echo This should finally resolve the module not found errors!
pause
