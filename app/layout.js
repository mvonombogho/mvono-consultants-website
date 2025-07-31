import { Inter } from 'next/font/google';
import Navbar from '../components/shared/Navbar';
import PerformanceMonitor from '../components/performance/PerformanceMonitor';
import LocalBusinessSchema from '../components/local-seo/LocalBusinessSchema';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mvono Consultants | Safety, Energy & Plant Management',
  description: 'Mvono Consultants provides expert safety management, energy optimization, and plant systems services across Kenya and East Africa.',
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/images/favicon.svg" />
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for immediate rendering */
            * { box-sizing: border-box; }
            body { margin: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; }
            .hero-section { min-height: 100vh; display: flex; align-items: center; }
            img { max-width: 100%; height: auto; }
            /* Prevent layout shift */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
          `
        }} />
      </head>
      <body className={inter.className}>
        <PerformanceMonitor />
        <LocalBusinessSchema />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
