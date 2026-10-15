'use client';

import React from 'react';
import { DEMO_BATTERY_CURVE, DEMO_FOREST_NODES } from '@/lib/demo-data';
import { BatteryOverviewChart } from '@/components/charts/BatteryOverviewChart';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';

export default function SolarBatteryPage() {
  const powerBudget = [
    { mode: 'Ultra-Low Power Deep Sleep', current: '15 µA', duration: '1,500 ms per 2s cycle', dailyEnergy: '0.27 mAh', pct: '1.2%' },
    { mode: 'I2S MEMS Audio Capture (DMA)', current: '18 mA', duration: '500 ms per 2s cycle', dailyEnergy: '108.0 mAh', pct: '62.5%' },
    { mode: 'ESP32-S3 TinyML CNN Inference', current: '65 mA', duration: '42 ms per 2s cycle', dailyEnergy: '32.8 mAh', pct: '19.0%' },
    { mode: 'LoRa SX1262 TX (+22 dBm Burst)', current: '118 mA', duration: '52 ms per transmission (avg 24/day)', dailyEnergy: '4.1 mAh', pct: '2.4%' },
    { mode: 'System LDO & Quiescent Losses', current: '45 µA', duration: 'Continuous 24h', dailyEnergy: '1.08 mAh', pct: '0.6%' },
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
            Solar Harvesting &amp; Battery Health
            <DataOriginBadge isSimulated={true} size="sm" label="Calibrated Model" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            LiFePO4 battery chemistry telemetry, MPPT solar generation, and edge power budget analysis.
          </p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Battery Chemistry</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '6px 0' }}>LiFePO4 (3.2V)</div>
          <div style={{ fontSize: '11px', color: 'var(--accent-emerald-bright)' }}>High thermal tolerance (&gt;60°C forest canopy)</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cell Capacity</div>
          <div className="mono" style={{ fontSize: '20px', fontWeight: 700, color: '#38bdf8', margin: '6px 0' }}>6,000 mAh</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Single 32700 cylindrical cell</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Daily Power Consumption</div>
          <div className="mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: '6px 0' }}>~146.2 mAh / day</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Under standard 500ms duty-cycle listening</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Zero-Sunlight Autonomy</div>
          <div className="mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--threat-safe)', margin: '6px 0' }}>41 Days</div>
          <div style={{ fontSize: '11px', color: 'var(--accent-emerald-bright)' }}>Survives prolonged monsoon overcast canopy</div>
        </div>
      </div>

      {/* 24-Hour Diurnal Chart */}
      <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
              Diurnal Solar Generation vs LiFePO4 Voltage Stability
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Blue Curve: Cell Voltage (V) • Green Area: Solar Generation via CN3791 MPPT (mW)
            </div>
          </div>
          <span className="mono" style={{ fontSize: '11px', color: 'var(--accent-emerald-bright)' }}>
            Peak Solar: 1,980 mW @ 12:00 IST
          </span>
        </div>

        <BatteryOverviewChart data={DEMO_BATTERY_CURVE} />
      </div>

      {/* Fleet Node Battery Inventory & Power Budget */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Power Budget Table */}
        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
            Hardware Subsystem Power Budget Breakdown
          </div>
          <table>
            <thead>
              <tr>
                <th>Operational State</th>
                <th>Current</th>
                <th>Daily Energy</th>
                <th>Budget %</th>
              </tr>
            </thead>
            <tbody>
              {powerBudget.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12px' }}>{item.mode}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.duration}</div>
                  </td>
                  <td className="mono">{item.current}</td>
                  <td className="mono">{item.dailyEnergy}</td>
                  <td className="mono" style={{ color: 'var(--accent-emerald-bright)' }}>{item.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fleet Voltage Status */}
        <div style={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
            Fleet Battery Voltage Levels
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {DEMO_FOREST_NODES.map((node) => (
              <div key={node.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', padding: '8px 10px', backgroundColor: 'var(--bg-panel-elevated)', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{node.id}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>{node.name}</span>
                </div>
                <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>{node.batteryVoltage}V</span>
                  <span style={{ color: node.batteryPct < 50 ? 'var(--threat-warning)' : 'var(--accent-emerald-bright)', fontWeight: 700 }}>
                    {node.batteryPct}%
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{node.solarStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
