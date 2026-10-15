import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/client';
import { decodeLoRaPacket } from '@/lib/lora/packet-codec';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      raw_payload_hex,
      gateway_id = 'GW-CENTRAL-01',
      rssi = -102,
      snr = 7.0,
      frequency_mhz = 865.2,
      is_simulated = false,
    } = body;

    if (!raw_payload_hex) {
      return NextResponse.json({ success: false, error: 'Missing raw_payload_hex' }, { status: 400 });
    }

    // Decode 16-byte binary payload
    const decoded = decodeLoRaPacket(raw_payload_hex);
    const db = getDatabase();
    const now = new Date().toISOString();

    // 1. Record raw packet log
    db.prepare(`
      INSERT INTO lora_packets (
        raw_hex, node_id, packet_type, rssi, snr, frequency_mhz,
        spreading_factor, crc_valid, received_at, is_simulated,
        battery_mv, solar_flag, threat_class, confidence, sound_level_db, seq_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      raw_payload_hex,
      decoded.nodeId,
      decoded.packetType,
      rssi,
      snr,
      frequency_mhz,
      9,
      decoded.crcValid ? 1 : 0,
      now,
      is_simulated ? 1 : 0,
      decoded.batteryMv,
      decoded.solarCharging ? 1 : 0,
      decoded.threatType,
      Math.round(decoded.confidence * 100),
      decoded.soundLevelDb,
      decoded.seqNumber
    );

    // 2. Update Node status & telemetry
    const nodeStatus = decoded.packetType === 'ALERT' ? 'ALERT' : 'ONLINE';
    const solarStatus = decoded.solarCharging ? 'CHARGING' : 'DISCHARGING';

    db.prepare(`
      UPDATE nodes
      SET battery_voltage = ?, solar_status = ?, status = ?,
          last_seen_at = ?, signal_rssi = ?, signal_snr = ?
      WHERE id = ?
    `).run(
      decoded.batteryVoltage,
      solarStatus,
      nodeStatus,
      now,
      rssi,
      snr,
      decoded.nodeId
    );

    // 3. If threat alert, insert alert record
    let newAlertId = null;
    if (decoded.packetType === 'ALERT') {
      newAlertId = `alt-${Date.now().toString().slice(-6)}-${decoded.threatType.slice(0, 2).toLowerCase()}`;

      // Get node info for coordinates
      const nodeRow = db.prepare('SELECT name, latitude, longitude FROM nodes WHERE id = ?').get(decoded.nodeId) as any;
      const nodeName = nodeRow ? nodeRow.name : decoded.nodeId;
      const lat = nodeRow ? nodeRow.latitude : 22.4550;
      const lng = nodeRow ? nodeRow.longitude : 78.4350;

      const severity = decoded.threatType === 'CHAINSAW' || decoded.threatType === 'GUNSHOT' ? 'CRITICAL' : 'WARNING';

      db.prepare(`
        INSERT INTO threat_alerts (
          id, node_id, node_name, threat_type, severity, confidence,
          sound_level_db, detected_at, received_at, verification_status,
          is_simulated, latitude, longitude
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, ?, ?)
      `).run(
        newAlertId,
        decoded.nodeId,
        nodeName,
        decoded.threatType,
        severity,
        decoded.confidence,
        decoded.soundLevelDb,
        now,
        now,
        is_simulated ? 1 : 0,
        lat,
        lng
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'LoRa uplink successfully processed and ingested into VanRakshak platform',
        gatewayId: gateway_id,
        decoded,
        alertGenerated: newAlertId,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
