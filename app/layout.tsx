import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/providers/AuthProvider'

// Load Inter font
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mvono Consultants | Safety, Energy & Plant Systems Management',
  description: 'Mvono Consultants is a wholly Kenyan owned consultancy firm specializing in the management of safety, energy, and plant systems since 2009.',
  keywords: [
    'occupational safety consulting',
    'energy audit',
    'environmental impact assessment',
    'fire safety audit',
    'statutory inspection',
    'plant inspection',
    'safety management systems',
    'DOSH compliance services',
    'first aid certification',
    'fire safety training',
    'Kenya consultancy'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      