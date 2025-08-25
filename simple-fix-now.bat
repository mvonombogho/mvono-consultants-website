@echo off
cd /d "C:\Users\Admin\Documents\mvono-consultants-website-main"

echo Simple fix: Replace complex blog pages with placeholders
git add .
git commit -m "Simple fix: Replace complex imports with placeholders for Vercel"
git push origin main || git push origin master

echo Done! Vercel should deploy now.
pause
