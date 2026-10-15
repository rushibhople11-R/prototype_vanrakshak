'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_FOREST_NODES } from '@/lib/demo-data';
import { ForestNode } from '@/types';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';
import styles from './nodes.module.css';

export default function NodesPage() {
  const [nodes, setNodes] = useState<ForestNode[]>(DEMO_FOREST_NODES);
  const [configNode, setConfigNode] = useState<ForestNode | null>(null);
  const [threshold, setThreshold] = useState<number>(0.82);
  const [reportInterval, setReportInterval] = useState<number>(30);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleOpenConfig = (node: ForestNode) => {
    setConfigNode(node);
    setSavedSuccess(false);
  };

  const handleSaveConfig = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setConfigNode(null);
      setSavedSuccess(false);
    }, 1200);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            Sensor Nodes Fleet Management
            <DataOriginBadge isSimulated={true} size="sm" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Canopy acoustic sensor inventory, radio link telemetry, and edge parameter reconfiguration.
          </p>
        </div>

        <Link
          href="/map"
          style={{
            backgroundColor: 'var(--bg-panel-elevated)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            padding: '7px 14px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          </svg>
          View On Map
        </Link>
      </div>

      {/* Node Cards Grid */}
      <div className={styles.nodeGrid}>
        {nodes.map((node) => {
          const isAlert = node.status === 'ALERT';
          return (
            <div
              key={node.id}
              className={`${styles.nodeCard} ${isAlert ? styles.nodeCardAlert : ''}`}
            >
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.nodeName}>{node.name}</div>
                  <div className={styles.nodeId}>
                    {node.id} • {node.zone}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color:
                      node.status === 'ONLINE'
                        ? 'var(--accent-emerald-bright)'
                        : node.status === 'ALERT'
                        ? 'var(--threat-critical)'
                        : 'var(--text-muted)',
                  }}
                >
                  ● {node.status}
                </span>
              </div>

              {/* 3-Column Metrics Panel */}
              <div className={styles.metricGrid}>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Battery</span>
                  <span className={styles.metricValue}>
                    {node.batteryPct}% ({node.batteryVoltage}V)
                  </span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Solar Harvest</span>
                  <span className={styles.metricValue}>{node.solarStatus}</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Radio RSSI</span>
                  <span className={styles.metricValue}>{node.signalRssi} dBm</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Location: </span>
                  <span className="mono">{node.latitude.toFixed(4)}N, {node.longitude.toFixed(4)}E</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Elevation: </span>
                  <span className="mono">{node.elevationMeters}m MSL</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>LoRa SNR: </span>
                  <span className="mono">+{node.signalSnr} dB</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Firmware: </span>
                  <span className="mono">{node.firmwareVersion}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className="mono">Last Uplink: {new Date(node.lastSeenAt).toLocaleTimeString()}</span>
                <button
                  className={styles.configBtn}
                  onClick={() => handleOpenConfig(node)}
                >
                  Reconfigure Node &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      {configNode && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => setConfigNode(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-panel)',
              border: '1px solid var(--border-highlight)',
              borderRadius: '6px',
              maxWidth: '480px',
              width: '100%',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--text-primary)' }}>
                  Node Reconfiguration: {configNode.id}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{configNode.name}</span>
              </div>
              <button onClick={() => setConfigNode(null)} style={{ color: 'var(--text-muted)' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Acoustic Inference Cutoff Threshold (Current: {(threshold * 100).toFixed(0)}%)
                </label>
                <input
                  type="range"
                  min="0.60"
                  max="0.95"
                  step="0.01"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  Lower threshold catches faint distant sounds but increases false positives. Recommended: 82%.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Heartbeat Beacon Interval (Minutes)
                </label>
                <select
                  value={reportInterval}
                  onChange={(e) => setReportInterval(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                >
                  <option value={15}>15 Minutes (High Patrol Area)</option>
                  <option value={30}>30 Minutes (Standard Solar Balanced)</option>
                  <option value={60}>60 Minutes (Monsoon Power Conservation)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Duty Cycle Audio Sampling Window
                </label>
                <select defaultValue="500_1500" style={{ width: '100%' }}>
                  <option value="500_1500">500ms Listen / 1500ms Sleep (Default)</option>
                  <option value="1000_1000">1000ms Listen / 1000ms Sleep (High Alert)</option>
                  <option value="250_2500">250ms Listen / 2500ms Sleep (Low Battery Fallback)</option>
                </select>
              </div>
            </div>

            {savedSuccess && (
              <div style={{ backgroundColor: 'var(--threat-safe-bg)', border: '1px solid var(--threat-safe-border)', color: 'var(--threat-safe)', padding: '8px 12px', borderRadius: '4px', fontSize: '11px', textAlign: 'center' }}>
                ✓ Downlink parameter packet queued for next node heartbeat window!
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <button
                className={styles.configBtn}
                onClick={() => setConfigNode(null)}
              >
                Cancel
              </button>
              <button
                style={{
                  backgroundColor: 'var(--accent-emerald)',
                  color: '#04140b',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '11px',
                  cursor: 'pointer',
                }}
                onClick={handleSaveConfig}
              >
                Send LoRa Downlink
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
