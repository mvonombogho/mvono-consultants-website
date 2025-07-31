@echo off
echo 🧹 Cleaning up temporary directories...
echo.

REM Remove the renamed directories completely
if exist "app\(dashboard)\(routes)\cross-sell\_DELETE_opportunityId" (
    rmdir /s /q "app\(dashboard)\(routes)\cross-sell\_DELETE_opportunityId"
    echo ✅ Removed: _DELETE_opportunityId directory from dashboard routes
)

if exist "app\api\marketing\cross-sell\_DELETE_opportunityId" (
    rmdir /s /q "app\api\marketing\cross-sell\_DELETE_opportunityId"
    echo ✅ Removed: _DELETE_opportunityId directory from API routes
)

echo.
echo ✅ Cleanup complete!
echo 📍 Active routes:
echo    - app\(dashboard)\(routes)\cross-sell\[id]
echo    - app\api\marketing\cross-sell\[id]
echo.
pause
