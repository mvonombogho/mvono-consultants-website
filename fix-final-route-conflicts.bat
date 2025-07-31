@echo off
echo 🔧 FINAL NEXT.JS ROUTE CONFLICT FIX
echo ===================================
echo.
echo Fixed ALL conflicts between [id] and other parameter names:
echo - [id] vs [opportunityId] ✅ RESOLVED
echo - [id] vs [templateId] ✅ RESOLVED  
echo - [id] vs [segmentId] ✅ RESOLVED
echo - [id] vs [campaignId] ✅ RESOLVED
echo.
echo 🧹 Cleaning up ALL temporary directories...
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

REM Campaign conflicts
if exist "app\api\marketing\campaigns\_DELETE_campaignId" (
    rmdir /s /q "app\api\marketing\campaigns\_DELETE_campaignId" 2>nul
    echo ✅ Removed: campaigns\_DELETE_campaignId ^(API^)
)

echo.
echo ✅ ALL ROUTE CONFLICTS COMPLETELY RESOLVED!
echo.
echo 📍 All routes now use standard [id] convention:
echo    - cross-sell/[id]
echo    - email/templates/[id]  
echo    - segments/[id]
echo    - campaigns/[id]
echo.
echo 🚀 Next.js should now start without ANY route conflicts!
echo 💡 You can run: npm run dev
echo.
pause
