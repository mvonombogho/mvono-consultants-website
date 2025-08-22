@echo off
echo Installing missing client-only dependency...
npm install client-only server-only

echo Testing build...
npm run build

if %ERRORLEVEL% == 0 (
    echo Build successful! Pushing to GitHub...
    git add .
    git commit -m "Add missing client-only dependency and fix import paths"
    git push origin main
) else (
    echo Build still failing. Running full dependency refresh...
    rmdir /s /q node_modules
    npm install
    npm run build
)
