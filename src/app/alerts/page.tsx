'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_THREAT_ALERTS } from '@/lib/demo-data';
import { ThreatAlert, ThreatType, VerificationStatus } from '@/types';
import { ThreatPill } from '@/components/common/ThreatPill';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';
import styles from './alerts.module.css';

export default function AlertsPage() {
  const [selectedThreatType, setSelectedThreatType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeAlert, setActiveAlert] = useState<ThreatAlert | null>(null);

  const filteredAlerts = DEMO_THREAT_ALERTS.filter((alert) => {
    if (selectedThreatType !== 'ALL' && alert.threatType !== selectedThreatType) return false;
    if (selectedStatus !== 'ALL' && alert.verificationStatus !== selectedStatus) return false;
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      const matchNode = alert.nodeName.toLowerCase().includes(query) || alert.nodeId.toLowerCase().includes(query);
      if (!matchNode) return false;
    }
    return true;
  });

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
            Threat Alerts Ledger
            <DataOriginBadge isSimulated={true} size="sm" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time and historical acoustic detection records transmitted via LoRa and logged for ranger action.
          </p>
        </div>

        <Link
          href="/verification"
          style={{
            backgroundColor: 'var(--threat-critical)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>Open Verification Desk ({DEMO_THREAT_ALERTS.filter((a) => a.verificationStatus === 'PENDING').length})</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className={styles.filterBar}>
        <div className={styles.filterControls}>
          <input
            type="text"
            placeholder="Search by Node ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ minWidth: '220px' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className={styles.filterLabel}>Threat Class:</span>
            <select
              value={selectedThreatType}
              onChange={(e) => setSelectedThreatType(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="CHAINSAW">Chainsaw</option>
              <option value="AXE">Axe Strike</option>
              <option value="HEAVY_VEHICLE">Heavy Vehicle</option>
              <option value="GUNSHOT">Gunshot</option>
              <option value="ANOMALY">Acoustic Anomaly</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className={styles.filterLabel}>Verification:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Review</option>
              <option value="VERIFIED_THREAT">Verified Threat</option>
              <option value="FALSE_POSITIVE">False Alarm</option>
              <option value="RESOLVED">Resolved Incident</option>
            </select>
          </div>
        </div>

        <div className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Showing {filteredAlerts.length} of {DEMO_THREAT_ALERTS.length} alerts
        </div>
      </div>

      {/* Ledger Table */}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Node / Sector</th>
              <th>Threat Type</th>
              <th>Confidence</th>
              <th>Sound Level</th>
              <th>Peak Freq</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert) => {
              const detectedDate = new Date(alert.detectedAt);
              return (
                <tr key={alert.id}>
                  <td>
                    <div className="mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {detectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {detectedDate.toLocaleDateString()}
                    </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mono" style={{ fontWeight: 600 }}>
                        {(alert.confidence * 100).toFixed(0)}%
                      </span>
                      <div
                        style={{
                          width: '40px',
                          height: '5px',
                          backgroundColor: 'var(--border-medium)',
                          borderRadius: '2px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
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
                    </div>
                  </td>
                  <td className="mono">{alert.soundLevelDb} dB SPL</td>
                  <td className="mono">{alert.frequencyPeakHz} Hz</td>
                  <td>
                    <VerificationBadge status={alert.verificationStatus} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        className={styles.actionButton}
                        onClick={() => setActiveAlert(alert)}
                      >
                        Details
                      </button>
                      {alert.verificationStatus === 'PENDING' && (
                        <Link
                          href="/verification"
                          className={`${styles.actionButton} ${styles.verifyBtn}`}
                        >
                          Verify SOP
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Alert Details Modal */}
      {activeAlert && (
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
          onClick={() => setActiveAlert(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-panel)',
              border: '1px solid var(--border-highlight)',
              borderRadius: '6px',
              maxWidth: '540px',
              width: '100%',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '12px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--text-primary)' }}>
                  Threat Event Inspection: {activeAlert.id}
                </h3>
                <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Node: {activeAlert.nodeName} ({activeAlert.nodeId})
                </span>
              </div>
              <button
                onClick={() => setActiveAlert(null)}
                style={{ color: 'var(--text-muted)', fontSize: '18px', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Threat Classification</div>
                <div style={{ marginTop: '4px' }}>
                  <ThreatPill threatType={activeAlert.threatType} />
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Verification State</div>
                <div style={{ marginTop: '4px' }}>
                  <VerificationBadge status={activeAlert.verificationStatus} />
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>TinyML Model Confidence</div>
                <div className="mono" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {(activeAlert.confidence * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Measured Acoustic Energy</div>
                <div className="mono" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {activeAlert.soundLevelDb} dB SPL
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Edge Detection Time</div>
                <div className="mono">{new Date(activeAlert.detectedAt).toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Gateway Receive Time</div>
                <div className="mono">{new Date(activeAlert.receivedAt).toLocaleString()}</div>
              </div>
            </div>

            {activeAlert.verificationNotes && (
              <div
                style={{
                  backgroundColor: 'var(--bg-panel-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '12px',
                  fontSize: '12px',
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Ranger Audit Log ({activeAlert.verifiedBy})
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>{activeAlert.verificationNotes}</div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button
                className={styles.actionButton}
                onClick={() => setActiveAlert(null)}
              >
                Close
              </button>
              <Link
                href="/verification"
                className={`${styles.actionButton} ${styles.verifyBtn}`}
              >
                Open in Verification SOP &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
