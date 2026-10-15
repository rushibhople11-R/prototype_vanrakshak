'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DataOriginBadge } from '../common/DataOriginBadge';
import styles from './TopHeader.module.css';

interface TopHeaderProps {
  onQuickSimulate?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onQuickSimulate }) => {
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
        <div className={styles.sectorBadge}>
          <span className={styles.sectorIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span>Satpura National Park — Sector 4 Canopy Grid</span>
        </div>

        <div className={styles.divider}></div>

        <DataOriginBadge isSimulated={true} label="SIMULATED DEMO MODE" />
      </div>

      <div className={styles.rightGroup}>
        <Link href="/settings" className={styles.quickActionBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span>Inject Test Threat</span>
        </Link>

        {timeStr && <div className={styles.clockBadge}>{timeStr}</div>}
      </div>
    </header>
  );
};
