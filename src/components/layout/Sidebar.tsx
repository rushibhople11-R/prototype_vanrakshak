'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VanRakshakLogo } from '@/components/common/VanRakshakLogo';
import styles from './Sidebar.module.css';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  badgeType?: 'critical' | 'warning';
  group?: 'core' | 'operations' | 'system';
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    // Core Group
    {
      label: 'Overview Dashboard',
      href: '/overview',
      group: 'core',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },
    {
      label: 'Forest Monitoring Map',
      href: '/map',
      group: 'core',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" x2="9" y1="3" y2="18" />
          <line x1="15" x2="15" y1="6" y2="21" />
        </svg>
      ),
    },
    {
      label: 'Threat Alerts',
      href: '/alerts',
      group: 'core',
      badge: 1,
      badgeType: 'critical',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" x2="12" y1="9" y2="13" />
          <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
      ),
    },
    {
      label: 'AI Sound Detection',
      href: '/audio-detection',
      group: 'core',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <path d="M2 10v3" />
          <path d="M6 6v11" />
          <path d="M10 3v18" />
          <path d="M14 8v7" />
          <path d="M18 5v13" />
          <path d="M22 10v3" />
        </svg>
      ),
    },

    // Operations Group
    {
      label: 'Sensor Nodes',
      href: '/nodes',
      group: 'operations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <circle cx="12" cy="12" r="2" />
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
        </svg>
      ),
    },
    {
      label: 'LoRa Gateway',
      href: '/gateway',
      group: 'operations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <path d="M12 2v20" />
          <path d="m17 7-5-5-5 5" />
          <path d="m17 17-5 5-5-5" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      label: 'Event Verification',
      href: '/verification',
      group: 'operations',
      badge: 1,
      badgeType: 'warning',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      label: 'Biodiversity Intelligence',
      href: '/biodiversity',
      group: 'operations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <path d="M12 10a4 4 0 0 0-4-4c-2.2 0-4 1.8-4 4a6 6 0 0 0 6 6" />
          <path d="M12 10a4 4 0 0 1 4-4c2.2 0 4 1.8 4 4a6 6 0 0 1-6 6" />
          <path d="M12 10v10" />
        </svg>
      ),
    },

    // System Group
    {
      label: 'Solar & Battery Health',
      href: '/solar-battery',
      group: 'system',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
          <line x1="22" x2="22" y1="11" y2="13" />
          <line x1="6" x2="6" y1="11" y2="13" />
          <line x1="10" x2="10" y1="11" y2="13" />
        </svg>
      ),
    },
    {
      label: 'Reports & Analytics',
      href: '/analytics',
      group: 'system',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <line x1="18" x2="18" y1="20" y2="10" />
          <line x1="12" x2="12" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="14" />
        </svg>
      ),
    },
    {
      label: 'System Settings',
      href: '/settings',
      group: 'system',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  const renderGroup = (groupName: 'core' | 'operations' | 'system', label: string) => {
    const items = navItems.filter((item) => item.group === groupName);
    return (
      <React.Fragment key={groupName}>
        <div className={styles.navLabel}>{label}</div>
        {items.map((item) => {
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/overview');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`${styles.navBadge} ${
                    item.badgeType === 'critical' ? styles.badgeCritical : styles.badgeWarning
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <VanRakshakLogo size={34} showText={true} subtitle="Acoustic Sentinel Grid" />
      </div>

      <nav className={styles.navSection}>
        {renderGroup('core', 'Monitoring & AI')}
        {renderGroup('operations', 'Field Operations')}
        {renderGroup('system', 'System & Hardware')}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.systemStatusRow}>
          <span className={styles.statusLabel}>Concentrator:</span>
          <span className={styles.statusValue}>
            <span className={styles.statusDot}></span>
            865.2 MHz (SF9)
          </span>
        </div>
        <div className={styles.systemStatusRow}>
          <span className={styles.statusLabel}>Mode:</span>
          <span className={styles.statusValue} style={{ color: 'var(--badge-sim-text)' }}>
            Simulation Active
          </span>
        </div>
      </div>
    </aside>
  );
};
