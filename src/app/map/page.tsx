'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { DEMO_FOREST_NODES, DEMO_THREAT_ALERTS } from '@/lib/demo-data';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';
import { ForestNode } from '@/types';

// Dynamic import of Leaflet client to prevent "window is not defined" SSR errors
const ForestMapClient = dynamic(
  () => import('@/components/map/ForestMapClient').then((mod) => mod.ForestMapClient),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 200px)',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-panel)',
          border: '1px solid var(--border-medium)',
          borderRadius: '6px',
          color: 'var(--text-muted)',
          gap: '12px',
        }}
      >
        <div style={{ width: '28px', height: '28px', border: '3px solid var(--border-medium)', borderTopColor: 'var(--accent-emerald)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <span>Loading Satellite GIS Topology...</span>
      </div>
    ),
  }
);

export default function MapPage() {
  const [selectedNode, setSelectedNode] = useState<ForestNode | undefined>(
    DEMO_FOREST_NODES.find((n) => n.status === 'ALERT') || DEMO_FOREST_NODES[0]
  );
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredNodes = DEMO_FOREST_NODES.filter((n) => {
    if (filterStatus === 'ALL') return true;
    return n.status === filterStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header & Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
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
            Forest Monitoring Map
            <DataOriginBadge isSimulated={true} size="sm" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time acoustic sensor placement, gateway RF coverage, and estimated threat detection radiuses.
          </p>
        </div>

        {/* Filter controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Filter Node State:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            <option value="ALL">All Nodes ({DEMO_FOREST_NODES.length})</option>
            <option value="ALERT">Active Alert Only</option>
            <option value="ONLINE">Online Nominal</option>
            <option value="SLEEP">Sleep Duty-Cycle</option>
          </select>
        </div>
      </div>

      {/* Map Client */}
      <ForestMapClient
        nodes={filteredNodes}
        alerts={DEMO_THREAT_ALERTS}
        selectedNodeId={selectedNode?.id}
        onSelectNode={(node) => setSelectedNode(node)}
      />
    </div>
  );
}
