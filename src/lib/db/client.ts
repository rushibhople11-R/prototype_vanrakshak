import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { DEMO_FOREST_NODES, DEMO_THREAT_ALERTS, DEMO_LORA_PACKETS } from '../demo-data';

const dbPath = path.join(process.cwd(), 'vanrakshak.db');

declare global {
  // eslint-disable-next-line no-var
  var _sqliteDb: Database.Database | undefined;
}

export function getDatabase(): Database.Database {
  if (!global._sqliteDb) {
    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initializeSchema(db);
    global._sqliteDb = db;
  }
  return global._sqliteDb;
}

function initializeSchema(db: Database.Database) {
  const schemaPath = path.join(process.cwd(), 'src', 'lib', 'db', 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
  }

  // Seed default nodes if empty
  const countRow = db.prepare('SELECT COUNT(*) as cnt FROM nodes').get() as { cnt: number };
  if (countRow.cnt === 0) {
    const insertNode = db.prepare(`
      INSERT INTO nodes (
        id, name, latitude, longitude, zone, firmware_version,
        battery_pct, battery_voltage, solar_status, status,
        last_seen_at, signal_rssi, signal_snr, is_simulated,
        elevation_meters, detection_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertManyNodes = db.transaction((nodesList) => {
      for (const n of nodesList) {
        insertNode.run(
          n.id,
          n.name,
          n.latitude,
          n.longitude,
          n.zone,
          n.firmwareVersion,
          n.batteryPct,
          n.batteryVoltage,
          n.solarStatus,
          n.status,
          n.lastSeenAt,
          n.signalRssi,
          n.signalSnr,
          n.isSimulated ? 1 : 0,
          n.elevationMeters,
          n.detectionCount
        );
      }
    });
    insertManyNodes(DEMO_FOREST_NODES);

    // Seed default threat alerts
    const insertAlert = db.prepare(`
      INSERT INTO threat_alerts (
        id, node_id, node_name, threat_type, severity, confidence,
        sound_level_db, detected_at, received_at, verification_status,
        verification_notes, verified_by, verified_at, frequency_peak_hz,
        duration_seconds, is_simulated, latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertManyAlerts = db.transaction((alertsList) => {
      for (const a of alertsList) {
        insertAlert.run(
          a.id,
          a.nodeId,
          a.nodeName,
          a.threatType,
          a.severity,
          a.confidence,
          a.soundLevelDb,
          a.detectedAt,
          a.receivedAt,
          a.verificationStatus,
          a.verificationNotes || null,
          a.verifiedBy || null,
          a.verifiedAt || null,
          a.frequencyPeakHz,
          a.durationSeconds,
          a.isSimulated ? 1 : 0,
          a.latitude,
          a.longitude
        );
      }
    });
    insertManyAlerts(DEMO_THREAT_ALERTS);

    // Seed default packets
    const insertPacket = db.prepare(`
      INSERT INTO lora_packets (
        raw_hex, node_id, packet_type, rssi, snr, frequency_mhz,
        spreading_factor, crc_valid, received_at, is_simulated,
        battery_mv, solar_flag, threat_class, confidence, sound_level_db, seq_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertManyPackets = db.transaction((pktList) => {
      for (const p of pktList) {
        insertPacket.run(
          p.rawHex,
          p.nodeId,
          p.packetType,
          p.rssi,
          p.snr,
          p.frequencyMhz,
          p.spreadingFactor,
          p.crcValid ? 1 : 0,
          p.receivedAt,
          p.isSimulated ? 1 : 0,
          p.decodedPayload?.batteryMv || null,
          p.decodedPayload?.solarFlag || null,
          p.decodedPayload?.threatClass || null,
          p.decodedPayload?.confidence || null,
          p.decodedPayload?.soundLevelDb || null,
          p.decodedPayload?.seqNumber || null
        );
      }
    });
    insertManyPackets(DEMO_LORA_PACKETS);
  }
}
