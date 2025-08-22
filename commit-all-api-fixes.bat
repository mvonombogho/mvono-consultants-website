@echo off
echo Committing ALL API route import fixes...

echo Fixed imports in:
echo - app/api/certifications/route.ts
echo - app/api/certifications/[id]/route.ts  
echo - app/api/clients/[id]/route.ts

git add app/api/
git commit -m "Fix ALL API route imports: use existing auth-options.js and default prisma import"

echo Pushing all API fixes...
git push origin main

echo.
echo ✅ ALL API route import fixes committed!
echo - @/lib/auth → @/lib/auth-options (uses existing file)
echo - { prisma } → prisma (uses default import)
echo.
echo This should finally resolve ALL module not found errors!
pause
