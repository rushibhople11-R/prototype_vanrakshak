import React from 'react';
import { ThreatType } from '@/types';
import styles from './ThreatPill.module.css';

interface ThreatPillProps {
  threatType: ThreatType;
}

export const ThreatPill: React.FC<ThreatPillProps> = ({ threatType }) => {
  switch (threatType) {
    case 'CHAINSAW':
      return (
        <span className={`${styles.pill} ${styles.critical}`}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M4 14l6-6 8 8-6 6z" />
          </svg>
          Chainsaw
        </span>
      );
    case 'AXE':
      return (
        <span className={`${styles.pill} ${styles.warning}`}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14 12l6 6-3 3-6-6" />
            <path d="M4 14l5-5" />
          </svg>
          Axe Strike
        </span>
      );
    case 'HEAVY_VEHICLE':
      return (
        <span className={`${styles.pill} ${styles.warning}`}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          Heavy Vehicle
        </span>
      );
    case 'GUNSHOT':
      return (
        <span className={`${styles.pill} ${styles.critical}`}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="22" y1="12" x2="18" y2="12" />
            <line x1="6" y1="12" x2="2" y2="12" />
            <line x1="12" y1="6" x2="12" y2="2" />
            <line x1="12" y1="22" x2="12" y2="18" />
          </svg>
          Gunshot
        </span>
      );
    case 'ANOMALY':
    default:
      return (
        <span className={`${styles.pill} ${styles.info}`}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Acoustic Anomaly
        </span>
      );
  }
};
