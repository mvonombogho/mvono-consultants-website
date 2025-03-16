# Mvono Consultants Website

A modern, responsive website and management system for Mvono Consultants, a Kenyan consultancy firm specializing in safety, energy, and plant systems management.

## Project Overview

This project consists of two main components:

1. **Public Website**: A GigaCloud-inspired design with modern aesthetics, smooth animations, and comprehensive information about Mvono Consultants' services.

2. **Administrative Dashboard**: A complete management system for handling clients, finances, documents, and business operations.

## Current Status

This project is being implemented in phases:

### Phase 1: Foundation & Public Website ✅
- Modern responsive website with GSAP animations
- Core authentication system
- Basic admin dashboard layout

### Phase 2: Client & Financial Management ✅
- Client database and management system
- Financial tracking and reporting
- Document generation (invoices, quotations, etc.)

### Phase 3: Business Operations Enhancement 🔄
- Client statements & financial features
- Project management
- Task tracking and visualization

### Phase 4: Analytics & Reporting 🔄
- Financial analytics
- Document repository
- Service scheduling

### Phase 5: Sales & Marketing Fundamentals 🔄
- Lead Management
- Sales Pipeline
- Proposal Management

### Phase 6: Advanced Marketing & Integration 🔄
- Marketing Campaign Management
- Customer Segmentation
- Email Integration

### Phase 7: Advanced Features & Refinement 🔄
- Industry-Specific Features
- Competitive Intelligence
- System Integration & Optimization

### Phase 8: Training & Deployment 🔄
- User Training
- Final Deployment
- Maintenance Plan

## Technologies Used

- **Frontend**: Next.js 13 (App Router), React, TailwindCSS, GSAP for animations
- **Data Visualization**: Recharts for charts and graphs
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js

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

5. Seed the database with initial data
   ```bash
   npx prisma db seed
   ```

6. Run the development server
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Admin User

After seeding the database, you can login with the following credentials:

- Email: admin@mvonoconsultants.com
- Password: Admin@123

## Contact

For any inquiries regarding this project, please contact Mvono Consultants at sales@mvonoconsultants.com.
