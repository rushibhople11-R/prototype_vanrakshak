import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  statusText?: string;
  variant?: 'normal' | 'alert' | 'warning';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon,
  subtitle,
  statusText,
  variant = 'normal',
}) => {
  const variantClass =
    variant === 'alert'
      ? styles.alertBorder
      : variant === 'warning'
      ? styles.warningBorder
      : '';

  return (
    <div className={`${styles.card} ${variantClass}`}>
      <div className={styles.headerRow}>
        <span className={styles.title}>{title}</span>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
      </div>

      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>

      {(subtitle || statusText) && (
        <div className={styles.footerRow}>
          <span>{subtitle}</span>
          {statusText && <span style={{ fontWeight: 600 }}>{statusText}</span>}
        </div>
      )}
    </div>
  );
};
