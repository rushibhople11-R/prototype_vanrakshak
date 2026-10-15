'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DataOriginBadge } from '../common/DataOriginBadge';
import { VanRakshakLogo } from '../common/VanRakshakLogo';
import styles from './TopHeader.module.css';

interface TopHeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onToggleMobileMenu,
  isMobileMenuOpen = false,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        {/* Mobile Hamburger Toggle */}
        <button
          className={styles.mobileMenuBtn}
          onClick={onToggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
          title={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Mobile Brand (visible when sidebar is closed on mobile) */}
        <div className={styles.mobileBrand}>
          <VanRakshakLogo size={26} />
          <span className={styles.mobileTitle}>VanRakshak</span>
        </div>

        {/* Desktop Sector Badge */}
        <div className={styles.sectorBadge}>
          <span className={styles.sectorIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span className={styles.sectorTextFull}>Satpura National Park — Sector 4 Canopy Grid</span>
          <span className={styles.sectorTextShort}>Sector 4 Grid</span>
        </div>

        <div className={styles.desktopDivider}></div>

        <div className={styles.desktopOriginBadge}>
          <DataOriginBadge isSimulated={true} label="SIMULATED DEMO" />
        </div>
      </div>

      <div className={styles.rightGroup}>
        <Link href="/settings" className={styles.quickActionBtn} title="Inject Acoustic Threat Simulation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className={styles.quickActionText}>Inject Threat</span>
        </Link>

        {timeStr && <div className={styles.clockBadge}>{timeStr}</div>}
      </div>
    </header>
  );
};
