'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { BatteryTelemetryPoint } from '@/types';

interface BatteryOverviewChartProps {
  data: BatteryTelemetryPoint[];
}

export const BatteryOverviewChart: React.FC<BatteryOverviewChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 12, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="batteryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 52, 41, 0.4)" />
          <XAxis
            dataKey="time"
            stroke="#5e796c"
            tick={{ fill: '#9cb3a6', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            axisLine={{ stroke: 'rgba(45, 78, 62, 0.6)' }}
          />
          <YAxis
            yAxisId="left"
            domain={[3.15, 3.42]}
            stroke="#5e796c"
            tick={{ fill: '#9cb3a6', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            axisLine={{ stroke: 'rgba(45, 78, 62, 0.6)' }}
            unit="V"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#5e796c"
            tick={{ fill: '#9cb3a6', fontSize: 11, fontFamily: 'var(--font-mono)' }}
            axisLine={{ stroke: 'rgba(45, 78, 62, 0.6)' }}
            unit="mW"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(11, 20, 16, 0.95)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(52, 211, 153, 0.4)',
              borderRadius: '6px',
              color: '#f8fafc',
              fontSize: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
            formatter={(value) => <span style={{ color: '#9cb3a6', fontWeight: 600 }}>{value}</span>}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="voltage"
            name="LiFePO4 Voltage (V)"
            stroke="#38bdf8"
            fillOpacity={1}
            fill="url(#batteryGrad)"
            strokeWidth={2.5}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="solarMw"
            name="Solar Harvest (mW)"
            stroke="#34d399"
            fillOpacity={1}
            fill="url(#solarGrad)"
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
