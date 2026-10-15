import React from 'react';
import Link from 'next/link';
import {
  DEMO_FOREST_NODES,
  DEMO_THREAT_ALERTS,
  DEMO_BATTERY_CURVE,
} from '@/lib/demo-data';
import { StatCard } from '@/components/common/StatCard';
import { ThreatPill } from '@/components/common/ThreatPill';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';
import { BatteryOverviewChart } from '@/components/charts/BatteryOverviewChart';
import styles from './overview.module.css';

export default function OverviewPage() {
  const activeAlerts = DEMO_THREAT_ALERTS.filter(
    (a) => a.verificationStatus === 'PENDING'
  );
  const criticalThreat = activeAlerts.find((a) => a.severity === 'CRITICAL');
  const onlineNodes = DEMO_FOREST_NODES.filter((n) => n.status !== 'OFFLINE').length;
  const avgBattery = Math.round(
    DEMO_FOREST_NODES.reduce((acc, curr) => acc + curr.batteryPct, 0) /
      DEMO_FOREST_NODES.length
  );

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headingGroup}>
          <h1 className={styles.pageTitle}>
            Forest Operations Overview
            <DataOriginBadge isSimulated={true} size="sm" />
          </h1>
          <p className={styles.pageSubtitle}>
            Acoustic TinyML Sensor Network &amp; LoRa Gateway Telemetry — Sector 4 Canopy
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/map"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-panel-elevated)',
              border: '1px solid var(--border-medium)',
              padding: '7px 14px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            </svg>
            Open Tactical Map
          </Link>
          <Link
            href="/verification"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--accent-emerald-dim)',
              border: '1px solid var(--accent-emerald)',
              padding: '7px 14px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--accent-emerald-bright)',
            }}
          >
            Verification SOP
          </Link>
        </div>
      </div>

      {/* Critical Threat Alert Banner */}
      {criticalThreat && (
        <div className={styles.alertBanner}>
          <div className={styles.bannerLeft}>
            <div className={`${styles.bannerIcon} pulse-critical`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <div className={styles.bannerTitle}>
                POSSIBLE CHAINSAW DETECTED — {criticalThreat.nodeName} ({criticalThreat.nodeId})
              </div>
              <div className={styles.bannerText}>
                Acoustic confidence: {(criticalThreat.confidence * 100).toFixed(0)}% • Sound Level:{' '}
                {criticalThreat.soundLevelDb} dB SPL • Frequency: {criticalThreat.frequencyPeakHz} Hz •
                Pending ranger confirmation.
              </div>
            </div>
          </div>
          <Link href="/verification" className={styles.bannerActionBtn}>
            <span>Verify Event SOP</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      )}

      {/* Stat Cards */}
      <div className={styles.statGrid}>
        <StatCard
          title="Active Monitoring Nodes"
          value={`${onlineNodes}/${DEMO_FOREST_NODES.length}`}
          unit="Active"
          subtitle="5 Online • 1 Power Sleep"
          statusText="Grid Operational"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <circle cx="12" cy="12" r="2" />
              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49" />
            </svg>
          }
        />
        <StatCard
          title="Threat Detections (Today)"
          value={activeAlerts.length}
          unit="Unverified"
          variant={activeAlerts.length > 0 ? 'alert' : 'normal'}
          subtitle="1 Critical • 0 Warning"
          statusText="Review Required"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            </svg>
          }
        />
        <StatCard
          title="LoRa Gateway Backhaul"
          value="865.2"
          unit="MHz"
          subtitle="Sub-GHz SF9 • CRC 100%"
          statusText="Uplink Synchronized"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M12 2v20" />
              <path d="m17 7-5-5-5 5" />
            </svg>
          }
        />
        <StatCard
          title="Fleet Battery Health"
          value={`${avgBattery}%`}
          unit="Avg SoC"
          subtitle="LiFePO4 3.32V nominal"
          statusText="Solar Harvest Active"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
              <line x1="22" x2="22" y1="11" y2="13" />
            </svg>
          }
        />
      </div>

      {/* Main Two-Column Layout */}
      <div className={styles.contentGrid}>
        {/* Left Column: Recent Threat Alerts & Battery Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Recent Threat Ledger Panel */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ color: 'var(--threat-critical)' }}>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M4 14l6-6 8 8-6 6z" />
                </svg>
                Recent Acoustic Triggers
              </div>
              <Link href="/alerts" className={styles.viewAllLink}>
                View All Ledger &rarr;
              </Link>
            </div>

            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Node / Sector</th>
                    <th>Threat Class</th>
                    <th>Confidence</th>
                    <th>Sound SPL</th>
                    <th>SOP Status</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_THREAT_ALERTS.slice(0, 4).map((alert) => (
                    <tr key={alert.id}>
                      <td className="mono" style={{ fontSize: '11px' }}>
                        {new Date(alert.detectedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {alert.nodeName}
                        </div>
                        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                          {alert.nodeId}
                        </div>
                      </td>
                      <td>
                        <ThreatPill threatType={alert.threatType} />
                      </td>
                      <td>
                        <div className={styles.confidenceBarWrapper}>
                          <div className={styles.confidenceTrack}>
                            <div
                              className={styles.confidenceFill}
                              style={{
                                width: `${alert.confidence * 100}%`,
                                backgroundColor:
                                  alert.confidence > 0.85
                                    ? 'var(--threat-critical)'
                                    : alert.confidence > 0.7
                                    ? 'var(--threat-warning)'
                                    : 'var(--threat-info)',
                              }}
                            />
                          </div>
                          <span className="mono" style={{ fontSize: '11px' }}>
                            {(alert.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="mono" style={{ fontSize: '11px' }}>
                        {alert.soundLevelDb} dB
                      </td>
                      <td>
                        <VerificationBadge status={alert.verificationStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Diurnal Battery & Solar Panel */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ color: 'var(--accent-emerald-bright)' }}>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                </svg>
                24-Hour Diurnal Solar Generation &amp; LiFePO4 Voltage Curve
              </div>
              <DataOriginBadge isSimulated={true} size="sm" label="Calibrated Model" />
            </div>
            <BatteryOverviewChart data={DEMO_BATTERY_CURVE} />
          </div>
        </div>

        {/* Right Column: Fleet Health & Hardware Ingest Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Fleet Nodes Health */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ color: 'var(--accent-emerald)' }}>
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
                Fleet Node Status
              </div>
              <Link href="/nodes" className={styles.viewAllLink}>
                Manage Nodes &rarr;
              </Link>
            </div>

            <div className={styles.nodeList}>
              {DEMO_FOREST_NODES.map((node) => (
                <div key={node.id} className={styles.nodeItem}>
                  <div className={styles.nodeInfo}>
                    <div className={styles.nodeName}>{node.name}</div>
                    <div className={styles.nodeZone}>
                      {node.zone} • <span className="mono">{node.id}</span>
                    </div>
                  </div>

                  <div className={styles.nodeMetrics}>
                    <div title="Battery Percentage">
                      <span style={{ color: node.batteryPct < 50 ? 'var(--threat-warning)' : 'var(--text-primary)' }}>
                        {node.batteryPct}%
                      </span>
                    </div>
                    <div
                      className={`${styles.statusIndicator} ${
                        node.status === 'ONLINE'
                          ? styles.statusOnline
                          : node.status === 'ALERT'
                          ? styles.statusAlert
                          : styles.statusSleep
                      }`}
                    >
                      ● {node.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI & Gateway Info Card */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ color: 'var(--threat-info)' }}>
                  <path d="M12 2v20" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Edge AI &amp; Gateway Protocol
              </div>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--accent-emerald-bright)' }}>
                16-Byte Payload
              </span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>TinyML Model:</strong> Quantized INT8 Mel-CNN (68 KB TFLM binary) executing locally on ESP32-S3 Vector extensions.
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Radio Frequency:</strong> 865.2 MHz (India ISM Band), Spreading Factor SF9, 125 kHz Bandwidth, Coding Rate 4/5.
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Audio Transmission:</strong> Zero raw audio streaming over LoRa. Transmits only 16-byte event metadata to preserve battery for &gt;180 days.
              </div>
            </div>

            <div style={{ marginTop: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
              <Link
                href="/audio-detection"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--bg-panel-elevated)',
                  border: '1px solid var(--border-medium)',
                  padding: '8px',
                  borderRadius: '4px',
                  color: 'var(--accent-emerald-bright)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                Inspect Spectrogram &amp; Model Benchmark &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
