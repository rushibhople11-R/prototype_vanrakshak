import React from 'react';

interface VanRakshakLogoProps {
  size?: number;
  animated?: boolean;
  showText?: boolean;
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
}

export const VanRakshakLogo: React.FC<VanRakshakLogoProps> = ({
  size = 48,
  animated = false,
  showText = false,
  className = '',
  variant = 'icon',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size > 40 ? '14px' : '10px',
        userSelect: 'none',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          flexShrink: 0,
          filter: 'drop-shadow(0 0 16px rgba(16, 185, 129, 0.35))',
        }}
      >
        <defs>
          {/* Outer Shield Metallic Gradient */}
          <linearGradient id="shieldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="35%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Golden Solar/Acoustic Highlight */}
          <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Cyber Cyan RF Beam */}
          <linearGradient id="cyanBeam" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Shield Core Deep Void Gradient */}
          <radialGradient id="shieldVoid" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#0e231a" />
            <stop offset="60%" stopColor="#07130e" />
            <stop offset="100%" stopColor="#030805" />
          </radialGradient>

          {/* Sacred Tree Emerald Foil */}
          <linearGradient id="treeCanopyFoil" x1="50%" y1="15%" x2="50%" y2="85%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="40%" stopColor="#10b981" />
            <stop offset="85%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          {/* Ambient Glow Filter */}
          <filter id="coreAura" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Heavy Outer Guardian Aegis (Hexagonal Shield) */}
        <path
          d="M60 4 L108 24 L108 78 L60 114 L12 78 L12 24 Z"
          fill="url(#shieldVoid)"
          stroke="url(#shieldBorderGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 2. Inner Armor Layer with Cyber Chamfers */}
        <path
          d="M60 13 L98 30 L98 72 L60 103 L22 72 L22 30 Z"
          fill="#06100b"
          stroke="rgba(52, 211, 153, 0.25)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 3. Concentric Acoustic Radar Domes (Broadcasting into forest) */}
        <path
          d="M38 46 A 25 25 0 0 1 82 46"
          stroke="url(#goldAccent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M28 35 A 37 37 0 0 1 92 35"
          stroke="url(#cyanBeam)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 3"
          opacity="0.75"
        />
        <path
          d="M20 25 A 48 48 0 0 1 100 25"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 4"
          opacity="0.5"
        />

        {/* 4. LoRa Apex Transmitter Node at Crown */}
        <path d="M60 4 L60 18" stroke="url(#goldAccent)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="4" r="3.5" fill="#fbbf24" filter="url(#coreAura)" />
        <circle cx="60" cy="4" r="1.5" fill="#ffffff" />

        {/* 5. Majestic Sovereign Tree of Life (Sal/Teak Canopy) */}
        {/* Upper Tier */}
        <path
          d="M60 22 L76 40 L67 40 L81 56 L66 56 L76 70 L44 70 L54 56 L39 56 L53 40 L44 40 Z"
          fill="url(#treeCanopyFoil)"
          filter="url(#coreAura)"
        />

        {/* Secondary Canopy Geometric Facets (Cyber-Forest Aesthetic) */}
        <polygon points="60,24 67,39 60,35" fill="rgba(255, 255, 255, 0.35)" />
        <polygon points="60,35 73,54 60,50" fill="rgba(255, 255, 255, 0.25)" />
        <polygon points="60,50 70,68 60,64" fill="rgba(255, 255, 255, 0.2)" />

        {/* 6. Robust Tree Trunk & Cyber-Root Surveillance Grid */}
        <rect x="56.5" y="70" width="7" height="18" fill="url(#goldAccent)" rx="1.5" />
        {/* Roots splitting out as PCB neural tracks */}
        <path
          d="M57 88 L46 98 M63 88 L74 98 M60 88 L60 102"
          stroke="url(#shieldBorderGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="46" cy="98" r="2.5" fill="#34d399" />
        <circle cx="74" cy="98" r="2.5" fill="#34d399" />
        <circle cx="60" cy="102" r="2.5" fill="#fbbf24" />

        {/* 7. Edge AI Neural Heart (Center Core Processor) */}
        <circle cx="60" cy="56" r="6" fill="#04120a" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="60" cy="56" r="3" fill="#ffffff" filter="url(#coreAura)" />

        {/* 8. Precision Corner Hex Rivets */}
        <circle cx="60" cy="13" r="1.5" fill="#34d399" />
        <circle cx="98" cy="30" r="1.5" fill="#34d399" />
        <circle cx="98" cy="72" r="1.5" fill="#34d399" />
        <circle cx="60" cy="103" r="1.5" fill="#fbbf24" />
        <circle cx="22" cy="72" r="1.5" fill="#34d399" />
        <circle cx="22" cy="30" r="1.5" fill="#34d399" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: size >= 48 ? '22px' : '17px',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '0.06em',
                fontFamily: 'var(--font-sans)',
                background: 'linear-gradient(180deg, #ffffff 40%, #c1edd8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              VanRakshak
            </span>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(56, 189, 248, 0.2) 100%)',
                color: '#34d399',
                padding: '2px 7px',
                borderRadius: '4px',
                border: '1px solid rgba(52, 211, 153, 0.5)',
                fontWeight: 800,
                letterSpacing: '0.04em',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.25)',
              }}
            >
              वनरक्षक
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              color: '#9db4a7',
              letterSpacing: '0.08em',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginTop: '1px',
            }}
          >
            Acoustic TinyML Grid
          </span>
        </div>
      )}
    </div>
  );
};
