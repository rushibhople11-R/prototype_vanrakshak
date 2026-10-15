'use client';

import React, { useId } from 'react';

interface VanRakshakLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  subtitle?: string;
}

export const VanRakshakLogo: React.FC<VanRakshakLogoProps> = ({
  size = 40,
  showText = false,
  className = '',
  subtitle = 'Acoustic Forest Intelligence',
}) => {
  const rawId = useId();
  // Sanitize useId for SVG gradient URLs
  const uid = rawId.replace(/:/g, '');

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size > 44 ? '14px' : '10px',
        userSelect: 'none',
      }}
    >
      {/* World-Class Modern Logo: Iconic Shield + Acoustic Soundwave Canopy + TinyML Sensing Core */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          flexShrink: 0,
          filter: 'drop-shadow(0 4px 16px rgba(16, 185, 129, 0.35))',
        }}
      >
        <defs>
          {/* Primary Gradient: Emerald to Cyber Cyan */}
          <linearGradient id={`gradMain_${uid}`} x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="60%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Accent Gold & Flame for Threat/Acoustic Spark */}
          <linearGradient id={`gradGold_${uid}`} x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Deep Obsidian Emblem Fill */}
          <linearGradient id={`gradShield_${uid}`} x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#121b22" />
            <stop offset="100%" stopColor="#090d11" />
          </linearGradient>

          {/* Subtle Glow Ring */}
          <radialGradient id={`gradCoreGlow_${uid}`} cx="50" cy="50" r="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="50" cy="50" r="40" fill={`url(#gradCoreGlow_${uid})`} />

        {/* Outer Minimalist Hexagonal Shield Contour */}
        <path
          d="M50 8 C68 8 86 16 88 34 C90 62 50 92 50 92 C50 92 10 62 12 34 C14 16 32 8 50 8 Z"
          fill={`url(#gradShield_${uid})`}
          stroke={`url(#gradMain_${uid})`}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Stylized Acoustic Canopy Arcs (Representing Microphones + Forest Trees) */}
        {/* Tier 1 - Outer Wave */}
        <path
          d="M26 44 C34 26 66 26 74 44"
          stroke={`url(#gradMain_${uid})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Tier 2 - Mid Radar Wave */}
        <path
          d="M33 54 C39 40 61 40 67 54"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Tier 3 - Core Pulse Arc */}
        <path
          d="M40 63 C44 54 56 54 60 63"
          stroke={`url(#gradGold_${uid})`}
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Central Sensor Spine / Trunk */}
        <line
          x1="50"
          y1="34"
          x2="50"
          y2="76"
          stroke={`url(#gradMain_${uid})`}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Apex LoRa Node Beacon */}
        <circle cx="50" cy="22" r="4.5" fill="#34d399" />
        <circle cx="50" cy="22" r="8" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1.5" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: size >= 48 ? '22px' : '17px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-sans)',
              }}
            >
              VanRakshak
            </span>
            <span
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              वनरक्षक
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              color: '#94a3b8',
              letterSpacing: '0.03em',
              fontWeight: 500,
            }}
          >
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};
