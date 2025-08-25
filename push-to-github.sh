#!/bin/bash

echo "========================================"
echo "  MVONO CONSULTANTS - GITHUB PUSH SCRIPT"
echo "========================================"
echo

cd "C:/Users/Admin/Documents/mvono-consultants-website-main" 2>/dev/null || {
    echo "❌ Error: Could not change to project directory"
    echo "Please make sure you're running this from the correct location"
    exit 1
}

echo "Current directory: $(pwd)"
echo

echo "Checking git status..."
git status
echo

echo "========================================"
echo "  STAGING ALL CHANGES"
echo "========================================"
echo "Adding all files to git staging..."
git add .
echo

echo "Checking staged files..."
git status
echo

echo "========================================"
echo "  COMMITTING CHANGES"  
echo "========================================"
read -p "Enter commit message (or press Enter for default): " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Fix blog routes and add admin system - Phase 1 implementation"
fi

echo
echo "Committing with message: \"$commit_message\""
git commit -m "$commit_message"
echo

echo "========================================"
echo "  PUSHING TO GITHUB"
echo "========================================"
echo "Pushing changes to GitHub..."

if git push origin main; then
    push_success=true
    branch="main"
elif git push origin master; then
    push_success=true  
    branch="master"
else
    push_success=false
fi

if [ "$push_success" = false ]; then
    echo
    echo "❌ Push failed to both main and master branches!"
    echo
    echo "Possible solutions:"
    echo "1. Check your internet connection"
    echo "2. Verify GitHub credentials" 
    echo "3. Check if you have push permissions"
    echo "4. Check remote URL: git remote -v"
    echo
    echo "Manual commands to try:"
    echo "git remote -v"
    echo "git branch"
    echo "git push origin [your-branch-name]"
    echo
    read -p "Press Enter to continue..."
    exit 1
fi

echo
echo "✅ SUCCESS! Changes have been pushed to GitHub ($branch branch)!"
echo

echo "========================================"
echo "  PUSH SUMMARY"
echo "========================================"
echo
echo "📝 Commit Message: \"$commit_message\""
echo "🚀 Repository: Mvono Consultants Website" 
echo "📅 Time: $(date)"
echo "🌿 Branch: $branch"
echo
echo "Recent changes pushed:"
echo "✅ Fixed blog route import paths"
echo "✅ Created missing blog/[slug]/page.js"
echo "✅ Created missing blog/category/[id]/page.js"
echo "✅ Updated blog layout with navbar"
echo "✅ Added admin system foundation"  
echo "✅ Enhanced project structure"
echo
echo "🌐 Your changes should now be live on GitHub!"
echo
read -p "Press Enter to continue..."
