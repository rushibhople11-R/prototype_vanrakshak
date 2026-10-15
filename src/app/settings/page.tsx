'use client';

import React, { useState } from 'react';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';

export default function SettingsPage() {
  const [systemMode, setSystemMode] = useState<'SIMULATED' | 'LIVE'>('SIMULATED');
  const [gatewayUrl, setGatewayUrl] = useState<string>('http://192.168.1.100:3000/api/gateway/uplink');
  const [apiKey, setApiKey] = useState<string>('vr_live_sec_89f41b2a9e33');
  const [injectedMessage, setInjectedMessage] = useState<string | null>(null);

  const handleInjectScenario = (scenarioTitle: string) => {
    setInjectedMessage(`⚡ Scenario dispatched: "${scenarioTitle}". Dispatched synthetic LoRa packet to gateway pipeline.`);
    setTimeout(() => setInjectedMessage(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px' }}>
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
            System Settings &amp; Demonstration Control
            <DataOriginBadge isSimulated={systemMode === 'SIMULATED'} size="sm" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Switch between demonstration simulation mode and real ESP32-S3 hardware bridge ingestion.
          </p>
        </div>
      </div>

      {injectedMessage && (
        <div
          style={{
            backgroundColor: 'var(--threat-warning-bg)',
            border: '1px solid var(--threat-warning-border)',
            color: 'var(--threat-warning)',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {injectedMessage}
        </div>
      )}

      {/* Mode Switcher Panel */}
      <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
          Operating Environment Mode
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Per VanRakshak Data Integrity guidelines, the platform strictly segregates simulation data from physical sensor inputs.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div
            onClick={() => setSystemMode('SIMULATED')}
            style={{
              backgroundColor: systemMode === 'SIMULATED' ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-panel-elevated)',
              border: `2px solid ${systemMode === 'SIMULATED' ? 'var(--threat-warning)' : 'var(--border-subtle)'}`,
              borderRadius: '6px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--threat-warning)' }}>
                Demonstration Simulation Mode
              </span>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--threat-warning)' }}>ACTIVE</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Generates realistic chainsaw alerts, diurnal solar curves, and 16-byte LoRa packets. Every UI element carries an amber [SIMULATED] badge.
            </div>
          </div>

          <div
            onClick={() => setSystemMode('LIVE')}
            style={{
              backgroundColor: systemMode === 'LIVE' ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-panel-elevated)',
              border: `2px solid ${systemMode === 'LIVE' ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
              borderRadius: '6px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--accent-emerald-bright)' }}>
                Physical Hardware Bridge Mode
              </span>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {systemMode === 'LIVE' ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Listens exclusively for physical HTTP POST packets from connected ESP32 LoRa gateways via the /api/gateway/uplink route.
            </div>
          </div>
        </div>
      </div>

      {/* Controlled Demonstration Scenario Injector */}
      <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
          Controlled Demonstration Scenario Injector
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Click any scenario to inject a synthetic threat packet directly into the application pipeline to demonstrate live response:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          <button
            onClick={() => handleInjectScenario('Chainsaw Incident at Sector 3 River Basin')}
            style={{
              backgroundColor: 'var(--bg-panel-elevated)',
              border: '1px solid var(--threat-critical-border)',
              borderRadius: '4px',
              padding: '12px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--threat-critical)', marginBottom: 4 }}>
              ⚡ Scenario A: Chainsaw at Node 03
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Dispatches 96% confidence chainsaw alert (89 dB SPL, 2450 Hz) to River Basin sector.
            </div>
          </button>

          <button
            onClick={() => handleInjectScenario('Heavy Tractor Infiltration at East Buffer')}
            style={{
              backgroundColor: 'var(--bg-panel-elevated)',
              border: '1px solid var(--threat-warning-border)',
              borderRadius: '4px',
              padding: '12px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--threat-warning)', marginBottom: 4 }}>
              ⚡ Scenario B: Tractor at Node 04
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Simulates low-frequency diesel engine rumble (180 Hz) moving across peripheral sector.
            </div>
          </button>

          <button
            onClick={() => handleInjectScenario('Low Battery Emergency Beacon at Sal Forest Node 05')}
            style={{
              backgroundColor: 'var(--bg-panel-elevated)',
              border: '1px solid var(--border-medium)',
              borderRadius: '4px',
              padding: '12px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-primary)', marginBottom: 4 }}>
              ⚡ Scenario C: Low Battery at Node 05
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Broadcasts critical battery telemetry (3.12V, 18% SoC) under dense canopy shadow.
            </div>
          </button>
        </div>
      </div>

      {/* Hardware Bridge API Credentials */}
      <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
          ESP32-S3 Gateway Uplink Endpoint Configuration
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Target configuration for physical LoRa gateway microcontrollers (ESP32 WiFi/Ethernet/GSM):
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12px' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: 4 }}>
              Gateway Uplink URL (HTTP POST):
            </label>
            <input
              type="text"
              className="mono"
              value={gatewayUrl}
              onChange={(e) => setGatewayUrl(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: 4 }}>
              Gateway Authentication Key (X-VanRakshak-Key):
            </label>
            <input
              type="text"
              className="mono"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#070c09',
            border: '1px solid var(--border-medium)',
            borderRadius: '4px',
            padding: '12px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: '#38bdf8',
            lineHeight: 1.5,
          }}
        >
          // Example cURL test command for gateway validation:<br />
          curl -X POST {gatewayUrl} \<br />
          &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
          &nbsp;&nbsp;-H "X-VanRakshak-Key: {apiKey}" \<br />
          &nbsp;&nbsp;-d '{'{"raw_payload_hex":"5652000201015e580ce4010000004f2c","gateway_id":"GW-SATPURA-01","rssi":-104,"snr":6.5}'}'
        </div>
      </div>
    </div>
  );
}
