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
  subtitle = 'Acoustic Safeguard Intelligence',
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
      {/* Formidable Safeguard Shield Emblem — High-Tech Cyber Forest Defense */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          flexShrink: 0,
          filter: 'drop-shadow(0 6px 20px rgba(16, 185, 129, 0.45)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.8))',
        }}
      >
        <defs>
          {/* Safeguard Shield Outer Rim Gradient (Gleaming Emerald Armor) */}
          <linearGradient id={`sgRim_${uid}`} x1="14" y1="4" x2="86" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="25%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          {/* Golden Vanguard Trim Accent */}
          <linearGradient id={`sgGold_${uid}`} x1="50" y1="4" x2="50" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Left Facet: Illuminated Carbon-Slate Plate */}
          <linearGradient id={`sgFacetLeft_${uid}`} x1="18" y1="18" x2="50" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#172b22" />
            <stop offset="60%" stopColor="#0e1a14" />
            <stop offset="100%" stopColor="#060e0a" />
          </linearGradient>

          {/* Right Facet: Shaded Carbon-Slate Plate for 3D Beveled Armor */}
          <linearGradient id={`sgFacetRight_${uid}`} x1="50" y1="18" x2="82" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#112019" />
            <stop offset="60%" stopColor="#0a130f" />
            <stop offset="100%" stopColor="#030705" />
          </linearGradient>

          {/* Guardian Core Glow */}
          <radialGradient id={`sgCore_${uid}`} cx="50" cy="52" r="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>

          {/* Acoustic Wave Gradient */}
          <linearGradient id={`sgAcoustic_${uid}`} x1="20" y1="30" x2="80" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Ambient Protection Field */}
        <circle cx="50" cy="50" r="44" fill={`url(#sgCore_${uid})`} />

        {/* Outer Heavy Safeguard Shield Contour */}
        <path
          d="M50 4 L86 16 C86 54 68 82 50 96 C32 82 14 54 14 16 Z"
          fill="#060c09"
          stroke={`url(#sgRim_${uid})`}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Outer Safeguard Inset Rim (Beveled Armor Ridge) */}
        <path
          d="M50 9 L81 20 C81 51 65 76 50 88 C35 76 19 51 19 20 Z"
          stroke={`url(#sgGold_${uid})`}
          strokeWidth="1.2"
          strokeOpacity="0.75"
        />

        {/* Left Shield Armor Plate (Light Catching) */}
        <path
          d="M50 10 L20 20 C20 50 36 75 50 87 Z"
          fill={`url(#sgFacetLeft_${uid})`}
        />

        {/* Right Shield Armor Plate (Shadowed Depth) */}
        <path
          d="M50 10 L80 20 C80 50 64 75 50 87 Z"
          fill={`url(#sgFacetRight_${uid})`}
        />

        {/* Center Vertical Safeguard Crease / Bevel Line */}
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="87"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />

        {/* 3-Tier Acoustic Safeguard Radar Domes (TinyML Frequency Arc Safeguards) */}
        {/* Tier 1 — Outer Protective Acoustic Arc */}
        <path
          d="M26 40 C33 24 67 24 74 40"
          stroke={`url(#sgAcoustic_${uid})`}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Tier 2 — Mid Sentinel Detection Arc */}
        <path
          d="M32 50 C38 37 62 37 68 50"
          stroke="#38bdf8"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Tier 3 — Inner Core Safeguard Pulse */}
        <path
          d="M39 60 C43 51 57 51 61 60"
          stroke={`url(#sgGold_${uid})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Symmetrical Guardian Foliage Wings (Forest Guardian Aegis) */}
        <path
          d="M50 44 C36 46 30 62 37 72 C41 65 45 55 50 48 Z"
          fill="rgba(16, 185, 129, 0.3)"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M50 44 C64 46 70 62 63 72 C59 65 55 55 50 48 Z"
          fill="rgba(16, 185, 129, 0.2)"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Central Sentinel Spine / Sensor Tower */}
        <line
          x1="50"
          y1="34"
          x2="50"
          y2="78"
          stroke={`url(#sgRim_${uid})`}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Central Safeguard Diamond / Bio-Acoustic Core */}
        <polygon
          points="50,46 56,53 50,60 44,53"
          fill="#34d399"
          stroke="#ffffff"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="53" r="2" fill="#ffffff" />

        {/* Apex LoRa Sentinel Crown Beacon */}
        <circle cx="50" cy="19" r="4.5" fill="#34d399" />
        <circle cx="50" cy="19" r="8" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="1.5" />
        <circle cx="50" cy="19" r="1.8" fill="#ffffff" />
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
                background: 'rgba(16, 185, 129, 0.18)',
                color: '#34d399',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(52, 211, 153, 0.45)',
                fontWeight: 800,
                letterSpacing: '0.06em',
              }}
            >
              वनरक्षक
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              color: '#94a3b8',
              letterSpacing: '0.04em',
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

