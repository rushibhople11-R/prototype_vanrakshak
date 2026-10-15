'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Automatically close mobile drawer when navigating between pages
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  // Prevent background body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);

  return (
    <div className={styles.shell}>
      {/* Responsive Sidebar (Fixed on Laptop, Sliding Drawer on Mobile) */}
      <Sidebar
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Dark Frosted Backdrop on Mobile Drawer Open */}
      {isMobileNavOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Responsive Main Content Wrapper (Adapts margin & width) */}
      <div className={styles.mainWrapper}>
        <TopHeader
          isMobileMenuOpen={isMobileNavOpen}
          onToggleMobileMenu={() => setIsMobileNavOpen((prev) => !prev)}
        />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};
