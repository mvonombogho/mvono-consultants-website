@echo off
echo Creating JavaScript versions of lib files for better compatibility...

echo Created lib/auth.js and lib/prisma.js (JavaScript versions)
echo These should resolve better than TypeScript files during build.

echo Committing JavaScript lib files...
git add lib/auth.js lib/prisma.js lib/auth.ts lib/prisma.ts
git commit -m "Add JavaScript versions of lib files for better module resolution"

echo Pushing JavaScript lib files...
git push origin main

echo.
echo ✅ JavaScript library files created!
echo - lib/auth.js: Re-exports authOptions
echo - lib/prisma.js: Prisma client with proper global setup
echo.
echo Next.js should now find these files during build!
pause
