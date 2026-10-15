'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ForestNode, ThreatAlert } from '@/types';
import styles from './ForestMap.module.css';

interface ForestMapClientProps {
  nodes: ForestNode[];
  alerts: ThreatAlert[];
  selectedNodeId?: string;
  onSelectNode?: (node: ForestNode) => void;
}

export const ForestMapClient: React.FC<ForestMapClientProps> = ({
  nodes,
  alerts,
  selectedNodeId,
  onSelectNode,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<ForestNode | null>(nodes[1] || nodes[0] || null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Satpura National Park center coordinates
    const map = L.map(mapContainerRef.current, {
      center: [22.4550, 78.4350],
      zoom: 13,
      zoomControl: true,
    });

    // Dark-themed or OpenStreetMap CartoDB dark matter / standard OSM
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    // LoRa Gateway Base Station (Elevated ridge)
    const gatewayCoords: [number, number] = [22.4520, 78.4300];
    const gatewayIcon = L.divIcon({
      className: 'gateway-pin',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #0e1612;
          border: 2px solid #38bdf8;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #38bdf8;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
        ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
            <path d="M12 2v20"/>
            <path d="m17 7-5-5-5 5"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const gwMarker = L.marker(gatewayCoords, { icon: gatewayIcon }).addTo(map);
    gwMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; color: #111;">
        <strong>LoRa Gateway Base Station</strong><br/>
        Frequency: 865.2 MHz (SF9)<br/>
        Coverage: ~4.0 km Canopy LOS
      </div>
    `);

    // Gateway coverage perimeter circle (~4000m)
    L.circle(gatewayCoords, {
      radius: 4000,
      color: '#38bdf8',
      weight: 1,
      dashArray: '5, 8',
      fillColor: '#38bdf8',
      fillOpacity: 0.04,
    }).addTo(map);

    // Node Markers & Blast Radiuses
    nodes.forEach((node) => {
      const isAlert = node.status === 'ALERT';
      const isSleep = node.status === 'SLEEP';

      const color = isAlert ? '#ef4444' : isSleep ? '#64748b' : '#10b981';

      const nodeIcon = L.divIcon({
        className: 'node-pin',
        html: `
          <div style="
            width: 28px;
            height: 28px;
            background: #0e1612;
            border: 2px solid ${color};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${color};
            box-shadow: 0 0 ${isAlert ? '16px rgba(239, 68, 68, 0.8)' : '6px rgba(16, 185, 129, 0.3)'};
            cursor: pointer;
          ">
            <span style="font-size: 10px; font-weight: 700; font-family: monospace;">${node.id.replace('VN-NODE-', '')}</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([node.latitude, node.longitude], { icon: nodeIcon }).addTo(map);
      marker.on('click', () => {
        setActiveNode(node);
        if (onSelectNode) onSelectNode(node);
      });

      // If alert is active, render acoustic detection blast radius (~350m)
      if (isAlert) {
        L.circle([node.latitude, node.longitude], {
          radius: 350,
          color: '#ef4444',
          weight: 2,
          fillColor: '#ef4444',
          fillOpacity: 0.18,
        }).addTo(map);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [nodes, onSelectNode]);

  // Recenter when selectedNodeId changes
  useEffect(() => {
    if (!selectedNodeId || !mapRef.current) return;
    const match = nodes.find((n) => n.id === selectedNodeId);
    if (match) {
      mapRef.current.setView([match.latitude, match.longitude], 14, { animate: true });
      setActiveNode(match);
    }
  }, [selectedNodeId, nodes]);

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapContainerRef} className={styles.mapContainer} />

      {/* Map Legend Overlay */}
      <div className={styles.mapOverlayLegend}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
          Grid Map Legend
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotAlert}`}></span>
          <span>Acoustic Threat (Detection Radius 350m)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotOnline}`}></span>
          <span>Node Active (Listening &amp; Inferring)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotSleep}`}></span>
          <span>Node Sleep Mode (Duty Cycle)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotGateway}`}></span>
          <span>LoRa Gateway Station (4km Radius)</span>
        </div>
      </div>

      {/* Selected Node Telemetry Drawer */}
      {activeNode && (
        <div className={styles.nodeDrawer}>
          <div className={styles.drawerTitle}>
            <span>{activeNode.name}</span>
            <span
              className="mono"
              style={{
                fontSize: '11px',
                color: activeNode.status === 'ALERT' ? 'var(--threat-critical)' : 'var(--accent-emerald-bright)',
              }}
            >
              ● {activeNode.status}
            </span>
          </div>
          <div className={styles.drawerZone}>
            {activeNode.zone} • ID: <span className="mono">{activeNode.id}</span>
          </div>

          <div className={styles.drawerGrid}>
            <div>
              <div className={styles.drawerLabel}>Coordinates</div>
              <div className={styles.drawerVal}>
                {activeNode.latitude.toFixed(4)}N, {activeNode.longitude.toFixed(4)}E
              </div>
            </div>
            <div>
              <div className={styles.drawerLabel}>Elevation</div>
              <div className={styles.drawerVal}>{activeNode.elevationMeters}m MSL</div>
            </div>
            <div>
              <div className={styles.drawerLabel}>Battery Voltage</div>
              <div className={styles.drawerVal}>
                {activeNode.batteryVoltage}V ({activeNode.batteryPct}%)
              </div>
            </div>
            <div>
              <div className={styles.drawerLabel}>Solar State</div>
              <div className={styles.drawerVal}>{activeNode.solarStatus}</div>
            </div>
            <div>
              <div className={styles.drawerLabel}>LoRa Signal</div>
              <div className={styles.drawerVal}>
                {activeNode.signalRssi} dBm (SNR {activeNode.signalSnr} dB)
              </div>
            </div>
            <div>
              <div className={styles.drawerLabel}>Detections Logged</div>
              <div className={styles.drawerVal}>{activeNode.detectionCount} events</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
