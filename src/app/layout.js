import Navbar from '../app/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google'; // Professional default font

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EstateAI',
  description: 'AI-powered real estate',
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