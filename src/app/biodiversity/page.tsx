import React from 'react';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';

export default function BiodiversityPage() {
  const birdDetections = [
    { species: 'Malabar Pied Hornbill (Anthracoceros coronatus)', status: 'Vulnerable', peakTime: '06:15 IST', freqBand: '1.2 - 2.8 kHz', countToday: 28 },
    { species: 'Greater Racket-tailed Drongo (Dicrurus paradiseus)', status: 'Least Concern', peakTime: '06:40 IST', freqBand: '3.5 - 6.2 kHz', countToday: 64 },
    { species: 'Crested Serpent Eagle (Spilornis cheela)', status: 'Least Concern', peakTime: '11:20 IST', freqBand: '2.1 - 4.0 kHz', countToday: 12 },
    { species: 'Indian Peafowl (Pavo cristatus)', status: 'Least Concern', peakTime: '17:45 IST', freqBand: '0.8 - 1.9 kHz', countToday: 41 },
  ];

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
            Biodiversity &amp; Eco-Acoustic Intelligence
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600,
              }}
            >
              PLANNED CAPABILITY / PILOT PREVIEW
            </span>
            <DataOriginBadge isSimulated={true} size="sm" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Dual-purpose acoustic monitoring: Leveraging idle edge audio frames for bioacoustic census and canopy soundscape health.
          </p>
        </div>
      </div>

      {/* Explanatory Concept Banner */}
      <div
        style={{
          backgroundColor: 'rgba(16, 185, 129, 0.06)',
          border: '1px solid var(--border-medium)',
          borderRadius: '6px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--accent-emerald-bright)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M12 10a4 4 0 0 0-4-4c-2.2 0-4 1.8-4 4a6 6 0 0 0 6 6" />
            <path d="M12 10a4 4 0 0 1 4-4c2.2 0 4 1.8 4 4a6 6 0 0 1-6 6" />
            <path d="M12 10v10" />
          </svg>
          The Dual-Purpose Edge Sensing Model
        </div>
        <div>
          While VanRakshak's primary mission is detecting illegal chainsaws and poaching firearms, <strong>99.9% of audio frames recorded in a pristine forest contain non-threat biophony</strong> (birdsong, insect choruses, bat echolocation, amphibians).
          Rather than discarding this rich environmental data, the planned edge firmware calculates compressed <strong>Acoustic Complexity Index (ACI)</strong> summaries during daytime listening intervals and piggybacks them onto periodic LoRa heartbeats.
        </div>
      </div>

      {/* Eco-Acoustic Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Normalized Soundscape Index (NDSI)</div>
          <div className="mono" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-emerald-bright)', margin: '6px 0' }}>+0.78</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Predominantly wild biophony (High canopy integrity)</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Acoustic Complexity Index (ACI)</div>
          <div className="mono" style={{ fontSize: '24px', fontWeight: 700, color: '#38bdf8', margin: '6px 0' }}>184.2</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Dense avian vocalization in Sector 4 teak groves</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dawn Chorus Peak Window</div>
          <div className="mono" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: '6px 0' }}>05:45 - 07:10</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Daily morning bioacoustic climax recorded</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avian Species Indexing</div>
          <div className="mono" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--threat-safe)', margin: '6px 0' }}>14 Taxa</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Classified against BirdNET Mel-embeddings</div>
        </div>
      </div>

      {/* Avian Bio-acoustic Baseline Table */}
      <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
          Indicator Avian Vocalizations Detected (Sample Ecological Baseline)
        </div>
        <table>
          <thead>
            <tr>
              <th>Indicator Species</th>
              <th>Conservation Status</th>
              <th>Peak Activity Window</th>
              <th>Frequency Band</th>
              <th>Daily Detection Count</th>
            </tr>
          </thead>
          <tbody>
            {birdDetections.map((bird, idx) => (
              <tr key={idx}>
                <td>
                  <strong style={{ color: 'var(--text-primary)' }}>{bird.species.split('(')[0]}</strong>
                  <div style={{ fontSize: '11px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    ({bird.species.split('(')[1]}
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      fontSize: '11px',
                      color: bird.status === 'Vulnerable' ? 'var(--threat-warning)' : 'var(--text-secondary)',
                      backgroundColor: bird.status === 'Vulnerable' ? 'var(--threat-warning-bg)' : 'transparent',
                      padding: '2px 6px',
                      borderRadius: '3px',
                    }}
                  >
                    {bird.status}
                  </span>
                </td>
                <td className="mono" style={{ fontSize: '12px' }}>{bird.peakTime}</td>
                <td className="mono" style={{ fontSize: '12px' }}>{bird.freqBand}</td>
                <td className="mono" style={{ fontSize: '12px', fontWeight: 600 }}>{bird.countToday} vocalizations</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
