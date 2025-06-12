import { Inter } from 'next/font/google';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mvono Consultants | Safety, Energy & Plant Management',
  description: 'Mvono Consultants provides expert safety management, energy optimization, and plant systems services across Kenya and East Africa.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
