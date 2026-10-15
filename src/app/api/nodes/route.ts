import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/client';

export async function GET() {
  try {
    const db = getDatabase();
    const rows = db.prepare('SELECT * FROM nodes ORDER BY id ASC').all();

    // Map database snake_case to camelCase
    const nodes = rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      latitude: r.latitude,
      longitude: r.longitude,
      zone: r.zone,
      firmwareVersion: r.firmware_version,
      batteryPct: r.battery_pct,
      batteryVoltage: r.battery_voltage,
      solarStatus: r.solar_status,
      status: r.status,
      lastSeenAt: r.last_seen_at,
      signalRssi: r.signal_rssi,
      signalSnr: r.signal_snr,
      isSimulated: r.is_simulated === 1,
      elevationMeters: r.elevation_meters,
      detectionCount: r.detection_count,
    }));

    return NextResponse.json({ success: true, nodes });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
