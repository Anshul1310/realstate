'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Home, Search, DollarSign, Cpu, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navItems = [
    { name: 'Buyers', path: '/buyers', icon: <Search size={18} /> },
    { name: 'Sellers', path: '/sellers', icon: <DollarSign size={18} /> },
    { name: 'AI Insights', path: '/ai', icon: <Cpu size={18} /> },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Home className={styles.logoIcon} />
          <span className={styles.logoText}>EstateAI</span>
        </Link>

        <div className={styles.links}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
            >
              {item.icon}
              <span className={styles.linkText}>{item.name}</span>
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme} 
            className={styles.themeToggle}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;