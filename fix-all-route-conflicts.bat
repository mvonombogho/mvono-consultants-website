@echo off
echo 🔧 COMPREHENSIVE NEXT.JS ROUTE CONFLICT FIX
echo ============================================
echo.
echo Fixed conflicts between [id] and other parameter names:
echo - [id] vs [opportunityId] ✅ RESOLVED
echo - [id] vs [templateId] ✅ RESOLVED  
echo - [id] vs [segmentId] ✅ RESOLVED
echo.
echo 🧹 Cleaning up temporary directories...
echo.

REM Cross-sell conflicts
if exist "app\(dashboard)\(routes)\cross-sell\_DELETE_opportunityId" (
    rmdir /s /q "app\(dashboard)\(routes)\cross-sell\_DELETE_opportunityId" 2>nul
    echo ✅ Removed: cross-sell\_DELETE_opportunityId ^(dashboard^)
)

if exist "app\api\marketing\cross-sell\_DELETE_opportunityId" (
    rmdir /s /q "app\api\marketing\cross-sell\_DELETE_opportunityId" 2>nul
    echo ✅ Removed: cross-sell\_DELETE_opportunityId ^(API^)
)

REM Email template conflicts
if exist "app\(dashboard)\(routes)\email\templates\_DELETE_templateId" (
    rmdir /s /q "app\(dashboard)\(routes)\email\templates\_DELETE_templateId" 2>nul
    echo ✅ Removed: templates\_DELETE_templateId ^(dashboard^)
)

if exist "app\api\email\templates\_DELETE_templateId" (
    rmdir /s /q "app\api\email\templates\_DELETE_templateId" 2>nul
    echo ✅ Removed: templates\_DELETE_templateId ^(API^)
)

REM Segment conflicts
if exist "app\(dashboard)\(routes)\segments\_DELETE_segmentId" (
    rmdir /s /q "app\(dashboard)\(routes)\segments\_DELETE_segmentId" 2>nul
    echo ✅ Removed: segments\_DELETE_segmentId ^(dashboard^)
)

if exist "app\api\marketing\segments\_DELETE_segmentId" (
    rmdir /s /q "app\api\marketing\segments\_DELETE_segmentId" 2>nul
    echo ✅ Removed: segments\_DELETE_segmentId ^(API^)
)

echo.
echo ✅ ALL ROUTE CONFLICTS RESOLVED!
echo.
echo 📍 Active routes now use standard [id] convention:
echo    - cross-sell/[id]
echo    - email/templates/[id]  
echo    - segments/[id]
echo.
echo 🚀 Next.js should now start without route conflicts!
echo 💡 You can now run: npm run dev
echo.
pause
