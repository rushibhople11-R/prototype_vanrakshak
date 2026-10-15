'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';
import { DEMO_THREAT_ALERTS } from '@/lib/demo-data';

export default function AnalyticsPage() {
  const temporalData = [
    { hour: '00-03', incidents: 18, label: 'Late Night (High Poaching)' },
    { hour: '03-06', incidents: 12, label: 'Pre-Dawn' },
    { hour: '06-09', incidents: 4, label: 'Early Morning' },
    { hour: '09-12', incidents: 6, label: 'Midday' },
    { hour: '12-15', incidents: 5, label: 'Afternoon' },
    { hour: '15-18', incidents: 7, label: 'Dusk' },
    { hour: '18-21', incidents: 11, label: 'Evening' },
    { hour: '21-24', incidents: 21, label: 'Nocturnal High' },
  ];

  const threatTypeDistribution = [
    { name: 'Chainsaw', value: 44, color: '#ef4444' },
    { name: 'Heavy Vehicle', value: 24, color: '#f59e0b' },
    { name: 'Axe Chop', value: 18, color: '#eab308' },
    { name: 'Gunshot', value: 6, color: '#f43f5e' },
    { name: 'Anomaly/Noise', value: 8, color: '#0284c7' },
  ];

  const handleExportCSV = () => {
    const headers = ['ID,NodeID,NodeName,ThreatType,Confidence,SPL_dB,DetectedAt,Status,VerifiedBy'];
    const rows = DEMO_THREAT_ALERTS.map(
      (a) =>
        `${a.id},${a.nodeId},"${a.nodeName}",${a.threatType},${a.confidence},${a.soundLevelDb},${a.detectedAt},${a.verificationStatus},"${a.verifiedBy || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vanrakshak_incident_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(DEMO_THREAT_ALERTS, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `vanrakshak_audit_log_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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
            Threat Analytics &amp; Incident Reports
            <DataOriginBadge isSimulated={true} size="sm" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Spatial-temporal illegal logging trends, threat distribution, and ranger verification performance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleExportCSV}
            style={{
              backgroundColor: 'var(--bg-panel-elevated)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              padding: '7px 14px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>

          <button
            onClick={handleExportJSON}
            style={{
              backgroundColor: 'var(--accent-emerald-dim)',
              border: '1px solid var(--accent-emerald)',
              color: 'var(--accent-emerald-bright)',
              padding: '7px 14px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Export JSON Audit
          </button>
        </div>
      </div>

      {/* Key Insight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>High Risk Time Window</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--threat-critical)', margin: '6px 0' }}>21:00 — 03:00 IST</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>58% of illegal chainsaws operate under darkness</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Most Vulnerable Compartment</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '6px 0' }}>Sector 4 Teak Canopy</div>
          <div style={{ fontSize: '11px', color: 'var(--threat-warning)' }}>38 acoustic triggers in past 30 days</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Average Response Time</div>
          <div className="mono" style={{ fontSize: '20px', fontWeight: 700, color: '#38bdf8', margin: '6px 0' }}>14.2 Minutes</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>From LoRa trigger to ranger dispatch</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>False Alarm Ratio</div>
          <div className="mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-emerald-bright)', margin: '6px 0' }}>6.8%</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Thunder &amp; tribal fuel-wood permits</div>
        </div>
      </div>

      {/* Two Column Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* Nocturnal Trend Chart */}
        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '18px' }}>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '14px' }}>
            Acoustic Incident Frequency by Time of Day (24-Hour Bins)
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={temporalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" stroke="#576d61" tick={{ fill: '#8ea397', fontSize: 11 }} />
                <YAxis stroke="#576d61" tick={{ fill: '#8ea397', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0e1612',
                    borderColor: '#22352b',
                    borderRadius: '4px',
                    color: '#f2f7f4',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="incidents" name="Incidents Logged" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Type Breakdown Pie */}
        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '18px' }}>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '14px' }}>
            Acoustic Threat Category Breakdown
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {threatTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0e1612',
                    borderColor: '#22352b',
                    borderRadius: '4px',
                    color: '#f2f7f4',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  formatter={(value) => <span style={{ color: '#8ea397' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
