# Mvono Consultants Website & Management System

A comprehensive business management platform for Mvono Consultants, a leading safety, energy, and plant management consultancy in Kenya.

## 🌟 Features

### 🌐 Professional Website
- **Modern Design**: Inspired by GigaCloud with smooth animations
- **Responsive**: Perfect on all devices (desktop, tablet, mobile)
- **SEO Optimized**: Enhanced search engine visibility
- **Fast Loading**: Optimized performance and images

### 🔐 Admin Dashboard
- **Secure Authentication**: NextAuth with role-based access
- **Client Management**: Complete client database with history
- **Financial Tracking**: Revenue, expenses, and analytics
- **Document Generation**: Invoices, quotes, delivery notes (PDF/Excel)

### 💼 Business Management
- **Invoice System**: Professional invoices with payment tracking
- **Quotation Generator**: Convert quotes to invoices seamlessly  
- **Client Statements**: Automated balance calculations
- **Project Tracking**: Monitor ongoing projects and tasks

### 📊 Analytics & Reporting
- **Visual Dashboards**: Charts and graphs for business insights
- **Time Filtering**: Daily, weekly, monthly, yearly reports
- **Export Options**: PDF and Excel report generation
- **KPI Tracking**: Monitor business performance metrics

### 🎯 Marketing & Sales
- **Lead Management**: Capture and track potential clients
- **Contact Forms**: EmailJS integration for inquiries
- **WhatsApp Integration**: Direct customer communication
- **Blog System**: Sanity CMS for content marketing

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/mvono-consultants-website.git
cd mvono-consultants-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` and configure:
```env
MONGODB_URI="your_mongodb_connection_string"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your_nextauth_secret"
```

### 4. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your website!

## 📱 Test the Admin Dashboard

**Login Credentials:**
- Email: `admin@mvonoconsultants.com`
- Password: `Test@123`

Access the dashboard at: [http://localhost:3000/login](http://localhost:3000/login)

## 🛠 Technology Stack

- **Frontend**: Next.js 13+, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Prisma
- **Authentication**: NextAuth.js
- **CMS**: Sanity.io for blog management
- **UI Components**: Radix UI, Lucide Icons
- **Animations**: GSAP, CSS transitions
- **Forms**: React Hook Form, Zod validation
- **Email**: EmailJS integration
- **File Generation**: PDF and Excel exports

## 📂 Project Structure

```
mvono-consultants-website/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── dashboard/         # Admin dashboard
│   ├── login/            # Authentication
│   ├── services/         # Service pages
│   ├── about/            # About page
│   └── blog/             # Blog system
├── components/           # Reusable components
│   ├── ui/              # UI component library
│   ├── admin/           # Dashboard components
│   └── website/         # Public website components
├── lib/                 # Utilities and helpers
├── prisma/              # Database schema
├── public/              # Static assets
├── sanity/              # CMS configuration
└── styles/              # Global styles
```

## 🌍 Services Offered

- Environmental Impact Assessment
- Occupational Safety Consulting
- Fire Safety Audits & Training
- Energy Audits & Management
- Statutory Equipment Inspection
- Non-Destructive Testing (NDT)
- First Aid Training & Certification
- Safety Management Systems

## 🏢 Target Industries

- Manufacturing & Industrial
- Construction & Engineering
- Oil & Gas Operations
- Mining & Extractives
- Food Processing
- Pharmaceutical Manufacturing
- Healthcare Facilities
- Hospitality & Tourism

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: For static deployment
- **Railway**: For full-stack deployment
- **DigitalOcean**: For custom server setup

## 📧 Contact & Support

- **Website**: [www.mvonoconsultants.com](https://www.mvonoconsultants.com)
- **Email**: sales@mvonoconsultants.com
- **Phone**: +254 720 270 694
- **Location**: Nairobi, Kenya

## 📝 License

This project is proprietary software developed for Mvono Consultants. All rights reserved.

## 🤝 Contributing

This is a private business application. For feature requests or bug reports, please contact the development team.

---

**Built with ❤️ for Mvono Consultants - Your Safety & Energy Management Partner**
