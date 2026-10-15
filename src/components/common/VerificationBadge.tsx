import React from 'react';
import { VerificationStatus } from '@/types';
import styles from './VerificationBadge.module.css';

interface VerificationBadgeProps {
  status: VerificationStatus;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status }) => {
  switch (status) {
    case 'PENDING':
      return <span className={`${styles.badge} ${styles.pending}`}>● Pending Review</span>;
    case 'VERIFIED_THREAT':
      return <span className={`${styles.badge} ${styles.verified}`}>▲ Verified Threat</span>;
    case 'FALSE_POSITIVE':
      return <span className={`${styles.badge} ${styles.falsePositive}`}>✕ False Alarm</span>;
    case 'RESOLVED':
      return <span className={`${styles.badge} ${styles.resolved}`}>✓ Resolved</span>;
    default:
      return null;
  }
};
