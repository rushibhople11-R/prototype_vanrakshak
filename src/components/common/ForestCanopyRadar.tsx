'use client';

import React, { useState } from 'react';
import { DEMO_FOREST_NODES } from '@/lib/demo-data';
import styles from './ForestCanopyRadar.module.css';

interface NodePin {
  id: string;
  name: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  status: 'ONLINE' | 'ALERT' | 'SLEEP' | 'OFFLINE';
  batteryPct: number;
  rssiDbm: number;
  lastThreat?: string;
}

export const ForestCanopyRadar: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<NodePin | null>(null);

  // Mapped node coordinates relative to the central gateway (50%, 50%)
  const radarNodes: NodePin[] = [
    { id: 'NODE-01', name: 'West Ridge Sal Stand', x: 28, y: 32, status: 'ALERT', batteryPct: 88, rssiDbm: -78, lastThreat: 'CHAINSAW (89%)' },
    { id: 'NODE-02', name: 'Narmada Stream Crossing', x: 74, y: 36, status: 'ONLINE', batteryPct: 94, rssiDbm: -82 },
    { id: 'NODE-03', name: 'Bori Sanctuary Boundary', x: 68, y: 72, status: 'ONLINE', batteryPct: 79, rssiDbm: -89 },
    { id: 'NODE-04', name: 'Teak Plantation Sector 4', x: 24, y: 68, status: 'ONLINE', batteryPct: 85, rssiDbm: -84 },
    { id: 'NODE-05', name: 'Deep Valley Creek Node', x: 50, y: 20, status: 'ONLINE', batteryPct: 92, rssiDbm: -76 },
    { id: 'NODE-06', name: 'Buffer Zone Watchtower', x: 80, y: 55, status: 'SLEEP', batteryPct: 67, rssiDbm: -93 },
  ];

  return (
    <div className={styles.radarCard}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.pulseDot} />
          <span className={styles.title}>Acoustic Canopy Radar</span>
          <span className={styles.badge}>SECTOR 4 GRID</span>
        </div>
        <div className={styles.subtext}>
          Sub-GHz LoRa Star Topology • Central Concentrator Link
        </div>
      </div>

      <div className={styles.radarViewport}>
        {/* Concentric distance range rings */}
        <div className={`${styles.rangeRing} ${styles.ring1}`} />
        <div className={`${styles.rangeRing} ${styles.ring2}`} />
        <div className={`${styles.rangeRing} ${styles.ring3}`} />

        {/* Crosshair axes */}
        <div className={styles.axisH} />
        <div className={styles.axisV} />

        {/* Rotating sweep line */}
        <div className={styles.sweepArm} />

        {/* Central LoRa Gateway Concentrator */}
        <div className={styles.gatewayCenter} title="VanRakshak Gateway Concentrator (Tower Alpha)">
          <div className={styles.gatewayIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
              <path d="M12 2v20" />
              <path d="m17 7-5-5-5 5" />
              <circle cx="12" cy="12" r="3" fill="#38bdf8" />
            </svg>
          </div>
          <span className={styles.gatewayLabel}>GATEWAY</span>
        </div>

        {/* Distributed Nodes */}
        {radarNodes.map((node) => {
          const isAlert = node.status === 'ALERT';
          return (
            <div
              key={node.id}
              className={`${styles.nodePoint} ${isAlert ? styles.nodeAlert : ''} ${
                node.status === 'SLEEP' ? styles.nodeSleep : ''
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {isAlert && <div className={styles.acousticEchoRing} />}
              <div className={styles.nodeCore} />
              <span className={styles.nodeLabel}>{node.id}</span>
            </div>
          );
        })}

        {/* Range markers */}
        <span className={styles.marker500}>500m</span>
        <span className={styles.marker1000}>1.2km</span>
        <span className={styles.marker1500}>2.5km</span>
      </div>

      {/* Node Telemetry Tooltip / Active Inspect Bar */}
      <div className={styles.telemetryBar}>
        {hoveredNode ? (
          <div className={styles.nodeDetailRow}>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>{hoveredNode.id}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{hoveredNode.name}</span>
            <span className="mono" style={{ color: 'var(--accent-emerald-bright)' }}>
              🔋 {hoveredNode.batteryPct}%
            </span>
            <span className="mono" style={{ color: 'var(--accent-cyan)' }}>
              📶 {hoveredNode.rssiDbm} dBm
            </span>
            {hoveredNode.lastThreat && (
              <span style={{ color: 'var(--threat-critical)', fontWeight: 700 }}>
                ⚠️ {hoveredNode.lastThreat}
              </span>
            )}
          </div>
        ) : (
          <div className={styles.idleHint}>
            <span>Hover over any forest sensor node for live RF link &amp; audio telemetry</span>
            <span className="mono" style={{ color: 'var(--accent-emerald-bright)' }}>6 Nodes Synced</span>
          </div>
        )}
      </div>
    </div>
  );
};
