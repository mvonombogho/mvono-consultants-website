# GitHub Push Scripts for Mvono Consultants Website

I've created 3 different scripts to push your changes to GitHub:

## 1. `push-to-github.bat` (Windows - Interactive)
**Best for most users** - Full featured script with:
- ✅ Status checks before pushing
- ✅ Custom commit message input
- ✅ Detailed success/error feedback
- ✅ Tries both `main` and `master` branches
- ✅ Shows summary of what was pushed

**How to use:**
```bash
# Double-click the file or run in Command Prompt
push-to-github.bat
```

## 2. `push-to-github.sh` (Git Bash/Linux - Interactive)
Same features as the .bat file but for Git Bash or Linux environments.

**How to use:**
```bash
# In Git Bash
./push-to-github.sh
```

## 3. `quick-push.bat` (Windows - No Prompts)
**Fast automated push** - No questions asked:
- ✅ Stages all changes
- ✅ Uses default commit message
- ✅ Pushes immediately
- ✅ Shows brief success/failure message

**How to use:**
```bash
# Double-click for instant push
quick-push.bat
```

## What Gets Pushed:
All your recent changes including:
- 🔧 Fixed blog route imports (`../lib/` instead of `../../lib/`)
- 📄 Created missing `blog/[slug]/page.js`
- 📁 Created missing `blog/category/[id]/page.js`
- 🎨 Updated blog layout with proper navbar
- ⚙️ Added admin system foundation (login, dashboard, client management)
- 📁 Enhanced project structure

## Troubleshooting:
If push fails, check:
1. **Internet connection**
2. **GitHub credentials** (username/password or token)
3. **Repository permissions** (can you push to this repo?)
4. **Branch name** - might be `master` instead of `main`

## Quick Test:
Run this first to check your git setup:
```bash
git remote -v
git status
git branch
```

**Recommended:** Use `push-to-github.bat` for the first push to see any issues!
