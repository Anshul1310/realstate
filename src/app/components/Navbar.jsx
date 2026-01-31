'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { Home, Search, DollarSign, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

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
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
          >
            <Home className={styles.logoIcon} />
          </motion.div>
          <span>EstateAI</span>
        </Link>

        <div className={styles.links}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`${styles.link} ${isActive ? styles.activeText : ''}`}
              >
                {/* The animated background pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className={styles.activePill}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={styles.linkContent}>
                  {item.icon}
                  <span>{item.name}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;