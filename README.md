# Mvono Consultants Website

A modern, responsive website and management system for Mvono Consultants, a Kenyan consultancy firm specializing in safety, energy, and plant systems management.

## Project Overview

This project consists of two main components:

1. **Public Website**: A GigaCloud-inspired design with modern aesthetics, smooth animations, and comprehensive information about Mvono Consultants' services.

2. **Administrative Dashboard**: A complete management system for handling clients, finances, documents, and business operations.

## Implementation Phases

This project is being implemented in phases:

### Phase 1: Foundation & Public Website
- Modern responsive website with animations
- Core authentication system
- Basic admin dashboard

### Phase 2: Client & Financial Management
- Client database and management system
- Financial tracking and reporting
- Document generation (invoices, quotations, etc.)

### Phase 3: Business Operations Enhancement
- Client statements & financial features
- Subcontractor management
- Project management
- Service catalog

### Phase 4 and beyond
- Analytics & reporting
- Sales & marketing tools
- Additional specialized features

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS, GSAP for animations
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth
- **Deployment**: Vercel/Netlify

## Features

### Public Website
- Responsive design for all devices
- Animated sections with GSAP
- Service pages with detailed information
- Contact form with validation
- Client testimonials and showcase

### Administrative Dashboard
- Secure authentication
- Client management system
- Financial tracking and reporting
- Document generation (invoices, quotations, etc.)
- Project management
- And more based on implementation phase

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

## Contributing

This project is being developed according to the phased implementation plan. Please refer to the current phase of development before making contributions.

## License

This project is proprietary and not open for public use without permission.

## Contact

For any inquiries regarding this project, please contact Mvono Consultants at sales@mvonoconsultants.com.
