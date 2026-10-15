import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/client';

export async function GET(req: NextRequest) {
  try {
    const db = getDatabase();
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const threatType = searchParams.get('threatType');

    let query = 'SELECT * FROM threat_alerts WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'ALL') {
      query += ' AND verification_status = ?';
      params.push(status);
    }

    if (threatType && threatType !== 'ALL') {
      query += ' AND threat_type = ?';
      params.push(threatType);
    }

    query += ' ORDER BY detected_at DESC LIMIT 50';

    const rows = db.prepare(query).all(...params);

    const alerts = rows.map((r: any) => ({
      id: r.id,
      nodeId: r.node_id,
      nodeName: r.node_name,
      threatType: r.threat_type,
      severity: r.severity,
      confidence: r.confidence,
      soundLevelDb: r.sound_level_db,
      detectedAt: r.detected_at,
      receivedAt: r.received_at,
      verificationStatus: r.verification_status,
      verificationNotes: r.verification_notes,
      verifiedBy: r.verified_by,
      verifiedAt: r.verified_at,
      frequencyPeakHz: r.frequency_peak_hz,
      durationSeconds: r.duration_seconds,
      isSimulated: r.is_simulated === 1,
      latitude: r.latitude,
      longitude: r.longitude,
    }));

    return NextResponse.json({ success: true, alerts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
