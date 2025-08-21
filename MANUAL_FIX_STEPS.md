# Manual Fix for Node_modules Cleanup Issue

## The Problem
The node_modules directory has locked files that prevent normal deletion.

## Solution: Manual Steps

### Step 1: Close Everything
1. Close VS Code, any editors, or command prompts
2. Close any running `npm run dev` processes
3. Press `Ctrl+Shift+Esc` to open Task Manager
4. End any `node.exe` or `npm.exe` processes

### Step 2: Manual Cleanup
```cmd
# Navigate to your project
cd C:\Users\Admin\Documents\mvono-consultants-website-main

# Try to remove node_modules again
rmdir /s /q node_modules

# If it still fails, restart your computer and try again
```

### Step 3: Alternative - Skip node_modules deletion
If the deletion keeps failing, we can work around it:

```cmd
# Just delete the package-lock.json
del package-lock.json

# Install with force flag
npm install --legacy-peer-deps --force

# This will update the existing node_modules
```

### Step 4: Continue with the process
```cmd
# Test the build
npm run build

# If successful, commit and push
git add .
git commit -m "Update to Next.js 14 to fix Vercel deployment"
git push origin main
```

## Quick Fix Option

If you want to skip the cleanup entirely and just force the update:

```cmd
cd C:\Users\Admin\Documents\mvono-consultants-website-main
del package-lock.json
npm install --legacy-peer-deps --force
npm run build
git add .
git commit -m "Update to Next.js 14 to fix Vercel deployment"
git push origin main
```

This should resolve the Vercel deployment issue even without completely cleaning node_modules.

## PowerShell Alternative

Run this in PowerShell as Administrator:
```powershell
.\fix-nextjs-upgrade.ps1
```

The PowerShell script has better file handling for locked directories.
