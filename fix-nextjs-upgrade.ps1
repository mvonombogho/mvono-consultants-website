# PowerShell script for robust cleanup and upgrade
Write-Host "Starting Next.js 14 upgrade and deployment fix..." -ForegroundColor Green

# Stop any running Node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "npm" -ErrorAction SilentlyContinue | Stop-Process -Force

Start-Sleep -Seconds 2

# Function to force delete directory
function Remove-DirectoryForce {
    param([string]$Path)
    
    if (Test-Path $Path) {
        Write-Host "Removing $Path..." -ForegroundColor Yellow
        try {
            Remove-Item -Path $Path -Recurse -Force -ErrorAction Stop
        }
        catch {
            Write-Host "Using alternative removal method..." -ForegroundColor Yellow
            cmd /c "rmdir /s /q `"$Path`""
            
            if (Test-Path $Path) {
                # Last resort - use robocopy
                $tempDir = "temp_empty_" + (Get-Random)
                New-Item -ItemType Directory -Path $tempDir | Out-Null
                robocopy $tempDir $Path /mir /nfl /ndl /njh /njs /nc /ns /np | Out-Null
                Remove-Item -Path $tempDir -Force
                Remove-Item -Path $Path -Recurse -Force -ErrorAction SilentlyContinue
            }
        }
    }
}

# Clean directories
Remove-DirectoryForce "node_modules"
Remove-DirectoryForce ".next"

# Remove lock file
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force
}

Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Installing dependencies..." -ForegroundColor Green
$installResult = npm install --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
    Write-Host "Trying with additional flags..." -ForegroundColor Yellow
    npm install --legacy-peer-deps --no-optional
}

Write-Host "Testing build..." -ForegroundColor Green
$buildResult = npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Please check the output above." -ForegroundColor Red
    Read-Host "Press Enter to continue anyway or Ctrl+C to stop"
}

Write-Host "Committing changes..." -ForegroundColor Green
git add .
git commit -m "Update to Next.js 14 to fix Vercel deployment dependency conflicts"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push origin main

Write-Host "Deployment fix complete! Check Vercel for successful deployment." -ForegroundColor Green
Read-Host "Press Enter to close"
