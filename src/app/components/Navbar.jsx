'use client'; // Required for interactivity

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { Home, Search, DollarSign, Cpu } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

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
          <span>EstateAI</span>
        </Link>

        <div className={styles.links}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;