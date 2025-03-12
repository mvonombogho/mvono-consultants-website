import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mvono Consultants | Safety, Energy & Plant Management',
  description: 'Specialists in safety, energy, and plant management consultancy services. Wholly Kenyan owned consultancy firm established in 2009.',
  keywords: [
    'safety management', 'energy audits', 'plant inspection', 
    'safety consulting', 'environmental impact assessment', 
    'occupational safety', 'fire safety', 'statutory inspection',
    'non-destructive testing', 'safety training', 'Kenya consultancy'
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-light min-h-screen">
        {children}
      </body>
    </html>
  )
}
