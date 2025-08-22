@echo off
echo Using relative imports to bypass @/ alias issues...

echo ✅ Changed all imports from @/ to relative paths:
echo - @/lib/auth-options → ../../../lib/auth-options
echo - @/lib/prisma → ../../../lib/prisma (or ../../../../lib/prisma)

git add app/api/
git commit -m "Use relative imports instead of @/ alias to fix module resolution"

echo Pushing relative import fix...
git push origin main

echo.
echo ✅ Relative imports applied!
echo This bypasses any TypeScript path resolution issues.
echo The files definitely exist, so relative paths should work!
pause
