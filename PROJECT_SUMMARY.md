# Mvono Consultants Website & Management System: Project Summary

## Project Overview

This project is developing a modern, animated website with an integrated admin dashboard and management system for Mvono Consultants, a Kenyan safety, energy, and plant management consultancy firm. The website is inspired by the GigaCloud design style and incorporates smooth animations using GSAP.

## Current Progress

### Phase 1: Foundation & Public Website (Completed)
- **Public Website**
  - Modern responsive design with GigaCloud-inspired animations
  - Hero section with animated background and particles
  - Services showcase with animated cards
  - Value proposition section with interactive elements
  - About section highlighting company history and core values
  - Clients showcase section
  - Contact form with validation

- **Authentication System**
  - NextAuth implementation with credentials provider
  - Route protection via middleware
  - Login page with secure authentication
  - Role-based access control

- **Admin Dashboard**
  - Responsive sidebar navigation
  - Dashboard overview with statistics and recent activities
  - Interactive charts and analytics visualizations
  - Account settings with tabbed sections
  - Mobile-friendly responsive design

### Phase 2: Client & Financial Management (In Progress)
- **Client Management System** ✓
  - Comprehensive client database
  - Real-time client management with API integration
  - Client data context for state management
  - Add, edit, view, and delete functionality
  - Search and filtering capabilities
  - Client history tracking

- **Database Connection** ✓
  - Prisma ORM setup and configuration
  - Database schema definition
  - API routes for CRUD operations
  - Client data persistence

- **In Progress**
  - Financial management system
  - Invoice generation
  - Document generation system

## Architecture & Technical Implementation

### Frontend
- Next.js App Router for modern page routing and API routes
- TypeScript for type safety and better developer experience
- Tailwind CSS for responsive design
- GSAP for smooth animations
- React Context API for state management
- Form validation with client-side error handling

### Backend
- Next.js API routes for server-side logic
- Prisma ORM for database interactions
- PostgreSQL database
- NextAuth.js for authentication and session management

### Database Schema
- Users table for authentication
- Clients table for client management
- Projects table for project tracking
- Invoices table for financial management
- Structured relationships between entities

## Next Steps

1. **Complete Phase 2**
   - Implement invoice management
   - Develop quotation system
   - Create delivery note functionality
   - Build financial reporting

2. **Phase 3: Business Operations Enhancement**
   - Client statements & financial features
   - Subcontractor management
   - Project management
   - Service catalog

## Getting Started

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/mvonombogho/mvono-consultants-website.git
   cd mvono-consultants-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mvono_db?schema=public"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Authentication

For testing purposes, use the following credentials:

- Email: admin@mvonoconsultants.com
- Password: password123

## Development Team

This project is being developed for Mvono Consultants, a safety, energy, and plant management consultancy firm based in Kenya.
