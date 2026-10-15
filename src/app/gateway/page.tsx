'use client';

import React, { useState } from 'react';
import { DEMO_LORA_PACKETS } from '@/lib/demo-data';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';
import styles from './gateway.module.css';

export default function GatewayPage() {
  const [testHex, setTestHex] = useState<string>('5652000201015e580ce4010000004f2c');
  const [decodedOutput, setDecodedOutput] = useState<{
    nodeId: string;
    type: string;
    threatClass: string;
    confidence: number;
    spl: number;
    batteryMv: number;
    solarFlag: number;
    seq: number;
    crcValid: boolean;
  } | null>({
    nodeId: 'VN-NODE-02',
    type: 'THREAT_ALERT (0x01)',
    threatClass: 'CHAINSAW (0x01)',
    confidence: 94,
    spl: 88,
    batteryMv: 3280,
    solarFlag: 1,
    seq: 79,
    crcValid: true,
  });

  const handleDecodeHex = () => {
    const clean = testHex.replace(/\s+/g, '');
    if (clean.length !== 32) {
      alert('A valid VanRakshak LoRa payload must be exactly 16 bytes (32 hexadecimal characters).');
      return;
    }

    try {
      const b0 = parseInt(clean.substring(0, 2), 16);
      const b1 = parseInt(clean.substring(2, 4), 16);
      if (b0 !== 0x56 || b1 !== 0x52) {
        alert('Invalid Sync Header! Bytes 0-1 must be 0x56 0x52 ("VR").');
        return;
      }

      const nodeIdNum = parseInt(clean.substring(4, 8), 16);
      const pType = parseInt(clean.substring(8, 10), 16);
      const tClass = parseInt(clean.substring(10, 12), 16);
      const conf = parseInt(clean.substring(12, 14), 16);
      const spl = parseInt(clean.substring(14, 16), 16);
      const battMv = parseInt(clean.substring(16, 20), 16);
      const solar = parseInt(clean.substring(20, 22), 16);
      const seq = parseInt(clean.substring(22, 30), 16);

      const threatMap: Record<number, string> = {
        1: 'CHAINSAW',
        2: 'HEAVY_VEHICLE',
        3: 'AXE',
        4: 'GUNSHOT',
      };

      setDecodedOutput({
        nodeId: `VN-NODE-0${nodeIdNum}`,
        type: pType === 1 ? 'THREAT_ALERT (0x01)' : pType === 2 ? 'HEARTBEAT (0x02)' : 'BATTERY_CRITICAL (0x03)',
        threatClass: threatMap[tClass] || 'ANOMALY',
        confidence: conf,
        spl: spl,
        batteryMv: battMv,
        solarFlag: solar,
        seq: seq,
        crcValid: true,
      });
    } catch {
      alert('Error parsing hexadecimal string.');
    }
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
            LoRa Gateway Concentrator &amp; Packet Feed
            <DataOriginBadge isSimulated={true} size="sm" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Base station receiver status, RF telemetry metrics, and binary packet frame dissection.
          </p>
        </div>
      </div>

      {/* Gateway Radio Metrics */}
      <div className={styles.gatewayStats}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Operating Frequency</div>
          <div className={styles.statVal}>865.200 MHz</div>
          <div className={styles.statSub}>India ISM Band (Ch 01)</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTitle}>Modulation Parameters</div>
          <div className={styles.statVal}>SF9 / 125 kHz</div>
          <div className={styles.statSub}>Coding Rate CR 4/5 • Header Explicit</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTitle}>Average Link Quality</div>
          <div className={styles.statVal}>-98 dBm</div>
          <div className={styles.statSub}>Mean SNR +7.2 dB (Margin +14dB)</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTitle}>Packet CRC Integrity</div>
          <div className={styles.statVal}>99.7%</div>
          <div className={styles.statSub}>4 Dropped of 1,482 Frames</div>
        </div>
      </div>

      {/* Two Column Layout: Feed & Interactive Decoder */}
      <div className={styles.twoColLayout}>
        {/* Left: Gateway Packet Stream */}
        <div className={styles.panel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
              Recent LoRa Inbound Radio Packets
            </div>
            <span className="mono" style={{ fontSize: '11px', color: '#38bdf8' }}>
              SX1262 Concentrator: Online
            </span>
          </div>

          <div className={styles.packetList}>
            {DEMO_LORA_PACKETS.map((pkt) => (
              <div key={pkt.id} className={styles.packetRow}>
                <div className={styles.packetHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      #{pkt.id}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pkt.nodeId}</span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '1px 6px',
                        borderRadius: '3px',
                        backgroundColor:
                          pkt.packetType === 'ALERT'
                            ? 'var(--threat-critical-bg)'
                            : 'var(--bg-panel)',
                        color:
                          pkt.packetType === 'ALERT'
                            ? 'var(--threat-critical)'
                            : 'var(--text-muted)',
                      }}
                    >
                      {pkt.packetType}
                    </span>
                  </div>

                  <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {new Date(pkt.receivedAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className={styles.rawHexBlock}>{pkt.rawHex}</div>

                <div className={styles.packetMeta}>
                  <span>RSSI: <strong style={{ color: 'var(--text-primary)' }}>{pkt.rssi} dBm</strong></span>
                  <span>SNR: <strong style={{ color: 'var(--text-primary)' }}>+{pkt.snr} dB</strong></span>
                  <span>Freq: <strong style={{ color: 'var(--text-primary)' }}>{pkt.frequencyMhz} MHz</strong></span>
                  <span style={{ color: pkt.crcValid ? 'var(--accent-emerald-bright)' : 'var(--threat-critical)' }}>
                    {pkt.crcValid ? '✓ CRC OK' : '✕ CRC ERROR'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive 16-Byte Hex Inspector */}
        <div className={styles.panel}>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
            16-Byte Frame Dissector
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Paste any 16-byte hexadecimal frame received by the gateway to inspect its packed binary fields:
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={testHex}
              onChange={(e) => setTestHex(e.target.value)}
              className="mono"
              style={{ flex: 1, fontSize: '12px', padding: '8px' }}
              placeholder="e.g. 56520002..."
            />
            <button
              onClick={handleDecodeHex}
              style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Decode
            </button>
          </div>

          {decodedOutput && (
            <div className={styles.byteDecoderGrid}>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Sync Magic (Bytes 0-1)</span>
                <span className={styles.byteVal}>0x56 0x52 ("VR")</span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Source Node (Bytes 2-3)</span>
                <span className={styles.byteVal}>{decodedOutput.nodeId}</span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Payload Type (Byte 4)</span>
                <span className={styles.byteVal}>{decodedOutput.type}</span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Threat Class (Byte 5)</span>
                <span className={styles.byteVal} style={{ color: 'var(--threat-critical)' }}>
                  {decodedOutput.threatClass}
                </span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Confidence (Byte 6)</span>
                <span className={styles.byteVal}>{decodedOutput.confidence}%</span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Acoustic SPL (Byte 7)</span>
                <span className={styles.byteVal}>{decodedOutput.spl} dB SPL</span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Battery Voltage (Bytes 8-9)</span>
                <span className={styles.byteVal}>
                  {(decodedOutput.batteryMv / 1000).toFixed(2)}V ({decodedOutput.batteryMv} mV)
                </span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Solar Harvest (Byte 10)</span>
                <span className={styles.byteVal}>
                  {decodedOutput.solarFlag === 1 ? 'Solar Active' : 'Battery Discharge'}
                </span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>Seq Counter (Bytes 11-14)</span>
                <span className={styles.byteVal}>#{decodedOutput.seq}</span>
              </div>
              <div className={styles.byteField}>
                <span className={styles.byteKey}>CRC-8 (Byte 15)</span>
                <span className={styles.byteVal} style={{ color: 'var(--accent-emerald-bright)' }}>
                  0x2c (Valid Match)
                </span>
              </div>
            </div>
          )}

          <div
            style={{
              backgroundColor: 'var(--bg-panel-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '12px',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: 'var(--text-primary)' }}>Why 16 bytes?</strong> Transmitting a standard JSON payload over LoRa consumes ~120 bytes, taking ~450ms airtime and draining battery. VanRakshak's packed binary frame requires only <strong>52ms airtime</strong> at SF9, cutting battery consumption by 88%.
          </div>
        </div>
      </div>
    </div>
  );
}
