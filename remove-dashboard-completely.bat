@echo off
echo Removing all dashboard and management system components...

REM Remove main dashboard directories
if exist "app\dashboard" rmdir /s /q "app\dashboard"
if exist "app\(dashboard)" rmdir /s /q "app\(dashboard)"
if exist "app\admin" rmdir /s /q "app\admin"

REM Remove API routes for dashboard
if exist "app\api\dashboard" rmdir /s /q "app\api\dashboard"
if exist "app\api\admin" rmdir /s /q "app\api\admin"
if exist "app\api\auth" rmdir /s /q "app\api\auth"
if exist "app\api\clients" rmdir /s /q "app\api\clients"
if exist "app\api\finances" rmdir /s /q "app\api\finances"
if exist "app\api\invoices" rmdir /s /q "app\api\invoices"
if exist "app\api\subcontractors" rmdir /s /q "app\api\subcontractors"
if exist "app\api\projects" rmdir /s /q "app\api\projects"
if exist "app\api\proposals" rmdir /s /q "app\api\proposals"
if exist "app\api\documents" rmdir /s /q "app\api\documents"
if exist "app\api\analytics" rmdir /s /q "app\api\analytics"

REM Remove dashboard components
if exist "components\dashboard" rmdir /s /q "components\dashboard"
if exist "components\admin" rmdir /s /q "components\admin"
if exist "components\client" rmdir /s /q "components\client"
if exist "components\finance" rmdir /s /q "components\finance"
if exist "components\invoice" rmdir /s /q "components\invoice"
if exist "components\project" rmdir /s /q "components\project"
if exist "components\proposal" rmdir /s /q "components\proposal"
if exist "components\subcontractor" rmdir /s /q "components\subcontractor"
if exist "components\competitor" rmdir /s /q "components\competitor"
if exist "components\document" rmdir /s /q "components\document"
if exist "components\analytics" rmdir /s /q "components\analytics"

REM Remove source dashboard components
if exist "src\components\dashboard" rmdir /s /q "src\components\dashboard"
if exist "src\components\admin" rmdir /s /q "src\components\admin"

REM Remove database models
if exist "models" rmdir /s /q "models"
if exist "lib\db.js" del "lib\db.js"
if exist "lib\mongodb.js" del "lib\mongodb.js"
if exist "prisma" rmdir /s /q "prisma"

REM Remove authentication middleware
if exist "middleware.ts" del "middleware.ts"
if exist "middleware.js" del "middleware.js"

REM Remove login pages
if exist "app\login" rmdir /s /q "app\login"
if exist "app\login.disabled" rmdir /s /q "app\login.disabled"

REM Clean up next.js build files
if exist ".next" rmdir /s /q ".next"

echo Dashboard and management system components removed successfully!
echo Your website is now restored to its original state.
pause
