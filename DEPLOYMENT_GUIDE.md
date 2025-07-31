# Mvono Consultants Website - Deployment Guide

## Quick GitHub Setup

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and log in
2. Click "New Repository" or go to [https://github.com/new](https://github.com/new)
3. Name your repository (e.g., `mvono-consultants-website`)
4. Set it to Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we have our own)
6. Click "Create Repository"

### 2. Push Your Code
1. Open Command Prompt in your project folder
2. Run: `push-to-github-enhanced.bat`
3. Follow the prompts to enter your GitHub username and repository name
4. The script will handle the rest!

## Alternative Manual Method

If the batch script doesn't work, use these commands:

```bash
# Initialize git (if not done)
git init

# Set your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Configure git (replace with your info)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Mvono Consultants website"

# Push to GitHub
git branch -M main
git push -u origin main
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Go to [Vercel](https://vercel.com)
2. Connect your GitHub account
3. Import your repository
4. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: Your secret key
   - `NEXTAUTH_URL`: Your production URL
5. Deploy!

### Option 2: Netlify
1. Go to [Netlify](https://netlify.com)
2. Connect GitHub and select your repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in site settings

### Option 3: GitHub Pages (Static only)
1. In your GitHub repository, go to Settings > Pages
2. Select source: Deploy from a branch
3. Choose `main` branch
4. Note: This won't work for the full app (only static parts)

## Environment Variables for Production

Create these in your deployment platform:

```
MONGODB_URI=your_production_mongodb_uri
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://your-domain.com
```

## Project Structure

```
mvono-consultants-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Admin dashboard
│   ├── login/            # Authentication
│   └── (pages)/          # Public pages
├── components/           # Reusable components
├── lib/                 # Utility functions
├── prisma/              # Database schema
├── public/              # Static assets
└── sanity/              # CMS configuration
```

## Key Features Implemented

✅ **Website & Design**
- Modern responsive design inspired by GigaCloud
- Professional animations and transitions
- Mobile-optimized interface

✅ **Authentication System**
- NextAuth with credentials provider
- Role-based access control
- Secure admin routes

✅ **Admin Dashboard**
- Client management system
- Financial tracking
- Document generation
- Analytics dashboard

✅ **Business Management**
- Invoice generation (PDF/Excel)
- Quotation system
- Client statements
- Expense tracking

✅ **Content Management**
- Sanity CMS integration
- Blog system
- SEO optimization

✅ **Integrations**
- EmailJS contact forms
- WhatsApp chat widget
- Google Business integration

## Test Credentials

For development/testing:
- Email: `admin@mvonoconsultants.com`
- Password: `Test@123`

## Support

If you need help:
1. Check the documentation files in the project
2. Review the implementation guides
3. Check GitHub issues
4. Contact technical support

## Security Notes

- Never commit `.env` files to GitHub
- Use strong passwords in production
- Regularly update dependencies
- Enable 2FA on GitHub and deployment platforms
