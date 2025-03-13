# Mvono Consultants Website

A modern, responsive website and management system for Mvono Consultants, a Kenyan consultancy firm specializing in safety, energy, and plant systems management.

## Project Overview

This project consists of two main components:

1. **Public Website**: A GigaCloud-inspired design with modern aesthetics, smooth animations, and comprehensive information about Mvono Consultants' services.

2. **Administrative Dashboard**: A complete management system for handling clients, finances, documents, and business operations.

## Current Status

We've implemented the following features:

### Public Website
- Modern landing page with GSAP animations
- Services page with detailed service descriptions
- About page with company history and team information
- Clients page with filtering and testimonials
- Contact page with integrated contact form

### Administrative Dashboard
- Secure login and authentication system
- Dashboard with key metrics and recent activity
- Client management (listing, details, add/edit)
- Invoice generation and management
- Comprehensive sidebar navigation

## Implementation Phases

This project is being implemented in phases:

### Phase 1: Foundation & Public Website ✅
- Modern responsive website with animations
- Core authentication system
- Basic admin dashboard

### Phase 2: Client & Financial Management ⚙️ (In Progress)
- Client database and management system
- Financial tracking and reporting
- Document generation (invoices, quotations, etc.)

### Phase 3: Business Operations Enhancement (Upcoming)
- Client statements & financial features
- Subcontractor management
- Project management
- Service catalog

### Phase 4 and beyond (Planned)
- Analytics & reporting
- Sales & marketing tools
- Additional specialized features

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS, GSAP for animations
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth
- **Deployment**: Vercel/Netlify

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/mvonombogho/mvono-consultants-website.git
   cd mvono-consultants-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/mvono_db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Initialize the database
   ```bash
   npx prisma migrate dev --name init
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Next Steps

- Complete the financial management features
- Implement project management functionality
- Add document generation for invoices, quotations, etc.
- Develop reporting and analytics features

## Contact

For any inquiries regarding this project, please contact Mvono Consultants at sales@mvonoconsultants.com.
