'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_THREAT_ALERTS } from '@/lib/demo-data';
import { ThreatAlert } from '@/types';
import { ThreatPill } from '@/components/common/ThreatPill';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';
import styles from './verification.module.css';

export default function VerificationPage() {
  const [alerts, setAlerts] = useState<ThreatAlert[]>(DEMO_THREAT_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string>(
    DEMO_THREAT_ALERTS.find((a) => a.verificationStatus === 'PENDING')?.id || DEMO_THREAT_ALERTS[0].id
  );
  const [officerName, setOfficerName] = useState<string>('Ranger V. Patil (Callsign: Falcon-1)');
  const [officerNotes, setOfficerNotes] = useState<string>('Sector 4 patrol unit alerted via VHF radio channel 4.');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const currentAlert = alerts.find((a) => a.id === selectedAlertId) || alerts[0];
  const pendingAlerts = alerts.filter((a) => a.verificationStatus === 'PENDING');
  const pastVerifications = alerts.filter((a) => a.verificationStatus !== 'PENDING');

  const handleApplyVerdict = (
    status: 'VERIFIED_THREAT' | 'FALSE_POSITIVE' | 'RESOLVED',
    defaultNote: string
  ) => {
    const updated = alerts.map((a) => {
      if (a.id === currentAlert.id) {
        return {
          ...a,
          verificationStatus: status,
          verifiedBy: officerName,
          verifiedAt: new Date().toISOString(),
          verificationNotes: officerNotes || defaultNote,
        };
      }
      return a;
    });

    setAlerts(updated);
    setActionSuccess(`Incident ${currentAlert.id} marked as ${status.replace('_', ' ')}!`);
    setTimeout(() => setActionSuccess(null), 3000);
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
            Incident Verification Desk (Human-in-the-Loop SOP)
            <DataOriginBadge isSimulated={true} size="sm" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Standard Operating Procedure for ranger acoustic validation, false-alarm mitigation, and patrol escalation.
          </p>
        </div>

        <Link
          href="/alerts"
          style={{
            backgroundColor: 'var(--bg-panel-elevated)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            padding: '7px 14px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          View Full Ledger &rarr;
        </Link>
      </div>

      {actionSuccess && (
        <div
          style={{
            backgroundColor: 'var(--threat-safe-bg)',
            border: '1px solid var(--threat-safe-border)',
            color: 'var(--threat-safe)',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>✓</span>
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Verification Desk */}
      <div className={styles.deskLayout}>
        {/* Left: Active Event Under Review */}
        <div className={styles.panel}>
          <div className={styles.threatCardHeader}>
            <div>
              <div className={styles.threatTitle}>
                <span className="pulse-critical" style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--threat-critical)' }} />
                <span>INCIDENT CASE: {currentAlert.id}</span>
              </div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Sensor: {currentAlert.nodeName} ({currentAlert.nodeId}) • Detected:{' '}
                {new Date(currentAlert.detectedAt).toLocaleTimeString()}
              </div>
            </div>

            <ThreatPill threatType={currentAlert.threatType} />
          </div>

          {/* Incident Telemetry Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ backgroundColor: 'var(--bg-panel-elevated)', padding: '10px', borderRadius: '4px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>MODEL CONFIDENCE</div>
              <div className="mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--threat-critical)' }}>
                {(currentAlert.confidence * 100).toFixed(1)}%
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-panel-elevated)', padding: '10px', borderRadius: '4px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>MEASURED SOUND SPL</div>
              <div className="mono" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {currentAlert.soundLevelDb} dB
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-panel-elevated)', padding: '10px', borderRadius: '4px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PEAK FREQUENCY</div>
              <div className="mono" style={{ fontSize: '18px', fontWeight: 700, color: '#38bdf8' }}>
                {currentAlert.frequencyPeakHz} Hz
              </div>
            </div>
          </div>

          {/* Standard Operating Procedure (SOP) Checklist */}
          <div className={styles.checklist}>
            <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-primary)', marginBottom: 2 }}>
              Ranger Verification Checklist (SOP-FR-04)
            </div>
            <label className={styles.checkItem}>
              <input type="checkbox" defaultChecked />
              <span>
                <strong>Acoustic Confirmation:</strong> TinyML confidence exceeds calibrated 82% threshold (Actual: {(currentAlert.confidence * 100).toFixed(0)}%).
              </span>
            </label>
            <label className={styles.checkItem}>
              <input type="checkbox" defaultChecked />
              <span>
                <strong>Harmonic Signature:</strong> Spectral peak ({currentAlert.frequencyPeakHz} Hz) aligns with 2-stroke engine chainsaw blade teeth friction.
              </span>
            </label>
            <label className={styles.checkItem}>
              <input type="checkbox" />
              <span>
                <strong>Permit Verification:</strong> Verified against DFO forestry registry: Zero active tribal or silvicultural permits in this compartment.
              </span>
            </label>
            <label className={styles.checkItem}>
              <input type="checkbox" />
              <span>
                <strong>Weather Cross-Check:</strong> No severe thunder or monsoon wind squall registered by meteorological station at detection time.
              </span>
            </label>
          </div>

          {/* Officer Verification Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: 4 }}>
                Reviewing Officer Name / Radio Callsign:
              </label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: 4 }}>
                Patrol Dispatch Notes / Log Entries:
              </label>
              <textarea
                rows={3}
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                style={{ width: '100%', resize: 'none' }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtonRow}>
            <button
              className={styles.dispatchBtn}
              onClick={() =>
                handleApplyVerdict(
                  'VERIFIED_THREAT',
                  'Chainsaw acoustic signature verified. Rapid Patrol squad dispatched.'
                )
              }
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
              Confirm Illegal Logging Threat &amp; Dispatch Patrol
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                className={styles.permitBtn}
                onClick={() =>
                  handleApplyVerdict(
                    'RESOLVED',
                    'Classified as authorized municipal/tribal forestry clearance.'
                  )
                }
              >
                Log as Authorized Forestry
              </button>
              <button
                className={styles.falsePositiveBtn}
                onClick={() =>
                  handleApplyVerdict(
                    'FALSE_POSITIVE',
                    'Acoustic misclassification caused by natural anomaly (thunder/tree branch snap).'
                  )
                }
              >
                Flag as False Alarm
              </button>
            </div>
          </div>
        </div>

        {/* Right: Pending Queue & Audit History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Pending Queue */}
          <div className={styles.panel}>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
              Pending Review Queue ({pendingAlerts.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pendingAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  style={{
                    backgroundColor:
                      selectedAlertId === alert.id ? 'var(--bg-panel-hover)' : 'var(--bg-panel-elevated)',
                    border: `1px solid ${selectedAlertId === alert.id ? 'var(--threat-critical)' : 'var(--border-subtle)'}`,
                    borderRadius: '4px',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                      {alert.nodeName}
                    </div>
                    <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {alert.nodeId} • {new Date(alert.detectedAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <ThreatPill threatType={alert.threatType} />
                </div>
              ))}
              {pendingAlerts.length === 0 && (
                <div style={{ fontSize: '12px', color: 'var(--accent-emerald-bright)', textAlign: 'center', padding: '16px' }}>
                  ✓ All active acoustic threats have been verified by rangers.
                </div>
              )}
            </div>
          </div>

          {/* Past Audit History */}
          <div className={styles.panel}>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
              Recent Ranger Audit Log
            </div>

            <div className={styles.auditFeed}>
              {pastVerifications.map((item) => (
                <div key={item.id} className={styles.auditItem}>
                  <div className={styles.auditHeader}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.nodeName}</span>
                    <VerificationBadge status={item.verificationStatus} />
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {item.verificationNotes}
                  </div>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    Verified by: {item.verifiedBy || 'Officer'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
