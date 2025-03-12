# Mvono Consultants Website & Management System

A modern website and comprehensive management system for Mvono Consultants, a safety, energy, and plant management consultancy firm based in Kenya.

## Features

- Modern responsive design inspired by GigaCloud with smooth animations using GSAP
- Authentication system with Next-Auth
- Administrative dashboard for complete business management
- Client and subcontractor management
- Financial tracking and document generation
- Sales and marketing management
- Project management and service catalog
- Advanced analytics and reporting

## Technology Stack

- Next.js with TypeScript
- Tailwind CSS for styling
- GSAP for animations
- Next-Auth for authentication
- Prisma ORM for database management (coming soon)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/mvonombogho/mvono-consultants-website.git
   cd mvono-consultants-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Authentication

For testing purposes, use the following credentials:

- Email: admin@mvonoconsultants.com
- Password: password123

## Project Implementation Phases

The project is being implemented in phases:

1. **Phase 1: Foundation & Public Website** (Current)
   - Modern public website with animations
   - Core authentication
   - Basic admin dashboard

2. **Phase 2: Client & Financial Management** (Upcoming)
   - Client management system
   - Financial management basics
   - Document generation system

3. **Phase 3-8: Additional Features** (Future)
   - Business operations enhancement
   - Analytics & reporting
   - Sales & marketing
   - Advanced marketing & integration
   - Industry-specific features
   - Training & deployment

## License

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use is strictly prohibited.
