@echo off
echo 🔧 Fixing Next.js Dynamic Route Conflict
echo =========================================
echo.
echo Problem: Conflicting dynamic routes with different parameter names
echo - [id] vs [opportunityId] in the same path
echo.
echo Solution: Removing duplicate [opportunityId] directories
echo - Keeping [id] versions (standard convention)
echo - Both versions are functionally identical
echo.

REM Remove the conflicting directories
echo Removing conflicting directories...

REM Dashboard route
if exist "app\(dashboard)\(routes)\cross-sell\[opportunityId]" (
    rmdir /s /q "app\(dashboard)\(routes)\cross-sell\[opportunityId]"
    echo ✅ Removed: app\(dashboard)\(routes)\cross-sell\[opportunityId]
)

REM API route
if exist "app\api\marketing\cross-sell\[opportunityId]" (
    rmdir /s /q "app\api\marketing\cross-sell\[opportunityId]"
    echo ✅ Removed: app\api\marketing\cross-sell\[opportunityId]
)

echo.
echo ✅ Conflict resolved!
echo 📍 Keeping these working routes:
echo    - app\(dashboard)\(routes)\cross-sell\[id]
echo    - app\api\marketing\cross-sell\[id]
echo.
echo 🚀 You can now run: npm run dev
echo.
pause
