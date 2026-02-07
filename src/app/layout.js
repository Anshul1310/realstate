import Navbar from '../app/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google'; // Professional default font

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Toovi',
  description: 'AI-agent that turns real estate into deal driven market',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
